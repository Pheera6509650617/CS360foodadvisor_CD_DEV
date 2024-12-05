# Use Node.js version 18 as the base image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy dependency files and install
COPY package*.json ./
RUN npm ci && npm cache clean --force

# Copy the remaining files
COPY . .

# Expose the application port
EXPOSE 3000

# Run the application
CMD ["npm", "start"]
