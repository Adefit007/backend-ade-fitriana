const { customer } = require("../../models");

exports.updateStatus = async (req, res) => {
   try {
      const { id } = req.customer;

      await customer.update(
         {
            status: "merchant",
         },
         {
            where: { id: id },
         }
      );

      res.send({ status: "success", message: "Berhasil Update Status" });
   } catch (error) {
      console.log(error);
      res.status(400).send({
         status: "failed",
         message: "server error",
      });
   }
};
