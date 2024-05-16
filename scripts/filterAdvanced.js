function displayApplianceList(appliances) {
    const containerListAppliance = document.querySelector('.appliance');

    let applianceElemt = document.querySelectorAll('.appliance .item-appliance');
    for (elmt of applianceElemt) {
        elmt.remove();
    }

    for (let appliance of appliances) {
        let newApplianceElmt = document.createElement('li');
        newApplianceElmt.textContent = appliance;
        newApplianceElmt.classList.add('dropdown-item', 'item-appliance');
        containerListAppliance.appendChild(newApplianceElmt);
    }
}

function normalizeAppliances(recipes, value = "") {
    let appliances = [];
    for (let recipe of recipes) {
        if (!appliances.includes(recipe.appliance.toLowerCase()) && recipe.appliance.toLowerCase().includes(value)) {
            appliances.push(recipe.appliance.toLowerCase());
        }
    }
    return appliances;
}

function normalizeUstensils(recipes, value = "") {
    let ustensils = [];
    for (let recipe of recipes) {
        for (let ustensil of recipe.ustensils) {
            if (!ustensils.includes(ustensil.toLowerCase()) && ustensil.toLowerCase().includes(value)) {
                ustensils.push(ustensil.toLowerCase());
            }
        }
    }
    return ustensils;
}

function normalizeIngredients(recipes, value = "") {
    let ingredients = [];
    for (let recipe of recipes) {
        for (let ingredient of recipe.ingredients) {
            if (!ingredients.includes(ingredient.ingredient.toLowerCase()) && ingredient.ingredient.toLowerCase().includes(value)) {
                ingredients.push(ingredient.ingredient.toLowerCase());
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

            if (searchModel === 'search-ustensils') {
                const ustensils = normalizeUstensils(recipes, value);
                displayUstensilsList(ustensils);
            }

            if (searchModel === 'search-appliance') {
                const appliances = normalizeAppliances(recipes, value);
                displayApplianceList(appliances);
            }

            if (searchModel === 'search-ingredient') {
                const ingredients = normalizeIngredients(recipes, value);
                displayIngredientsList(ingredients);
            }

        })
    }

}

filterAdvencedWithValue();


function displayTag() {

    //function qui permet de faire apparaitre le tag
    //il faut qu'on puisse ecouter l'evenement au click sur l'item
    const itemElmt = document.querySelectorAll('.item-appliance, .item-ingredient, .item-ustensil');
    for (let item of itemElmt) {
        item.addEventListener('click', (e) => {
            // dès qu'on clique sur l'item
            //il faut récupérer la valeur
            let value = e.target.innerText;
            console.log(value);
            //afficher celle ci dans un p
            let pElement = document.createElement('p');
            pElement.textContent = value;
            //et le faire apparaitre en dessous des btn de filtrage
            let containerElement = document.querySelector('.container-tag');
            containerElement.appendChild(pElement);
            // ensuite mettre à jours la liste de recette
            //faut parcourir recipes pour ensuite comparer la valeur du tag avec les recettes et afficher
            // filtre sur recipes en créant un nouveau tableau
            // Afficher les recettes du nouveau tableau


            const recipeWithAppliance = getAppliance(value);
            const recipeWithUstensil = getUstensil(value);
            const recipeWithIngredient = getIngredient(value);

            showRecipes(recipeWithAppliance);
            displayTotalRecipes(recipeWithAppliance);

            showRecipes(recipeWithUstensil);
            displayTotalRecipes(recipeWithUstensil);

            showRecipes(recipeWithIngredient);
            displayTotalRecipes(recipeWithIngredient);

        })
    }

}

setTimeout(displayTag, 3000);

function getAppliance(value) {
    let newApplianceArray = [];
    for (recipe of recipes) {
        if (recipe.appliance.toLowerCase().includes(value.toLowerCase())) {
            newApplianceArray.push(recipe);
        }
    }
    return newApplianceArray;
}

function getIngredient(value) {
    let newIngredientArray = [];
    for (recipe of recipes) {
        for (ingredient of recipe.ingredients) {
            if (ingredient.ingredient.toLowerCase().includes(value.toLowerCase())) {
                newIngredientArray.push(recipe);
            }
        }
    }
    return newIngredientArray;
}

function getUstensil(value) {
    let newUstensilArray = [];
    for (recipe of recipes) {
        for (ustensil of recipe.ustensils) {
            if (ustensil.toLowerCase().includes(value.toLowerCase())) {
                newUstensilArray.push(recipe);
            }
        }
    }
    return newUstensilArray;
}


