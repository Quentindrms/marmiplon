import { Controller } from "../libs/Controller";
import { categories, Recipe, recipes } from "../src/data/data";

export class CategoryController extends Controller{
    private keyWords = [
        "entrees",
        "plats",
        "desserts"
    ];

    public getAllCategories(){
        const listRecipes: Array<Recipe> = [];

        recipes.forEach((recipe) => {
            listRecipes.push(recipe);
        });

        this.response.render("category", { categories: categories, category: undefined, recipes: listRecipes });
    }

    public getCategoryById(){
        const requestCategory: string = this.request.params.cat;

        const category = this.keyWords.indexOf(requestCategory) + 1;
        if(category === 0){
            this.response.render("../errors/404");
        }
        else{
            const listRecipes: Array<Recipe> = [];

            recipes.forEach((recipe) => {
                const recipeCategory: string = recipe.id.toString().charAt(0);
                if(recipeCategory === category.toString()){
                    listRecipes.push(recipe);
                }
            });

            this.response.render("category", { categories: categories, category: categories[category-1], recipes: listRecipes });
        }
    }
}