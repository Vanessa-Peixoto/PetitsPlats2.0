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
        //return if every ingredients in tag are present in recipe
        return Array.from(tags.ingredients).every((ingredient) => ingredients.includes(ingredient));
    })
        .filter((recipe) => {
            if (tags.appliances.size === 0) {
                return true;
            }
            const appliances = recipe.appliance.toLowerCase();
            return Array.from(tags.appliances).every((appliance) => appliances.includes(appliance));
        })
        .filter((recipe) => {
            if (tags.ustensils.size === 0) {
                return true;
            }
            const ustensils = recipe.ustensils.map(ustensil => ustensil.toLowerCase());
            return Array.from(tags.ustensils).every((ustensil) => ustensils.includes(ustensil));
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