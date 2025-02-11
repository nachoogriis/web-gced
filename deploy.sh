#!/bin/bash
set -e

rsync -avz --delete --exclude=node_modules ./ pgced:web-gced/
ssh pgced "cd web-gced; docker compose restart; docker image prune -f"
