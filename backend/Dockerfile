FROM node:22-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy everything at once to ensure all files are available
COPY . .

# Install all dependencies and ensure cors is installed
RUN npm install && \
    npm install cors @types/cors --save && \
    npm list cors

# Build the TypeScript code
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "start"]
