/**
 * @description Show all recipes in the section
 * @param {Array<Object>} recipes 
 */
function showRecipes(recipes) {
    const recipesCardSection = document.querySelector('.container-card');
    recipesCardSection.innerHTML = '';

    recipes.forEach((recipe) => {
        const recipesModel = recipesTemplate(recipe);
        const recipesCard = recipesModel.createCardRecipe();

        recipesCardSection.appendChild(recipesCard);
    })
}

/**
 * @description Display the total number of recipes in the section
 * @param {Array<Object>} recipes 
 */
function displayTotalRecipes(recipes) {
    let totalRecipes = document.querySelector('.container-main-title h6');
    totalRecipes.innerHTML = recipes.length + ' recettes';
}

/**
 * @description init function
 */
function init() {
    showRecipes(recipes);
    displayTotalRecipes(recipes);
    displayApplianceList(recipes);
    displayUstensilsList(recipes);
    displayIngredientsList(recipes)
}

init()