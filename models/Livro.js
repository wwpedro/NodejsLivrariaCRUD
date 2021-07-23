const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Livro = new Schema({
    titulo:{
        type: String,
        required: true
    },
    autor:{
        type: String,
        required: true
    },
    numero_paginas:{
        type: Number,
        required: true
    },
    ano_lancamento:{
        type: String,
        required: true
    },
    sinopse:{
        type: String,
        required: true
    },
    genero:{
        type: String,
        required: true
    }
});
    
mongoose.model("livros", Livro);
    