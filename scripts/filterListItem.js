/**
 * @description Global variable which transform my items into array of string
 */
let itemsList = {
    appliances: new Set(recipes.map(recipe => recipe.appliance.toLowerCase())),
    ingredients: new Set(recipes.flatMap(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase()))),
    ustensils: new Set(recipes.flatMap(recipe => recipe.ustensils.map(ustensil => ustensil.toLowerCase())))
};

/**
 * @description Display list 
 * @param {string} type 
 * @param {*} list 
 */
function displayList(type, list) {
    const domElement = domType[type];
    const containerElement = document.querySelector(`.${domElement.container}`);
    //call the function clearList for remove all item in the list
    clearList(containerElement, domElement.itemClassName);

    //use the right source
    if (!list) {
        list = itemsList[type];
    }

    //call the function addListItem to add new items in the list
    addListItem(containerElement, list, domElement.itemClassName, domElement.tagClass, domElement.tagType);
}

/**
 * @description Display list of items
 */
function displayFullList() {
    displayList('appliances');
    displayList('ingredients');
    displayList('ustensils');
}

/**
 * @description Update the list of items based on filtered recipes
 * @returns {Object}
 */
function updateItemList() {

    itemsList = {
        //instantiate new object
        appliances: new Set(
            //use map for create new array with the name of appliance 
            filteredRecipes.map(recipe => recipe.appliance.toLowerCase())
                //filter appliance object to verify if tag is selected
                .filter((appliance) => !Array.from(tags.appliances).includes(appliance))
        ),
        ingredients: new Set(
            //flatMap used to transform each element and flatten the result into an array
            filteredRecipes.flatMap(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase())
                .filter((ingredient) => !Array.from(tags.ingredients).includes(ingredient)))),
        ustensils: new Set(
            filteredRecipes.flatMap(recipe => recipe.ustensils.map(ustensil => ustensil.toLowerCase()))
                .filter((ustensil) => !Array.from(tags.ustensils).includes(ustensil)))
    };
    return itemsList;
}

/**
 * @description Remove element in the list
 * @param {HTMLElement} container 
 * @param {string} className 
 */
function clearList(container, className) {
    let elements = container.querySelectorAll(`.${className}`);
    for (let elmt of elements) {
        elmt.remove();
    }
}

/**
 * @description Create li HTML element
 * @param {HTMLElement} container 
 * @param {Array<string>} items 
 * @param {string} itemNameClass 
 * @param {string} tagNameClass 
 * @param {string} tagType 
 */
function addListItem(container, items, itemNameClass, tagNameClass, tagType) {
    for (let item of items) {
        //create the element
        let newElement = document.createElement('li');
        newElement.textContent = item;
        newElement.classList.add('dropdown-item', itemNameClass);
        container.appendChild(newElement);

        //add listener in the new element to call the function addTag
        newElement.addEventListener('click', (e) => {
            let value = e.target.innerText;
            addTag(tagNameClass, value, tagType);
        })
    }
}