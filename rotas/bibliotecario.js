//Arquivos para guardar as rotas de bibliotecario

const express = require('express');
const mongoose  = require('mongoose');
const router = express.Router();
require("../models/Livro"); //importante , muito importante pra n ter dor de cabeça <3 
const Livro = mongoose.model("livros");
const {eBibliotecario} = require("../helpautenticacao/eBibliotecario");

//Definindo Rotas

router.get('/',(req, res)=>{
    Livro.find().then((livros)=>{
        res.render("bibliotecario/index",{livros:livros});
    }).catch((erro)=>{
        console.log("erro"+erro);
    });
});

router.get('/livro',(req, res)=>{
    res.render("bibliotecario/livro");
});

router.post('/livro/cadastrar',(req, res)=>{
    const novoLivro = {
        titulo: req.body.titulo,
        autor: req.body.autor,
        numero_paginas: req.body.numero_paginas,
        ano_lancamento: req.body.ano_lancamento,
        sinopse: req.body.sinopse,
        genero: req.body.genero
    }

    new Livro(novoLivro).save((erro)=>{
        if(erro){
            req.flash("error_msg","Houve um erro ao salvar Livro");
            console.log("erro"+erro);
        }
        req.flash("sucess_msg","Livro salvo com sucesso!");
        console.log("livro salvo com sucesso!");
        res.redirect("/bibliotecario/");
    });
    
});


router.post('/livro/deletar',(req, res)=>{
    Livro.deleteOne({_id : req.body.id},(erro)=>{
        if(erro){
            console.log("erro: "+erro)
        }
        res.redirect("/bibliotecario/");
    });
});

router.get('/livro/editar/:id', (req, res)=>{
    Livro.findOne({_id : req.params.id}).then((livro)=>{
        res.render("bibliotecario/livroeditar",{livro : livro});
    }).catch((erro)=>{
        console.log("erro: " + erro);
        res.redirect("/bibliotecario/");
    });
});

router.post('/livro/editar',(req, res)=>{
    Livro.findOne({_id:req.body.id}).then((livro)=>{
        livro.titulo = req.body.titulo,
        livro.autor = req.body.autor,
        livro.numero_paginas = req.body.numero_paginas,
        livro.ano_lancamento = req.body.ano_lancamento,
        livro.sinopse =req.body.sinopse,
        livro.genero =req.body.genero

        livro.save((erro)=>{
            if(erro){
                req.flash("sucess_msg","erro ao aeditar livro!");
                console.log("erro: "+erro);
            }
            req.flash("sucess_msg","Livro Editado com sucesso!");
            res.redirect("/bibliotecario/");
        });
    });
});





//Exportando Rotas
module.exports = router;