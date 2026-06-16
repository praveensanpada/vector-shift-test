#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

if ! command -v python3 >/dev/null 2>&1; then
  echo "python3 is required but was not found."
  exit 1
fi

if [ ! -f ".env" ]; then
  cp ".env.example" ".env"
  echo "Created backend/.env from backend/.env.example"
fi

if [ ! -d "vector_shift_venv" ]; then
  python3 -m venv vector_shift_venv
  echo "Created backend/vector_shift_venv"
fi

source vector_shift_venv/bin/activate

python -m pip install --upgrade pip
python -m pip install -r requirements.txt

echo "Starting VectorShift backend..."
python main.py
