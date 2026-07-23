const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../src/app');
const Vehicle = require('../src/models/Vehicle');

let mongoServer;
let userToken;
let adminToken;
let testVehicleId;

beforeAll(async () => {
  process.env.ADMIN_SECRET_KEY = 'admin123secret';
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);

  const userRes = await request(app)
    .post('/api/auth/register')
    .send({
      name: 'Standard User',
      email: 'user@test.com',
      password: 'password123',
    });
  userToken = userRes.body.token;

  const adminRes = await request(app)
    .post('/api/auth/register')
    .send({
      name: 'Admin User',
      email: 'admin@test.com',
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

  const vehicle = await Vehicle.create({
    make: 'Tesla',
    model: 'Model S',
    category: 'Electric',
    year: 2024,
    price: 89990,
    quantity: 5,
    vin: 'TSLA123456789001',
    imageUrl: 'https://images.unsplash.com/photo-1617788138017-80ad40651399',
    description: 'High performance electric sedan',
  });
  testVehicleId = vehicle._id.toString();

  await Vehicle.create({
    make: 'Porsche',
    model: '911 GT3',
    category: 'Sports',
    year: 2023,
    price: 182900,
    quantity: 2,
    vin: 'POR911000222333',
    imageUrl: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e',
    description: 'Track-focused supercar',
  });
});

describe('Vehicle Management Endpoints (TDD JS)', () => {
  describe('GET /api/vehicles', () => {
    it('should return all vehicles when authenticated', async () => {
      const res = await request(app)
        .get('/api/vehicles')
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(2);
    });

    it('should return 401 if unauthenticated', async () => {
      const res = await request(app).get('/api/vehicles');
      expect(res.status).toBe(401);
    });
  });

  describe('GET /api/vehicles/search', () => {
    it('should filter vehicles by make', async () => {
      const res = await request(app)
        .get('/api/vehicles/search?make=Tesla')
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(1);
      expect(res.body[0].make).toBe('Tesla');
    });

    it('should filter vehicles by category', async () => {
      const res = await request(app)
        .get('/api/vehicles/search?category=Sports')
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(1);
      expect(res.body[0].model).toBe('911 GT3');
    });

    it('should filter vehicles by price range', async () => {
      const res = await request(app)
        .get('/api/vehicles/search?minPrice=100000&maxPrice=200000')
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(1);
      expect(res.body[0].make).toBe('Porsche');
    });
  });

  describe('POST /api/vehicles', () => {
    it('should allow admin to create a new vehicle', async () => {
      const newVehicle = {
        make: 'BMW',
        model: 'M5 CS',
        category: 'Sports',
        year: 2024,
        price: 142000,
        quantity: 3,
        vin: 'BMW555666777888',
        imageUrl: 'https://example.com/bmw.jpg',
        description: 'V8 twin turbo super sedan',
      };

      const res = await request(app)
        .post('/api/vehicles')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(newVehicle);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('_id');
      expect(res.body.make).toBe('BMW');
    });

    it('should deny non-admin from creating a vehicle with 403', async () => {
      const res = await request(app)
        .post('/api/vehicles')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          make: 'Audi',
          model: 'RS6',
          category: 'Sports',
          year: 2024,
          price: 125000,
          quantity: 1,
          vin: 'AUDI999888777666',
        });

      expect(res.status).toBe(403);
    });
  });

  describe('PUT /api/vehicles/:id', () => {
    it('should allow admin to update a vehicle', async () => {
      const res = await request(app)
        .put(`/api/vehicles/${testVehicleId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          price: 84990,
          quantity: 8,
        });

      expect(res.status).toBe(200);
      expect(res.body.price).toBe(84990);
      expect(res.body.quantity).toBe(8);
    });
  });

  describe('DELETE /api/vehicles/:id', () => {
    it('should allow admin to delete a vehicle', async () => {
      const res = await request(app)
        .delete(`/api/vehicles/${testVehicleId}`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.message).toMatch(/deleted/i);

      const findRes = await Vehicle.findById(testVehicleId);
      expect(findRes).toBeNull();
    });

    it('should reject standard user from deleting a vehicle with 403', async () => {
      const res = await request(app)
        .delete(`/api/vehicles/${testVehicleId}`)
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.status).toBe(403);
    });
  });
});
