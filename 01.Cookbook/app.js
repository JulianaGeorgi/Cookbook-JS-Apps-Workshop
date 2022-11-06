
async function getRecipes() {
    const response = await fetch('http://localhost:3030/jsonstore/cookbook/recipes'); // promise
    const recipes = await response.json(); // promise

    return Object.values(recipes); // img: "assets/lasagna.jpg",  name: "Recipe 1", _id: "01
}

async function loadSelectedRecipe(id) {
    const response = await fetch(`http://localhost:3030/jsonstore/cookbook/details/${id}`);
    return await response.json(); // we receive an object with the _id of the recipe, name, img, steps, ingredients
}

window.addEventListener('load', async () => { // When the app is started, you need to load all the recipes from the server
    const main = document.querySelector('main');
    main.innerHTML = ''; // removing the text that says "Loading..."

    const recipes = await getRecipes();
    const cards = recipes.map(createCard);
    cards.forEach(c => main.appendChild(c));
});

function createCard(recipe) {
    const card =
        e('article', { className: 'preview', onClick: toggleCard },
            e('div', { className: 'title' }, e('h2', {}, recipe.name)),
            e('div', { className: 'small' }, e('img', { src: recipe.img }))
        );

    return card;

    async function toggleCard() {
        const toggledRecipe = await loadSelectedRecipe(recipe._id);
        card.replaceWith(createToggledCard(toggledRecipe));
    }
}

function createToggledCard(card) {
    const toggledCard =
        e('article', {},
            e('h2', {}, card.name),
            e('div', { className: 'band' },
                e('div', { className: 'thumb' },
                    e('img', { src: card.img })),
                e('div', { className: 'ingredients' },
                    e('h3', {}, 'Ingredients:'),
                    e('ul', {}, card.ingredients.map(i => e('li', {}, i)))
                )
            ),
            e('div', { className: 'description' },
                e('h3', {}, 'Preparation:'),
                card.steps.map(s => e('p', {}, s))
            )
        );

    return toggledCard;
}

function e(type, attributes, ...content) {
    const result = document.createElement(type);

    for (let [attr, value] of Object.entries(attributes || {})) {
        if (attr.substring(0, 2) == 'on') {
            result.addEventListener(attr.substring(2).toLocaleLowerCase(), value);
        } else {
            result[attr] = value;
        }
    }

    content = content.reduce((a, c) => a.concat(Array.isArray(c) ? c : [c]), []);

    content.forEach(e => {
        if (typeof e == 'string' || typeof e == 'number') {
            const node = document.createTextNode(e);
            result.appendChild(node);
        } else {
            result.appendChild(e);
        }
    });
    console.log(result);
    return result;
}