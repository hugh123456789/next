# 邮件模板使用指南

这个项目包含了三种专业的邮件模板，适用于不同的业务场景。所有模板都是响应式设计，兼容主流邮件客户端。

## 📧 模板类型

### 1. 欢迎邮件模板 (WelcomeEmailTemplate)
用于新用户注册后的欢迎邮件，包含账户激活功能。

### 2. 通知邮件模板 (NotificationEmailTemplate)
用于系统通知、安全提醒、状态更新等场景。

### 3. 营销邮件模板 (MarketingEmailTemplate)
用于产品推广、活动宣传、新闻资讯等营销场景。

## 🚀 快速开始

### 基本使用

```tsx
import { WelcomeEmailTemplate } from './components/email-template';

// 在您的API路由中使用
export async function POST(request) {
  const emailHtml = renderToString(
    <WelcomeEmailTemplate 
      firstName="张三"
      userEmail="zhangsan@example.com"
      activationLink="https://yoursite.com/activate?token=abc123"
      companyName="您的公司"
      primaryColor="#2563eb"
    />
  );

  // 使用 nodemailer 发送邮件
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: "zhangsan@example.com",
    subject: "欢迎加入我们！",
    html: emailHtml,
  });
}
```

### 与现有邮件API集成

更新您的 `app/api/email/route.js`：

```javascript
import { renderToString } from 'react-dom/server';
import { WelcomeEmailTemplate, NotificationEmailTemplate } from '../../../components/email-template';

export async function POST(request) {
  try {
    const { type, ...props } = await request.json();
    
    let emailHtml;
    let subject;
    
    switch (type) {
      case 'welcome':
        emailHtml = renderToString(<WelcomeEmailTemplate {...props} />);
        subject = '欢迎加入我们！';
        break;
      case 'notification':
        emailHtml = renderToString(<NotificationEmailTemplate {...props} />);
        subject = props.title || '系统通知';
        break;
      default:
        throw new Error('未知的邮件类型');
    }

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: props.to,
      subject: subject,
      html: emailHtml,
    });

    return NextResponse.json({ message: 'Email sent successfully!' });
  } catch (error) {
    // 错误处理...
  }
}
```

## 📋 模板属性详解

### 通用属性 (BaseEmailTemplateProps)

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| companyName | string | "我们的公司" | 公司名称 |
| companyLogo | string | - | 公司Logo URL |
| primaryColor | string | "#007bff" | 主色调 |
| secondaryColor | string | "#6c757d" | 辅助色调 |
| footerText | string | - | 页脚文本 |
| unsubscribeLink | string | - | 取消订阅链接 |
| socialLinks | object | {} | 社交媒体链接 |

### 欢迎邮件属性 (WelcomeEmailTemplateProps)

| 属性 | 类型 | 必需 | 描述 |
|------|------|------|------|
| firstName | string | ✅ | 用户名字 |
| userEmail | string | - | 用户邮箱 |
| activationLink | string | - | 激活链接 |

### 通知邮件属性 (NotificationEmailTemplateProps)

| 属性 | 类型 | 必需 | 描述 |
|------|------|------|------|
| title | string | ✅ | 通知标题 |
| message | string | ✅ | 通知内容 |
| actionText | string | - | 按钮文本 |
| actionLink | string | - | 按钮链接 |
| userName | string | - | 用户名称 |

### 营销邮件属性 (MarketingEmailTemplateProps)

| 属性 | 类型 | 必需 | 描述 |
|------|------|------|------|
| title | string | ✅ | 邮件标题 |
| subtitle | string | - | 副标题 |
| content | string | ✅ | 邮件内容 |
| ctaText | string | ✅ | 行动按钮文本 |
| ctaLink | string | ✅ | 行动按钮链接 |
| imageUrl | string | - | 主图片URL |

## 🎨 自定义样式

### 颜色主题

```tsx
<WelcomeEmailTemplate 
  firstName="张三"
  primaryColor="#059669"      // 绿色主题
  secondaryColor="#6b7280"    // 灰色辅助
  companyName="环保科技公司"
/>
```

### 社交媒体链接

```tsx
const socialLinks = {
  website: "https://yoursite.com",
  twitter: "https://twitter.com/yourcompany",
  facebook: "https://facebook.com/yourcompany",
  linkedin: "https://linkedin.com/company/yourcompany"
};

<MarketingEmailTemplate 
  socialLinks={socialLinks}
  // 其他属性...
/>
```

## 📱 响应式设计

所有模板都包含响应式设计，在移动设备上自动适配：

- 容器宽度自动调整
- 按钮大小优化
- 文字大小适配
- 图片自动缩放

## 🔧 开发建议

### 1. 测试邮件模板

创建一个测试页面来预览邮件效果：

```tsx
// pages/email-preview.tsx
import { EmailExamples } from '../components/email-examples';

export default function EmailPreview() {
  return <EmailExamples />;
}
```

### 2. 环境变量配置

确保在 `.env.local` 中配置邮件服务：

```env
EMAIL_USER=your-email@163.com
EMAIL_PASS=your-app-password
```

### 3. 邮件客户端兼容性

模板已针对以下邮件客户端进行优化：
- Gmail
- Outlook
- Apple Mail
- 网易邮箱
- QQ邮箱

## 🚨 注意事项

1. **图片链接**：确保图片URL可公开访问
2. **链接安全**：所有链接都应使用HTTPS
3. **内容长度**：避免邮件内容过长，影响加载速度
4. **测试发送**：正式使用前请先测试发送
5. **垃圾邮件**：避免使用过多营销词汇，防止被标记为垃圾邮件

## 📞 技术支持

如果您在使用过程中遇到问题，请检查：

1. React和Next.js版本兼容性
2. 邮件服务配置是否正确
3. 模板属性是否完整
4. 网络连接是否正常

---

*最后更新：2024年7月*
