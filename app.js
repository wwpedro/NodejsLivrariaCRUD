//Carregar Modulos

    const express = require("express");
    const handlebars = require("express-handlebars");
    const bodyParser = require("body-parser");
    const app = express();
    const bibliotecario = require("./rotas/bibliotecario");
    const leitor = require("./rotas/leitor")
    const principal = require("./rotas/principal");
    const path = require('path');
    const mongoose = require("mongoose");
    const session = require("express-session");
    const flash = require("connect-flash");
    const passport = require("passport");
    require("./config/pass")(passport);
//Configurações
    //Sessões
        app.use(session({
            secret: "secretSegura",
            resave: true,
            saveUninitialized: true
        }));
        app.use(passport.initialize());
        app.use(passport.session());

        app.use(flash());
    //MiddleWare
        app.use((req,res,next)=>{
            res.locals.sucess_msg = req.flash("sucess_msg");
            res.locals.error_msg = req.flash("error_msg");
            res.locals.error = req.flash("error");
            next();
        });
        
    //body_parser
        app.use(bodyParser.urlencoded({defaultLayout: true}));
        app.use(bodyParser.json());
    
    //Handlebars
        app.engine("handlebars", handlebars({
            defaultLayout:'main',
            runtimeOptions: {
                allowProtoPropertiesByDefault: true,
                allowProtoMethodsByDefault: true,
            },
        }));
        app.set("view engine", "handlebars");

    //Configuração mongoose
        mongoose.Promise = global.Promise;
        mongoose.connect('mongodb://localhost/livraria',{ useNewUrlParser: true ,useUnifiedTopology: true },()=>{
            console.log("mongoDB livraria conectado");
        });
    //Public
        app.use(express.static(path.join(__dirname,"public")));
    
//Rotas
    app.use("/",principal)
    app.use('/bibliotecario', bibliotecario);
    app.use('/leitor',leitor);


//Outros

    app.listen(40449,()=>{
        console.log("Serviddor roddando na porta 40449");
    });