document.addEventListener('DOMContentLoaded', searchCocktail);

document.querySelector('.search').addEventListener('click', searchCocktail);

document.querySelector('.random').addEventListener('click',randomanizer)

document.querySelector('.firstLetter').addEventListener('click',byFirstLetter)

// for the regular seach using cocktail name

function searchCocktail() {
	const cocktail = document.querySelector('input').value;

	resetDOM();

	fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktail}`)
		.then((res) => res.json())
		.then((data) => {
			const drinks = data.drinks;
			console.log(drinks);

			drinks.forEach((drink) => {
				console.log(drink);
				addToDOM(drink);
			});
		})
		.catch((err) => {
			alert(err);
		});
}


// for seach using the first letter of the cocktail name

function byFirstLetter(){

	const letter = document.querySelector('.letter').value;
	
	resetDOM();

	fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`)
	.then((res)=>res.json())
	.then((data)=>{
		const drinks = data.drinks;
			console.log(drinks);

			drinks.forEach((drink) => {
				console.log(drink);
				addToDOM(drink);
			});	
	})
		.catch((err) => {
			alert(err);	
	})
}



// randomnizser for someone undecisive like me! 


function randomanizer(){
	
	resetDOM();

	fetch(`https://www.thecocktaildb.com/api/json/v1/1/random.php`)
	.then((res)=>res.json())
	.then((data)=>{
		const drinks = data.drinks;
			console.log(drinks);

			drinks.forEach((drink) => {
				console.log(drink);
				addToDOM(drink);
			});	
	})
		.catch((err) => {
			alert(err);	
	})	
}



// to add more card if there is any

function addToDOM(drink) {
	const div = document.createElement('div');
	div.classList.add('swiper-slide');
	div.classList.add('card');

	div.innerHTML = `
        <div class="card-content">
            <div class="drink-name">
                <h1>${drink.strDrink}</h1>
            </div>

            <div class="image">
                <img src="${drink.strDrinkThumb}" alt="${drink.strDrink} cocktail" />
            </div>

            <div class="ingredients">
                <h4>Ingredients:</h4>
                <ul id='ingredient-list'>${listIngredients(drink)}</ul>
            </div>

            <div class="instructions">
                <h4>Instructions:</h4>
                <p>${drink.strInstructions}</p>
            </div>
        </div>
    `;

	document.querySelector('.swiper-wrapper').appendChild(div);
}


//to reset the dom

function resetDOM() {
	const cards = document.querySelector('.swiper-wrapper');

	while (cards.firstChild) {
		cards.removeChild(cards.firstChild);
	}
}

function listIngredients(drink) {
	const ingredients = document.getElementById('ingredient-list');
	let str = '';

	for (const [key, value] of Object.entries(drink)) {
		if (key.includes('strIngredient') && value) {
			let measurement = drink['strMeasure' + key.substring(13, key.length)];
			measurement = measurement ? ` (${measurement.trim()})` : '';

			str += `<li>${value + measurement}</li>\n`;
		}
	}

	return str;
}

//To put default elements in the app, put the in the HTML, since JS resets the DOM everytime we start a new search