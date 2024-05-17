let tags = {
    appliances: new Set(),
    ingredients: new Set(),
    ustensils: new Set()
};

let filteredRecipes = recipes;

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


        newApplianceElmt.addEventListener('click', (e) => {

            let value = e.target.innerText;
            //afficher celle ci dans un p
            let pElement = document.createElement('p');
            pElement.textContent = value;
            //et le faire apparaitre en dessous des btn de filtrage
            let containerElement = document.querySelector('.container-tag');
            containerElement.appendChild(pElement);

            tags.appliances.add(value);

            const recipeWithAppliance = getAppliance();


            showRecipes(recipeWithAppliance);
            displayTotalRecipes(recipeWithAppliance);

            const ingredients = normalizeIngredients(recipeWithAppliance);
            displayIngredientsList(ingredients);

            const ustensils = normalizeUstensils(recipeWithAppliance);
            displayUstensilsList(ustensils);

            const appliances = normalizeAppliances(recipeWithAppliance);
            displayApplianceList(appliances);




        })



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

        newUstensilElmt.addEventListener('click', (e) => {
            let value = e.target.innerText;
            //afficher celle ci dans un p
            let pElement = document.createElement('p');
            pElement.textContent = value;
            //et le faire apparaitre en dessous des btn de filtrage
            let containerElement = document.querySelector('.container-tag');
            containerElement.appendChild(pElement);

            tags.ustensils.add(value);

            const recipeWithUstensil = getUstensil();
            showRecipes(recipeWithUstensil);
            displayTotalRecipes(recipeWithUstensil);

            const ingredients = normalizeIngredients(recipeWithUstensil);
            displayIngredientsList(ingredients);

            const ustensils = normalizeUstensils(recipeWithUstensil);
            displayUstensilsList(ustensils);

            const appliances = normalizeAppliances(recipeWithUstensil);
            displayApplianceList(appliances);
        })
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

        newIngredientElmt.addEventListener('click', (e) => {
            let value = e.target.innerText;
            //afficher celle ci dans un p
            let pElement = document.createElement('p');
            pElement.textContent = value;
            //et le faire apparaitre en dessous des btn de filtrage
            let containerElement = document.querySelector('.container-tag');
            containerElement.appendChild(pElement);

            tags.ingredients.add(value);

            getIngredient();
            getAppliance();
            getUstensil();

            showRecipes(filteredRecipes);
            displayTotalRecipes(filteredRecipes);

            //je pars des recettes stocké dans mon tableau
            //je récupere la liste des ingredients
            //des appareils et ustensiles
            const ingredients = normalizeIngredients(filteredRecipes);
            displayIngredientsList(ingredients);

            const ustensils = normalizeUstensils(filteredRecipes);
            displayUstensilsList(ustensils);

            const appliances = normalizeAppliances(filteredRecipes);
            displayApplianceList(appliances);


        })
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

            let currentClass = e.target.className;

            if (currentClass.includes('item-appliance')) {
                const recipeWithAppliance = getAppliance(value);
                showRecipes(recipeWithAppliance);
                displayTotalRecipes(recipeWithAppliance);

                const ingredients = normalizeIngredients(recipeWithAppliance);
                displayIngredientsList(ingredients);

                const ustensils = normalizeUstensils(recipeWithAppliance);
                displayUstensilsList(ustensils);

                const appliances = normalizeAppliances(recipeWithAppliance);
                displayApplianceList(appliances);

            } else if (currentClass.includes('item-ustensil')) {
                const recipeWithUstensil = getUstensil(value);
                showRecipes(recipeWithUstensil);
                displayTotalRecipes(recipeWithUstensil);

                const ingredients = normalizeIngredients(recipeWithUstensil);
                displayIngredientsList(ingredients);

                const ustensils = normalizeUstensils(recipeWithUstensil);
                displayUstensilsList(ustensils);

                const appliances = normalizeAppliances(recipeWithUstensil);
                displayApplianceList(appliances);

            } else {
                const recipeWithIngredient = getIngredient(value);
                showRecipes(recipeWithIngredient);
                displayTotalRecipes(recipeWithIngredient);

                //je pars des recettes stocké dans mon tableau
                //je récupere la liste des ingredients
                //des appareils et ustensiles
                const ingredients = normalizeIngredients(recipeWithIngredient);
                displayIngredientsList(ingredients);

                const ustensils = normalizeUstensils(recipeWithIngredient);
                displayUstensilsList(ustensils);

                const appliances = normalizeAppliances(recipeWithIngredient);
                displayApplianceList(appliances);
            }

        })
    }

}

function getAppliance() {
    if (Array.from(tags.appliances).length === 0) {
        return filteredRecipes;
    }

    let newApplianceArray = [];
    for (recipe of filteredRecipes) {
        if (Array.from(tags.appliances).includes(recipe.appliance.toLowerCase())) {
            newApplianceArray.push(recipe);
        }
    }

    filteredRecipes = newApplianceArray;

    return newApplianceArray;
}

function getIngredient() {
    if (Array.from(tags.ingredients).length === 0) {
        return filteredRecipes;
    }

    let newIngredientArray = [];
    for (recipe of filteredRecipes) {
        for (ingredient of recipe.ingredients) {
            if (Array.from(tags.ingredients).includes(ingredient.ingredient.toLowerCase())) {
                newIngredientArray.push(recipe);
            }
        }
    }

    filteredRecipes = newIngredientArray;

    return newIngredientArray;
}

function getUstensil() {
    if (Array.from(tags.ustensils).length === 0) {
        return filteredRecipes;
    }

    let newUstensilArray = [];
    for (recipe of filteredRecipes) {
        for (ustensil of recipe.ustensils) {
            if (Array.from(tags.ustensils).includes(ustensil.toLowerCase())) {
                newUstensilArray.push(recipe);
            }
        }
    }

    filteredRecipes = newUstensilArray;

    return newUstensilArray;
}