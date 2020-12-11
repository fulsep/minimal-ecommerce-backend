const Carts = require('../models/carts');
const cart = new Carts();

const Invoices = require('../models/invoices');
const invoice = new Invoices();

const InvoiceItems = require('../models/invoiceItems');
const invoiceItems = new InvoiceItems();

const {v4: uuid} = require('uuid');

module.exports = {
  getBeforeGenerate: (req, res)=> {
    const {id: userId} = req.authUser;
    cart.findWithSubtotal({where: {['c.userId']: userId}}, (err, result)=> {
      if (result) {
        return res.send({
          success: true,
          message: 'Item that will be added to invoice',
          results: {
            items: result.rows,
            total: result.rows.reduce((a, b)=>a.subtotal+b.subtotal),
          },
        });
      } else {
        return res.status(500).send({
          success: false,
          message: (err && err.message) || 'There is an error',
        });
      }
    });
  },
  generateInvoice: (req, res)=>{
    const {id: userId} = req.authUser;
    cart.findWithSubtotal({where: {['c.userId']: userId}}, (err, onCart)=> {
      if (onCart && onCart.rows.length > 0) {
        invoice.create({
          invCode: uuid(), userId, shippingAddress: 'TEST',
          transactionDate: new Date(),
        }, (err, result)=> {
          if (result && result.rows[0].id) {
            const data = [
              ...onCart.rows.map((item) => {
                return {
                  invoiceId: result.rows[0].id,
                  name: item.name,
                  price: item.subtotal,
                  quantity: item.oncart,
                };
              }),
            ];
            invoiceItems.bulkInsert(data, (err, generated)=> {
              if (generated) {
                return res.send({
                  success: true,
                  message: 'Invoice generated, please head to payment process',
                });
              } else {
                return res.status(500).send({
                  success: false,
                  message: (err && err.message) || 'There is an error',
                });
              }
            });
          } else {
            return res.status(500).send({
              success: false,
              message: (err && err.message) || 'There is an error',
            });
          }
        });
      } else {
        return res.status(500).send({
          success: false,
          message: (err && err.message) || 'There is an error',
        });
      }
    });
  },
};
