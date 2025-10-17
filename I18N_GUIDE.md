# NovaMail 多语言国际化指南

## 🌍 功能概述

NovaMail 现在支持多语言国际化，可以根据用户的地理位置自动检测语言，并提供语言切换功能。

## 📋 支持的语言

| 语言 | 代码 | 国旗 | 主要国家/地区 |
|------|------|------|---------------|
| English | `en` | 🇺🇸 | 美国、英国、澳大利亚、加拿大 |
| 中文 | `zh` | 🇨🇳 | 中国、台湾、香港、新加坡 |
| 日本語 | `ja` | 🇯🇵 | 日本 |
| 한국어 | `ko` | 🇰🇷 | 韩国 |
| Español | `es` | 🇪🇸 | 西班牙、墨西哥、阿根廷、哥伦比亚 |
| Français | `fr` | 🇫🇷 | 法国、比利时、瑞士、加拿大 |
| Deutsch | `de` | 🇩🇪 | 德国、奥地利、瑞士 |

## 🚀 核心功能

### 1. 自动语言检测
- 基于用户IP地址检测地理位置
- 根据国家代码自动推荐对应语言
- 首次访问时询问用户是否切换语言

### 2. 语言切换器
- 页面右上角的语言切换下拉菜单
- 显示所有支持的语言和国旗
- 实时切换，无需刷新页面

### 3. 本地化存储
- 用户选择的语言保存在 localStorage
- 下次访问时自动应用保存的语言设置

## 🛠️ 技术实现

### 文件结构
```
locales/
├── en/common.json    # 英文翻译
├── zh/common.json    # 中文翻译
├── ja/common.json    # 日文翻译
├── ko/common.json    # 韩文翻译
├── es/common.json    # 西班牙文翻译
├── fr/common.json    # 法文翻译
└── de/common.json    # 德文翻译

lib/
└── i18n.ts          # 国际化工具函数

components/
└── LanguageSwitcher.tsx  # 语言切换器组件
```

### 核心函数

#### `useTranslation()`
```typescript
const { t, loading, locale } = useTranslation()
const title = t('dashboard.title') // 获取翻译文本
```

#### `changeLanguage(locale)`
```typescript
changeLanguage('zh') // 切换到中文
```

#### `useAutoLanguageDetection()`
```typescript
useAutoLanguageDetection() // 自动检测用户语言
```

## 📝 添加新语言

### 1. 创建语言文件
在 `locales/` 目录下创建新的语言文件夹和 `common.json` 文件：

```json
{
  "nav": {
    "home": "首页",
    "features": "功能",
    // ... 其他翻译
  }
}
```

### 2. 更新支持的语言列表
在 `lib/i18n.ts` 中添加新语言：

```typescript
export const supportedLocales = [
  // ... 现有语言
  { code: 'pt', name: 'Português', flag: '🇵🇹' }
]
```

### 3. 更新国家语言映射
在 `getLanguageByCountry` 函数中添加国家映射：

```typescript
const countryLanguageMap = {
  // ... 现有映射
  'PT': 'pt', 'BR': 'pt'
}
```

## 🎯 使用示例

### 在组件中使用翻译
```tsx
import { useTranslation } from '@/lib/i18n'

export default function MyComponent() {
  const { t } = useTranslation()
  
  return (
    <div>
      <h1>{t('hero.title')}</h1>
      <p>{t('hero.subtitle')}</p>
    </div>
  )
}
```

### 添加语言切换器
```tsx
import LanguageSwitcher from '@/components/LanguageSwitcher'

export default function Header() {
  return (
    <header>
      <h1>NovaMail</h1>
      <LanguageSwitcher />
    </header>
  )
}
```

## 🔧 配置选项

### 自动检测设置
- 默认启用自动语言检测
- 检测到非英语国家时会弹出确认对话框
- 用户选择会保存到 localStorage

### 回退机制
- 如果翻译文件加载失败，自动回退到英文
- 如果翻译键不存在，显示原始键名

## 📱 演示页面

访问 `/i18n-demo` 页面可以查看多语言功能的完整演示，包括：
- 所有支持的语言切换
- 翻译文本的实时预览
- 语言检测功能测试

## 🌐 部署注意事项

1. **静态文件服务**：确保 `locales/` 目录下的 JSON 文件可以被正确访问
2. **CDN 配置**：如果使用 CDN，确保语言文件也被缓存
3. **SEO 优化**：考虑为不同语言创建不同的 URL 路径

## 🔮 未来计划

- [ ] 支持 RTL 语言（阿拉伯语、希伯来语）
- [ ] 添加更多语言（意大利语、俄语、葡萄牙语等）
- [ ] 实现服务端渲染的多语言支持
- [ ] 添加语言特定的日期和数字格式
- [ ] 支持动态语言包加载

## 📞 支持

如果您在使用多语言功能时遇到问题，请：
1. 检查浏览器控制台是否有错误信息
2. 确认语言文件是否正确加载
3. 验证 localStorage 中的语言设置

---

**NovaMail 多语言团队** 🌍
