const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require("../models/Livro");
const Livro = mongoose.model("livros");



router.get('/',(req, res)=>{
    Livro.find().limit(3).then((livros)=>{
        res.render("index",{livros:livros});
    }).catch((erro)=>{
        consile.log("erro: "+erro)
    });
});

router.get('/livros',(req, res)=>{
    Livro.find().then((livros)=>{
        res.render("listaLivros",{livros:livros});
    }).catch((erro)=>{
        consile.log("erro: "+erro)
    });
});
router.get('/livro/:id',(req, res)=>{
    Livro.findOne({_id : req.params.id}).then((livro)=>{
        res.render("livro",{livro:livro});
    }).catch((erro)=>{
        consile.log("erro: "+erro)
        res.redirect("/");
    });
});

module.exports = router;