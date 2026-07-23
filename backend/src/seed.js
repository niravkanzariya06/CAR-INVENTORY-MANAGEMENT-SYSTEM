const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Vehicle = require('./models/Vehicle');
const User = require('./models/User');

dotenv.config();

const sampleVehicles = [
  {
    make: 'Tesla',
    model: 'Model S Plaid',
    category: 'Electric',
    year: 2024,
    price: 89990,
    quantity: 4,
    vin: 'TSLA1000200030001',
    imageUrl: 'https://images.unsplash.com/photo-1617788138017-80ad40651399',
    description: '1,020 hp tri-motor electric supercar sedan with 0-60 mph in 1.99s.',
  },
  {
    make: 'Porsche',
    model: '911 GT3 RS',
    category: 'Sports',
    year: 2024,
    price: 241300,
    quantity: 2,
    vin: 'POR9110009998887',
    imageUrl: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e',
    description: 'Naturally aspirated 4.0L flat-6 track weapon with active DRS aerodynamics.',
  },
  {
    make: 'BMW',
    model: 'M5 CS',
    category: 'Sports',
    year: 2023,
    price: 142000,
    quantity: 0,
    vin: 'BMW5554443332221',
    imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e',
    description: 'Limited edition 627 hp twin-turbo V8 super sedan with carbon bucket seats.',
  },
  {
    make: 'Audi',
    model: 'RS e-tron GT',
    category: 'Electric',
    year: 2024,
    price: 147100,
    quantity: 5,
    vin: 'AUDI888777666555',
    imageUrl: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a',
    description: 'Dual electric motors producing 637 hp with 800V ultra-fast charging architecture.',
  },
  {
    make: 'Mercedes-Benz',
    model: 'G 63 AMG',
    category: 'SUV',
    year: 2024,
    price: 179000,
    quantity: 3,
    vin: 'MBAMG63000111222',
    imageUrl: 'https://images.unsplash.com/photo-1520050206274-a1ae44613e6d',
    description: 'Handcrafted AMG 4.0L V8 biturbo luxury off-road icon.',
  },
  {
    make: 'Rolls-Royce',
    model: 'Spectre',
    category: 'Luxury',
    year: 2024,
    price: 420000,
    quantity: 1,
    vin: 'RRSPECTRE0000001',
    imageUrl: 'https://images.unsplash.com/photo-1563720223185-11003d516935',
    description: 'Ultra-luxury electric super coupe with starlight headliner and whisper quiet cabin.',
  },
];

const seedDB = async () => {
  try {
    const connStr = process.env.MONGODB_URI || 'mongodb://localhost:27017/car_dealership';
    await mongoose.connect(connStr);
    console.log('Connected to MongoDB for seeding...');

    await Vehicle.deleteMany({});
    await Vehicle.insertMany(sampleVehicles);

    console.log('Successfully seeded sample vehicle inventory!');

    // Create default Admin and User if not existing
    const adminExists = await User.findOne({ email: 'admin@dealership.com' });
    if (!adminExists) {
      await User.create({
        name: 'System Admin',
        email: 'admin@dealership.com',
        password: 'adminpassword123',
        role: 'admin',
      });
      console.log('Created default admin: admin@dealership.com / adminpassword123');
    }

    const userExists = await User.findOne({ email: 'buyer@example.com' });
    if (!userExists) {
      await User.create({
        name: 'John Buyer',
        email: 'buyer@example.com',
        password: 'userpassword123',
        role: 'user',
      });
      console.log('Created default user: buyer@example.com / userpassword123');
    }

    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDB();
