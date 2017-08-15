# NodejS latest version.
FROM node:latest

RUN git clone https://github.com/mabdullah353/koajsapp.git
WORKDIR /koajsapp
RUN npm install

# Run migrations to create Database, and it's tables.
RUN npm run mg:run
RUN npm start

# Default PORT our App start with.
EXPOSE 8080