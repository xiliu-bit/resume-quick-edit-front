## Context

当前项目目录为空，需要基于 CLAUDE.md 中详细定义的技术规范和架构要求，创建一个完整的 Vue 3 简历编辑应用。项目要求使用 Vue 3 + Element Plus + Pinia + Vue Router + Vite 技术栈，实现三栏布局的简历编辑平台。

## Goals / Non-Goals

**Goals:**
- 创建符合 CLAUDE.md 规范的项目目录结构
- 配置完整的开发环境，支持热更新和构建
- 实现三栏布局架构（Sidebar + Editor + Preview）
- 建立状态管理系统用于数据同步
- 集成 PDF 导出功能
- 确保项目能够正常启动和运行

**Non-Goals:**
- 实现具体的简历编辑功能细节
- 创建复杂的表单验证逻辑
- 实现用户认证和后端集成
- 添加测试框架配置

## Decisions

**项目构建工具选择 Vite**
- 理由：Vite 提供极快的开发服务器启动和热更新，适合现代 Vue 3 开发
- 替代方案考虑：Vue CLI（已过时）、Webpack（配置复杂）

**状态管理使用 Pinia**
- 理由：Vue 3 官方推荐的状态管理库，比 Vuex 更轻量且 TypeScript 友好
- 替代方案考虑：Vuex（Vue 2 风格）、Composition API ref（复杂状态管理不足）

**UI 框架选择 Element Plus**
- 理由：CLAUDE.md 明确指定，专为 Vue 3 设计的桌面端组件库
- 替代方案考虑：Ant Design Vue、Naive UI

**PDF 导出方案：html2canvas + jsPDF**
- 理由：CLAUDE.md 指定方案，html2canvas 可以截图预览区域，jsPDF 生成 PDF
- 替代方案考虑：纯 CSS 打印样式、PDFKit

## Risks / Trade-offs

**依赖包版本兼容性风险** → 使用最新稳定版本并在 package.json 中锁定主要版本号

**Element Plus 包体积较大** → 启用按需导入和 Tree Shaking 优化

**PDF 导出样式失真风险** → 在预览区域使用打印友好的 CSS 样式

**Windows 路径兼容性** → 使用 path 模块处理文件路径，避免硬编码分隔符