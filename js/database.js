let users = window.localStorage.getItem('usersData')
let foods = window.localStorage.getItem('foodsData')
let orders = window.localStorage.getItem('ordersData')



if (!users) {
	users = [
		{ user_id: 1, first_name: 'Sobir', telephone: '998941049914' },
		{ user_id: 2, first_name: 'Rahim', telephone: '998941049914' },
		{ user_id: 3, first_name: 'Ilhom', telephone: '998941049914' },
	]
} else {
	users = JSON.parse(users)
}

if (!foods) {
	foods = [
		{ food_id: 1, food_name: 'Cola', food_img: './img/cola.jpeg' },
		{ food_id: 2, food_name: 'Spinner', food_img: './img/spinner.jpeg' },
		{ food_id: 3, food_name: 'Chiken Wings', food_img: './img/chicken_wings.jpeg' },
		{ food_id: 4, food_name: 'Burger Cheese', food_img: './img/burger_cheese.jpeg' },
		{ food_id: 5, food_name: 'Chicken Togora', food_img: './img/chicken_togora.jpeg' },
		{ food_id: 6, food_name: 'Combo', food_img: './img/combo.jpeg' },
		{ food_id: 7, food_name: 'Fanta', food_img: './img/fanta.jpeg' },
	]
} else {
	foods.JSON.parse(foods)
}

if (!orders) {
	orders = [
		{ user_id: 1, food_id: 1, count: 2 },
		{ user_id: 1, food_id: 3, count: 1 },
		{ user_id: 2, food_id: 7, count: 1 },
	]
} else {
	orders = JSON.parse(orders)
}
