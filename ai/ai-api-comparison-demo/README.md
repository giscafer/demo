# 主流AI模型API调用演示

这是一个交互式演示页面，展示如何调用OpenAI、DeepSeek、通义千问等主流AI模型的API。通过这个页面，你可以学习不同API的调用方法、参数配置和结果处理。

## 功能特点

- **多API支持**：支持OpenAI、DeepSeek、通义千问等主流AI模型API
- **交互式演示**：可以直接在页面上配置参数并调用API
- **代码示例**：提供JavaScript、Python和cURL的代码示例
- **结果展示**：直观展示API响应结果和调用详情
- **响应式设计**：适配不同屏幕尺寸的设备

## 如何使用

1. 打开 `index.html` 文件
2. 选择你想要调用的API提供商（OpenAI、DeepSeek或通义千问）
3. 输入你的API密钥（不会被存储）
4. 选择合适的模型
5. 输入提示词或选择示例提示词
6. 点击"调用API"按钮
7. 查看响应结果和调用详情

## API配置

### OpenAI

- **Base URL**: `https://api.openai.com/v1`
- **支持模型**: GPT-4o, GPT-4o Mini, GPT-4 Turbo, GPT-3.5 Turbo
- **API密钥**: 从 [OpenAI官网](https://platform.openai.com/) 获取

### DeepSeek

- **Base URL**: `https://api.deepseek.com/v1`
- **支持模型**: DeepSeek Chat, DeepSeek Reasoner, DeepSeek Coder
- **API密钥**: 从 [DeepSeek官网](https://platform.deepseek.com/) 获取

### 通义千问

- **Base URL**: `https://dashscope.aliyuncs.com/compatible-mode/v1`
- **支持模型**: Qwen Plus, Qwen Max, Qwen Turbo, Qwen Max Longcontext
- **API密钥**: 从 [阿里云百炼平台](https://model.aliyun.com/) 获取

## 注意事项

- **API密钥安全**: 请不要在公共场合泄露你的API密钥
- **API费用**: 调用API会产生费用，请参考各平台的定价政策
- **网络连接**: 需要良好的网络连接才能正常调用API
- **浏览器兼容性**: 建议使用最新版本的Chrome、Firefox或Edge浏览器

## 本地运行

1. 克隆或下载本项目
2. 直接在浏览器中打开 `index.html` 文件
3. 无需安装其他依赖，所有资源通过CDN加载

## 许可证

MIT License
