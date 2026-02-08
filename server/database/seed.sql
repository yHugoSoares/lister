-- Seed file for test data

-- Insert test users (passwords are all 'password123' hashed with bcrypt)
INSERT INTO users (email, password, role) VALUES 
  ('buyer1@example.com', '$2a$10$rXK5h5N3J5YxYJXZ5fvE3OXvYqKZQJXvYqKZQJXvYqKZQJXvYqKZQ', 'buyer'),
  ('buyer2@example.com', '$2a$10$rXK5h5N3J5YxYJXZ5fvE3OXvYqKZQJXvYqKZQJXvYqKZQJXvYqKZQ', 'buyer'),
  ('seller1@example.com', '$2a$10$rXK5h5N3J5YxYJXZ5fvE3OXvYqKZQJXvYqKZQJXvYqKZQJXvYqKZQ', 'seller'),
  ('seller2@example.com', '$2a$10$rXK5h5N3J5YxYJXZ5fvE3OXvYqKZQJXvYqKZQJXvYqKZQJXvYqKZQ', 'seller');

-- Get the seller user IDs for foreign key references
DO $$
DECLARE
  seller1_id UUID;
  seller2_id UUID;
BEGIN
  SELECT id INTO seller1_id FROM users WHERE email = 'seller1@example.com';
  SELECT id INTO seller2_id FROM users WHERE email = 'seller2@example.com';

  -- Insert sample listings
  INSERT INTO listings (title, address, price, beds, baths, sqft, image_url, property_type, transaction_type, district, municipality, parish, latitude, longitude, user_id) VALUES
    -- Lisboa properties for sale
    ('Modern Apartment in Alvalade', 'Rua João Saraiva 45, Lisboa', 350000, 3, 2, 120, 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800', 'apartment', 'sale', 'lisboa', 'lisboa', 'alvalade', 38.7436, -9.1952, seller1_id),
    ('Luxury Villa in Cascais', 'Avenida Marginal 123, Cascais', 1200000, 5, 4, 350, 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800', 'house', 'sale', 'lisboa', 'cascais', 'cascais', 38.6979, -9.4215, seller1_id),
    ('Renovated Flat in Benfica', 'Rua de Benfica 89, Lisboa', 280000, 2, 2, 95, 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800', 'apartment', 'sale', 'lisboa', 'lisboa', 'benfica', 38.7500, -9.1833, seller2_id),
    ('Penthouse with River View', 'Avenida da Liberdade 200, Lisboa', 890000, 4, 3, 200, 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800', 'condo', 'sale', 'lisboa', 'lisboa', 'estrela', 38.7169, -9.1399, seller1_id),
    
    -- Porto properties for sale
    ('Historic House in Ribeira', 'Cais da Ribeira 34, Porto', 650000, 4, 3, 180, 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800', 'house', 'sale', 'porto', 'porto', 'porto', 41.1412, -8.6118, seller2_id),
    ('Modern Loft in Boavista', 'Avenida da Boavista 567, Porto', 420000, 2, 2, 110, 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800', 'apartment', 'sale', 'porto', 'porto', 'porto', 41.1621, -8.6504, seller1_id),
    
    -- Faro properties for sale
    ('Beach Villa in Albufeira', 'Praia da Falésia, Albufeira', 980000, 5, 4, 280, 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800', 'house', 'sale', 'faro', 'albufeira', 'albufeira', 37.0871, -8.2507, seller2_id),
    ('Golf Resort Apartment', 'Vilamoura Marina, Vilamoura', 550000, 3, 2, 140, 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800', 'condo', 'sale', 'faro', 'loule', 'vilamoura', 37.0730, -8.1172, seller1_id),
    
    -- Lisboa rental properties
    ('Cozy Studio in Campo de Ourique', 'Rua Silva Carvalho 78, Lisboa', 850, 1, 1, 45, 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800', 'apartment', 'rent', 'lisboa', 'lisboa', 'campo-de-ourique', 38.7071, -9.1456, seller1_id),
    ('3BR Apartment near University', 'Alameda da Universidade 12, Lisboa', 1500, 3, 2, 110, 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800', 'apartment', 'rent', 'lisboa', 'lisboa', 'alvalade', 38.7073, -9.1542, seller2_id),
    ('Furnished Loft in Baixa', 'Rua Augusta 156, Lisboa', 1800, 2, 2, 85, 'https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800', 'apartment', 'rent', 'lisboa', 'lisboa', 'lisboa', 38.7084, -9.1365, seller1_id),
    
    -- Porto rental properties
    ('Student Apartment in Centro', 'Rua de Santa Catarina 234, Porto', 750, 2, 1, 65, 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800', 'apartment', 'rent', 'porto', 'porto', 'porto', 41.1579, -8.6291, seller2_id),
    ('Family House in Matosinhos', 'Rua de Matosinhos 45, Matosinhos', 1600, 4, 3, 150, 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800', 'house', 'rent', 'porto', 'matosinhos', 'matosinhos', 41.1843, -8.7034, seller1_id),
    
    -- Commercial properties
    ('Office Space in Parque das Nações', 'Alameda dos Oceanos 123, Lisboa', 350000, 0, 2, 180, 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800', 'commercial', 'sale', 'lisboa', 'lisboa', 'lisboa', 38.7677, -9.0942, seller2_id),
    ('Retail Shop in Baixa', 'Rua dos Fanqueiros 89, Lisboa', 280000, 0, 1, 95, 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800', 'commercial', 'sale', 'lisboa', 'lisboa', 'lisboa', 38.7117, -9.1368, seller1_id),
    
    -- Land plots
    ('Building Plot in Sintra', 'Estrada de Sintra, Sintra', 180000, 0, 0, 500, 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800', 'land', 'sale', 'lisboa', 'sintra', 'sintra', 38.8029, -9.3817, seller2_id),
    ('Agricultural Land in Alentejo', 'Évora, Alentejo', 95000, 0, 0, 2000, 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800', 'land', 'sale', 'evora', 'evora', 'evora', 38.5667, -7.9000, seller1_id);
    
END $$;

-- Display summary
SELECT 
  'Users created' as info, 
  COUNT(*) as count 
FROM users
UNION ALL
SELECT 
  'Listings created' as info, 
  COUNT(*) as count 
FROM listings;
