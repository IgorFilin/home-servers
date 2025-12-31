#!/bin/bash
set -euo pipefail

SHARED_SERVICE=shared

FQ_IMAGE_NAME=$1
IMAGE_TAG=$2

if [ $# -ne 2 ]; then
  echo "Необходимо несколько аргументов"
  exit 1
fi

SERVICES=$(npx nx show projects --affected --base=origin/main --head=HEAD --outputStyle=static )

if [ -z "$SERVICES"  ]; then
   SERVICES=$(npx nx show projects --type=app)
fi

mapfile -t ARRAY_SERVICE <<< "$SERVICES"

for service in "${ARRAY_SERVICE[@]}"; do
  if [ "$service" != "$SHARED_SERVICE" ]; then
    BUILDED_PATH_IMAGE="${FQ_IMAGE_NAME}/${service}:${IMAGE_TAG}"
    buildah build -t "$BUILDED_PATH_IMAGE" --build-arg SERVICE_NAME=$service
    buildah push "$BUILDED_PATH_IMAGE"
  fi
done