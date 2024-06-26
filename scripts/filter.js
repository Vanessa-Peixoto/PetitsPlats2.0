/**
 * @description Get recipes matching the search value
 * @param {string} searchValue 
 * @returns {Array<Object>}
 */
function getRecipes(searchValue) {
    //create new array which contains recipes
    let newRecipesArray = [];
    //loop the recipes object
    for (let i = 0; i<recipes.length; i++) {
        //compare the search value with the recipes
        if (recipes[i].name.includes(searchValue) || recipes[i].description.includes(searchValue)) {
            //add new recipe
            newRecipesArray.push(recipes[i]);
            continue;
        }
        //compare the ingredients of recipes
        for (let j = 0; j<recipes[i].ingredients.length; j++) {
            if (recipes[i].ingredients[j].ingredient.includes(searchValue)) {
                newRecipesArray.push(recipes[i]);
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
    if (searchValue.length >= 3) {
        displayBtnClose();
        filteredRecipes = getRecipes(searchValue);
        displayRecipes(filteredRecipes, searchValue);
        updateItemList();
        displayFullList();
    }
    else if (searchValue.length === 0) {
        resetData()
    }
}

/**
 * @description Display btn close in the input
 */
function displayBtnClose() {
    const btn = document.querySelector('.btn-close');
    btn.style.display = 'block';
}

/**
 * @description  close the btn and reset the value in the main search
 * @param {Event} e 
 */
function closeBtnSearch(e) {
    e.preventDefault();
    const btn = document.querySelector('.btn-close');
    btn.style.display = 'none';

    const searchInputValue = document.querySelector('#main-search');
    searchInputValue.value = '';

    resetData();
}

/**
 * @description Reset all data
 */
function resetData() {
    displayRecipes(recipes);
    filteredRecipes = recipes;
    updateItemList();
    displayFullList();
}

const searchInput = document.getElementById('main-search');
searchInput.addEventListener('input', initSearch);

const btn = document.querySelector('.btn-close');
btn.addEventListener('click', closeBtnSearch);

