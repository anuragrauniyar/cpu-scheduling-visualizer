FROM node:20-bullseye

# Install build tools for C++
RUN apt-get update && apt-get install -y build-essential && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install server dependencies
COPY server/package*.json ./server/
RUN cd server && npm install --production

# Copy the rest of the app
COPY . .

# Build C++ binary inside container
RUN cd cpp-src && g++ main.cpp -O2 -o cpu
RUN chmod +x cpp-src/cpu


EXPOSE 3000

CMD ["node", "server/server.js"]
