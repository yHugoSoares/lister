-- Add geographical coordinates to listings table

ALTER TABLE listings 
ADD COLUMN IF NOT EXISTS latitude DECIMAL(10, 8),
ADD COLUMN IF NOT EXISTS longitude DECIMAL(11, 8);

-- Create index for geo queries
CREATE INDEX IF NOT EXISTS idx_listings_coordinates ON listings(latitude, longitude);

-- Update existing listings with approximate coordinates
-- Lisboa properties
UPDATE listings SET latitude = 38.7436, longitude = -9.1952 WHERE address LIKE '%Alvalade%';
UPDATE listings SET latitude = 38.6979, longitude = -9.4215 WHERE address LIKE '%Cascais%';
UPDATE listings SET latitude = 38.7500, longitude = -9.1833 WHERE address LIKE '%Benfica%';
UPDATE listings SET latitude = 38.7169, longitude = -9.1399 WHERE address LIKE '%Liberdade%';
UPDATE listings SET latitude = 38.7071, longitude = -9.1456 WHERE address LIKE '%Silva Carvalho%';
UPDATE listings SET latitude = 38.7073, longitude = -9.1542 WHERE address LIKE '%Alameda da Universidade%';
UPDATE listings SET latitude = 38.7084, longitude = -9.1365 WHERE address LIKE '%Augusta%';
UPDATE listings SET latitude = 38.7677, longitude = -9.0942 WHERE address LIKE '%Oceanos%';
UPDATE listings SET latitude = 38.7117, longitude = -9.1368 WHERE address LIKE '%Fanqueiros%';
UPDATE listings SET latitude = 38.8029, longitude = -9.3817 WHERE address LIKE '%Sintra%';

-- Porto properties
UPDATE listings SET latitude = 41.1412, longitude = -8.6118 WHERE address LIKE '%Ribeira%';
UPDATE listings SET latitude = 41.1621, longitude = -8.6504 WHERE address LIKE '%Boavista%';
UPDATE listings SET latitude = 41.1579, longitude = -8.6291 WHERE address LIKE '%Santa Catarina%';
UPDATE listings SET latitude = 41.1843, longitude = -8.7034 WHERE address LIKE '%Matosinhos%';

-- Faro properties
UPDATE listings SET latitude = 37.0871, longitude = -8.2507 WHERE address LIKE '%Albufeira%';
UPDATE listings SET latitude = 37.0730, longitude = -8.1172 WHERE address LIKE '%Vilamoura%';

-- Évora property
UPDATE listings SET latitude = 38.5667, longitude = -7.9000 WHERE address LIKE '%Évora%';
