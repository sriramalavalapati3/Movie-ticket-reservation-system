# Use 
FROM node

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the entire source code to the working directory
COPY . .

# Expose the port that the application listens on
EXPOSE 3000

# Specify the command to run the application
CMD ["npm","run","server"]
