(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
})((function () { 'use strict';

    const addIngredient = document.getElementById("add-ingredient");
    const addStep = document.getElementById("add-step");
    function createDeleteLineButton() {
        const buttonDelete = document.createElement("button");
        buttonDelete.type = "button";
        buttonDelete.innerText = "-";
        buttonDelete.addEventListener("click", (event) => {
            var _a;
            if (event.target instanceof HTMLElement) {
                (_a = event.target.parentElement) === null || _a === void 0 ? void 0 : _a.remove();
            }
        });
        return buttonDelete;
    }
    function addIngredientLine() {
        if (addIngredient) {
            const divLine = document.createElement("div");
            const nodeIngredientName = document.getElementById("recipe-ingredients-name");
            const nodeIngredientUnit = document.getElementById("recipe-ingredients-unit");
            if (nodeIngredientName && nodeIngredientUnit) {
                const newNodeIngredientName = nodeIngredientName.cloneNode(true);
                const input = document.createElement("input");
                input.name = "recipeIngredientsQuantity";
                input.type = "text";
                const newNodeIngredientUnit = nodeIngredientUnit.cloneNode(true);
                const buttonDelete = createDeleteLineButton();
                divLine.append(newNodeIngredientName, input, newNodeIngredientUnit, buttonDelete);
            }
            addIngredient.before(divLine);
        }
    }
    if (addIngredient) {
        addIngredient.addEventListener("click", addIngredientLine);
    }
    function addStepLine() {
        if (addStep) {
            const divLine = document.createElement("div");
            const textArea = document.createElement("textarea");
            textArea.name = "recipeStep";
            const buttonDelete = createDeleteLineButton();
            divLine.append(textArea, buttonDelete);
            addStep.before(divLine);
        }
    }
    if (addStep) {
        addStep.addEventListener("click", addStepLine);
    }

}));
//# sourceMappingURL=addRecipeFunctionality.js.map
