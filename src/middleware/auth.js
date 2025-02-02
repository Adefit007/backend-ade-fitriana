const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
   const authHeader = req.header("Authorization");
   const token = authHeader && authHeader.split(" ")[1];

   if (!token) {
      return res.status(401).send({
         message: "Unauthorization",
      });
   }

   try {
      const verified = jwt.verify(token, "bebas");

      req.customer = verified;

      next();
   } catch (error) {
      console.log(error);
      res.status(400).send({
         status: "failed",
         message: "Invalid Token",
      });
   }
};
