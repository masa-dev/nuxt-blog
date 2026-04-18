FROM node:24-bookworm-slim

RUN apt update && apt install -y git vim

ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321
