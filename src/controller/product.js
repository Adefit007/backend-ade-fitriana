const { QueryTypes, where } = require("sequelize");
const { product } = require("../../models");
const db = require("../../models");

exports.getProducts = async (req, res) => {
  try {
    let data = await db.sequelize.query(
      `
        SELECT products.id, products.name,products.desc,products.price,products.qty, products.image, customers.name AS merchant 
        FROM products 
        LEFT JOIN customers on products.idMerchant = customers.id
        `,
      {
        type: QueryTypes.SELECT,
      }
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

exports.createProduct = async (req, res) => {
  try {
    const customerId = req.customer.id;
    const statusId = req.customer.status;

    if (statusId !== "merchant") {
      return res.status(401).send({
        message: "Unauthorization",
      });
    }

    const body = req.body;

    const data = await product.create({
      ...body,
      idMerchant: customerId,
    });

    res.send({
      status: "success",
      message: `Berhasil menambah produk ${data.name}`,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.query;

    const body = req.body;

    let data = await product.update(
      {
        ...body,
      },
      {
        where: { id: id },
      }
    );

    res.send({
      status: "succes",
      message: "Berhasil Update Produk",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.query;

    let data = await product.destroy({
      where: { id: id },
    });
    res.send({
      status: "success",
      message: `Product berhasil dihapus`,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: "failed",
      message: "server error",
    });
  }
};
