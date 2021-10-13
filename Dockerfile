FROM node:14.17.6-slim as build

WORKDIR /opt/ni-hao-numbers

COPY package*.json /opt/ni-hao-numbers/
RUN npm install
COPY . /opt/ni-hao-numbers/
RUN npm run build

FROM nginx:1.20.1

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
# this will copy the compiled reactjs application to the container
# --from gets allows us access to the previous container so we can copy the files to the nginx container
EXPOSE 80
COPY --from=build /opt/ni-hao-numbers/build /usr/share/nginx/html