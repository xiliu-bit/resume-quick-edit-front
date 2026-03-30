## ADDED Requirements

### Requirement: PDF 导出依赖安装
系统必须安装 html2canvas 和 jsPDF 依赖包。

#### Scenario: 依赖包检查
- **WHEN** 项目初始化完成
- **THEN** package.json 必须包含 html2canvas 依赖
- **THEN** package.json 必须包含 jspdf 依赖
- **THEN** 依赖必须安装在 dependencies 而非 devDependencies

### Requirement: PDF 导出工具函数
必须创建专门的 PDF 导出工具函数。

#### Scenario: 工具函数创建
- **WHEN** 项目初始化完成
- **THEN** 必须创建 src/utils/pdfExport.js
- **THEN** 必须导出 exportToPDF 函数
- **THEN** 函数必须接收预览区域 DOM 元素作为参数

### Requirement: PDF 导出功能实现
exportToPDF 函数必须实现完整的 PDF 导出逻辑。

#### Scenario: PDF 生成流程
- **WHEN** 调用 exportToPDF 函数
- **THEN** 必须使用 html2canvas 截图预览区域
- **THEN** 必须使用 jsPDF 创建 PDF 文档
- **THEN** 必须将截图添加到 PDF 中
- **THEN** 必须触发浏览器下载生成的 PDF 文件

### Requirement: PDF 导出质量
生成的 PDF 必须保持预览区域的样式和布局。

#### Scenario: 导出质量验证
- **WHEN** PDF 导出完成
- **THEN** 生成的 PDF 必须保持原有的字体样式
- **THEN** PDF 中的布局必须与预览区域一致
- **THEN** PDF 内容必须清晰可读
- **THEN** PDF 页面尺寸必须为 A4 格式