const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema(
  {
    make: { type: String, required: true, trim: true },
    model: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    year: {type: Number,required: true,min: 1886,max: new Date().getFullYear() + 1,},
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 0, default: 1 },
    vin: {type: String,required: true,unique: true,trim: true,uppercase: true,},
    imageUrl: { type: String, default: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d' },
    description: { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Vehicle', vehicleSchema);
