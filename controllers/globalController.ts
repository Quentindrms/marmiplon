import { Request, Response} from "express";

export class GlobalController { 
    protected request : Request; 
    protected response: Response;

    constructor(request: Request, response: Response){
        this.request = request; 
        this.response = response; 
    }

    public homepage(){
<<<<<<< HEAD
        this.response.render('./index'); 
    }

    public categories(){
        this.response.render('./categories'); 
    }

    public browseCategorie() {
        this.response.send('./categorie');
    }

    public browseRecette() {
        this.response.send('./recettes');
    }

    public error_404(){
        this.response.render('../errors/404');
    }

    public error_418(){
        this.response.render('../errors/418'); 
=======
        this.response.render('pages/homepage')
    }

    public browseCategorie() {
        this.response.render('pages/categorie');
    }

    public browseRecette() {
        this.response.render('pages/recettes');
>>>>>>> ed56cd8 (homepage.ejs)
    }
}