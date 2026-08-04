// const jsonwebtoken = require("jsonwebtoken");
// const albumModel = require("../models/album.model");

// async function authArtist(req, res, next) {
//   const token = req.cookies.token;

//   if (!token) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }

//   try {
//     const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);

//     if (decoded.role !== "artist") {
//       return res.status(403).json({ message: "you don't have access" });
//     }

//     req.user = {
//       id: decoded.id,
//       role: decoded.role,
//     };
//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Unauthorized" });
//   }
// }

// async function authUser(req, res, next) {
//   const token = req.cookies.token;

//   if (!token) {
//     res.status(401).json({ message: "Unauthorized" });
//   }

//   try {
//     const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
//     if (decoded.role !== "user") {
//       return res.status(403).json({ message: "You don't have access" });
//     }
//     req.user = decoded;

//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Unauthorized" });
//   }
// }

// module.exports = { authArtist, authUser };




const jsonwebtoken = require("jsonwebtoken");

async function authArtist(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "artist") {
      return res.status(403).json({ message: "you don't have access" });
    }

    req.user = {
      id: decoded.id,
      role: decoded.role,
    };
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
}

async function authUser(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "user") {
      return res.status(403).json({ message: "You don't have access" });
    }
    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
}

async function authAny(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
}

module.exports = { authArtist, authUser, authAny };