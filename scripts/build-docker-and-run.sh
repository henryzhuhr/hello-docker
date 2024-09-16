IMAGE_TAG="ubuntu:$(date +%Y-%m%d-%H%M%S)"

ARG_NOCACHE="--no-cache"
# ARG_PROGRESS="--progress=plain" 
docker build \
    --tag $IMAGE_TAG \
    --file dockerfiles/Dockerfile \
    $ARG_NOCACHE \
    $ARG_PROGRESS \
    .

docker run \
    --interactive --tty \
    --rm $IMAGE_TAG \
    /bin/bash

# -i --interactive: Keep STDIN open even if not attached
# -t --tty: Allocate a pseudo-TTY
# --rm: Automatically remove the container and its associated anonymous volumes when it exits