FROM oven/bun:1.2.23
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN bun install
CMD bun start
