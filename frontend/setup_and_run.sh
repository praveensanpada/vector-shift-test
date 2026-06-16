#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

if ! command -v npm >/dev/null 2>&1; then
  echo "npm is required but was not found."
  exit 1
fi

if [ ! -f ".env" ]; then
  cp ".env.example" ".env"
  echo "Created frontend/.env from frontend/.env.example"
fi

npm install

echo "Starting VectorShift frontend..."
npm start
