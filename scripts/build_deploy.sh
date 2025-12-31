#!/bin/bash
set -euo pipefail

SHARED_SERVICE=shared

FILE_PATH="$1"
FQ_IMAGE_NAME="$2"
IMAGE_TAG="$3"

if [ $# -lt 3 ]; then
  echo "Не передено нужное количество аргументов (3)"
  exit 1
fi

IFS=' ' read -ra ARRAY_SERVICE < "$FILE_PATH"

for service in "${ARRAY_SERVICE[@]}"; do
  if [ "$service" != "$SHARED_SERVICE" ]; then
    BUILDED_PATH_IMAGE="${FQ_IMAGE_NAME}/${service}:${IMAGE_TAG}"
    buildah build -t "$BUILDED_PATH_IMAGE" --build-arg SERVICE_NAME="$service"
    buildah push "$BUILDED_PATH_IMAGE"
  fi
done