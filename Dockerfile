# Use an official base image
FROM node:lts

# Set the working directory inside the container
WORKDIR /ionic-sqlite-typeorm

# Copy the current directory contents into the container at /app
COPY . /ionic-sqlite-typeorm

# Install any needed packages specified in requirements.txt
RUN apt-get update && \
    apt-get install -y python3 && \
    apt-get clean

# Expose a port to the outside world
EXPOSE 8100

RUN yarn install

RUN yarn global add @ionic/cli@latest @angular/cli@latest
