/**
 * @description Create card recipe based on data
 * @param {Object} data 
 * @returns {Object}
 */
function recipesTemplate(data) {

    const { id, image, name, ingredients, time, description } = data;
    const picture = `images/${image}`;

    function createCardRecipe() {
        //create article
        const card = document.createElement('article');
        card.classList.add('card');

        const imgElmt = document.createElement('img');
        imgElmt.setAttribute("src", picture);
        imgElmt.alt = 'Recette de ' + name;
        imgElmt.classList.add('card-img-top');

        const timerElmt = document.createElement('span');
        timerElmt.textContent = time + 'min';
        timerElmt.classList.add('card-tag');

        const bodyCard = document.createElement('div');
        bodyCard.classList.add('card-body');

        const titleElmt = document.createElement('h5');
        titleElmt.textContent = name;
        titleElmt.classList.add('card-title');

        const subtitleElmt = document.createElement('h6');
        subtitleElmt.textContent = 'Recette';
        subtitleElmt.classList.add('card-subtitle', 'mb-2');

        const descriptionElmt = document.createElement('p');
        descriptionElmt.textContent = description;
        descriptionElmt.classList.add('card-text');

        const subtitleElmt2 = document.createElement('h6');
        subtitleElmt2.textContent = 'Ingrédients';
        subtitleElmt2.classList.add('card-subtitle', 'mb-2');

        const listIngredientElmt = document.createElement('div');
        listIngredientElmt.classList.add('list-group', 'list-group-flush');

        ingredients.forEach((ingredient) => {
            let containerListIngredient = document.createElement('ul');
            let newIngredient = document.createElement('li');
            newIngredient.textContent = ingredient.ingredient;
            newIngredient.classList.add('list-group-item');

            let newIngredientQuantity = null;

            if (ingredient.quantity || ingredient.unit) {
                newIngredientQuantity = document.createElement('li');

                if (ingredient.quantity) {
                    newIngredientQuantity.textContent = ingredient.quantity;
                }
                if (ingredient.unit) {
                    newIngredientQuantity.textContent += ingredient.unit;
                }
                newIngredientQuantity.classList.add('list-group-item');
            }

            containerListIngredient.appendChild(newIngredient);
            if (newIngredientQuantity) {
                containerListIngredient.appendChild(newIngredientQuantity);
            }
            listIngredientElmt.appendChild(containerListIngredient);
        })

        card.appendChild(imgElmt);
        card.appendChild(timerElmt);

        bodyCard.appendChild(titleElmt);
        bodyCard.appendChild(subtitleElmt);
        bodyCard.appendChild(descriptionElmt);
        bodyCard.appendChild(subtitleElmt2);
        bodyCard.appendChild(listIngredientElmt);

        card.appendChild(bodyCard);

        return card;
    }
    return { id, name, picture, ingredients, description, time, createCardRecipe }
}