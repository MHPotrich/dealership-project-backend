FROM oven/bun:latest
WORKDIR /app
COPY . /app
RUN bun install
EXPOSE 3000:3000
CMD bun run start