#!/bin/bash

# Seed script to populate the database with test data

echo "🌱 Seeding database with test data..."

# Get the directory of this script
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Load environment variables
if [ -f "$DIR/../.env" ]; then
    export $(cat "$DIR/../.env" | grep -v '^#' | xargs)
fi

# Database connection details
DB_HOST=${DB_HOST:-localhost}
DB_PORT=${DB_PORT:-5432}
DB_NAME=${DB_NAME:-lister_db}
DB_USER=${DB_USER:-hugo}

# Check if psql is available
if ! command -v psql &> /dev/null; then
    if [ -f "/opt/homebrew/opt/postgresql@16/bin/psql" ]; then
        PSQL="/opt/homebrew/opt/postgresql@16/bin/psql"
    else
        echo "❌ Error: psql command not found"
        exit 1
    fi
else
    PSQL="psql"
fi

# Run the seed file
echo "Running seed.sql..."
$PSQL -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f "$DIR/seed.sql"

if [ $? -eq 0 ]; then
    echo "✅ Database seeded successfully!"
    echo ""
    echo "Test Accounts:"
    echo "  Buyer 1: buyer1@example.com / password123"
    echo "  Buyer 2: buyer2@example.com / password123"
    echo "  Seller 1: seller1@example.com / password123"
    echo "  Seller 2: seller2@example.com / password123"
    echo ""
    echo "📊 Sample data includes:"
    echo "  - 17 property listings across Portugal"
    echo "  - Various property types (apartments, houses, commercial, land)"
    echo "  - Both sale and rental properties"
    echo "  - Multiple districts (Lisboa, Porto, Faro)"
else
    echo "❌ Error seeding database"
    exit 1
fi
