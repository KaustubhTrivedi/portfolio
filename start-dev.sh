#!/bin/bash

# Start development servers for both frontend and backend

echo "🚀 Starting development servers..."

# Function to cleanup background processes on exit
cleanup() {
    echo "🛑 Stopping servers..."
    kill $PYTHON_PID $ASTRO_PID 2>/dev/null
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Start Python backend
echo "🐍 Starting Python Flask backend on http://localhost:5000"
cd python
python app.py &
PYTHON_PID=$!
cd ..

# Wait a moment for Python to start
sleep 3

# Start Astro frontend
echo "⭐ Starting Astro frontend on http://localhost:4321"
cd astro
npm run dev &
ASTRO_PID=$!
cd ..

echo "✅ Both servers are starting..."
echo "📱 Frontend: http://localhost:4321"
echo "🔧 Backend API: http://localhost:5000"
echo "💬 Chat interface: http://localhost:4321/ask-about-me"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for both processes
wait 