import { defineConfig } from 'vitepress'
import { DefaultTheme } from 'vitepress/theme'

/**
 * 侧边栏配置
 */
const sidebar: DefaultTheme.Sidebar = [
  {
    text: 'Start an adventure',
    items: [
      { text: 'Intro', link: '/' },
      { text: 'Environment', link: '/starter' },
    ]
  },
]

/**
 * 主题配置 https://vitepress.dev/reference/default-theme-config
 */
const themeConfig: DefaultTheme.Config = {
  logo: '/icons/docker.svg',
  sidebar: sidebar,
  socialLinks: [
    { icon: 'github', link: 'https://github.com/henryzhuhr/hello-docker' }
  ],
  darkModeSwitchLabel: '外观',          // 用于自定义深色模式开关标签
  lightModeSwitchTitle: '切换到浅色模式', // 用于自定义悬停时显示的浅色模式开关标题
  darkModeSwitchTitle: '切换到深色模式',  // 用于自定义悬停时显示的深色模式开关标题
  returnToTopLabel: '返回顶部',          // 用于自定义返回顶部按钮的标题
  langMenuLabel: '选择语言',             // 用于自定义语言选择菜单的标题
  externalLinkIcon: true,
  docFooter: {
    prev: '⏪️ 上一页',
    next: '下一页 ⏩️'
  },
  footer: {
    message: 'Powered By <a href="https://vitepress.dev/">Vitepress</a>',
    copyright: `All rights reserved © 2024-${new Date().getFullYear()} <a href="https://github.com/henryzhuhr?tab=repositories">henryzhuhr</a>`
  },
  outline: {
    label: '页面导航'
  },
  lastUpdated: {
    text: '⏰ 内容最后更新于',
    formatOptions: {
      dateStyle: 'short',
      timeStyle: 'medium'
    }
  },
  search: {   // 本地搜索: https://vitepress.dev/zh/reference/default-theme-search#local-search
    provider: 'local',
  },
}

/**
 * 站点配置 https://vitepress.dev/reference/site-config
 */
export default defineConfig({
  base: '/hello-docker/',
  title: "Hello Docker ",
  description: "Docker Learning Log",
  srcDir: 'docs',
  themeConfig: themeConfig,
  vite: {// Vite 配置选项
    publicDir: '../.vitepress/public', // 相对于 docs 目录
  },
})
