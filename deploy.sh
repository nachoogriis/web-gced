#!/bin/bash
set -e
HOST=web-gced
ssh $HOST "cd web-gced; git pull; docker compose restart; docker image prune -f"
