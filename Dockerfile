FROM node:16.16-bullseye

ENV PORT=8080
EXPOSE 8080

CMD ["npm", "start"]
