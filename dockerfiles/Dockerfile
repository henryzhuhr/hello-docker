# Get the base image
FROM ubuntu:latest


# ============================================================
#   安装基础的环境 (分为开发环境和部署环境)
# 「基本系统」软件列表 APT_INSTALL_LIST
#                   - ubuntu-desktop-minimal    桌面环境（会比较大）
#                   - ubuntu-server             服务器环境 (包含 openssh-server ?)
#                   - ca-certificates   证书
#                   - locales           语言环境
#                   - sudo              用于提权
# 「开发环境」软件列表 APT_INSTALL_DEV_LIST
#                   - vim nano          编辑器 (ubuntu-server 包含 vi)
#                   - git               版本控制工具
#                   - openssh-client    SSH 客户端 (ubuntu-server 不包含，所以如果使用 git clone 需要安装)
#                   - python3-dev python3-pip python3.12-venv   Python 环境
# ============================================================
# 是否开发模式，如果是开发模式，会安装「开发环境」中的软件
ARG DEV_MODE=true

# 「基本系统」中需要的软件列表
ARG APT_INSTALL_LIST="ubuntu-server"
ARG APT_INSTALL_LIST="$APT_INSTALL_LIST ca-certificates locales sudo"

# 「开发环境」中需要的软件列表
ARG APT_INSTALL_DEV_LIST=""
ARG APT_INSTALL_DEV_LIST="$APT_INSTALL_DEV_LIST vim nano"
ARG APT_INSTALL_DEV_LIST="$APT_INSTALL_DEV_LIST git openssh-client"
ARG APT_INSTALL_DEV_LIST="$APT_INSTALL_DEV_LIST python3-dev python3-pip build-essential python3.12-venv"

# 自定义镜像源 (tuna 在自定义网络下不可访问)
# ARG MIRRORS_URL="mirrors.tuna.tsinghua.edu.cn"
ARG MIRRORS_URL="mirrors.ustc.edu.cn"
ENV DEBIAN_FRONTEND=noninteractive

# set -x 选项会使得每个命令在执行前都会被打印出来，报错时会显示是哪个命令出错
RUN set -x && \
    APT_DEB822_FILE="/etc/apt/sources.list.d/ubuntu.sources" && \
    sed -i "s#//.*archive.ubuntu.com#//${MIRRORS_URL}#g" ${APT_DEB822_FILE} && \
    sed -i "s#//ports.ubuntu.com#//${MIRRORS_URL}#g" ${APT_DEB822_FILE} && \
    apt-get update && \
    apt-get upgrade -y && \
    # 开发模式下「基本系统」和「部署环境」的软件列表合并
    [ $DEV_MODE = true ] && APT_INSTALL_LIST="$APT_INSTALL_LIST $APT_INSTALL_DEV_LIST" && \
    apt-get install -y --no-install-recommends ${APT_INSTALL_LIST} && \
    apt-get autoremove -y && \
    # 清理缓存：
    # - /var/cache/apt/archives/*deb
    if [ $DEV_MODE = true ]; then \
        apt-get clean all; \
        rm -rf /var/lib/apt/lists/*; \
    fi && \
    localedef -i zh_CN -c -f UTF-8 -A /usr/share/locale/locale.alias zh_CN.UTF-8 

ENV LANG=zh_CN.utf8


# ============================================================
#   设置用户
# ============================================================
# 添加用户
ARG USER_NAME="ubuntu"
ARG USER_HOME="/home/${USER_NAME}"
# ARG USER_SHELL="/bin/bash"
# ARG USER_ID="1000"
# ARG USER_GROUP="ubuntu"
# ARG USER_GROUP_ID="1000"
# ARG USER_PASSWORD="ubuntu"
# RUN set -x && \
#     groupadd -g ${USER_GROUP_ID} ${USER_GROUP} && \
#     useradd -m -u ${USER_ID} -g ${USER_GROUP_ID} -s ${USER_SHELL} ${USER_NAME} && \
#     echo "${USER_NAME}:${USER_PASSWORD}" | chpasswd && \
#     usermod -aG sudo ${USER_NAME} && \
#     echo "${USER_NAME} ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers

# 删除该用户的密码
RUN passwd -d ${USER_NAME}

# 切换到 ubuntu 用户
USER ${USER_NAME}

# #force_color_prompt=yes 取消注释，使得终端提示符有颜色
RUN sed -i 's/#force_color_prompt=yes/force_color_prompt=yes/g' ${USER_HOME}/.bashrc


# ============================================================
#   工作目录
# ============================================================
# 默认的工程目录，可以通过外部传入参数覆盖
ARG PROJECT_NAME="project"
ADD . $USER_HOME/$PROJECT_NAME
WORKDIR $USER_HOME/$PROJECT_NAME


# ============================================================
#   Python 环境
# ============================================================
# PEP 668 – Python base environments Python 增强提案 (PEP)：https://realpython.com/python-virtual-environments-a-primer/?ref=yaolong.net
# https://www.adamsdesk.com/posts/resolve-pip-externally-managed-environment
# 临时解决方案  --ignoreExternallyManagedEnvironment
ENV PYTHON_VENV_DIR=$USER_HOME/.venv

ENV PIP_MIRROR="https://mirrors.ustc.edu.cn/pypi/simple"
RUN set -x && \
    python3 -m venv ${PYTHON_VENV_DIR} --clear && \
    source ${PYTHON_VENV_DIR}/bin/activate && \
    python3 -m pip install -i $PIP_MIRROR -U --upgrade pip setuptools wheel && \
    # 本层写入 /home/ubuntu/.config/pip/pip.conf 但是在下一层不可见，最终系统也不可见
    python3 -m pip config set global.index-url $PIP_MIRROR && \
    [[ -f requirements.txt ]] && python3 -m pip install -r requirements.txt || echo "requirements.txt not found, skip install" && \
    # 清理缓存，缓存目录：
    # - Linux:   ~/.cache/pip and ~/.cache/pipenv
    # - macOS:   ~/Library/Caches/pip and ~/.cache/pipenv
    # - Windows: %LocalAppData%/pip/Cache
    python3 -m pip cache purge

# # 提升虚拟环境 python 的优先级
ENV PATH=${PYTHON_VENV_DIR}/bin:$PATH

WORKDIR $USER_HOME

# CMD [ "/bin/bash", "--login" ]
# CMD [ "cat", "/etc/os-release" ]
# CMD [ "uname", "-m" ]
# CMD [ "cat", "/etc/os-release" ,";","uname", "-m" ]
# CMD [ "source", "${PYTHON_VENV_DIR}/bin/activate" ]
# CMD [ "which", "python3" ]
# ENTRYPOINT [ "which","python3" ]