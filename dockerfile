FROM oven/bun:latest
WORKDIR /app
RUN bun install
COPY . /app
EXPOSE 3000:3000
CMD ["bun", "start"]
