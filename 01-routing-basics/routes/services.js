const express = require("express")

const routes = express.Router()

const showCode = `<h1>This Is The Services Page</h1>`


routes.get("/services", (req,res) =>{
    res.send(showCode)
})

module.exports = routes