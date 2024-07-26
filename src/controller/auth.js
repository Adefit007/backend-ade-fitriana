const { customer } = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
   try {
      const userExist = await customer.findOne({
         where: {
            email: req.body.email,
         },
      });

      if (userExist) {
         return res.status(400).send({
            status: "failed",
            message: "Email sudah ada",
         });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      const newUser = await customer.create({
         name: req.body.name,
         email: req.body.email,
         password: hashedPassword,
         status: "customer",
      });
      res.status(201).send({
         status: "success",
         message: "resgister success",
         nama: newUser.name,
      });
   } catch (error) {
      console.log(error);
      res.status(400).send({
         status: "failed",
         message: "server error",
      });
   }
};

exports.login = async (req, res) => {
   try {
      const userExist = await customer.findOne({
         where: {
            email: req.body.email,
         },
         attributes: {
            exclude: ["createdAt", "updatedAt"],
         },
      });

      if (!userExist) {
         return res.status(400).send({
            status: "failed",
            message: "Email tidak ditemukan",
         });
      }

      const isValid = await bcrypt.compare(
         req.body.password,
         userExist.password
      );

      if (!isValid) {
         return res.status(400).send({
            status: "failed",
            message: "Wrong email or password",
         });
      }

      const token = jwt.sign(
         { id: userExist.id, status: userExist.status },
         process.env.TOKEN_KEY
      );

      res.status(200).send({
         status: "success",
         data: {
            id: userExist.id,
            name: userExist.name,
            email: userExist.email,
            status: userExist.status,
            token,
         },
      });
   } catch (error) {
      console.log(error);
      res.status(400).send({
         status: "failed",
         message: "server error",
      });
   }
};

exports.checkAuth = async (req, res) => {
   try {
      const id = req.customer.id;

      const dataUser = await user.findOne({
         where: {
            id,
         },
         attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
         },
      });

      if (!dataUser) {
         return res.status(404).send({
            status: "failed",
         });
      }

      res.send({
         status: "success...",
         data: {
            user: {
               id: dataUser.id,
               name: dataUser.name,
               email: dataUser.email,
               status: dataUser.status,
            },
         },
      });
   } catch (error) {
      console.log(error);
      res.status({
         status: "failed",
         message: "Server Error",
      });
   }
};
