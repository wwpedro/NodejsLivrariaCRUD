//autenticaçao local
const localStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

require('../models/Leitor');
const Leitor = mongoose.model("leitores");

module.exports = function(passport){
    passport.use(new localStrategy({usernameField:"apelido",passwordField:"senha"},(apelido , senha ,done)=>{
        Leitor.findOne({apelido : apelido}).then((leitor)=>{
            if(!leitor) {
                return done(null , false, {message:"esta conta não existe"});
            }
            bcrypt.compare(senha,leitor.senha,(erro,congruentes)=>{
                if(congruentes) {
                    return done(null,leitor);
                }else{
                    return done(null,false,{message:"senha incorreta"});
                }
            });
        });
    }));
    //salvando leitor na sessão
    passport.serializeUser((leitor,done)=>{
        done(null,leitor.id);
    });
    passport.deserializeUser((id,done)=>{
        Leitor.findById(id,(erro, leitor)=>{
            done(erro,leitor);
        });
    });
}