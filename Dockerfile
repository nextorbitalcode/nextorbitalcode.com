# Stage 1: Build the Hugo site
FROM hugomods/hugo:exts as builder

WORKDIR /src

# Copy source files
COPY . .

# Build the site
RUN hugo --minify

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Install curl for health checks
RUN apk add --no-cache curl

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built site from builder stage
COPY --from=builder /src/public /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl --fail --silent http://localhost/ > /dev/null || exit 1

CMD ["nginx", "-g", "daemon off;"]

