#!/bin/bash

# Create the database tables from schema
echo "Creating database tables..."

# Run SQL migrations directly
PGPASSWORD=$PGPASSWORD psql -h $PGHOST -U $PGUSER -d $PGDATABASE -f ./drizzle/0000_lyrical_wild_pack.sql

# Verify the tables were created
PGPASSWORD=$PGPASSWORD psql -h $PGHOST -U $PGUSER -d $PGDATABASE -c "\dt"

echo "Database setup complete!"
