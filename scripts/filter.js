/**
 * @description Get recipes matching the search value
 * @param {string} searchValue 
 * @returns {Array<Object>}
 */
function getRecipes(searchValue) {
    //create new array which contains recipes
    let newRecipesArray = [];
    //loop the recipes object
    for (recipe of recipes) {
        //compare the search value with the recipes
        if (recipe.name.includes(searchValue) || recipe.description.includes(searchValue)) {
            //add new recipe
            newRecipesArray.push(recipe);
            continue;
        }
        //compare the ingredients of recipes
        for (ingredient of recipe.ingredients) {
            if (ingredient.ingredient.includes(searchValue)) {
                newRecipesArray.push(recipe);
                break;
            }
        }
    }
    return newRecipesArray;
}
/**
 * @description Show the recipes in the section
 * @param {Array<Object>} recipes 
 * @param {string} searchValue 
 */
function displayRecipes(recipes, searchValue) {
    //if the recipe don't exist
    if (recipes.length === 0) {
        let message = document.createElement('p');
        message.textContent = 'Aucune recette ne contient ' + searchValue + ' vous pouvez chercher "tarte aux pommes", "poisson", ect';

        let container = document.querySelector('.container-card');
        container.innerHTML = '';
        container.appendChild(message);
    } else {
        showRecipes(recipes);
    }
    displayTotalRecipes(recipes);
}

/**
 * @description Function called when a user enters a value in the search bar
 * @param {Event} e 
 */
function initSearch(e) {
    let searchValue = e.target.value;
    if (searchValue.length > 3) {
        filteredRecipes = getRecipes(searchValue);
        displayRecipes(filteredRecipes, searchValue);
        updateItemList();
        displayFullList();
    }
    else if (searchValue.length === 0) {
        displayRecipes(recipes);
    }
}

const searchInput = document.getElementById('main-search');
searchInput.addEventListener('input', initSearch);