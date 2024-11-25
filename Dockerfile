# Use Node.js as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json/yarn.lock
COPY package*.json ./

# Install dependencies
RUN npm install --production
# Or if using Yarn
# RUN yarn install --production

# Copy the rest of the app
COPY . .

# Build the static site
RUN npm run build
# Or if using Yarn
# RUN yarn build

# Expose the port Docusaurus runs on
EXPOSE 3000

# Command to run the app
CMD ["npm", "run", "serve"]
