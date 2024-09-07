---
outline: deep
---

# Docker 环境准备

## Docker 文档

- [docker.docs](https://docs.docker.com): Docker 官方文档

## Docker 安装

Docker 有两种安装方式
- **Docker Engine**: 也叫 **Docker CE**， 适用于 Linux 系统，仅支持命令行操作
- **Docker Desktop**: 适用于 Mac、Windows、Linux 系统，支持图形界面操作

### Docker Engine

Docker Engine 支持 [Ubuntu](https://docs.docker.com/engine/install/ubuntu/)、[Debian](https://docs.docker.com/engine/install/debian/)、[CentOS](https://docs.docker.com/engine/install/centos/) 等 Linux 发行版本。

例如在 Ubuntu 上[使用 apt 安装 Docker Engine](https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository)

```bash
# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
```

随后记得将当前用户加入 `docker` 用户组，以便不用 `sudo` 运行 Docker 命令

```bash
sudo usermod -aG docker $USER
```

安装 Docker Engine

```bash
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

### Docker Desktop

[Docker Desktop](https://docs.docker.com/get-started/get-docker/) 支持 [Mac](https://docs.docker.com/desktop/install/mac-install/)、[Windows](https://docs.docker.com/desktop/install/windows-install/) 和 [Linux](https://docs.docker.com/desktop/install/linux-install/)，其中Linux 不同发行版本安装方式不同，支持 [Ubuntu](https://docs.docker.com/desktop/install/ubuntu/)、[Debian](https://docs.docker.com/desktop/install/debian/) 等。


## Docker 配置

### 镜像加速

编辑 `/etc/docker/daemon.json` 文件，添加如下内容：

```json
{
  "registry-mirrors": ["https://registry.docker-cn.com"]
}
```

> [!TIP]
> - Docker Desktop 可以在 `Settings` -> `Docker Engine` 中配置
> - 2024年6月初，国内镜像服务不再提供服务，需要自己找一些可用的镜像服务。

重新加载 systemd 守护进程并重启 Docker（systemd 系统）。对于 Desktop 版本，重启 Docker Desktop 即可。

```bash
sudo systemctl daemon-reload
sudo systemctl restart docker
```


## Docker Hub 注册

在 [Docker Hub](https://hub.docker.com) 注册一个账号，可以在 Docker Hub 上发布自己的镜像。

```bash
docker push <username>/<repo>:<tagname>
```
