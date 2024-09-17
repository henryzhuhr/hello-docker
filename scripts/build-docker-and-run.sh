IMAGE_TAG="ubuntu:$(date +%Y-%m%d-%H%M%S)"

# ARG_NOCACHE="--no-cache"
# ARG_PROGRESS="--progress=plain"
# -- Multi-platform builds: https://docs.docker.com/build/building/multi-platform/
# ARG_PLATFORM="--platform=linux/amd64"
# ARG_PLATFORM="--platform=linux/arm64"
docker build \
    --tag $IMAGE_TAG \
    --file dockerfiles/Dockerfile \
    $ARG_NOCACHE $ARG_PROGRESS $ARG_PLATFORM .

docker run -it --rm $IMAGE_TAG /bin/bash --login

# docker run [OPTIONS]  IMAGE        [COMMAND] [ARG...]
# docker run -it --rm   $IMAGE_TAG   /bin/bash  --login
# -i --interactive: Keep STDIN open even if not attached
# -t --tty: Allocate a pseudo-TTY
# --rm: Automatically remove the container and its associated anonymous volumes when it exits