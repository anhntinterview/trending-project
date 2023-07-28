#!/usr/bin/env bash

echo "IMAGE_NAME=$IMAGE_NAME"
echo "CONTAINER_NAME=$CONTAINER_NAME"

build_docker(){
    docker build -t $(echo ${{ secrets.DOCKERHUB_USERNAME }})/$(echo $IMAGE_NAME):$(echo ${{ secrets.DOCKERHUB_TAG }} | head -c7) -f Dockerfile.app .
}