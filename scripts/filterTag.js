/**
 * @description Create global variable which instantiates tags based on the items
 */
let tags = {
    appliances: new Set(),
    ingredients: new Set(),
    ustensils: new Set()
};

/**
 * @description Create tag element
 * @param {string} tagNameClass 
 * @param {string} value 
 * @param {string} tagType 
 */
function addTag(tagNameClass, value, tagType) {

    //Create HTML element
    let div = document.createElement('div');
    div.classList.add(tagNameClass);

    let pElement = document.createElement('p');
    pElement.textContent = value;

    let btn = document.createElement('button');
    btn.classList.add('close-tag', 'fa-solid', 'fa-xmark');

    div.appendChild(pElement);
    div.appendChild(btn);

    let containerElement = document.querySelector('.container-tag');
    containerElement.appendChild(div);

    //Add event listener in the btn to call the function closeTag
    btn.addEventListener('click', closeTag);

    //Add the value in the right tag type object
    tags[tagType].add(value);

    //Call the function updateFilteredRecipes to update the data
    updateFilteredRecipes();
}

/**
 * @description Filter the recipes based on the selected tags
 * @returns {Array} Filtered recipes
 */
function updateFromTags() {
    return filteredRecipes.filter((recipe) => {
        //If there are no tags selected in ingredients
        //size return the number of element in the object ingredient
        if (tags.ingredients.size === 0) {
            //return all recipes
            return true;
        }
        //create variable which collect all the ingredients in my data file
        const ingredients = recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase());
        //thanks to intersection, we cross the selected tags with what is in the recipe
        //
        return tags.ingredients.intersection(new Set(ingredients)).size === tags.ingredients.size;
    })
        .filter((recipe) => {
            if (tags.appliances.size === 0) {
                return true;
            }
            const appliance = recipe.appliance.toLowerCase();
            return tags.appliances.intersection(new Set([appliance])).size === tags.appliances.size;
        })
        .filter((recipe) => {
            if (tags.ustensils.size === 0) {
                return true;
            }
            const ustensils = recipe.ustensils.map(ustensil => ustensil.toLowerCase());
            return tags.ustensils.intersection(new Set(ustensils)).size === tags.ustensils.size;
        });
}

/**
 * @description Remove the tag from the DOM
 * @param {Event} e 
 */
function closeTag(e) {
    //I retrieve the text of my tag from the btn element
    const buttonElement = e.target;
    //PreviousElementSibling allow access to the p element
    let pElement = buttonElement.previousElementSibling;
    let tag = pElement.textContent;


    //Retrieve the parent element
    const containerTag = buttonElement.closest('div');

    //Data handling
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

    updateFilteredRecipes();
}