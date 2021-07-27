const fs = require('fs')
const express = require('express')
const plaid = require('plaid')
const stripe = require('stripe')

require('dotenv').config()
const port = process.env.PORT

const app = express()

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/index.html')
})

app.get('/verify', (req, res) => {
    res.sendFile(__dirname + '/client/verify.html')
})

app.get('/manual', (req, res) => {
    res.sendFile(__dirname + '/client/manual.html')
})

app.listen(port, () => {
    console.log(`Server running on port: ${port}`)
})