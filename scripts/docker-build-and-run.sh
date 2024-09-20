TAG=$(date +%Y-%m%d-%H%M%S)
TAG=latest
IMAGE_TAG="ubuntu:$TAG"


# 定义构建参数（根据需要取消注释）
buildArgs=(
    "--no-cache" # 不使用缓存
    "--progress" "plain" # 显示构建进度
    # "--platform" "linux/amd64" # 跨平台构建 x86_64 -- Multi-platform builds: https://docs.docker.com/build/building/multi-platform/
)
docker build . -t $IMAGE_TAG -f dockerfiles/Dockerfile ${buildArgs[@]}


# USER_NAME=ubuntu
# WORKDIR=/home/$USER_NAME/$(basename $PWD)  # 挂载的工作目录的权限问题，目前挂载的目录权限是 root，不是ubuntu
USER_NAME=root
WORKDIR=/$USER_NAME/$(basename $PWD)
# 定义运行参数（根据需要取消注释）
runArgs=(
    "-i"    # -i --interactive: Keep STDIN open even if not attached
    "-t"    # -t --tty: Allocate a pseudo-TTY
    "--rm"  # --rm: Automatically remove the container and its associated anonymous volumes when it exits
    "-v" "$PWD:$WORKDIR" # 挂载当前目录
    "-w" "$WORKDIR"      # 指定工作目录
    "-u" "$USER_NAME"    # 指定用户
)
# docker run [OPTIONS]   IMAGE      [COMMAND] [ARG...]
docker   run ${runArgs[@]} $IMAGE_TAG /bin/bash --login
