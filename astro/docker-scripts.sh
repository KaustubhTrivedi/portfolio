#!/bin/bash

# Docker scripts for Astro Portfolio

case "$1" in
    "dev")
        echo "🚀 Starting development server..."
        docker compose up portfolio-dev -d
        ;;
    "prod")
        echo "🏭 Starting production server..."
        docker compose up portfolio -d
        ;;
    "build")
        echo "🔨 Building production image..."
        docker build -t portfolio .
        ;;
    "build-dev")
        echo "🔨 Building development image..."
        docker build -f Dockerfile.dev -t portfolio-dev .
        ;;
    "clean")
        echo "🧹 Cleaning up Docker resources..."
        docker-compose down
        docker system prune -f
        ;;
    "logs")
        echo "📋 Showing logs..."
        docker-compose logs -f
        ;;
    "shell")
        echo "🐚 Opening shell in development container..."
        docker-compose exec portfolio-dev sh
        ;;
    *)
        echo "Usage: $0 {dev|prod|build|build-dev|clean|logs|shell}"
        echo ""
        echo "Commands:"
        echo "  dev       - Start development server with hot reload"
        echo "  prod      - Start production server"
        echo "  build     - Build production Docker image"
        echo "  build-dev - Build development Docker image"
        echo "  clean     - Clean up Docker resources"
        echo "  logs      - Show container logs"
        echo "  shell     - Open shell in development container"
        exit 1
        ;;
esac