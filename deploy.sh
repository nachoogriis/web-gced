#!/bin/bash
set -e

rsync -avz --delete --exclude=node_modules ./ web-gced:web-gced/
ssh web-gced "cd web-gced; docker compose restart; docker image prune -f"
