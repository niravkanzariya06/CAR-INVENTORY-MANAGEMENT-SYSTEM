const express = require('express');
const {
  getVehicles,
  searchVehicles,
  createVehicle,
  updateVehicle,
  deleteVehicle,
} = require('../controllers/vehicleController');
const { purchaseVehicle, restockVehicle } = require('../controllers/inventoryController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

// Protect all vehicle routes with JWT auth
router.use(protect);

router.get('/', getVehicles);
router.get('/search', searchVehicles);
router.post('/', adminOnly, createVehicle);
router.put('/:id', adminOnly, updateVehicle);
router.delete('/:id', adminOnly, deleteVehicle);

// Inventory routes
router.post('/:id/purchase', purchaseVehicle);
router.post('/:id/restock', adminOnly, restockVehicle);

module.exports = router;
