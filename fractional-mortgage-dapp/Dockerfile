FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install Python and build dependencies for native modules
RUN apk add --no-cache python3 make g++ gcc

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose port for development server
EXPOSE 5173

# Start development server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
