const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
require("../models/Leitor");
const Leitor = mongoose.model('leitores');
const bcrypt = require('bcryptjs');

//rotas
router.get('/',(req, res)=>{
    Leitor.find().then((leitores)=>{
        res.render("leitor/listaLeitores",{leitores:leitores});
    }).catch((erro)=>{
        console.log("erro"+erro);
    });
});
router.get("/cadastrar",(req , res)=>{
    res.render("leitor/cadastro");
});

router.post("/cadastrar",(req , res)=>{
    const novoLeitor = new Leitor({
        apelido:req.body.apelido,
        nome:req.body.nome,
        email:req.body.email,
        senha:req.body.senha
    });
    bcrypt.genSalt(10,(erro, salt)=>{
        bcrypt.hash(novoLeitor.senha, salt,(erro,hash)=>{
          if(erro){
              req.flash("error_msg","houve um erro durante o salvamento do leitor");
              res.redirect("/leitor/");
          }
          //salvando leitor
          novoLeitor.senha = hash;
          novoLeitor.save((erro)=>{
              if(erro){
                  req.flash("error_msg","houve um erro durante o salvamento do leitor");
                  res.redirect("/leitor/cadastrar");
              }
              req.flash("sucess_msg","leitor cadastrado com sucesso");
                  res.redirect("/leitor/");
          });
        });
     });
});

router.get('/deletar/:id', (req, res)=>{
    Leitor.deleteOne({_id : req.params.id},(erro)=>{
        if(erro){
            console.log("erro: "+erro)
        }
        req.flash("sucess_msg","leitor cadastrado com sucesso");
        res.redirect("/leitor/");
    });
});







module.exports = router;