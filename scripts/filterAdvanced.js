function searchByAppliance(searchValue) {
    getRecipes(searchValue)
    displayApplianceList()
}

function displayApplianceList(recipes) {
    const containerListAppliance = document.querySelector('.appliance');
    let newListAppliance = new Set();

    for (recipe of recipes) {
        if (!newListAppliance.has(recipe.appliance)) {
            let newApplianceElmt = document.createElement('li');
            newApplianceElmt.textContent = recipe.appliance;
            newApplianceElmt.classList.add('dropdown-item');
            containerListAppliance.appendChild(newApplianceElmt);
            newListAppliance.add(recipe.appliance);
        }
    }
}

function displayUstensilsList(recipes) {
    const containerListUstensils = document.querySelector('.ustensils');
    let newListUstensils = [];

    for (recipe of recipes) {
        for (ustensil of recipe.ustensils) {
            if (!newListUstensils.includes(ustensil)) {

                let newUstensilElmt = document.createElement('li');
                newUstensilElmt.textContent = ustensil;
                newUstensilElmt.classList.add('dropdown-item');
                containerListUstensils.appendChild(newUstensilElmt);
                newListUstensils.push(ustensil);
            }
        }
    }
}

function displayIngredientsList(recipes) {
    const containerListIngredients = document.querySelector('.ingredients');
    let newListIngredients = [];

    for (recipe of recipes) {
        for (ingredient of recipe.ingredients) {

            let ingredientName = ingredient.ingredient

            if (!newListIngredients.includes(ingredientName)) {

                let newIngredientElmt = document.createElement('li');
                newIngredientElmt.textContent = ingredientName;
                newIngredientElmt.classList.add('dropdown-item');
                containerListIngredients.appendChild(newIngredientElmt);
                newListIngredients.push(ingredientName);
            }
        }
    }
}