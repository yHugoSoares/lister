import express from 'express';
import { query } from '../config/database.js';
import { authenticateToken, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// Helper function to check if a point is inside a polygon  
// Using ray casting algorithm - casting a horizontal ray from the point
// Point and polygon vertices are in [latitude, longitude] format
function isPointInPolygon(point, polygon) {
  const [lat, lng] = point;  // lat is like Y (vertical), lng is like X (horizontal)
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [lati, lngi] = polygon[i];
    const [latj, lngj] = polygon[j];
    // Check if edge crosses the horizontal ray from our point
    // Then check if the intersection is to the right (east) of our point
    const intersect = ((lati > lat) !== (latj > lat)) &&
      (lng < (lngj - lngi) * (lat - lati) / (latj - lati) + lngi);
    if (intersect) inside = !inside;
  }
  return inside;
}

// GET all listings
router.get('/', optionalAuth, async (req, res) => {
  try {
    const {
      transactionType,
      propertyType,
      district,
      municipality,
      parish,
      minPrice,
      maxPrice,
      bedrooms,
      bathrooms,
      area,
    } = req.query;
    
    console.log('Query params received:', { transactionType, propertyType, district, municipality, parish, minPrice, maxPrice, bedrooms, bathrooms, hasArea: !!area });

    let queryText = 'SELECT * FROM listings WHERE 1=1';
    const params = [];
    let paramCount = 1;

    if (minPrice) {
      queryText += ` AND price >= $${paramCount}`;
      params.push(parseFloat(minPrice));
      paramCount++;
    }

    if (maxPrice) {
      queryText += ` AND price <= $${paramCount}`;
      params.push(parseFloat(maxPrice));
      paramCount++;
    }

    if (bedrooms && bedrooms !== 'any') {
      queryText += ` AND beds >= $${paramCount}`;
      params.push(parseInt(bedrooms));
      paramCount++;
    }

    if (bathrooms && bathrooms !== 'any') {
      queryText += ` AND baths >= $${paramCount}`;
      params.push(parseInt(bathrooms));
      paramCount++;
    }

    if (propertyType && propertyType !== 'any') {
      queryText += ` AND property_type = $${paramCount}`;
      params.push(propertyType);
      paramCount++;
    }

    if (transactionType && transactionType !== 'any') {
      queryText += ` AND transaction_type = $${paramCount}`;
      params.push(transactionType);
      paramCount++;
    }

    if (district && district !== 'any') {
      queryText += ` AND district = $${paramCount}`;
      params.push(district);
      paramCount++;
    }

    if (municipality && municipality !== 'any') {
      queryText += ` AND municipality = $${paramCount}`;
      params.push(municipality);
      paramCount++;
    }

    if (parish && parish !== 'any') {
      queryText += ` AND parish = $${paramCount}`;
      params.push(parish);
      paramCount++;
    }

    // Filter by coordinates if present
    if (area) {
      queryText += ` AND latitude IS NOT NULL AND longitude IS NOT NULL`;
    }

    queryText += ' ORDER BY created_at DESC';

    const result = await query(queryText, params);
    
    // Filter by geographical area if provided
    let filteredResults = result.rows;
    if (area) {
      try {
        const geoJSON = JSON.parse(area);
        console.log('GeoJSON received:', JSON.stringify(geoJSON, null, 2));
        if (geoJSON.geometry && geoJSON.geometry.coordinates && geoJSON.geometry.coordinates[0]) {
          const polygon = geoJSON.geometry.coordinates[0].map(coord => [coord[1], coord[0]]);
          console.log('Polygon points (lat, lng):', polygon);
          console.log('Total listings before filtering:', result.rows.length);
          console.log('Sample listing coordinates:', result.rows.slice(0, 3).map(l => ({ 
            title: l.title, 
            lat: l.latitude, 
            lng: l.longitude 
          })));
          
          filteredResults = result.rows.filter(listing => {
            if (listing.latitude && listing.longitude) {
              const point = [parseFloat(listing.latitude), parseFloat(listing.longitude)];
              const isInside = isPointInPolygon(point, polygon);
              console.log(`Checking ${listing.title}: [${point}] => ${isInside}`);
              return isInside;
            }
            return false;
          });
          console.log('Filtered results:', filteredResults.length);
        }
      } catch (err) {
        console.error('Error parsing area filter:', err);
      }
    }

    // Convert snake_case to camelCase for frontend
    const formattedResults = filteredResults.map(listing => ({
      ...listing,
      imageUrl: listing.image_url,
      propertyType: listing.property_type,
      transactionType: listing.transaction_type,
      createdAt: listing.created_at,
      updatedAt: listing.updated_at,
      userId: listing.user_id,
    }));

    res.json(formattedResults);
  } catch (error) {
    console.error('Error fetching listings:', error);
    res.status(500).json({ message: 'Failed to fetch listings', error: error.message });
  }
});

// GET single listing by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query('SELECT * FROM listings WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    const listing = result.rows[0];
    const formattedListing = {
      ...listing,
      imageUrl: listing.image_url,
      propertyType: listing.property_type,
      transactionType: listing.transaction_type,
      createdAt: listing.created_at,
      updatedAt: listing.updated_at,
      userId: listing.user_id,
    };

    res.json(formattedListing);
  } catch (error) {
    console.error('Error fetching listing:', error);
    res.status(500).json({ message: 'Failed to fetch listing', error: error.message });
  }
});

// POST create new listing (requires authentication)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const {
      title,
      address,
      price,
      beds,
      baths,
      sqft,
      imageUrl,
      propertyType,
      transactionType,
      district,
      municipality,
      parish,
    } = req.body;

    const result = await query(
      `INSERT INTO listings 
       (title, address, price, beds, baths, sqft, image_url, property_type, transaction_type, district, municipality, parish, user_id) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) 
       RETURNING *`,
      [
        title,
        address,
        price,
        beds,
        baths,
        sqft,
        imageUrl,
        propertyType,
        transactionType,
        district,
        municipality,
        parish,
        req.user.id,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating listing:', error);
    res.status(500).json({ message: 'Failed to create listing', error: error.message });
  }
});

// PUT update listing (requires authentication)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      address,
      price,
      beds,
      baths,
      sqft,
      imageUrl,
      propertyType,
      transactionType,
      district,
      municipality,
      parish,
    } = req.body;

    const result = await query(
      `UPDATE listings 
       SET title = $1, address = $2, price = $3, beds = $4, baths = $5, sqft = $6, 
           image_url = $7, property_type = $8, transaction_type = $9, district = $10, 
           municipality = $11, parish = $12, updated_at = NOW()
       WHERE id = $13 AND user_id = $14
       RETURNING *`,
      [
        title,
        address,
        price,
        beds,
        baths,
        sqft,
        imageUrl,
        propertyType,
        transactionType,
        district,
        municipality,
        parish,
        id,
        req.user.id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Listing not found or unauthorized' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating listing:', error);
    res.status(500).json({ message: 'Failed to update listing', error: error.message });
  }
});

// DELETE listing (requires authentication)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query(
      'DELETE FROM listings WHERE id = $1 AND user_id = $2 RETURNING id',
      [id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Listing not found or unauthorized' });
    }

    res.json({ message: 'Listing deleted successfully' });
  } catch (error) {
    console.error('Error deleting listing:', error);
    res.status(500).json({ message: 'Failed to delete listing', error: error.message });
  }
});

export default router;
