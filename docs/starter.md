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

### 配置文件

编辑 `/etc/docker/daemon.json` 文件配置镜像源

重新加载 systemd 守护进程并重启 Docker（systemd 系统）。对于 Desktop 版本，重启 Docker Desktop 即可。

```bash
sudo systemctl daemon-reload
sudo systemctl restart docker
```


### 镜像源配置

需要自定义网络的情况下，可以编辑 `/etc/docker/daemon.json` 文件配置镜像源，添加如下内容


```json
{
  // 其他配置保留，添加如下配置：
  "registry-mirrors": [
    "https://registry.docker-cn.com", // Docker 中国官方镜像
    "https://dockerproxy.com",
    // 一些高校的代理地址
    "https://docker.mirrors.tuna.tsinghua.edu.cn", // 清华大学
    "https://docker.nju.edu.cn",                   // 南京大学
    "https://docker.mirrors.sjtug.sjtu.edu.cn",    // 上海交通大学
    "https://docker.mirrors.ustc.edu.cn",          // 中国科技大学
    // 一些大企业的代理地址
    "https://mirror.ccs.tencentyun.com", // 腾讯
    "https://mirror.aliyuncs.com",       // 阿里云
    "https://mirror.baidubce.com",       // 百度
    "http://hub-mirror.c.163.com",       // 网易云
    // 其他代理地址
    "https://docker.m.daocloud.io",    // Daocloud
    "https://docker.registry.cyou",
    "https://docker-cf.registry.cyou",
    "https://dockercf.jsdelivr.fyi",
    "https://docker.jsdelivr.fyi",
    "https://dockertest.jsdelivr.fyi",
    "https://mirror.iscas.ac.cn",
    "https://docker.rainbond.cc"
  ],
  // 可选
  "max-concurrent-downloads": 10
}
```

> [!TIP] 一些重要的提示：
> - 一定要在工作前配置好网络，避免“一杯茶，一包烟，一个镜像拉一天”
> - 使用 Docker Desktop 的可以在 `Settings` -> `Docker Engine` 中配置
> - 配置文件遵循严格的 json 规范：（1）文件不可以有注释（2）列表最后一个项目不可以用逗号结束
> - 代理地址选择一个即可，不需要全部添加，根据自己的网络情况进行选择
> - 修改地址后可以随便拉去一个镜像测试速度: `docker pull ubuntu:latest && docker images && docker rmi ubuntu:latest; docker images`
> - 测试的时候可以一组一组地尝试，因为高校和大企业要挂可能一起挂




### insecure-registries

在某次 go install 的时候，遇到了类似如下的错误：`tls: failed to verify certificate: x509: certificate signed by unknown authority`

解决方法是在 Docker Desktop 中添加 `insecure-registries`，如下图所示：

```json
{
  // Docker 如果需要从非 SSL 源管理镜像，这里加上。
  "insecure-registries": [
    "registry.docker-cn.com",
    "docker.m.daocloud.io",
    "goproxy.cn"
  ]
}
```


## Docker Hub 注册

在 [Docker Hub](https://hub.docker.com) 注册一个账号，可以在 Docker Hub 上发布自己的镜像。

```bash
docker push <username>/<repo>:<tagname>
```
