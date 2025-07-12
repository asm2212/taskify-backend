# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /usr/src/app

# Install dependencies first (cached unless package.json changes)
COPY package*.json ./
RUN npm ci --quiet

# Copy and build source
COPY . .
RUN npm run build

# Stage 2: Runtime
FROM node:18-alpine
WORKDIR /usr/src/app

# Copy production artifacts
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/package*.json ./

# Install only production dependencies
RUN npm install --production --quiet

# Security hardening
RUN apk add --no-cache tini
USER node
EXPOSE 3000

# Health check and graceful shutdown
HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost:3000/health || exit 1

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "dist/main.js"]