const express = require('express')
const fs = require('fs')
const path = require('path')
const host = 'localhost'
const PORT = 4500
const app = express()

app.use(express.json())

app.get('/api/users', (req, res) => {
    let users = require('./database/users.json')
    res.json(users)
})

app.get('/api/users/:userId', (req, res) => {
    const { userId } = req.params
    let users = require('./database/users.json')
    let user = users.find(user => user.user_id == userId)
    if (user) {
        return res.json(user)
    } else return res.status(404).json({ message: "The order is not found!" })
})

app.post('/api/users', (req, res) => {
    try {
        let { username, contact, password, isAdmin: is_admin } = req.body
        let users = fs.readFileSync(path.join('database', 'users.json'), "UTF-8")
        users = users ? JSON.parse(users) : []
        let userId = users.length ? users[users.length - 1].user_id + 1 : 1
        let newUser = {
            user_id: userId,
            username,
            contact,
            password,
            is_admin
        }
        users.push(newUser)
        fs.writeFileSync(path.join("database", "users.json"), JSON.stringify(users, null, 4))
        res.status(201).json({message: "The user has been added!", body: newUser})
    } catch (error) {
        res.status(400).json({ message: error.message})

    }
})

app.get('/api/foods', (req, res) => {
    let foods = require('./database/foods.json')
    res.json(foods)
})

app.get('/api/foods/:foodId', (req, res) => {
    const { foodId } = req.params
    let foods = require('./database/foods.json')
    let food = foods.find(food => food.food_id == foodId)
    if (food) {
        return res.json(food)
    } else return res.status(404).json({ message: "The order is not found!" })
})

app.get('/api/orders', (req, res) => {
    const {userId} = req.query
    let orders = require('./database/orders.json')
    if (userId) {
        return res.json(orders.filter(order => order.user_id == userId))
    } else {
        return res.json(orders)        
    }
})

app.get('/api/orders/:orderId', (req, res) => {
    const { orderId } = req.params
    let orders = require('./database/orders.json')
    let order = orders.find(order => order.order_id == orderId)
    if (order) {
        return res.json(order)
    } else return res.status(404).json({message: "The order is not found!"})
})

app.post('/api/orders', (req, res) => {
    try {
        let { userId, foodId, count } = req.body
        let orders = fs.readFileSync(path.join('database', 'orders.json'), "UTF-8")
        orders = orders ? JSON.parse(orders) : []
        let newOrder = orders.find(order => order.user_id == userId && order.food_id == foodId)
        if (newOrder) {
            newOrder.count = +count + +newOrder.count
        } else {
            let orderId = orders.length ? orders[orders.length - 1].order_id + 1 : 1
            newOrder = {
                order_id: orderId,
                user_id: userId,
                food_id: foodId,
                count
            }
            orders.push(newOrder)
        }        
        fs.writeFileSync(path.join("database", "orders.json"), JSON.stringify(orders, null, 4))
        res.status(201).json({ message: "The order has been added!", body: newOrder })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})



app.listen(PORT, ()=>console.log(`Server is running on http://${host}:${PORT}`))