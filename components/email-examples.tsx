import React from 'react';
import { 
  WelcomeEmailTemplate, 
  NotificationEmailTemplate, 
  MarketingEmailTemplate 
} from './email-template';

// 使用示例组件
export function EmailExamples() {
  // 欢迎邮件示例
  const welcomeEmailProps = {
    firstName: "张三",
    userEmail: "zhangsan@example.com",
    activationLink: "https://yoursite.com/activate?token=abc123",
    companyName: "科技创新公司",
    primaryColor: "#2563eb",
    footerText: "这是一封自动发送的邮件，请勿回复。",
    socialLinks: {
      website: "https://yoursite.com",
      twitter: "https://twitter.com/yourcompany",
      facebook: "https://facebook.com/yourcompany"
    },
    unsubscribeLink: "https://yoursite.com/unsubscribe"
  };

  // 通知邮件示例
  const notificationEmailProps = {
    title: "账户安全提醒",
    message: "我们检测到您的账户在新设备上登录。\n\n如果这是您本人的操作，请忽略此邮件。\n如果不是，请立即更改密码并联系客服。",
    actionText: "查看登录详情",
    actionLink: "https://yoursite.com/security",
    userName: "李四",
    companyName: "安全科技",
    primaryColor: "#dc2626",
    footerText: "为了您的账户安全，请定期更换密码。"
  };

  // 营销邮件示例
  const marketingEmailProps = {
    title: "限时优惠！新产品上线",
    subtitle: "专为您精心打造的解决方案",
    content: "我们很高兴地宣布，全新的产品系列现已正式上线！\n\n这款产品集成了最新的技术，为您提供前所未有的用户体验。现在购买可享受限时8折优惠。\n\n不要错过这个难得的机会，立即行动吧！",
    ctaText: "立即购买",
    ctaLink: "https://yoursite.com/products/new",
    imageUrl: "https://via.placeholder.com/600x300/2563eb/ffffff?text=新产品",
    companyName: "创新产品公司",
    primaryColor: "#059669",
    secondaryColor: "#6b7280",
    footerText: "感谢您对我们产品的关注与支持！",
    socialLinks: {
      website: "https://yoursite.com",
      twitter: "https://twitter.com/yourcompany",
      linkedin: "https://linkedin.com/company/yourcompany"
    }
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>邮件模板示例</h1>
      
      <div style={{ marginBottom: '60px' }}>
        <h2 style={{ marginBottom: '20px' }}>1. 欢迎邮件模板</h2>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <WelcomeEmailTemplate {...welcomeEmailProps} />
        </div>
      </div>

      <div style={{ marginBottom: '60px' }}>
        <h2 style={{ marginBottom: '20px' }}>2. 通知邮件模板</h2>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <NotificationEmailTemplate {...notificationEmailProps} />
        </div>
      </div>

      <div style={{ marginBottom: '60px' }}>
        <h2 style={{ marginBottom: '20px' }}>3. 营销邮件模板</h2>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <MarketingEmailTemplate {...marketingEmailProps} />
        </div>
      </div>
    </div>
  );
}

// 生成HTML字符串的工具函数
export function generateEmailHTML(component: React.ReactElement): string {
  // 注意：在实际使用中，您需要使用 react-dom/server 的 renderToString
  // 这里只是示例代码结构
  return `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>邮件</title>
  <style>
    /* 邮件客户端兼容性样式 */
    body { margin: 0; padding: 0; background-color: #f5f5f5; }
    table { border-collapse: collapse; }
    img { border: 0; outline: none; text-decoration: none; }
    a { text-decoration: none; }
    
    /* 响应式样式 */
    @media only screen and (max-width: 600px) {
      .container { width: 100% !important; }
      .content { padding: 20px 15px !important; }
      .button { padding: 10px 20px !important; font-size: 16px !important; }
    }
  </style>
</head>
<body>
  ${/* 这里应该是渲染后的组件HTML */}
</body>
</html>
  `;
}
