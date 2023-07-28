#!/usr/bin/env bash

err() {
    echo $* >&2
}

usage() {
    err "$(basename $0): [clear|run]"
}

clean() {
    if [ "$(docker ps -a | grep -c ${{ env.CONTAINER_NAME }})" -gt 0 ]; then
    docker stop ${{ env.CONTAINER_NAME }}
    docker rm ${{ env.CONTAINER_NAME }}
    docker image prune -a -f
    echo "[---- Deleted container ${{ env.CONTAINER_NAME }}]"
    else
    echo "[---- Container with name: ${{ env.CONTAINER_NAME }}  doesn't exist. ]"
    fi
}

pull(){
    docker pull $(echo ${{ secrets.DOCKERHUB_USERNAME }})/$(echo $IMAGE_NAME):$(echo ${{ secrets.DOCKERHUB_TAG }} | head -c7)
}

launch() {
    docker run --name ${{ env.CONTAINER_NAME }} -d -p 4000:4000 $(echo ${{ secrets.DOCKERHUB_USERNAME }})/$(echo $IMAGE_NAME):$(echo ${{ secrets.DOCKERHUB_TAG }} | head -c7)
}

execute() {
    local task={1}
    case ${task} in
        "--clear")
            clean
            ;;
        "--run")
            pull
            launch
            ;;
        *)
            err "invalid task: ${task}"
            usage
            exit 1
            ;;
    esac
}

main() {
    [ $# -ne 1 ] && { usage; exit 1; }
    local task=${1}
    execute ${task}
}

main $@