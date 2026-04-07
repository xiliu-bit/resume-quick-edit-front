# 🎯 项目概览

- **项目名称**: 简历快编 - 在线简历编辑与导出平台
- **项目描述**: 一个基于 Vue 3 和 Element Plus 的单页应用，提供“开始页 -> 编辑页 -> 导出 PDF”的完整工作流，支持拖拽排序和实时预览。
- **核心目标**:
  1. 实现左侧导航 + 中间编辑 + 右侧预览的三栏布局。
  2. 数据驱动视图，编辑内容实时同步到预览区。
  3. 点击按钮一键导出 PDF 格式简历。

# 语言规范

- **回复语言**：请始终使用**简体中文**与我交流。
- **代码注释**：代码中的注释请使用中文。
- **文档生成**：生成的文档（如 README.md）请使用中文编写。
- **技术术语**：保留通用的英文技术术语（如 "API", "Component"），但解释性文字必须用中文。

# 🛠 技术栈与架构

- **前端框架**: Vue 3 (Composition API + `<script setup>`)
- **UI 组件库**: Element Plus (基于 Vue 3 的桌面端组件库)
- **状态管理**: Pinia (Vue 3 官方推荐)
- **路由管理**: Vue Router 4
- **构建工具**: Vite (快速启动和热更新)
- **PDF 导出**: pdfmake (文本型PDF生成)
- **CSS 预处理器**: SCSS

# 📂 目录结构规划 (AI 生成代码时请严格遵循此结构)

- `src/assets/`:
  - 存放静态资源（如 logo、图标），会被 Webpack 处理。
- `src/components/`:
  - 全局通用组件（如按钮、加载动画），可复用 UI 片段。
- `src/layout/`:
  - 页面布局组件（核心！包含三栏结构）。
  - `MainLayout.vue`: 主布局容器。
  - `Sidebar.vue`: 左侧导航栏（模块选择）。
  - `EditorArea.vue`: 中间编辑区（表单输入）。
  - `PreviewArea.vue`: 右侧预览区（PDF 预览）。
- `src/pages/`:
  - 页面级组件（路由直接对应）。
  - `Home.vue`: 开始页面。
  - `ResumeEditor.vue`: 核心编辑页面。
- `src/router/`:
  - 路由配置文件。
- `src/stores/`:
  - Pinia 状态管理文件（如 `resumeStore.js`）。
- `src/utils/`:
  - 工具函数（如 `pdfExport.js` 导出逻辑）。
- `src/App.vue`:
  - 根组件。
- `src/main.js`:
  - 应用入口。

# 📏 代码规范 (强制执行)

- **语言**: JavaScript (ES6+)，支持可选的 TypeScript。
- **命名**:
  - 组件/类: `PascalCase` (如 `ResumeEditor.vue`)。
  - 函数/变量: `camelCase` (如 `handleExportPdf`)。
  - 常量: `UPPER_SNAKE_CASE` (如 `PDF_EXPORT_SUCCESS`)。
- **风格**:
  - 优先使用 Composition API 和 `<script setup>` 语法糖。
  - 组件导出使用 `export default`。
  - 样式使用 `<style scoped lang="scss">`，避免全局污染。
  - Pinia Store 使用 `defineStore` 定义。

# 🚀 开发工作流

- **安装依赖**: `npm install` 或 `yarn install`
- **启动开发**: `npm run dev` 或 `yarn dev`
- **构建生产**: `npm run build` 或 `yarn build`
- **代码检查**: `npm run lint` (可选，建议配置 ESLint)

# ⚠️ 特别注意事项

1. **三栏布局**: 严格使用 `Element Plus` 的 `Container`, `Aside`, `Main`, `Header` 组件实现布局。
2. **数据同步**: 所有编辑数据必须通过 `Pinia` 状态管理，确保中间编辑区和右侧预览区数据实时一致。
3. **PDF 导出**: 导出功能必须封装在 `utils/pdfExport.js` 中，使用 `pdfmake` 生成文本型PDF，确保生成的PDF中的文字可以被选中、复制和搜索。
4. **路由配置**: 配置两个路由：`/` (Home) 和 `/editor` (ResumeEditor)。
