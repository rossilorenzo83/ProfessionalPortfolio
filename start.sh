#!/bin/bash

# This script is used to start the application in production mode

# Check if the database exists and is accessible
echo "Checking database connection..."
if PGPASSWORD=$PGPASSWORD psql -h $PGHOST -U $PGUSER -d $PGDATABASE -c "SELECT 1" > /dev/null 2>&1; then
  echo "Database connection successful!"
else
  echo "Error: Could not connect to the database. Please check your database credentials."
  exit 1
fi

# Run database migrations if needed
echo "Running database migrations..."
if [ -f "./drizzle/0000_lyrical_wild_pack.sql" ]; then
  PGPASSWORD=$PGPASSWORD psql -h $PGHOST -U $PGUSER -d $PGDATABASE -f ./drizzle/0000_lyrical_wild_pack.sql
  echo "Database migrations applied!"
else
  echo "Warning: Migration file not found. Skipping migrations."
fi

# Start the application
echo "Starting the application in production mode..."
NODE_ENV=production node server/index.js
