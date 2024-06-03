/**
 * @description Create global variable which contains the information of our items
 */
const domType = {
    appliances: {
        container: 'appliance',
        itemClassName: 'item-appliance',
        tagClass: 'tag-appliance',
        tagType: 'appliances'
    },
    ingredients: {
        container: 'ingredients',
        itemClassName: 'item-ingredient',
        tagClass: 'tag-ingredient',
        tagType: 'ingredients'
    },
    ustensils: {
        container: 'ustensils',
        itemClassName: 'item-ustensil',
        tagClass: 'tag-ustensil',
        tagType: 'ustensils'
    },
};

/**
 * @description Global variable who retrieves the recipes object
 */
let filteredRecipes = recipes;

/**
 * @description Filter the list based on a search value
 * @param {string} type 
 * @param {string} value 
 * @returns {Array<string>}
 */
function filterListFromSearch(type, value = "") {
    //return new array with the filtered list depending on the value
    return Array.from(itemsList[type]).filter((val) => val.toLowerCase().includes(value.toLowerCase()));
}

/**
 * @description Filter and display the list of items
 */
function filterAdvencedWithValue() {

    const searchItemOfFilteredButton = document.querySelectorAll('.search-item');
    for (let item of searchItemOfFilteredButton) {
        //add listener for the searchbar to recover the value
        item.addEventListener('input', (e) => {
            const value = e.target.value.toLowerCase();
            const searchModel = e.target.dataset.set;

            //return all list
            if (value.length < 3 && value.length > 0) {
                return;
            }

            updateItemList();

            if (searchModel === 'search-ustensils') {
                displayList('ustensils', filterListFromSearch('ustensils', value));
            }

            if (searchModel === 'search-appliance') {
                displayList('appliances', filterListFromSearch('appliances', value));
            }

            if (searchModel === 'search-ingredient') {
                displayList('ingredients', filterListFromSearch('ingredients', value))
            }
        })
    }
}

filterAdvencedWithValue();

/**
 * @description Update the recipe based on the main search and tags
 */
function updateFilteredRecipes() {

    const searchValue = document.getElementById('main-search');
    //recover the recipe with the value in the main search 
    filteredRecipes = getRecipes(searchValue.value);

    //recover the recipe if tag are selected
    filteredRecipes = updateFromTags();
    
    
    //update the list of items depending of the filtered recipes
    updateItemList();

    //display the recipes
    showRecipes(filteredRecipes);
    displayTotalRecipes(filteredRecipes);

    //display the list of items available in recipes
    displayFullList();
}