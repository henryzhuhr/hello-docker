import{_ as s,c as i,o as a,a5 as t}from"./chunks/framework.B6CAAedu.js";const F=JSON.parse('{"title":"Docker 环境准备","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"starter.md","filePath":"starter.md","lastUpdated":1729172152000}'),n={name:"starter.md"},e=t(`<h1 id="docker-环境准备" tabindex="-1">Docker 环境准备 <a class="header-anchor" href="#docker-环境准备" aria-label="Permalink to &quot;Docker 环境准备&quot;">​</a></h1><h2 id="docker-文档" tabindex="-1">Docker 文档 <a class="header-anchor" href="#docker-文档" aria-label="Permalink to &quot;Docker 文档&quot;">​</a></h2><ul><li><a href="https://docs.docker.com" target="_blank" rel="noreferrer">docker.docs</a>: Docker 官方文档</li></ul><h2 id="docker-安装" tabindex="-1">Docker 安装 <a class="header-anchor" href="#docker-安装" aria-label="Permalink to &quot;Docker 安装&quot;">​</a></h2><p>Docker 有两种安装方式</p><ul><li><strong>Docker Engine</strong>: 也叫 <strong>Docker CE</strong>， 适用于 Linux 系统，仅支持命令行操作</li><li><strong>Docker Desktop</strong>: 适用于 Mac、Windows、Linux 系统，支持图形界面操作</li></ul><h3 id="docker-engine" tabindex="-1">Docker Engine <a class="header-anchor" href="#docker-engine" aria-label="Permalink to &quot;Docker Engine&quot;">​</a></h3><p>Docker Engine 支持 <a href="https://docs.docker.com/engine/install/ubuntu/" target="_blank" rel="noreferrer">Ubuntu</a>、<a href="https://docs.docker.com/engine/install/debian/" target="_blank" rel="noreferrer">Debian</a>、<a href="https://docs.docker.com/engine/install/centos/" target="_blank" rel="noreferrer">CentOS</a> 等 Linux 发行版本。</p><p>例如在 Ubuntu 上<a href="https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository" target="_blank" rel="noreferrer">使用 apt 安装 Docker Engine</a></p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Add Docker&#39;s official GPG key:</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> apt-get</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> update</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> apt-get</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ca-certificates</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> curl</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -m</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0755</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -d</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/apt/keyrings</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> curl</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -fsSL</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> https://download.docker.com/linux/ubuntu/gpg</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -o</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/apt/keyrings/docker.asc</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> chmod</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> a+r</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/apt/keyrings/docker.asc</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Add the repository to Apt sources:</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">echo</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  &quot;deb [arch=$(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">dpkg</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --print-architecture</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  $(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">.</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/os-release &amp;&amp; </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">echo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$VERSION_CODENAME</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;) stable&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> tee</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/apt/sources.list.d/docker.list</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /dev/null</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> apt-get</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> update</span></span></code></pre></div><p>随后记得将当前用户加入 <code>docker</code> 用户组，以便不用 <code>sudo</code> 运行 Docker 命令</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> usermod</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -aG</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> docker</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $USER</span></span></code></pre></div><p>安装 Docker Engine</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> apt-get</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> docker-ce</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> docker-ce-cli</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> containerd.io</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> docker-buildx-plugin</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> docker-compose-plugin</span></span></code></pre></div><h3 id="docker-desktop" tabindex="-1">Docker Desktop <a class="header-anchor" href="#docker-desktop" aria-label="Permalink to &quot;Docker Desktop&quot;">​</a></h3><p><a href="https://docs.docker.com/get-started/get-docker/" target="_blank" rel="noreferrer">Docker Desktop</a> 支持 <a href="https://docs.docker.com/desktop/install/mac-install/" target="_blank" rel="noreferrer">Mac</a>、<a href="https://docs.docker.com/desktop/install/windows-install/" target="_blank" rel="noreferrer">Windows</a> 和 <a href="https://docs.docker.com/desktop/install/linux-install/" target="_blank" rel="noreferrer">Linux</a>，其中Linux 不同发行版本安装方式不同，支持 <a href="https://docs.docker.com/desktop/install/ubuntu/" target="_blank" rel="noreferrer">Ubuntu</a>、<a href="https://docs.docker.com/desktop/install/debian/" target="_blank" rel="noreferrer">Debian</a> 等。</p><h2 id="docker-配置" tabindex="-1">Docker 配置 <a class="header-anchor" href="#docker-配置" aria-label="Permalink to &quot;Docker 配置&quot;">​</a></h2><h3 id="配置文件" tabindex="-1">配置文件 <a class="header-anchor" href="#配置文件" aria-label="Permalink to &quot;配置文件&quot;">​</a></h3><p>编辑 <code>/etc/docker/daemon.json</code> 文件配置镜像源</p><p>重新加载 systemd 守护进程并重启 Docker（systemd 系统）。对于 Desktop 版本，重启 Docker Desktop 即可。</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> systemctl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> daemon-reload</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> systemctl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> restart</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> docker</span></span></code></pre></div><h3 id="镜像源配置" tabindex="-1">镜像源配置 <a class="header-anchor" href="#镜像源配置" aria-label="Permalink to &quot;镜像源配置&quot;">​</a></h3><p>需要自定义网络的情况下，可以编辑 <code>/etc/docker/daemon.json</code> 文件配置镜像源，添加如下内容</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // 其他配置保留，添加如下配置：</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;registry-mirrors&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;https://registry.docker-cn.com&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Docker 中国官方镜像</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;https://dockerproxy.com&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 一些高校的代理地址</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;https://docker.mirrors.tuna.tsinghua.edu.cn&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 清华大学</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;https://docker.nju.edu.cn&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,                   </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 南京大学</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;https://docker.mirrors.sjtug.sjtu.edu.cn&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,    </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 上海交通大学</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;https://docker.mirrors.ustc.edu.cn&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,          </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 中国科技大学</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 一些大企业的代理地址</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;https://mirror.ccs.tencentyun.com&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 腾讯</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;https://mirror.aliyuncs.com&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,       </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 阿里云</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;https://mirror.baidubce.com&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,       </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 百度</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;http://hub-mirror.c.163.com&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,       </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 网易云</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 其他代理地址</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;https://docker.m.daocloud.io&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,    </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Daocloud</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;https://docker.registry.cyou&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;https://docker-cf.registry.cyou&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;https://dockercf.jsdelivr.fyi&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;https://docker.jsdelivr.fyi&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;https://dockertest.jsdelivr.fyi&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;https://mirror.iscas.ac.cn&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;https://docker.rainbond.cc&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ],</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // 可选</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;max-concurrent-downloads&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">10</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><div class="tip custom-block github-alert"><p class="custom-block-title">一些重要的提示：</p><p></p><ul><li>一定要在工作前配置好网络，避免“一杯茶，一包烟，一个镜像拉一天”</li><li>使用 Docker Desktop 的可以在 <code>Settings</code> -&gt; <code>Docker Engine</code> 中配置</li><li>配置文件遵循严格的 json 规范：（1）文件不可以有注释（2）列表最后一个项目不可以用逗号结束</li><li>代理地址选择一个即可，不需要全部添加，根据自己的网络情况进行选择</li><li>修改地址后可以随便拉去一个镜像测试速度: <code>docker pull ubuntu:latest &amp;&amp; docker images &amp;&amp; docker rmi ubuntu:latest; docker images</code></li><li>测试的时候可以一组一组地尝试，因为高校和大企业要挂可能一起挂</li></ul></div><h3 id="insecure-registries" tabindex="-1">insecure-registries <a class="header-anchor" href="#insecure-registries" aria-label="Permalink to &quot;insecure-registries&quot;">​</a></h3><p>在某次 go install 的时候，遇到了类似如下的错误：<code>tls: failed to verify certificate: x509: certificate signed by unknown authority</code></p><p>解决方法是在 Docker Desktop 中添加 <code>insecure-registries</code>，如下图所示：</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // Docker 如果需要从非 SSL 源管理镜像，这里加上。</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;insecure-registries&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;registry.docker-cn.com&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;docker.m.daocloud.io&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;goproxy.cn&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h2 id="docker-hub-注册" tabindex="-1">Docker Hub 注册 <a class="header-anchor" href="#docker-hub-注册" aria-label="Permalink to &quot;Docker Hub 注册&quot;">​</a></h2><p>在 <a href="https://hub.docker.com" target="_blank" rel="noreferrer">Docker Hub</a> 注册一个账号，可以在 Docker Hub 上发布自己的镜像。</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> push</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">usernam</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">e</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">rep</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">o</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">:</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">tagnam</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">e</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span></span></code></pre></div>`,32),l=[e];function h(k,p,r,o,d,c){return a(),i("div",null,l)}const u=s(n,[["render",h]]);export{F as __pageData,u as default};
