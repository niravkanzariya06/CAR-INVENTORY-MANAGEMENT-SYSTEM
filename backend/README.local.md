# Local MongoDB Setup

## Option 1: Run MongoDB locally with Docker

1. Install Docker Desktop.
2. From the backend folder, run:
   ```bash
   docker compose up -d
   ```
3. The app will connect to:
   ```text
   mongodb://localhost:27017/car_dealership
   ```
4. To stop it:
   ```bash
   docker compose down
   ```

## Option 2: Use a local MongoDB installation

If you already have MongoDB installed locally, make sure it is running on port 27017.

Then create a backend/.env file with:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/car_dealership
JWT_SECRET=supersecretjwtkey_cardealership_2026
ADMIN_SECRET_KEY=admin123secret
```

## Seed sample data

```bash
node src/seed.js
```
