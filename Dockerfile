# Base image used  
FROM node:alpine 
COPY ./ ./
# Install project dependencies
RUN npm install
EXPOSE 8080
# Running default command
CMD ["npm", "start"]