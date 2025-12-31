#!/bin/bash
set -euo pipefail

SERVICES=$(npx nx show projects --affected --base=origin/main --head=HEAD --outputStyle=static )

if [ -z "$SERVICES"  ]; then
   SERVICES=$(npx nx show projects --type=app)
fi

mapfile -t ARRAY_SERVICE <<< "$SERVICES"

echo "${ARRAY_SERVICE[@]}"