# Database Seeding Guide

## Quick Start

Run the seed script to populate your database with test data:

```bash
cd server/database
./seed.sh
```

Or directly with PostgreSQL:

```bash
psql -U hugo -d lister_db -f server/database/seed.sql
```

For Homebrew PostgreSQL:

```bash
/opt/homebrew/opt/postgresql@16/bin/psql -U hugo -d lister_db -f server/database/seed.sql
```

## Test Accounts

After seeding, you can login with:

| Email | Password | Role |
|-------|----------|------|
| buyer1@example.com | password123 | Buyer |
| buyer2@example.com | password123 | Buyer |
| seller1@example.com | password123 | Seller |
| seller2@example.com | password123 | Seller |

## Sample Data

The seed includes:
- **17 property listings** across Portugal
- **4 user accounts** (2 buyers, 2 sellers)
- Properties in multiple districts: Lisboa, Porto, Faro
- Various property types: apartments, houses, condos, commercial, land
- Both sale and rental properties
- Price range from €750/month to €1.2M

## Adding More Data via API

You can also add data through the API endpoints:

### 1. Register a new user:
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "password": "yourpassword",
    "role": "seller"
  }'
```

### 2. Login to get a token:
```bash
curl -X POST http://localhost:3000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "seller1@example.com",
    "password": "password123"
  }'
```

### 3. Create a listing (requires authentication):
```bash
curl -X POST http://localhost:3000/api/listings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "Beautiful Apartment",
    "address": "Rua Example 123, Lisboa",
    "price": 250000,
    "beds": 2,
    "baths": 1,
    "sqft": 85,
    "imageUrl": "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
    "propertyType": "apartment",
    "transactionType": "sale",
    "district": "lisboa",
    "municipality": "lisboa",
    "parish": "alvalade"
  }'
```

## Clear All Data

To reset the database:

```bash
# Drop all data
psql -U hugo -d lister_db -c "TRUNCATE users, listings CASCADE;"

# Re-run schema
psql -U hugo -d lister_db -f server/database/schema.sql

# Re-seed
./server/database/seed.sh
```

## Docker Setup

If using Docker, seed the database inside the container:

```bash
docker exec -i lister-postgres-dev psql -U hugo -d lister_db < server/database/seed.sql
```
