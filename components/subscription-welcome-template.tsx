import * as React from 'react';

// 订阅欢迎邮件模板属性
interface SubscriptionWelcomeTemplateProps {
  subscriberName?: string;
  subscriberEmail: string;
  blogName?: string;
  blogDescription?: string;
  blogLogo?: string;
  primaryColor?: string;
  accentColor?: string;
  latestPosts?: Array<{
    title: string;
    excerpt: string;
    url: string;
    publishDate: string;
  }>;
  socialLinks?: {
    website?: string;
    twitter?: string;
    github?: string;
    linkedin?: string;
  };
  unsubscribeLink?: string;
}

// 精美的邮件样式
const subscriptionStyles = {
  container: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    lineHeight: '1.6',
    color: '#2c3e50',
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  header: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '40px 20px',
    textAlign: 'center' as const,
    color: '#ffffff',
  },
  logo: {
    maxWidth: '120px',
    height: 'auto',
    marginBottom: '20px',
    borderRadius: '8px',
  },
  welcomeTitle: {
    fontSize: '28px',
    fontWeight: 'bold',
    margin: '0 0 10px 0',
    textShadow: '0 2px 4px rgba(0,0,0,0.3)',
  },
  subtitle: {
    fontSize: '16px',
    margin: '0',
    opacity: 0.9,
  },
  content: {
    padding: '40px 30px',
  },
  greeting: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: '20px',
  },
  description: {
    fontSize: '16px',
    lineHeight: '1.8',
    color: '#34495e',
    marginBottom: '30px',
  },
  highlightBox: {
    backgroundColor: '#f8f9fa',
    border: '1px solid #e9ecef',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '30px',
  },
  benefitsList: {
    listStyle: 'none',
    padding: '0',
    margin: '0',
  },
  benefitItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '12px',
    fontSize: '15px',
    color: '#2c3e50',
  },
  checkIcon: {
    width: '20px',
    height: '20px',
    backgroundColor: '#27ae60',
    borderRadius: '50%',
    marginRight: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    fontSize: '12px',
    fontWeight: 'bold',
  },
  postsSection: {
    marginTop: '40px',
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: '20px',
    borderBottom: '2px solid #3498db',
    paddingBottom: '8px',
  },
  postCard: {
    border: '1px solid #e9ecef',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '15px',
    backgroundColor: '#ffffff',
    transition: 'transform 0.2s ease',
  },
  postTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: '8px',
    textDecoration: 'none',
  },
  postExcerpt: {
    fontSize: '14px',
    color: '#7f8c8d',
    lineHeight: '1.6',
    marginBottom: '10px',
  },
  postDate: {
    fontSize: '12px',
    color: '#95a5a6',
  },
  ctaSection: {
    textAlign: 'center' as const,
    margin: '40px 0',
    padding: '30px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
  },
  ctaButton: {
    display: 'inline-block',
    padding: '15px 30px',
    backgroundColor: '#3498db',
    color: '#ffffff',
    textDecoration: 'none',
    borderRadius: '25px',
    fontWeight: 'bold',
    fontSize: '16px',
    boxShadow: '0 4px 15px rgba(52, 152, 219, 0.3)',
    transition: 'all 0.3s ease',
  },
  footer: {
    backgroundColor: '#34495e',
    padding: '30px 20px',
    textAlign: 'center' as const,
    color: '#ecf0f1',
  },
  socialLinks: {
    marginBottom: '20px',
  },
  socialLink: {
    display: 'inline-block',
    margin: '0 15px',
    padding: '10px',
    backgroundColor: '#2c3e50',
    color: '#ecf0f1',
    textDecoration: 'none',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    lineHeight: '20px',
    transition: 'background-color 0.3s ease',
  },
  footerText: {
    fontSize: '14px',
    margin: '10px 0',
    opacity: 0.8,
  },
  unsubscribe: {
    fontSize: '12px',
    margin: '20px 0 0 0',
  },
  unsubscribeLink: {
    color: '#95a5a6',
    textDecoration: 'none',
  },
};

