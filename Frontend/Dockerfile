FROM node:20-alpine

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

# Install serve to serve the static files
RUN npm install -g serve

CMD ["serve", "-s", "dist", "-l", "3000"]
