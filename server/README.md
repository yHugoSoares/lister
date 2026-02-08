# Lister Backend Server

Node.js/Express backend with PostgreSQL for the Lister real estate application.

## Setup

1. **Install dependencies:**
   ```bash
   cd server
   npm install
   ```

2. **Set up PostgreSQL:**
   - Install PostgreSQL if you haven't already
   - Create a database:
     ```sql
     CREATE DATABASE lister_db;
     ```
   - Run the schema:
     ```bash
     psql -U postgres -d lister_db -f database/schema.sql
     ```

3. **Configure environment:**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your PostgreSQL credentials:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=lister_db
   DB_USER=postgres
   DB_PASSWORD=your_password
   JWT_SECRET=your-secret-key
   ```

4. **Run the server:**
   ```bash
   # Development mode with auto-reload
   npm run dev

   # Production mode
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/signin` - Login user
- `GET /api/auth/me` - Get current user (requires auth)

### Listings
- `GET /api/listings` - Get all listings (with filters)
- `GET /api/listings/:id` - Get single listing
- `POST /api/listings` - Create listing (requires auth)
- `PUT /api/listings/:id` - Update listing (requires auth)
- `DELETE /api/listings/:id` - Delete listing (requires auth)

### Health Check
- `GET /api/health` - Server health status

## Filter Parameters

When fetching listings, you can use these query parameters:
- `transactionType` - sale or rent
- `propertyType` - house, apartment, condo, etc.
- `district` - District name
- `municipality` - Municipality name
- `parish` - Parish name
- `minPrice` - Minimum price
- `maxPrice` - Maximum price
- `bedrooms` - Minimum number of bedrooms
- `bathrooms` - Minimum number of bathrooms

Example:
```
GET /api/listings?propertyType=apartment&minPrice=100000&maxPrice=500000&bedrooms=2
```
