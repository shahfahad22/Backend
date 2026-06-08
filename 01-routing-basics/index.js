const express = require("express")

const homeRoutes = require("./routes/home")
const aboutRoutes = require("./routes/about")
const contactRoutes = require("./routes/contact")
const blogRoutes = require("./routes/blog")
const servicesRoutes = require("./routes/services")


const app = express()

app.use("/", homeRoutes)
app.use("/",aboutRoutes)
app.use("/",contactRoutes)
app.use("/",blogRoutes)
app.use("/",servicesRoutes)

app.listen(3000, ()=>{
    console.log("Server Running On Port 3000")
})