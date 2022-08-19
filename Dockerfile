FROM node:lts-alpine as builder

# make the 'app' folder the current working directory
WORKDIR /shop_admin_build
# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies
RUN npm install

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

ARG VUE_APP_API
ENV VUE_APP_API=$VUE_APP_API
# build app for production with minification
RUN npm run build



#FROM nginx:alpine
#
#COPY --from=builder /shop_admin_build/dist /usr/share/nginx/html
RUN npm install -g serve

CMD ["serve", "-s", "dist"]