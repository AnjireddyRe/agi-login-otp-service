# Use official Node.js base image
FROM node:18

# Create app directory
WORKDIR /app

# Copy files
COPY . .

# Install dependencies
RUN npm install

# Expose port
EXPOSE 5000

# Start the app
CMD ["npm", "start"]
