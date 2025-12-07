# Multi-stage build for Astro portfolio
FROM node:24.11-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:24.11-alpine AS production

# Set working directory
WORKDIR /app

# Copy built files from builder stage
COPY --from=builder /app/dist .

# Install a simple HTTP server
RUN npm install -g serve

# Expose port 3000
EXPOSE 3000

# Start the server
CMD ["serve", "-s", ".", "-l", "3000"]