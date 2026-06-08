const express = require("express")

const routes = express.Router()


const showCode = `<h1>This Is The Blog Page </h1>`

routes.get("/blog", (req, res)=>{
    res.send(showCode)
})

module.exports = routes