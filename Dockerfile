FROM node:19-alpine
COPY . /daily-post/
WORKDIR /daily-post
RUN npm install
CMD ["npm", "start"]