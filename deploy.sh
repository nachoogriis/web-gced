#!/bin/bash
set -e

HOST=web-gced
rsync -avz --delete --exclude=node_modules ./ $HOST:web-gced/
ssh $HOST "cd web-gced; docker compose restart; docker image prune -f"
