#!/bin/bash

# This script runs after the container is created
set -e

echo "🚀 Setting up development environment..."

# Install Node.js dependencies for Astro project
if [ -d "astro" ]; then
    echo "📦 Installing Astro dependencies..."
    cd astro
    npm install
    cd ..
fi

# Install Python dependencies using UV
if [ -d "python" ]; then
    echo "🐍 Setting up Python environment with UV..."
    cd python
    # UV will automatically detect pyproject.toml and install dependencies
    uv sync
    uv pip install -r requirements.txt
    cd ..
fi

echo "✅ Development environment setup complete!"
echo ""
echo "To start the Astro dev server: cd astro && npm run dev"
echo "To start the Python backend: cd python && uv run python app.py"

