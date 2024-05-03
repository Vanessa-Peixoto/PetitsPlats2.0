
function getRecipes(searchValue) {

    //je créer un nouveau tableau qui va contenir mes recettes trié
    let newRecipesArray = [];
    //je boucle sur mon objet recette
    for (recipe of recipes) {
        //je regarde si la valeur est en partie présente dans le titre
        if (recipe.name.includes(searchValue) || recipe.description.includes(searchValue)) {
            //je met la recette dans le nouveau tableau
            newRecipesArray.push(recipe);
            continue;
        }

        //je check pour les ingrédients
        for (ingredient of recipe.ingredients) {
            if (ingredient.ingredient.includes(searchValue)) {
                newRecipesArray.push(recipe);
                break;
            }
        }
    }
    console.log(newRecipesArray);
    return newRecipesArray;
}

function displayRecipes(recipes, searchValue) {
    if(recipes.length === 0) {
        let message = document.createElement('p');
        message.textContent = 'Aucune recette ne contient ' + searchValue + ' vous pouvez chercher "tarte aux pommes", "poisson", ect';

        let container = document.querySelector('.container-card');
        container.innerHTML = '';
        container.appendChild(message);
    }

    showRecipes(recipes);
    displayTotalRecipes(recipes);
}

function init(e) {
    let searchValue = e.target.value;
    if (searchValue.length > 3) {
        let filteredRecipes = getRecipes(searchValue);
        displayRecipes(filteredRecipes, searchValue);
    }
}





const searchInput = document.getElementById('main-search');
searchInput.addEventListener('change', init);


