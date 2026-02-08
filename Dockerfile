FROM node:20-bullseye

# Install build tools for C++
RUN apt-get update && apt-get install -y build-essential && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy server deps
COPY server/package*.json ./server/
RUN cd server && npm install

# Copy rest of the app
COPY . .

# Build C++ binary
RUN cd cpp && g++ *.cpp -O2 -o cpu

# Expose port
EXPOSE 3000

# Start server
CMD ["node", "server/server.js"]
