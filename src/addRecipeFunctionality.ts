const addIngredient: HTMLElement | null = document.getElementById("add-ingredient");
const addStep: HTMLElement | null = document.getElementById("add-step");

function createDeleteLineButton(): HTMLButtonElement {
    const buttonDelete : HTMLButtonElement = document.createElement("button");
    buttonDelete.type = "button";
    buttonDelete.innerText = "-";

    buttonDelete.addEventListener("click", (event) => {
        if (event.target instanceof HTMLElement){
            event.target.parentElement?.remove();
        }
    });

    return buttonDelete;
}

function addIngredientLine(){
    if(addIngredient){
        const divLine : HTMLDivElement = document.createElement("div");
        const nodeIngredientName = document.getElementById("recipe-ingredients-name");
        const nodeIngredientUnit = document.getElementById("recipe-ingredients-unit");

        if(nodeIngredientName && nodeIngredientUnit){
            const newNodeIngredientName : Node = nodeIngredientName.cloneNode(true);

            const input: HTMLInputElement = document.createElement("input");
            input.name = "recipeIngredientsQuantity";
            input.type = "text";

            const newNodeIngredientUnit: Node = nodeIngredientUnit.cloneNode(true);

            const buttonDelete : HTMLButtonElement = createDeleteLineButton();

            divLine.append(newNodeIngredientName, input, newNodeIngredientUnit, buttonDelete);
        }
        
        addIngredient.before(divLine);
    }
}

if(addIngredient){
    addIngredient.addEventListener("click", addIngredientLine);
}

function addStepLine(){
    if(addStep){
        const divLine : HTMLDivElement = document.createElement("div");

        const textArea :HTMLTextAreaElement = document.createElement("textarea");
        textArea.name = "recipeStep";

        const buttonDelete : HTMLButtonElement = createDeleteLineButton();

        divLine.append(textArea, buttonDelete);
        addStep.before(divLine);
    }
}

if(addStep){
    addStep.addEventListener("click", addStepLine);
}