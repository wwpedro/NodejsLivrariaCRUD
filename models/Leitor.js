const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Leitor = new Schema({
    apelido:{
        type: String,
        required: true
    },
    nome:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    senha:{
        type: String,
        required: true
    },
    eBibliotecario:{
        type: Number,
        default: 0 
    }
});

mongoose.model("leitores",Leitor)