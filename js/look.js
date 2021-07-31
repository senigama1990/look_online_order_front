const usersList = document.querySelector('.customers-list')
const userAddForm = document.querySelector('#userAdd')
const usernameInput = document.querySelector('#usernameInput')
const telephoneInput = document.querySelector('#telephoneInput')
const foodsSelect = document.querySelector('#foodsSelect')
const userHeader = document.querySelector('#userHeader')
const userIdHeader = document.querySelector('#clientId')
const ordersList = document.querySelector('.orders-list')
const foodsForm = document.querySelector('.orderAdd')
const foodCount = document.querySelector('.foodCount')

function userRenderer (array) {
	usersList.innerHTML = null
	array.map((user) => {
		let userItem = document.createElement('li')
		let username = document.createElement('span')
		let mobile = document.createElement('a')

		userItem.classList.add('customer-item')
		username.classList.add('customer-name')
		mobile.classList.add('customer-phone')
		mobile.setAttribute('href', `tel:+${user.telephone}`)

		username.textContent = user.first_name
		mobile.textContent = '+' + user.telephone

		userItem.appendChild(username)
		userItem.appendChild(mobile)
		usersList.appendChild(userItem)
		
		userItem.onclick = (event) => {
			userHeader.textContent = user.first_name
			userIdHeader.textContent = user.user_id

			
			ordersRenderer(user.user_id)
		}
	})
}

function foodsRenderer (array) {
	array.map( (food) => {
		let option = document.createElement('option')
		option.value = food.food_id
		option.textContent = food.food_name
		foodsSelect.appendChild(option)
	})
}

function ordersRenderer (userId) {
	ordersList.innerHTML = null
	for(let food of foods) {
		for(let order of orders) {
			if(food.food_id === order.food_id && order.user_id == userId) {
				let li = document.createElement('li')
				let img = document.createElement('img')
				let div = document.createElement('div')
				let foodName = document.createElement('span')
				let foodCount = document.createElement('span')

				li.classList.add('order-item')
				foodName.classList.add('order-name')
				foodCount.classList.add('order-count')

				img.setAttribute('src', food.food_img)
				foodName.textContent = food.food_name
				foodCount.textContent = order.count
				div.appendChild(foodName)
				div.appendChild(foodCount)
				li.appendChild(img)
				li.appendChild(div)
				ordersList.appendChild(li)
			}
		}
	}
}

userAddForm.onsubmit = (event) => {
	event.preventDefault()
	let newUser = {
		user_id: users[users.length - 1].user_id + 1,
		first_name: usernameInput.value,
		telephone: telephoneInput.value
	}
	users.push(newUser)
	userRenderer(users)
}


foodsForm.onsubmit = function (e) {
	e.preventDefault()
	if (userIdHeader.textContent) {
		let found = orders.find((order) => order.food_id == foodsSelect.value && order.user_id == userIdHeader.textContent)
		if (found) {
			found.count += Number(foodCount.value)
		} else {
			let newOrderList = {
				user_id: Number(userIdHeader.textContent),
				food_id: Number(foodsSelect.value),
				count: Number(foodCount.value)
			}
			orders.push(newOrderList)
		}
		foodsSelect.value = 1
		foodCount.value = null
		ordersRenderer(userIdHeader.textContent)

	}

}

userRenderer(users)
foodsRenderer(foods)