export function SubscriptionWelcomeTemplate({
  subscriberName,
  subscriberEmail,
  blogName = "我的博客",
  blogDescription = "分享技术见解与生活感悟",
  blogLogo,
  primaryColor = "#3498db",
  accentColor = "#2ecc71",
  latestPosts = [],
  socialLinks = {},
  unsubscribeLink
}: SubscriptionWelcomeTemplateProps) {
  const customStyles = {
    ...subscriptionStyles,
    ctaButton: {
      ...subscriptionStyles.ctaButton,
      backgroundColor: primaryColor,
    },
    checkIcon: {
      ...subscriptionStyles.checkIcon,
      backgroundColor: accentColor,
    }
  };

  return (
    <div style={subscriptionStyles.container}>
      {/* 精美的头部区域 */}
      <div style={subscriptionStyles.header}>
        {blogLogo && (
          <img src={blogLogo} alt={blogName} style={subscriptionStyles.logo} />
        )}
        <h1 style={subscriptionStyles.welcomeTitle}>🎉 欢迎订阅！</h1>
        <p style={subscriptionStyles.subtitle}>{blogDescription}</p>
      </div>

      {/* 主要内容区域 */}
      <div style={subscriptionStyles.content}>
        <div style={subscriptionStyles.greeting}>
          👋 {subscriberName ? `你好，${subscriberName}！` : '你好！'}
        </div>

        <p style={subscriptionStyles.description}>
          感谢您订阅 <strong>{blogName}</strong>！我们很高兴您能加入我们的读者社区。
          您的邮箱 <strong>{subscriberEmail}</strong> 已成功添加到我们的订阅列表中。
        </p>

        {/* 订阅福利展示 */}
        <div style={subscriptionStyles.highlightBox}>
          <h3 style={{ margin: '0 0 15px 0', color: '#2c3e50' }}>🌟 作为订阅者，您将享受到：</h3>
          <ul style={subscriptionStyles.benefitsList}>
            <li style={subscriptionStyles.benefitItem}>
              <span style={customStyles.checkIcon}>✓</span>
              第一时间收到最新文章推送
            </li>
            <li style={subscriptionStyles.benefitItem}>
              <span style={customStyles.checkIcon}>✓</span>
              独家技术见解和深度分析
            </li>
            <li style={subscriptionStyles.benefitItem}>
              <span style={customStyles.checkIcon}>✓</span>
              精选资源和工具推荐
            </li>
            <li style={subscriptionStyles.benefitItem}>
              <span style={customStyles.checkIcon}>✓</span>
              订阅者专属内容和福利
            </li>
          </ul>
        </div>

        {/* 最新文章推荐 */}
        {latestPosts.length > 0 && (
          <div style={subscriptionStyles.postsSection}>
            <h3 style={subscriptionStyles.sectionTitle}>📚 最新精选文章</h3>
            {latestPosts.slice(0, 3).map((post, index) => (
              <div key={index} style={subscriptionStyles.postCard}>
                <a href={post.url} style={subscriptionStyles.postTitle}>
                  {post.title}
                </a>
                <p style={subscriptionStyles.postExcerpt}>{post.excerpt}</p>
                <div style={subscriptionStyles.postDate}>{post.publishDate}</div>
              </div>
            ))}
          </div>
        )}

        {/* 行动号召区域 */}
        <div style={subscriptionStyles.ctaSection}>
          <h3 style={{ margin: '0 0 15px 0', color: '#2c3e50' }}>🚀 开始探索</h3>
          <p style={{ margin: '0 0 20px 0', color: '#7f8c8d' }}>
            访问我们的博客，发现更多精彩内容
          </p>
          <a href={socialLinks.website || '#'} style={customStyles.ctaButton}>
            立即访问博客
          </a>
        </div>

        <p style={subscriptionStyles.description}>
          如果您有任何问题或建议，请随时回复此邮件。我们很乐意听到您的声音！
        </p>

        <p style={{ ...subscriptionStyles.description, fontStyle: 'italic' }}>
          再次感谢您的订阅，期待与您分享更多精彩内容！<br />
          <strong>{blogName} 团队</strong> ❤️
        </p>
      </div>

      {/* 精美的底部区域 */}
      <div style={subscriptionStyles.footer}>
        {/* 社交媒体链接 */}
        {(socialLinks.website || socialLinks.twitter || socialLinks.github || socialLinks.linkedin) && (
          <div style={subscriptionStyles.socialLinks}>
            {socialLinks.website && (
              <a href={socialLinks.website} style={subscriptionStyles.socialLink} title="官网">
                🌐
              </a>
            )}
            {socialLinks.twitter && (
              <a href={socialLinks.twitter} style={subscriptionStyles.socialLink} title="Twitter">
                🐦
              </a>
            )}
            {socialLinks.github && (
              <a href={socialLinks.github} style={subscriptionStyles.socialLink} title="GitHub">
                💻
              </a>
            )}
            {socialLinks.linkedin && (
              <a href={socialLinks.linkedin} style={subscriptionStyles.socialLink} title="LinkedIn">
                💼
              </a>
            )}
          </div>
        )}

        <p style={subscriptionStyles.footerText}>
          © 2024 {blogName}. 保留所有权利。
        </p>
        
        <p style={subscriptionStyles.footerText}>
          您收到此邮件是因为您订阅了我们的博客更新。
        </p>

        {unsubscribeLink && (
          <p style={subscriptionStyles.unsubscribe}>
            <a href={unsubscribeLink} style={subscriptionStyles.unsubscribeLink}>
              取消订阅
            </a>
          </p>
        )}
      </div>
    </div>
  );
}

