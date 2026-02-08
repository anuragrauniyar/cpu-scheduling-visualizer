FROM node:20-bullseye

RUN apt-get update && apt-get install -y build-essential && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY . .

# Build C++ binary inside container
RUN cd cpp-src && g++ main.cpp -O2 -o cpu

EXPOSE 3000

CMD ["node", "server/server.js"]
