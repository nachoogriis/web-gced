#!/bin/bash
set -e

export REMOTE_DB_DIR="/home/pgced/web-gced/db"
source ".env"
export PORT

echo "Deploying..."

# Do an "npm install" to freshen package-lock.json (since we use Bun)
npm install

# UID is the user ID of the "pro1" user at RACSO!
docker buildx build \
  --build-arg PORT="$PORT" \
  --build-arg UID=1001 \
  -t web-gced .

# Transferir imatge directament al destí
docker save web-gced | gzip | docker --context=pgced load

docker --context=racso compose up -d
# An image is left unreferenced by the last container, so remove it
# docker --context=racso image prune -f