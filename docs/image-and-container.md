---
outline: deep
---

# 镜像与容器

## Docker 中的镜像与容器

## 镜像的基本操作

### 获取镜像

在 [Docker Hub](https://hub.docker.com) 可以找到大量的镜像，通过 `docker pull` 获取这些镜像
```bash
docker pull [OPTIONS] NAME[:TAG|@DIGEST]
```
`NAME` 为镜像名，`TAG` 为标签，`DIGEST` 为镜像的哈希值，其中 `NAME` 是必须的，`TAG` 和 `DIGEST` 二者选一

例如 [操作系统 ubuuntu](https://hub.docker.com/_/ubuntu) 的镜像可以通过简单一行命令获取
```bash
docker pull ubuntu
# Using default tag: latest
# latest: Pulling from library/ubuntu
# Digest: sha256:8a37d68f4f73ebf3d4efafbcf66379bf3728902a8038616808f04e34a9ab63ee
# Status: Downloaded newer image for ubuntu:latest
# docker.io/library/ubuntu:latest
```
可以看到上述命令没有给出 Docker 镜像仓库的地址，因此会默认从 [Docker Hub](https://hub.docker.com)(`docker.io`) 获取镜像，即 `library/ubuntu` ，因此完整的镜像名为 `docker.io/library/ubuntu`，标签为 `latest`，即最新版本

此外，还可以通过指定版本号、架构等来获取镜像
```bash
docker pull ubuntu:24.04    # 指定版本
docker pull ubuntu:latest   # 最新版本 (latest LTS)
docker pull arm64v8/ubuntu  # 指定架构
docker pull arm64v8/ubuntu:latest  # 指定架构和版本
```


同样地，[深度学习环境 pytorch](https://hub.docker.com/r/pytorch/pytorch) 也是如此
```bash
docker pull pytorch/pytorch
docker pull pytorch/pytorch:2.4.0-cuda11.8-cudnn9-runtime
```


### 查看镜像

查看镜像的命令为（三条命令等效）
```bash
docker images       [OPTIONS] [REPOSITORY[:TAG]]
docker images ls    [OPTIONS] [REPOSITORY[:TAG]]
docker images list  [OPTIONS] [REPOSITORY[:TAG]]
```

列举出所有镜像的信息，包括仓库名、标签、镜像 ID、创建时间、大小等，也可以通过指定仓库名和标签来过滤
```bash
docker images
# REPOSITORY      TAG     IMAGE ID       CREATED      SIZE
# ubuntu          24.04   1a799365aa63   3 weeks ago  101MB
# ubuntu          latest  1a799365aa63   3 weeks ago  101MB
# arm64v8/ubuntu  latest  1a799365aa63   3 weeks ago  101MB
# ...

docker images ubuntu
# REPOSITORY      TAG     IMAGE ID       CREATED      SIZE
# ubuntu          24.04   1a799365aa63   3 weeks ago  101MB
# ubuntu          latest  1a799365aa63   3 weeks ago  101MB
```

上面可以观察到，`ubuntu` 镜像的 `24.04` 和 `latest` 两个标签对应的 `IMAGE ID` 是一样的，这是因为它们是同一个镜像的不同版本，只是标签不同而已

上述命令列出的镜像的体积的总和未必等于磁盘上的实际占用空间，因为 Docker 会对镜像进行分层存储，相同的层只会存储一份（使用 Union FS），因此实际占用空间会小于镜像的总和，可以通过 `docker system df` 查看实际占用空间
```bash
docker system df
TYPE            TOTAL     ACTIVE    SIZE      RECLAIMABLE
Images          20        11        4.699GB   2.886GB (61%)
Containers      37        18        78.34MB   78.34MB (99%)
Local Volumes   2         2         1.464GB   0B (0%)
Build Cache     225       0         8.474GB   8.474GB
```


### 查看镜像

查看本地镜像的详细信息，可以通过 `docker inspect` 命令
```bash
docker inspect [OPTIONS] NAME|ID [NAME|ID...]
```


### 删除和清理镜像

删除镜像的命令如下（三条命令等效）
```bash
docker rmi          [OPTIONS] IMAGE [IMAGE...]
docker image rm     [OPTIONS] IMAGE [IMAGE...]
docker image remove [OPTIONS] IMAGE [IMAGE...]
```

删除镜像时，如果有容器在使用该镜像，则会报错，可以通过 `-f` 强制删除
```bash
docker rmi -f <IMAGE ID>
```

可以配合使用其他命令来删除多个 ubuntu 镜像
```bash
docker image rm $(docker image ls -q ubuntu)
```


在查看镜像中可能出现 `<none>` 的情况，这些镜像被称为悬空镜像(dangling image)
```bash
# REPOSITORY      TAG     IMAGE ID       CREATED      SIZE
# <none>          <none>  1a799365aa63   3 weeks ago  101MB
```

可以通过下面的命令删除悬空镜像
```
docker image prune
```

## 容器的基本操作

有了镜像之后，就可以通过镜像创建容器，容器是镜像的一个实例，可以运行、停止、删除等

### 创建容器

创建容器的命令为
```bash
docker create [OPTIONS] IMAGE [COMMAND] [ARG...]
docker container create [OPTIONS] IMAGE [COMMAND] [ARG...]
```

例如基于 `ubuntu:latest` 镜像创建一个名为 `my-ubuntu` 的容器
```bash
docker create --name my-ubuntu ubuntu:latest
```

但是这时候容器并没有运行，可以通过 `docker start` 命令来启动容器

### 启动容器

启动容器的命令为
```bash
docker start [OPTIONS] CONTAINER [CONTAINER...]
```

### 创建并启动容器

然而实际上，很少使用 `docker create` 和 `docker start` 来创建和启动容器，而是直接使用 `docker run` 命令，该命令会自动创建并启动容器
```bash
docker run [OPTIONS] IMAGE [COMMAND] [ARG...]
```

例如创建一个基于 `ubuntu:latest` 镜像的容器，并在容器中执行 `echo hello docker` 命令
```bash
docker run ubuntu:latest echo hello docker
# hello docker
```

容器在执行完命令后就会退出，可以通过 `docker ps -a` 查看容器的状态
```bash
docker ps -a
# CONTAINER ID   IMAGE            COMMAND             CREATED              STATUS                     PORTS   NAMES
# b67e43d77bc5   ubuntu:latest    "echo hello docker"  About a minute ago   Exited (0) About a minute          hungry_williamson
```                                                                                           

如果想要进入容器的交互式终端，可以通过 `-it` 选项，并启动 `/bin/bash`
```bash
docker run -t -i ubuntu:latest /bin/bash # -t -i 等效于 -it
# root@45f55e1e264e:/# 
# root@45f55e1e264e:/# exit # 退出容器
```
其中 `-t` 选项表示分配一个伪终端，`-i` 选项表示交互式操作，`/bin/bash` 是容器启动后执行的命令

当利用 docker run 来创建容器时，Docker 在后台运行的标准操作包括：
- 检查本地是否存在指定的镜像，不存在就从 registry 下载
- 利用镜像创建并启动一个容器
- 分配一个文件系统，并在只读的镜像层外面挂载一层可读写层
- 从宿主主机配置的网桥接口中桥接一个虚拟接口到容器中去
- 从地址池配置一个 ip 地址给容器
- 执行用户指定的应用程序
- 执行完毕后容器被终止

### 以守护进程方式运行容器

很多时候，我们希望容器在后台运行，可以通过 `-d` 选项来实现
```bash
docker run -d ubuntu:latest /bin/bash -c "while true; do echo hello docker; sleep 1; done"
# 5ac2a0aaa1eb1727692b168cfb3490818b59375be107c2758aca1a30d9af69cd
```

可以通过 `docker ps` 查看在运行的容器，通过 `docker logs` 命令查看容器的输出
```bash
docker ps
# CONTAINER ID   IMAGE           COMMAND                   CREATED              STATUS              PORTS     NAMES
# 5ac2a0aaa1eb   ubuntu:latest   "/bin/bash -c 'while…"   About a minute ago   Up About a minute             suspicious_rubin

docker logs <CONTAINER ID>
# docker logs 5ac2a0aaa1eb1727692b168cfb3490818b59375be107c2758aca1a30d9af69cd
```