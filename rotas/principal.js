const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require("../models/Livro");
const Livro = mongoose.model("livros");
require("../models/Leitor");
const Leitor = mongoose.model("leitores");
require("../models/Comentario");
const Comentario = mongoose.model("comentarios");



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
        Comentario.find({livro : req.params.id}).populate("livro leitor").then((comentarios)=>{
            res.render("livro",{livro:livro , comentarios:comentarios});
            
        }).catch((error)=>{
            console.log("erro: "+error);
            res.redirect("/");
        });

    }).catch((error)=>{
        console.log("erro: "+error);
        res.redirect("/");
    });
});

module.exports = router;