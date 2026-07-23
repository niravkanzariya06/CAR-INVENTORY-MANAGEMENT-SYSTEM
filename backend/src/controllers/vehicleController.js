const Vehicle = require('../models/Vehicle');

const getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find().sort({ createdAt: -1 });
    return res.status(200).json(vehicles);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const searchVehicles = async (req, res) => {
  try {
    const {
      make,
      model,
      category,
      minPrice,
      maxPrice,
      inStockOnly,
    } = req.query;

    const filter = {};

    if (make?.trim()) {
      filter.make = {
        $regex: make.trim(),
        $options: 'i',
      };
    }

    if (model?.trim()) {
      filter.model = {
        $regex: model.trim(),
        $options: 'i',
      };
    }

    if (category?.trim()) {
      filter.category = {
        $regex: category.trim(),
        $options: 'i',
      };
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      filter.price = {};

      if (minPrice !== undefined) {
        const min = Number(minPrice);

        if (!Number.isFinite(min) || min < 0) {
          return res.status(400).json({
            message: 'minPrice must be a valid non-negative number',
          });
        }

        filter.price.$gte = min;
      }

      if (maxPrice !== undefined) {
        const max = Number(maxPrice);

        if (!Number.isFinite(max) || max < 0) {
          return res.status(400).json({
            message: 'maxPrice must be a valid non-negative number',
          });
        }

        filter.price.$lte = max;
      }
    }

    if (inStockOnly === 'true') {
      filter.quantity = { $gt: 0 };
    }

    const vehicles = await Vehicle.find(filter).sort({
      price: 1,
    });

    return res.status(200).json(vehicles);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const createVehicle = async (req, res) => {
  try {
    const { make, model, category, year, price, quantity, vin, imageUrl, description } = req.body;

    const numericYear = Number(year);
const numericPrice = Number(price);
const numericQuantity =
  quantity !== undefined ? Number(quantity) : 1;

if (!make?.trim() || !model?.trim() || !category?.trim() || !vin?.trim()) {
  return res.status(400).json({
    message: 'Make, model, category, and VIN are required',
  });
}

if (!Number.isInteger(numericYear) || numericYear < 1886) {
  return res.status(400).json({
    message: 'Year must be a valid year',
  });
}

if (!Number.isFinite(numericPrice) || numericPrice < 0) {
  return res.status(400).json({
    message: 'Price must be a valid non-negative number',
  });
}

if (!Number.isInteger(numericQuantity) || numericQuantity < 0) {
  return res.status(400).json({
    message: 'Quantity must be a non-negative integer',
  });
}

    const existingVin = await Vehicle.findOne({ vin });
    if (existingVin) {
      return res.status(400).json({ message: 'Vehicle with this VIN already exists' });
    }

    const vehicle = await Vehicle.create({
  make: make.trim(),
  model: model.trim(),
  category: category.trim(),
  year: numericYear,
  price: numericPrice,
  quantity: numericQuantity,
  vin: vin.trim().toUpperCase(),
  imageUrl:
    imageUrl ||
    'https://images.unsplash.com/photo-1552519507-da3b142c6e3d',
  description: description?.trim(),
});

    return res.status(201).json(vehicle);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const vehicle = await Vehicle.findById(id);

    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    const updatedVehicle = await Vehicle.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json(updatedVehicle);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const vehicle = await Vehicle.findById(id);

    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    await Vehicle.findByIdAndDelete(id);
    return res.status(200).json({ message: 'Vehicle deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getVehicles,
  searchVehicles,
  createVehicle,
  updateVehicle,
  deleteVehicle,
};
