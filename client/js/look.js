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

async function foodsRenderer() {
	let foods =await request("/api/foods", "GET")
	foodsSelect.innerHTML = null 
	foods.map((food) => {
		let option = document.createElement('option')
		option.value = food.food_id
		option.textContent = food.food_name
		foodsSelect.appendChild(option)
	})
}
foodsRenderer()

async function usersRenderer() {
	let users = await request("/api/users", "GET")
	users.map(user => {
		let userItem = document.createElement('li')
		let username = document.createElement('span')
		let mobile = document.createElement('a')

		userItem.classList.add('customer-item')
		username.classList.add('customer-name')
		mobile.classList.add('customer-phone')
		mobile.setAttribute('href', `tel:+${user.contact}`)

		username.textContent = user.username
		mobile.textContent = user.contact

		userItem.appendChild(username)
		userItem.appendChild(mobile)
		usersList.appendChild(userItem)

		userItem.onclick = () => {
			clientId.textContent = user.user_id
			ordersRenderer(user.user_id)
		}
	})
}
usersRenderer()

async function ordersRenderer(userId) {
	ordersList.innerHTML = null
	let orders = await request('/api/orders?userId=' + userId, 'GET')
	console.log(orders);
	orders.map(async order => {
		let li = document.createElement('li')
		let img = document.createElement('img')
		let div = document.createElement('div')
		let foodName = document.createElement('span')
		let foodCount = document.createElement('span')

		li.classList.add('order-item')
		foodName.classList.add('order-name')
		foodCount.classList.add('order-count')

		img.setAttribute('src', order.food.food_img)
		foodName.textContent = order.food.food_name
		foodCount.textContent = order.count
		div.appendChild(foodName)
		div.appendChild(foodCount)
		li.appendChild(img)
		li.appendChild(div)
		ordersList.appendChild(li)
	})
}

foodsForm.onsubmit = async (event) => {
	event.preventDefault()
	if (userIdHeader.textContent) {
		let newOrder = {
			userId: userIdHeader.textContent,
			foodId: foodsSelect.value,
			count: foodCount.value
		}
		foodsSelect.value = 1
		foodCount.value = null
		let response = await request('/api/orders', 'POST', newOrder)
		if (response) {
			ordersRenderer(+userIdHeader.textContent)
		}
	}
}