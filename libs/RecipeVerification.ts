import { categories, ingredients } from "../src/data/data";

class RecipeVerification{
    public static isNotValidString(myData: any): boolean{
        return !myData || (typeof myData === "string" && myData === "");
    }

    public static isNotValidCategory(myData: any): boolean{
        return !myData || (typeof myData === "string" && categories.find(category => { return category.name === myData }) === undefined)
    }

    public static isNotValidIngredientName(myData: any): boolean{
        if(!myData){
            return true;
        }
        if(typeof myData === "string"){
            myData = [myData];
        }
        for (const name of myData) {
            if(ingredients.find(ingredient => { return ingredient.name === name }) === undefined){
                return true;
            }
        }

        return false;
    }

    public static isNotValidIngredientQuantity(myData: any): boolean{
        if(!myData){
            return true;
        }
        if(typeof myData === "string"){
            myData = [myData];
        }
        for (const quantity of myData) {
            if (!/^[0-9.]+$/.test(quantity)) {
                return true;
            }
        }

        return false;
    }

    public static isNotValidStringArray(myData: any): boolean{
        if(!myData){
            return true;
        }
        if(typeof myData === "string"){
            myData = [myData];
        }
        for (const str of myData) {
            if (str === "") {
                return true;
            }
        }

        return false;
    }
}

export default RecipeVerification;