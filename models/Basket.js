const mongoose = require('mongoose');

const basketSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Basket = mongoose.model('Basket', basketSchema);
module.exports = Basket;
