const express = require("express")

const routes = express.Router()

const showCode = `
<h1>This is About Page</h1>
`

routes.get("/about", (req,res)=>{
    res.send(showCode)
})

module.exports = routes