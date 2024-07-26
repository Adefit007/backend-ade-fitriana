const { Router } = require("express");

const { register, login } = require("../controller/auth");
const { auth } = require("../middleware/auth");
const { updateStatus } = require("../controller/customer");
const {
   getProducts,
   createProduct,
   updateProduct,
   deleteProduct,
} = require("../controller/product");
const {
   addTransaction,
   getTransactions,
   getTransaksiCustomer,
} = require("../controller/transaction");

const route = Router();

route.post("/register", register);
route.post("/login", login);
route.put("/update-status/?", auth, updateStatus);
route.get("/products", auth, getProducts);
route.post("/product", auth, createProduct);
route.put("/product/?", auth, updateProduct);
route.delete("/product/?", auth, deleteProduct);
route.post("/transaction", auth, addTransaction);
route.get("/transaction/?", auth, getTransactions);
route.get("/transaction-customer/?", auth, getTransaksiCustomer);

module.exports = route;
