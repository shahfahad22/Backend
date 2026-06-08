const express = require("express")

const routes = express.Router()

const showCode = `
<h1>This Is The Home Page</h1>`

routes.get("/home", (req, res)=>{
    res.send(showCode)
})


module.exports = routes;