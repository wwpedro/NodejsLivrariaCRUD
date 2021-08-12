const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Comentario = new Schema({
    titulo:{
        type: String,
        required: true
    },
    conteudo:{
        type: String,
        required: true
    },
    leitor:{
        type: Schema.Types.ObjectId,
        ref:"leitores",
        required: true
    },
    livro:{
        type: Schema.Types.ObjectId,
        ref:"livros",
        required: true
    },
    date:{
        type: Date,
        default: Date.now()
    }
});

mongoose.model("comentarios",Comentario)