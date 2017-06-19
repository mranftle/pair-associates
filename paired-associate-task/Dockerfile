
# FROM ubuntu:latest
# MAINTAINER Matt Ranftle
#
# # update packages
# RUN apt-get update
#
# #Install curl & git
# RUN apt-get -qq -y install curl
# RUN apt-get install -yqq git
#
# #Download and install nodejs-6
# RUN curl -sL https://deb.nodesource.com/setup_7.x -o nodesource_setup.sh
# RUN bash nodesource_setup.sh
# RUN apt-get install -yqq nodejs
# RUN apt-get install -yqq build-essential
# RUN npm install -g angular-cli
#
# # install apache http server
# RUN git clone https://github.com/mranftle/pair-associates.git
# WORKDIR /pair-associates/paired-associate-task
# RUN npm install
# RUN npm build --prod
# CMD http-server ./dist -p 4200
