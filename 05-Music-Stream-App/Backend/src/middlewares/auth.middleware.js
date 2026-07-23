const jsonwebtoken = require("jsonwebtoken")

async function authArtist(req, res, next) {

    const token = req.cookies.token


    if(!token){
        return res.status(401).json({message : "Unauthorized"})
    }

    try {
        const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET)

        if(decoded.role !== "artist"){
            return res.status(403).json({message : "you don't have access"})
        }

        req.user = {
            id : decoded.id,
            role : decoded.role
        }
        next()
        
    } catch (error) {
        res.status(401).json({message: "Unauthorized"})
    }
    
}


module.exports = {authArtist}