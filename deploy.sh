#!/bin/bash
set -e
HOST=web-gced
ssh $HOST <<EOF
cd web-gced
git pull
docker compose down -v
docker image rm web-gced
docker image rm web-gced-web-gced
docker compose up -d
docker image prune -f
EOF
