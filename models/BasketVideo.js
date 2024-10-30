const mongoose = require('mongoose');

const basketVideoSchema = new mongoose.Schema({
  basketId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Basket',
    required: true,
  },
  videoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Video',
    required: true,
  },
});

const BasketVideo = mongoose.model('BasketVideo', basketVideoSchema);
module.exports = BasketVideo;
