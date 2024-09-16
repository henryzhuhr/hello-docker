# Get the base image
FROM ubuntu:latest

ENV LANG=zh_CN.utf8

# 开发环境中需要的软件列表
# ARG APT_INSTALL_DEV_LIST=""
#                                                 ubuntu 桌面/服务器环境
# ARG APT_INSTALL_DEV_LIST="$APT_INSTALL_DEV_LIST ubuntu-desktop-minimal"
# ARG APT_INSTALL_DEV_LIST="$APT_INSTALL_DEV_LIST ubuntu-server openssh-server"
# ARG APT_INSTALL_DEV_LIST="$APT_INSTALL_DEV_LIST vi vim"
#                                                                     用于获取源码、配置密钥等工具
# ARG APT_INSTALL_DEV_LIST="$APT_INSTALL_DEV_LIST git openssh-client"
#                                                              python3-dev 好像会随 ubuntu-server 安装
# ARG APT_INSTALL_DEV_LIST="$APT_INSTALL_DEV_LIST python3-pip"
# ARG APT_INSTALL_DEV_LIST="$APT_INSTALL_DEV_LIST build-essential cmake"

# 部署环境中需要的软件列表
ARG APT_INSTALL_LIST="ca-certificates locales"

# ARG APT_INSTALL_LIST="$APT_INSTALL_LIST $APT_INSTALL_DEV_LIST"

# 换源，取消注释选择一个(tuna 在自定义网络下不可访问)
# ARG MIRRORS_URL="mirrors.tuna.tsinghua.edu.cn"
ARG MIRRORS_URL="mirrors.ustc.edu.cn"


# set -x 选项会使得每个命令在执行前都会被打印出来，报错时会显示是哪个命令出错
RUN set -x \
    && DEBIAN_FRONTEND=noninteractive \
    && APT_DEB822_FILE="/etc/apt/sources.list.d/ubuntu.sources" \
    && cp ${APT_DEB822_FILE} ${APT_DEB822_FILE}.bak \
    && sed -i "s#//.*archive.ubuntu.com#//${MIRRORS_URL}#g" ${APT_DEB822_FILE} \
    && sed -i "s#//ports.ubuntu.com#//${MIRRORS_URL}#g" ${APT_DEB822_FILE} \
    && apt-get update \
    && apt-get upgrade -y \
    && apt-get install -y --no-install-recommends ${APT_INSTALL_LIST} \
    && apt-get autoremove -y \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN localedef -i zh_CN -c -f UTF-8 -A /usr/share/locale/locale.alias zh_CN.UTF-8

# 容器内的用户目录
ARG USER_HOME="/root"
# 挂载本地（自己电脑中）的.ssh文件夹到容器中
# ADD /Users/henryzhu/.ssh.local $USER_HOME/.ssh/
ADD . $USER_HOME/project
WORKDIR $USER_HOME/project


# CMD [ "/bin/bash", "--login" ]
# CMD [ "cat", "/etc/os-release" ]
# CMD [ "uname", "-m" ]

