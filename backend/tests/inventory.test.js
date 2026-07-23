const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../src/app');
const Vehicle = require('../src/models/Vehicle');

let mongoServer;
let userToken;
let adminToken;
let stockVehicleId;
let emptyVehicleId;

beforeAll(async () => {
  process.env.ADMIN_SECRET_KEY = 'admin123secret';
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);

  const userRes = await request(app)
    .post('/api/auth/register')
    .send({
      name: 'Inventory User',
      email: 'buyer@test.com',
      password: 'password123',
    });
  userToken = userRes.body.token;

  const adminRes = await request(app)
    .post('/api/auth/register')
    .send({
      name: 'Admin Manager',
      email: 'manager@test.com',
      password: 'password123',
      role: 'admin',
      adminSecret: 'admin123secret',
    });
  adminToken = adminRes.body.token;
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await Vehicle.deleteMany({});

  const vehicleWithStock = await Vehicle.create({
    make: 'Audi',
    model: 'R8 V10',
    category: 'Sports',
    year: 2024,
    price: 158600,
    quantity: 2,
    vin: 'AUDIR8000111222',
  });
  stockVehicleId = vehicleWithStock._id.toString();

  const vehicleOutStock = await Vehicle.create({
    make: 'Mercedes-Benz',
    model: 'AMG GT',
    category: 'Sports',
    year: 2023,
    price: 140000,
    quantity: 0,
    vin: 'MBAMGGT000333444',
  });
  emptyVehicleId = vehicleOutStock._id.toString();
});

describe('Inventory Transactions API (TDD JS)', () => {
  describe('POST /api/vehicles/:id/purchase', () => {
    it('should successfully purchase a vehicle and decrement stock quantity', async () => {
      const res = await request(app)
        .post(`/api/vehicles/${stockVehicleId}/purchase`)
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.status).toBe(200);
      expect(res.body.vehicle.quantity).toBe(1);
      expect(res.body.message).toMatch(/purchase successful/i);
    });

    it('should return 400 error when attempting to purchase an out-of-stock vehicle', async () => {
      const res = await request(app)
        .post(`/api/vehicles/${emptyVehicleId}/purchase`)
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.status).toBe(400);
      expect(res.body.message).toMatch(/out of stock/i);
    });
  });

  describe('POST /api/vehicles/:id/restock', () => {
    it('should allow admin to restock a vehicle quantity', async () => {
      const res = await request(app)
        .post(`/api/vehicles/${emptyVehicleId}/restock`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ amount: 5 });

      expect(res.status).toBe(200);
      expect(res.body.vehicle.quantity).toBe(5);
      expect(res.body.message).toMatch(/restocked/i);
    });

    it('should reject non-admin from restocking a vehicle', async () => {
      const res = await request(app)
        .post(`/api/vehicles/${emptyVehicleId}/restock`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ amount: 5 });

      expect(res.status).toBe(403);
    });
  });
});
