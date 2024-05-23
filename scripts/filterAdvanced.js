let tags = {
    appliances: new Set(),
    ingredients: new Set(),
    ustensils: new Set()
};

let filteredRecipes = recipes;

function displayApplianceList(appliances) {
    const containerListAppliance = document.querySelector('.appliance');
    clearList(containerListAppliance, '.item-appliance');

    for (let appliance of appliances) {
        let newApplianceElmt = document.createElement('li');
        newApplianceElmt.textContent = appliance;
        newApplianceElmt.classList.add('dropdown-item', 'item-appliance');
        containerListAppliance.appendChild(newApplianceElmt);


        newApplianceElmt.addEventListener('click', (e) => {

            let value = e.target.innerText;
            //afficher celle ci dans un p
            let div = document.createElement('div');
            div.classList.add('tag-appliance');

            let pElement = document.createElement('p');
            pElement.textContent = value;

            let btn = document.createElement('button');
            btn.classList.add('close-tag', 'fa-solid', 'fa-xmark');

            div.appendChild(pElement);
            div.appendChild(btn);

            let containerElement = document.querySelector('.container-tag');
            containerElement.appendChild(div);

            btn.addEventListener('click', closeTag);

            tags.appliances.add(value);


            filteredRecipes = recipes;

            getIngredient();
            getAppliance();
            getUstensil();

            showRecipes(filteredRecipes);
            displayTotalRecipes(filteredRecipes);



            const ingredients = normalizeIngredients(filteredRecipes);
            displayIngredientsList(ingredients.filter((ingredient) => !Array.from(tags.ingredients).includes(ingredient)));

            const ustensils = normalizeUstensils(filteredRecipes);
            displayUstensilsList(ustensils.filter((ustensil) => !Array.from(tags.ustensils).includes(ustensil)));

            const appliances = normalizeAppliances(filteredRecipes);
            displayApplianceList(appliances.filter((appliance) => !Array.from(tags.appliances).includes(appliance)));
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
    clearList(containerListUstensils, '.item-ustensil');

    for (ustensil of ustensils) {

        let newUstensilElmt = document.createElement('li');
        newUstensilElmt.textContent = ustensil;
        newUstensilElmt.classList.add('dropdown-item', 'item-ustensil');
        containerListUstensils.appendChild(newUstensilElmt);

        newUstensilElmt.addEventListener('click', (e) => {

            let value = e.target.innerText;

            let div = document.createElement('div');
            div.classList.add('tag-ustensil');

            let pElement = document.createElement('p');
            pElement.textContent = value;

            let btn = document.createElement('button');
            btn.classList.add('close-tag', 'fa-solid', 'fa-xmark');

            div.appendChild(pElement);
            div.appendChild(btn);

            let containerElement = document.querySelector('.container-tag');
            containerElement.appendChild(div);

            btn.addEventListener('click', closeTag);

            tags.ustensils.add(value);

            filteredRecipes = recipes;

            getIngredient();
            getAppliance();
            getUstensil();

            showRecipes(filteredRecipes);
            displayTotalRecipes(filteredRecipes);

            const ingredients = normalizeIngredients(filteredRecipes);
            displayIngredientsList(ingredients.filter((ingredient) => !Array.from(tags.ingredients).includes(ingredient)));

            const ustensils = normalizeUstensils(filteredRecipes);
            displayUstensilsList(ustensils.filter((ustensil) => !Array.from(tags.ustensils).includes(ustensil)));

            const appliances = normalizeAppliances(filteredRecipes);
            displayApplianceList(appliances.filter((appliance) => !Array.from(tags.appliances).includes(appliance)));
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


            let div = document.createElement('div');
            div.classList.add('tag-ingredient');

            let pElement = document.createElement('p');
            pElement.textContent = value;

            let btn = document.createElement('button');
            btn.classList.add('close-tag', 'fa-solid', 'fa-xmark');

            div.appendChild(pElement);
            div.appendChild(btn);

            let containerElement = document.querySelector('.container-tag');
            containerElement.appendChild(div);

            btn.addEventListener('click', closeTag);

            tags.ingredients.add(value);

            filteredRecipes = recipes;

            getIngredient();
            getAppliance();
            getUstensil();

            showRecipes(filteredRecipes);
            displayTotalRecipes(filteredRecipes);

            //je pars des recettes stocké dans mon tableau
            //je récupere la liste des ingredients
            //des appareils et ustensiles
            const ingredients = normalizeIngredients(filteredRecipes);
            displayIngredientsList(ingredients.filter((ingredient) => !Array.from(tags.ingredients).includes(ingredient)));

            const ustensils = normalizeUstensils(filteredRecipes);
            displayUstensilsList(ustensils.filter((ustensil) => !Array.from(tags.ustensils).includes(ustensil)));

            const appliances = normalizeAppliances(filteredRecipes);
            displayApplianceList(appliances.filter((appliance) => !Array.from(tags.appliances).includes(appliance)));
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
        let canBeAdded = true;
        for (let tag of Array.from(tags.ingredients)) {
            let ingredients = normalizeIngredients([recipe]);

            if (!ingredients.includes(tag)) {
                canBeAdded = false;
            }
        }

        if (canBeAdded) {
            newIngredientArray.push(recipe);
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
        let canBeAdded = true;
        for (tag of Array.from(tags.ustensils)) {
            let ustensils = normalizeUstensils([recipe]);
            if (!ustensils.includes(tag)) {
                canBeAdded = false;
            }
        }

        if (canBeAdded) {
            newUstensilArray.push(recipe);
        }
    }
    filteredRecipes = newUstensilArray;

    return newUstensilArray;
}

function closeTag(e) {
    // A partir de l'element button je récupère le texte de mon tag (lait de coco)
    const buttonElement = e.target;
    let pElement = buttonElement.previousElementSibling;

    let tag = pElement.textContent;
    console.log(tag);


    // Récupérer l'element parent et vérifier que c'est un tag ingrédient
    // Si oui :
    const containerTag = buttonElement.closest('div');

    // Data handling
    switch (containerTag.className) {
        case 'tag-ingredient':
            tags.ingredients.delete(tag);
            break;
        case 'tag-appliance':
            tags.appliances.delete(tag);
            break;
        case 'tag-ustensil':
            tags.ustensils.delete(tag);
            break;
    }

    containerTag.remove();

    const searchValue = document.getElementById('main-search');
    filteredRecipes = getRecipes(searchValue.value);

    getIngredient();
    getAppliance();
    getUstensil();

    showRecipes(filteredRecipes);
    displayTotalRecipes(filteredRecipes);

    //je pars des recettes stocké dans mon tableau
    //je récupere la liste des ingredients
    //des appareils et ustensiles
    const ingredients = normalizeIngredients(filteredRecipes);
    displayIngredientsList(ingredients.filter((ingredient) => !Array.from(tags.ingredients).includes(ingredient)));

    const ustensils = normalizeUstensils(filteredRecipes);
    displayUstensilsList(ustensils.filter((ustensil) => !Array.from(tags.ustensils).includes(ustensil)));

    const appliances = normalizeAppliances(filteredRecipes);
    displayApplianceList(appliances.filter((appliance) => !Array.from(tags.appliances).includes(appliance)));
}



function clearList(container, item) {
    let elements = container.querySelectorAll(item);
    for (let elmt of elements) {
        elmt.remove();
    }
}