// 导出渲染为HTML字符串的函数
export function renderSubscriptionWelcomeHTML(props: SubscriptionWelcomeTemplateProps): string {
  // 这里可以使用 ReactDOMServer.renderToString() 来渲染
  // 但为了简化，我们直接返回HTML字符串
  const template = SubscriptionWelcomeTemplate(props);
  
  // 简化版本：直接返回HTML字符串
  return `
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>欢迎订阅 - ${props.blogName || '我的博客'}</title>
      <style>
        body {
          margin: 0;
          padding: 20px;
          background-color: #f5f6fa;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        }
        .email-container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          overflow: hidden;
        }
        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 40px 20px;
          text-align: center;
          color: #ffffff;
        }
        .welcome-title {
          font-size: 28px;
          font-weight: bold;
          margin: 0 0 10px 0;
          text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        .subtitle {
          font-size: 16px;
          margin: 0;
          opacity: 0.9;
        }
        .content {
          padding: 40px 30px;
        }
        .greeting {
          font-size: 20px;
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 20px;
        }
        .description {
          font-size: 16px;
          line-height: 1.8;
          color: #34495e;
          margin-bottom: 30px;
        }
        .highlight-box {
          background-color: #f8f9fa;
          border: 1px solid #e9ecef;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 30px;
        }
        .benefits-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .benefit-item {
          display: flex;
          align-items: center;
          margin-bottom: 12px;
          font-size: 15px;
          color: #2c3e50;
        }
        .check-icon {
          width: 20px;
          height: 20px;
          background-color: #27ae60;
          border-radius: 50%;
          margin-right: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          font-size: 12px;
          font-weight: bold;
        }
        .cta-section {
          text-align: center;
          margin: 40px 0;
          padding: 30px;
          background-color: #f8f9fa;
          border-radius: 8px;
        }
        .cta-button {
          display: inline-block;
          padding: 15px 30px;
          background-color: #3498db;
          color: #ffffff;
          text-decoration: none;
          border-radius: 25px;
          font-weight: bold;
          font-size: 16px;
          box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
        }
        .footer {
          background-color: #34495e;
          padding: 30px 20px;
          text-align: center;
          color: #ecf0f1;
        }
        .social-links {
          margin-bottom: 20px;
        }
        .social-link {
          display: inline-block;
          margin: 0 15px;
          padding: 10px;
          background-color: #2c3e50;
          color: #ecf0f1;
          text-decoration: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          line-height: 20px;
        }
        .footer-text {
          font-size: 14px;
          margin: 10px 0;
          opacity: 0.8;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <h1 class="welcome-title">🎉 欢迎订阅！</h1>
          <p class="subtitle">${props.blogDescription || '分享技术见解与生活感悟'}</p>
        </div>
        
        <div class="content">
          <div class="greeting">
            👋 ${props.subscriberName ? `你好，${props.subscriberName}！` : '你好！'}
          </div>
          
          <p class="description">
            感谢您订阅 <strong>${props.blogName || '我的博客'}</strong>！我们很高兴您能加入我们的读者社区。
            您的邮箱 <strong>${props.subscriberEmail}</strong> 已成功添加到我们的订阅列表中。
          </p>
          
          <div class="highlight-box">
            <h3 style="margin: 0 0 15px 0; color: #2c3e50;">🌟 作为订阅者，您将享受到：</h3>
            <ul class="benefits-list">
              <li class="benefit-item">
                <span class="check-icon">✓</span>
                第一时间收到最新文章推送
              </li>
              <li class="benefit-item">
                <span class="check-icon">✓</span>
                独家技术见解和深度分析
              </li>
              <li class="benefit-item">
                <span class="check-icon">✓</span>
                精选资源和工具推荐
              </li>
              <li class="benefit-item">
                <span class="check-icon">✓</span>
                订阅者专属内容和福利
              </li>
            </ul>
          </div>
          
          <div class="cta-section">
            <h3 style="margin: 0 0 15px 0; color: #2c3e50;">🚀 开始探索</h3>
            <p style="margin: 0 0 20px 0; color: #7f8c8d;">
              访问我们的博客，发现更多精彩内容
            </p>
            <a href="${props.socialLinks?.website || '#'}" class="cta-button">
              立即访问博客
            </a>
          </div>
          
          <p class="description">
            如果您有任何问题或建议，请随时回复此邮件。我们很乐意听到您的声音！
          </p>
          
          <p class="description" style="font-style: italic;">
            再次感谢您的订阅，期待与您分享更多精彩内容！<br />
            <strong>${props.blogName || '我的博客'} 团队</strong> ❤️
          </p>
        </div>
        
        <div class="footer">
          <p class="footer-text">
            © 2024 ${props.blogName || '我的博客'}. 保留所有权利。
          </p>
          <p class="footer-text">
            您收到此邮件是因为您订阅了我们的博客更新。
          </p>
          ${props.unsubscribeLink ? `
          <p style="font-size: 12px; margin: 20px 0 0 0;">
            <a href="${props.unsubscribeLink}" style="color: #95a5a6; text-decoration: none;">
              取消订阅
            </a>
          </p>
          ` : ''}
        </div>
      </div>
    </body>
    </html>
  `;
}