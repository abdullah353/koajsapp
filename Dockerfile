# NodejS latest version.
FROM node:latest

# Set environment variables
ENV PORT 8080
ENV LOGGER_LEVEL warn


COPY ./ /koajsapp/
WORKDIR /koajsapp

# NPM Bug 
RUN rm -rf node_modules/
# Not pushing local DB, if their is any.
RUN rm database/db.sqlite

RUN ls -alh
RUN cat package.json
RUN npm install

# Run migrations to create Database, and it's tables.
RUN npm run mg:run

# Default PORT our App start with.
EXPOSE 8080

CMD ["npm", "start"]