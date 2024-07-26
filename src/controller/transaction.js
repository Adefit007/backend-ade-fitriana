const { QueryTypes } = require("sequelize");
const db = require("../../models");
const { transaction } = require("../../models");

exports.addTransaction = async (req, res) => {
   try {
      const customerId = req.customer.id;
      const body = req.body;

      let totalFinal = +body.total;
      let totalDiscount = 0;
      let totalShipping = 12000; //misal ongkir 12000

      if (body.total > 15000) {
         totalShipping = 0;
      }

      if (body.total > 50000) {
         totalFinal = +body.total - 0.1 * body.total; //disc 10%
         totalDiscount = +body.total * 0.1;
      }

      const data = await transaction.create({
         idProduct: body.product_id,
         idBuyer: customerId,
         idSeller: body.product_merchant_id,
         total: totalFinal,
         status: "On Proccess",
         shipping: totalShipping,
         discount: totalDiscount,
      });
      res.send({
         status: "succes",
         message: "Berhasil menambah transaksi",
      });
   } catch (error) {
      console.log(error);
      res.status(400).send({
         status: "failed",
         message: "server error",
      });
   }
};

exports.getTransactions = async (req, res) => {
   try {
      const { id } = req.customer;
      let data = await db.sequelize.query(
         `SELECT transactions.status, transactions.total, transactions.status, transactions.shipping, transactions.discount,
products.name as produk, customers.name as buyer
FROM transactions 
LEFT JOIN products ON products.id = transactions.idProduct
LEFT JOIN customers on customers.id = transactions.idBuyer
WHERE transactions.idSeller = ${id}`,
         { type: QueryTypes.SELECT }
      );
      res.status(200).send({
         status: "success",
         data,
      });
   } catch (error) {
      console.log(error);
      res.status(400).send({
         status: "failed",
         message: "server error",
      });
   }
};

exports.getTransaksiCustomer = async (req, res) => {
   try {
      const { id } = req.customer;
      const data = await db.sequelize.query(
         `SELECT transactions.status, transactions.total, transactions.status, transactions.shipping, transactions.discount,
products.name as produk
FROM transactions 
LEFT JOIN products ON products.id = transactions.idProduct
LEFT JOIN customers on customers.id = transactions.idBuyer
WHERE transactions.idBuyer = ${id}`,
         { type: QueryTypes.SELECT }
      );

      res.status(200).send({
         status: "success",
         data,
      });
   } catch (error) {
      console.log(error);
      res.status(400).send({
         status: "failed",
         message: "server error",
      });
   }
};
