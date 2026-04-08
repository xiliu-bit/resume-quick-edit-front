# 简历快编 - 在线简历编辑与导出平台

## 🎯 项目简介

简历快编是一个基于 Vue 3 和 Element Plus 的在线简历编辑与导出平台，提供专业、便捷的简历制作体验。

### ✨ 核心功能

- **三栏布局设计**: 左侧导航 + 中间编辑 + 右侧预览
- **实时数据同步**: 编辑内容实时同步到预览区
- **一键PDF导出**: 使用华文楷体生成专业简历PDF
- **拖拽排序**: 支持简历模块的自由排序
- **响应式设计**: 适配各种屏幕尺寸

## 🛠 技术栈

- **前端框架**: Vue 3 (Composition API + `<script setup>`)
- **UI 组件库**: Element Plus
- **状态管理**: Pinia
- **路由管理**: Vue Router 4
- **构建工具**: Vite
- **PDF 导出**: pdfmake (文本型PDF，华文楷体)
- **CSS 预处理器**: SCSS

## 📁 项目结构

```
src/
├── assets/
│   └── fonts/                 # 字体资源
│       └── custom-vfs_fonts.js # 华文楷体字体配置
├── components/               # 通用组件
├── layout/                   # 布局组件
│   ├── MainLayout.vue        # 主布局
│   ├── Sidebar.vue           # 侧边栏
│   ├── EditorArea.vue        # 编辑区
│   └── PreviewArea.vue       # 预览区
├── pages/                    # 页面组件
│   ├── Home.vue              # 首页
│   └── ResumeEditor.vue      # 简历编辑器
├── router/                   # 路由配置
├── stores/                   # 状态管理
│   └── resumeStore.js        # 简历数据管理
└── utils/                    # 工具函数
    ├── pdfExport.js          # PDF导出
    ├── pdf-generator.js      # PDF生成器
    ├── pdf-init.js           # PDF初始化
    ├── pdf-templates.js      # PDF模板
    └── pdf-lazy-loader.js    # 懒加载器
```

## 🚀 快速开始

### 环境要求

- Node.js >= 16
- npm >= 7

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

## 📄 PDF导出功能

### ✨ 特色功能

- **文本型PDF**: 生成的PDF文字可选中、可复制、可搜索
- **华文楷体**: 使用STKAITI字体，提供优秀的中文显示效果
- **专业排版**: A4纸张，标准简历格式
- **性能优化**: 懒加载机制，快速生成

### 🔧 字体配置

项目使用华文楷体(STKAITI)作为默认字体，配置文件位于：
- `src/assets/fonts/custom-vfs_fonts.js`

详细配置说明请参考 [CHINESE_FONT_CONFIGURATION.md](CHINESE_FONT_CONFIGURATION.md)

## 🎨 界面预览

### 主要功能页面

1. **首页** (`/`): 项目欢迎页面
2. **简历编辑器** (`/editor`): 核心编辑功能
   - 左侧：简历模块导航
   - 中间：内容编辑区域
   - 右侧：实时预览

## 📋 开发规范

### 代码规范

- 使用 Composition API 和 `<script setup>` 语法糖
- 组件命名使用 PascalCase
- 函数和变量使用 camelCase
- 常量使用 UPPER_SNAKE_CASE
- 样式使用 `<style scoped lang="scss">`

### 项目约定

1. **三栏布局**: 使用 Element Plus 的 Container 组件
2. **数据同步**: 通过 Pinia 状态管理实现
3. **PDF导出**: 使用 pdfmake + 华文楷体
4. **路由配置**: 简洁明了的页面路由

## 🔍 技术特性

### PDF生成优化

- **懒加载**: pdfmake库按需加载，提升初始性能
- **字体优化**: 使用华文楷体，优化中文显示
- **内存管理**: 合理的内存使用，避免内存泄漏
- **进度提示**: 实时反馈PDF生成进度

### 用户体验

- **实时预览**: 编辑内容即时显示
- **响应式设计**: 适配桌面和移动设备
- **错误处理**: 完善的异常捕获和用户提示
- **性能监控**: 生成时间和内存使用监控

## 📖 相关文档

- [CLAUDE.md](CLAUDE.md): 项目规范和开发指南
- [CHINESE_FONT_CONFIGURATION.md](CHINESE_FONT_CONFIGURATION.md): 中文字体配置详情
- [TECH_STACK_CONSISTENCY_CHECK.md](TECH_STACK_CONSISTENCY_CHECK.md): 技术栈一致性检查
- [openspec/](openspec/): 项目规格说明书和变更记录

## 🚀 部署指南

### 生产环境部署

1. **构建项目**
   ```bash
   npm run build
   ```

2. **部署dist目录**
   - 将生成的 `dist/` 目录部署到Web服务器
   - 配置服务器路由（支持前端路由）

### 环境变量

```bash
# 开发环境
NODE_ENV=development
VITE_API_BASE_URL=http://localhost:3000

# 生产环境
NODE_ENV=production
VITE_API_BASE_URL=https://api.example.com
```

## 🤝 贡献指南

1. Fork 项目到您的GitHub账户
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 📞 联系方式

如有问题或建议，请通过以下方式联系我们：

- 项目地址: [GitHub Repository](https://github.com/your-username/resume-quick-edit)
- 问题反馈: [Issues](https://github.com/your-username/resume-quick-edit/issues)

---

**简历快编** - 让简历制作变得简单高效 🚀