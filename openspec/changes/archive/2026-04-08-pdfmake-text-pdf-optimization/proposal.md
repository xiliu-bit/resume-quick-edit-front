## Why

当前项目使用html2canvas + jsPDF方案生成PDF，但这种方式生成的是图片型PDF，文字无法被选中、复制和搜索，影响用户体验。我们需要升级为pdfmake方案来生成真正的文本型PDF，提升简历的专业性和可用性。

**重要更新说明**：
由于中文字体支持的复杂性导致无法修复的bug，我们决定在当前版本中移除中文字体支持，专注于实现稳定的文本型PDF生成功能。中文字体支持将在后续版本中作为可选功能重新引入。

## What Changes

- **BREAKING** 替换PDF导出技术栈：从html2canvas + jsPDF迁移到pdfmake
- **REMOVED** 暂时移除中文字体支持，使用pdfmake默认字体（Roboto）
- **FUTURE** 中文字体支持将作为后续版本的改进项