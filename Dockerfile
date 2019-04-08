FROM node:10.15.3

ENV INSTALL_PATH /usr/src/app
RUN mkdir -p $INSTALL_PATH
WORKDIR $INSTALL_PATH

COPY package.json $INSTALL_PATH
COPY package-lock.json $INSTALL_PATH

RUN npm install -g @angular/cli@7.3.3
