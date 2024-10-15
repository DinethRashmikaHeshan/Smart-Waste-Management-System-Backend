# Base image used  
FROM node:alpine 
COPY ./ ./
# Install project dependencies
RUN npm install
# Running default command
CMD ["npm", "start"]