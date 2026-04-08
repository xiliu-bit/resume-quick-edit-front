## ADDED Requirements

### Requirement: PDF 导出依赖安装
系统必须安装 pdfmake 依赖包。

#### Scenario: 依赖包检查
- **WHEN** 项目初始化完成
- **THEN** package.json 必须包含 pdfmake 依赖
- **THEN** 依赖必须安装在 dependencies 而非 devDependencies
- **THEN** 必须配置 pdfmake 默认字体（Roboto）

### Requirement: PDF 导出工具函数
必须创建专门的 PDF 导出工具函数。

#### Scenario: 工具函数创建
- **WHEN** 项目初始化完成
- **THEN** 必须创建 src/utils/pdfExport.js
- **THEN** 必须创建 src/utils/pdf-generator.js
- **THEN** 必须导出 exportToPDF 函数
- **THEN** 必须导出 generateResumePDF 函数
- **THEN** 函数必须使用简历数据而非DOM元素作为参数

### Requirement: PDF 导出功能实现
exportToPDF 和 generateResumePDF 函数必须实现完整的 PDF 导出逻辑。

#### Scenario: PDF 生成流程
- **WHEN** 调用 PDF 导出函数
- **THEN** 必须使用 pdfmake 创建文本型 PDF 文档
- **THEN** 必须从简历数据生成 PDF 内容
- **THEN** 必须应用专业的排版样式
- **THEN** 必须支持多页简历的自动分页
- **THEN** 必须触发浏览器下载生成的 PDF 文件

### Requirement: PDF 导出质量
生成的 PDF 必须是文本型而非图片型，使用华文楷体字体，确保文字可选中和可搜索。

#### Scenario: 导出质量验证
- **WHEN** PDF 导出完成
- **THEN** 生成的 PDF 必须是文本型（非图片型）
- **THEN** PDF 中的文字必须可选中、可复制、可搜索
- **THEN** PDF 内容必须清晰可读，放大不失真
- **THEN** PDF 页面尺寸必须为 A4 格式
- **THEN** 必须使用华文楷体(STKAITI)字体确保中文显示效果

### Requirement: PDF 生成性能
PDF 生成过程必须具有良好的性能表现。

#### Scenario: 性能验证
- **WHEN** 生成 PDF 时
- **THEN** 生成时间必须控制在 1-2 秒内
- **THEN** 应用包体积必须优化（使用华文楷体字体文件）
- **THEN** 内存使用必须保持在合理范围内
- **THEN** 必须提供生成进度提示