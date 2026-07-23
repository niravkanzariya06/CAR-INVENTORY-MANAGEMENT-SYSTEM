const Vehicle = require('../models/Vehicle');

const purchaseVehicle = async (req, res) => {
  try {
    const { id } = req.params;

    const vehicle = await Vehicle.findOneAndUpdate(
      {
        _id: id,
        quantity: { $gt: 0 },
      },
      {
        $inc: { quantity: -1 },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!vehicle) {
      const existingVehicle = await Vehicle.findById(id);

      if (!existingVehicle) {
        return res.status(404).json({
          message: 'Vehicle not found',
        });
      }

      return res.status(400).json({
        message: 'Vehicle is out of stock',
      });
    }

    return res.status(200).json({
      message: 'Purchase successful! Vehicle quantity updated.',
      vehicle,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const restockVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount } = req.body;
    const increment = amount ? Number(amount) : 1;

    if (isNaN(increment) || increment <= 0) {
      return res.status(400).json({ message: 'Restock amount must be a positive number' });
    }

    const vehicle = await Vehicle.findById(id);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    vehicle.quantity += increment;
    await vehicle.save();

    return res.status(200).json({
      message: `Vehicle successfully restocked by ${increment}.`,
      vehicle,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { purchaseVehicle, restockVehicle };
