module.exports={
    ebibliotecario:(req,res,next)=>{
        if (req.isAuthenticated() && req.user.eBibliotecario == 1) {
            return next();
        }
        req.flsh("error_msg","voce nao esta logado em bibliotecario parar entrar aqui");
        res.redirect("/");
    }
}