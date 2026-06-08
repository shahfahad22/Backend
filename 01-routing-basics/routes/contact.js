const express = require("express")

const routes = express.Router()

const showCode = `
<h1>This is the contact page</h1>
`

routes.get("/contact", (req, res) =>{
    res.send(showCode)
})

module.exports = routes
