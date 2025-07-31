import { Request, Response} from "express";

export class GlobalController { 
    protected request : Request; 
    protected response: Response;

    constructor(request: Request, response: Response){
        this.request = request; 
        this.response = response; 
    }

    public homepage(){
        this.response.render('pages/index'); 
    }

    public categories(){
        this.response.render('pages/categories'); 
    }

    public browseCategorie() {
        this.response.send('pages/categorie');
    }

    public browseRecette() {
        this.response.send('pages/recettes');
    }

    public error_404(){
        this.response.render('./errors/404');
    }

    public error_418(){
        this.response.render('./errors/418'); 
    }
}