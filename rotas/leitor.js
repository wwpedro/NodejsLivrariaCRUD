const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
require("../models/Leitor");
const Leitor = mongoose.model("leitores");
const bcrypt = require('bcryptjs');
const passport = require('passport');
const {ebibliotecario} = require("../helpautenticacao/eBibliotecario");
require("../models/Comentario");
const Comentario = mongoose.model("comentarios");
require("../models/Livro");


//rotas
router.get('/',ebibliotecario,(req, res)=>{
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
    var erros= [];
    if (!req.body.apelido || typeof req.body.apelido == undefined || req.body.apelido==null) {
        erros.push({texto:"apelido invalido"});
    }
    if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome==null) {
        erros.push({texto:"nome invalido"});
    }
    if (!req.body.email || typeof req.body.email == undefined || req.body.email==null) {
        erros.push({texto:"email invalido"});
    }
    if (!req.body.senha || typeof req.body.senha == undefined || req.body.senha==null) {
        erros.push({texto:"senha invalida"});
    }
    if (req.body.senha.length < 4) {
        erros.push({texto:"senha muito curta"});
    }
    if (req.body.senha != req.body.senha1) {
        erros.push({texto:"as senhas sao diferentes"});
    }
    if (erros.length > 0) {
        res.render("leitor/cadastro",{erros:erros});
    } 
    else {
        Leitor.findOne({apelido:req.body.apelido}).then((leitor)=>{
            if(leitor){
                req.flash("error_msg","houve um erro durante o salvamento do leitor");
                res.redirect("/leitor/");
            }else{
                const novoLeitor = new Leitor({
                    apelido:req.body.apelido,
                    nome:req.body.nome,
                    email:req.body.email,
                    senha:req.body.senha
                });
                bcrypt.genSalt(10,(erro, salt)=>{
                    bcrypt.hash(novoLeitor.senha, salt,(erro,hash)=>{
                      if(erro){
                          req.flash("error_msg","ja existe um leitor cadastrado com esse apelido pfvr , tente novamente!");
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
                              res.redirect("/");
                      });
                    });
                 });
            }
        })
           
    }
});

router.get('/deletar/:id',(req, res)=>{
    Leitor.deleteOne({_id : req.params.id},(erro)=>{
        if(erro){
            console.log("erro: "+erro)
        }
        req.flash("error_msg","leitor deletado com sucesso");
        res.redirect("/leitor/");
    });
});

router.get('/login',(req, res)=>{
    res.render("leitor/login");
});

router.post('/logar',(req, res, next)=>{
    passport.authenticate("local",{
        successRedirect:"/",
        failureRedirect: "/leitor/login",
        failureFlash:true
    })(req,res,next)
});

router.get('/logout',(req, res)=>{
    req.logOut();
    req.flash("sucess_msg","leitor deslogado com sucesso");
    res.redirect("/");
});

router.post('/comentar',(req, res)=>{
    const novoComentario = {
        titulo:req.body.titulo,
        conteudo:req.body.conteudo,
        leitor:req.body.leitor,
        livro:req.body.livro
    }
    new Comentario(novoComentario).save((err)=>{
        if(err){
            console.log("erro: "+err)
        }
        req.flash("sucess_msg","coemntario cadastrado com sucesso");
        res.redirect("/livros");
    });
});
router.get('/livro/:id',(req, res)=>{
    Comentario.find().then((comentarios)=>{
        res.redirect("",{comentarios:comentarios});
    }).catch((erro)=>{
        console.log("erro"+erro);
    });
});

module.exports = router;