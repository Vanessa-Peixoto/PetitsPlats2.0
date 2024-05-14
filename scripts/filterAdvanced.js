function displayApplianceList(recipes) {
    const containerListAppliance = document.querySelector('.appliance');

    let applianceElemt = document.querySelectorAll('.appliance .item-appliance');
    for (elmt of applianceElemt) {
        elmt.remove();
    }

    let newListAppliance = new Set();

    for (recipe of recipes) {
        if (!newListAppliance.has(recipe.appliance)) {
            let newApplianceElmt = document.createElement('li');
            newApplianceElmt.textContent = recipe.appliance;
            newApplianceElmt.classList.add('dropdown-item', 'item-appliance');
            containerListAppliance.appendChild(newApplianceElmt);
            newListAppliance.add(recipe.appliance);
        }
    }
}

function normalizeUstensils(recipes) {

    let ustensils = [];
    for (recipe of recipes) {
        for (ustensil of recipe.ustensils) {
            if (!ustensils.includes(ustensil.toLowerCase())) {
                ustensils.push(ustensil.toLowerCase());
            }
        }
    }
    console.log(ustensils)
    return ustensils
}

function normalizeIngredients(recipes) {
    let ingredients = [];
    for (recipe of recipes) {
        for (ingredient of recipe.ingredients) {
            if (!ingredients.includes(ingredient.ingredient.toLowerCase())) {
                ingredients.push(ingredient.ingredient.toLowerCase())
            }
        }
    }
    return ingredients;
}

function displayUstensilsList(ustensils) {
    const containerListUstensils = document.querySelector('.ustensils');

    let ustensilElemt = document.querySelectorAll('.ustensils .item-ustensil');
    for (elmt of ustensilElemt) {
        elmt.remove();
    }

    for (ustensil of ustensils) {

        let newUstensilElmt = document.createElement('li');
        newUstensilElmt.textContent = ustensil;
        newUstensilElmt.classList.add('dropdown-item', 'item-ustensil');
        containerListUstensils.appendChild(newUstensilElmt);
    }
}

function displayIngredientsList(ingredients) {
    const containerListIngredients = document.querySelector('.ingredients');

    let ingredientElemt = document.querySelectorAll('.ingredients .item-ingredient');
    for (elmt of ingredientElemt) {
        elmt.remove();
    }


    for (ingredient of ingredients) {

        let newIngredientElmt = document.createElement('li');
        newIngredientElmt.textContent = ingredient;
        newIngredientElmt.classList.add('dropdown-item', 'item-ingredient');
        containerListIngredients.appendChild(newIngredientElmt);
    }
}

function filterAdvencedWithValue() {

    const searchItemOfFilteredButton = document.querySelectorAll('.search-item');
    for (let item of searchItemOfFilteredButton) {
        item.addEventListener('input', (e) => {
            const value = e.target.value.toLowerCase();
            const searchModel = e.target.dataset.set;

            if (value.length < 3 && value.length > 0) {
                return;
            }

            let newFilterArray = [];
            for (recipe of recipes) {
                if (searchModel === 'search-appliance' && recipe.appliance.toLowerCase().includes(value)) {
                    if (!newFilterArray.includes(value)) {
                        newFilterArray.push(recipe);
                    }
                    continue
                }
                if (searchModel === 'search-ustensils' && recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(value))) {
                    const ustensilFiltered = recipe.ustensils.filter((ustensil) => ustensil.includes(value));
                    for (ustensil of ustensilFiltered) {
                        if (!newFilterArray.includes(ustensil.toLowerCase())) {
                            newFilterArray.push(ustensil.toLowerCase());
                        }
                    }

                    continue
                }
                if (searchModel === 'search-ingredient' && recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(value))) {
                    const ingredientFiltered = recipe.ingredients.filter((ingredient) => ingredient.ingredient.toLowerCase().includes(value));
                    for (ingredientObj of ingredientFiltered) {
                        if (!newFilterArray.includes(ingredientObj.ingredient.toLowerCase())) {
                            newFilterArray.push(ingredientObj.ingredient.toLowerCase());
                        }
                    }

                    continue
                }
            }
            if (searchModel === 'search-ustensils') {
                displayUstensilsList(newFilterArray);
            }

            if (searchModel === 'search-appliance') {
                displayApplianceList(newFilterArray);
            }

            if (searchModel === 'search-ingredient') {
                displayIngredientsList(newFilterArray);
            }

        })
    }

}

filterAdvencedWithValue();

