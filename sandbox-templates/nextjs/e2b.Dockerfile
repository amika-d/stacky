# You can use most Debian-based base images
FROM node:21-slim

# Install system dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends curl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copy script and set permissions
COPY compile_page.sh /compile_page.sh
RUN chmod +x /compile_page.sh

# Set working directory and create app as root (fastest approach)
WORKDIR /home/user
RUN mkdir -p /home/user && \
    npx --yes create-next-app@15.3.3 . --yes && \
    npx --yes shadcn@2.6.3 init --yes -b neutral --force && \
    npx --yes shadcn@2.6.3 add --all --yes && \
    npm cache clean --force