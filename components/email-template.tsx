import * as React from 'react';

// 基础邮件模板属性
interface BaseEmailTemplateProps {
  companyName?: string;
  companyLogo?: string;
  primaryColor?: string;
  secondaryColor?: string;
  footerText?: string;
  unsubscribeLink?: string;
  socialLinks?: {
    website?: string;
    twitter?: string;
    facebook?: string;
    linkedin?: string;
  };
}

// 欢迎邮件模板属性
interface WelcomeEmailTemplateProps extends BaseEmailTemplateProps {
  firstName: string;
  userEmail?: string;
  activationLink?: string;
}

// 通知邮件模板属性
interface NotificationEmailTemplateProps extends BaseEmailTemplateProps {
  title: string;
  message: string;
  actionText?: string;
  actionLink?: string;
  userName?: string;
}

// 营销邮件模板属性
interface MarketingEmailTemplateProps extends BaseEmailTemplateProps {
  title: string;
  subtitle?: string;
  content: string;
  ctaText: string;
  ctaLink: string;
  imageUrl?: string;
}

// 基础邮件样式
const baseStyles = {
  container: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    lineHeight: '1.6',
    color: '#333333',
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#ffffff',
  },
  header: {
    backgroundColor: '#f8f9fa',
    padding: '20px',
    textAlign: 'center' as const,
    borderBottom: '1px solid #e9ecef',
  },
  logo: {
    maxWidth: '150px',
    height: 'auto',
  },
  content: {
    padding: '30px 20px',
  },
  footer: {
    backgroundColor: '#f8f9fa',
    padding: '20px',
    textAlign: 'center' as const,
    borderTop: '1px solid #e9ecef',
    fontSize: '14px',
    color: '#6c757d',
  },
  button: {
    display: 'inline-block',
    padding: '12px 24px',
    backgroundColor: '#007bff',
    color: '#ffffff',
    textDecoration: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    margin: '20px 0',
  },
  socialLinks: {
    marginTop: '20px',
  },
  socialLink: {
    display: 'inline-block',
    margin: '0 10px',
    color: '#6c757d',
    textDecoration: 'none',
  },
};

// 欢迎邮件模板
export function WelcomeEmailTemplate({
  firstName,
  userEmail,
  activationLink,
  companyName = "我们的公司",
  companyLogo,
  primaryColor = "#007bff",
  footerText,
  unsubscribeLink,
  socialLinks = {}
}: WelcomeEmailTemplateProps) {
  const customButton = {
    ...baseStyles.button,
    backgroundColor: primaryColor,
  };

  return (
    <div style={baseStyles.container}>
      {/* 邮件头部 */}
      <div style={baseStyles.header}>
        {companyLogo && (
          <img src={companyLogo} alt={companyName} style={baseStyles.logo} />
        )}
        {!companyLogo && (
          <h2 style={{ margin: 0, color: primaryColor }}>{companyName}</h2>
        )}
      </div>

      {/* 邮件内容 */}
      <div style={baseStyles.content}>
        <h1 style={{ color: primaryColor, marginBottom: '20px' }}>
          欢迎加入我们，{firstName}！
        </h1>

        <p style={{ fontSize: '16px', marginBottom: '20px' }}>
          感谢您注册 {companyName}！我们很高兴您能成为我们社区的一员。
        </p>

        {userEmail && (
          <p style={{ fontSize: '14px', color: '#6c757d', marginBottom: '20px' }}>
            您的注册邮箱：{userEmail}
          </p>
        )}

        <p style={{ fontSize: '16px', marginBottom: '30px' }}>
          为了确保您能正常使用我们的服务，请点击下面的按钮激活您的账户：
        </p>

        {activationLink && (
          <div style={{ textAlign: 'center', margin: '30px 0' }}>
            <a href={activationLink} style={customButton}>
              激活账户
            </a>
          </div>
        )}

        <p style={{ fontSize: '14px', color: '#6c757d', marginTop: '30px' }}>
          如果您无法点击上面的按钮，请复制以下链接到浏览器地址栏：
          <br />
          <a href={activationLink} style={{ color: primaryColor, wordBreak: 'break-all' }}>
            {activationLink}
          </a>
        </p>

        <p style={{ fontSize: '16px', marginTop: '30px' }}>
          如果您有任何问题，请随时联系我们的客服团队。
        </p>

        <p style={{ fontSize: '16px', marginTop: '20px' }}>
          祝好，<br />
          {companyName} 团队
        </p>
      </div>

      {/* 邮件底部 */}
      <div style={baseStyles.footer}>
        {footerText && (
          <p style={{ margin: '0 0 10px 0' }}>{footerText}</p>
        )}

        <p style={{ margin: '0 0 10px 0' }}>
          © 2024 {companyName}. 保留所有权利。
        </p>

        {/* 社交媒体链接 */}
        {(socialLinks.website || socialLinks.twitter || socialLinks.facebook || socialLinks.linkedin) && (
          <div style={baseStyles.socialLinks}>
            {socialLinks.website && (
              <a href={socialLinks.website} style={baseStyles.socialLink}>官网</a>
            )}
            {socialLinks.twitter && (
              <a href={socialLinks.twitter} style={baseStyles.socialLink}>Twitter</a>
            )}
            {socialLinks.facebook && (
              <a href={socialLinks.facebook} style={baseStyles.socialLink}>Facebook</a>
            )}
            {socialLinks.linkedin && (
              <a href={socialLinks.linkedin} style={baseStyles.socialLink}>LinkedIn</a>
            )}
          </div>
        )}

        {unsubscribeLink && (
          <p style={{ margin: '20px 0 0 0', fontSize: '12px' }}>
            <a href={unsubscribeLink} style={{ color: '#6c757d' }}>取消订阅</a>
          </p>
        )}
      </div>
    </div>
  );
}

// 通知邮件模板
export function NotificationEmailTemplate({
  title,
  message,
  actionText,
  actionLink,
  userName,
  companyName = "我们的公司",
  companyLogo,
  primaryColor = "#007bff",
  footerText,
  unsubscribeLink,
  socialLinks = {}
}: NotificationEmailTemplateProps) {
  const customButton = {
    ...baseStyles.button,
    backgroundColor: primaryColor,
  };

  return (
    <div style={baseStyles.container}>
      {/* 邮件头部 */}
      <div style={baseStyles.header}>
        {companyLogo && (
          <img src={companyLogo} alt={companyName} style={baseStyles.logo} />
        )}
        {!companyLogo && (
          <h2 style={{ margin: 0, color: primaryColor }}>{companyName}</h2>
        )}
      </div>

      {/* 邮件内容 */}
      <div style={baseStyles.content}>
        {userName && (
          <p style={{ fontSize: '16px', marginBottom: '10px' }}>
            您好，{userName}！
          </p>
        )}

        <h1 style={{ color: primaryColor, marginBottom: '20px' }}>
          {title}
        </h1>

        <div style={{ fontSize: '16px', marginBottom: '30px', lineHeight: '1.6' }}>
          {message.split('\n').map((line, index) => (
            <p key={index} style={{ margin: '10px 0' }}>{line}</p>
          ))}
        </div>

        {actionText && actionLink && (
          <div style={{ textAlign: 'center', margin: '30px 0' }}>
            <a href={actionLink} style={customButton}>
              {actionText}
            </a>
          </div>
        )}

        <p style={{ fontSize: '16px', marginTop: '30px' }}>
          如果您有任何疑问，请随时联系我们。
        </p>

        <p style={{ fontSize: '16px', marginTop: '20px' }}>
          祝好，<br />
          {companyName} 团队
        </p>
      </div>

      {/* 邮件底部 */}
      <div style={baseStyles.footer}>
        {footerText && (
          <p style={{ margin: '0 0 10px 0' }}>{footerText}</p>
        )}

        <p style={{ margin: '0 0 10px 0' }}>
          © 2024 {companyName}. 保留所有权利。
        </p>

        {/* 社交媒体链接 */}
        {(socialLinks.website || socialLinks.twitter || socialLinks.facebook || socialLinks.linkedin) && (
          <div style={baseStyles.socialLinks}>
            {socialLinks.website && (
              <a href={socialLinks.website} style={baseStyles.socialLink}>官网</a>
            )}
            {socialLinks.twitter && (
              <a href={socialLinks.twitter} style={baseStyles.socialLink}>Twitter</a>
            )}
            {socialLinks.facebook && (
              <a href={socialLinks.facebook} style={baseStyles.socialLink}>Facebook</a>
            )}
            {socialLinks.linkedin && (
              <a href={socialLinks.linkedin} style={baseStyles.socialLink}>LinkedIn</a>
            )}
          </div>
        )}

        {unsubscribeLink && (
          <p style={{ margin: '20px 0 0 0', fontSize: '12px' }}>
            <a href={unsubscribeLink} style={{ color: '#6c757d' }}>取消订阅</a>
          </p>
        )}
      </div>
    </div>
  );
}

// 营销邮件模板
export function MarketingEmailTemplate({
  title,
  subtitle,
  content,
  ctaText,
  ctaLink,
  imageUrl,
  companyName = "我们的公司",
  companyLogo,
  primaryColor = "#007bff",
  secondaryColor = "#6c757d",
  footerText,
  unsubscribeLink,
  socialLinks = {}
}: MarketingEmailTemplateProps) {
  const customButton = {
    ...baseStyles.button,
    backgroundColor: primaryColor,
  };

  return (
    <div style={baseStyles.container}>
      {/* 邮件头部 */}
      <div style={baseStyles.header}>
        {companyLogo && (
          <img src={companyLogo} alt={companyName} style={baseStyles.logo} />
        )}
        {!companyLogo && (
          <h2 style={{ margin: 0, color: primaryColor }}>{companyName}</h2>
        )}
      </div>

      {/* 邮件内容 */}
      <div style={baseStyles.content}>
        {/* 主图片 */}
        {imageUrl && (
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <img
              src={imageUrl}
              alt={title}
              style={{
                maxWidth: '100%',
                height: 'auto',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
              }}
            />
          </div>
        )}

        {/* 标题 */}
        <h1 style={{
          color: primaryColor,
          marginBottom: '10px',
          fontSize: '28px',
          textAlign: 'center',
          fontWeight: 'bold'
        }}>
          {title}
        </h1>

        {/* 副标题 */}
        {subtitle && (
          <h2 style={{
            color: secondaryColor,
            marginBottom: '30px',
            fontSize: '18px',
            textAlign: 'center',
            fontWeight: 'normal'
          }}>
            {subtitle}
          </h2>
        )}

        {/* 内容 */}
        <div style={{
          fontSize: '16px',
          marginBottom: '40px',
          lineHeight: '1.8',
          textAlign: 'left'
        }}>
          {content.split('\n').map((paragraph, index) => (
            <p key={index} style={{ margin: '15px 0' }}>{paragraph}</p>
          ))}
        </div>

        {/* 行动按钮 */}
        <div style={{ textAlign: 'center', margin: '40px 0' }}>
          <a href={ctaLink} style={{
            ...customButton,
            fontSize: '18px',
            padding: '15px 30px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            transition: 'all 0.3s ease'
          }}>
            {ctaText}
          </a>
        </div>

        {/* 额外信息 */}
        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '20px',
          borderRadius: '8px',
          marginTop: '30px',
          textAlign: 'center'
        }}>
          <p style={{
            fontSize: '14px',
            color: secondaryColor,
            margin: '0',
            fontStyle: 'italic'
          }}>
            感谢您选择 {companyName}！我们致力于为您提供最优质的服务。
          </p>
        </div>
      </div>

      {/* 邮件底部 */}
      <div style={baseStyles.footer}>
        {footerText && (
          <p style={{ margin: '0 0 10px 0' }}>{footerText}</p>
        )}

        <p style={{ margin: '0 0 10px 0' }}>
          © 2024 {companyName}. 保留所有权利。
        </p>

        {/* 社交媒体链接 */}
        {(socialLinks.website || socialLinks.twitter || socialLinks.facebook || socialLinks.linkedin) && (
          <div style={baseStyles.socialLinks}>
            {socialLinks.website && (
              <a href={socialLinks.website} style={baseStyles.socialLink}>官网</a>
            )}
            {socialLinks.twitter && (
              <a href={socialLinks.twitter} style={baseStyles.socialLink}>Twitter</a>
            )}
            {socialLinks.facebook && (
              <a href={socialLinks.facebook} style={baseStyles.socialLink}>Facebook</a>
            )}
            {socialLinks.linkedin && (
              <a href={socialLinks.linkedin} style={baseStyles.socialLink}>LinkedIn</a>
            )}
          </div>
        )}

        {unsubscribeLink && (
          <p style={{ margin: '20px 0 0 0', fontSize: '12px' }}>
            <a href={unsubscribeLink} style={{ color: '#6c757d' }}>取消订阅</a>
          </p>
        )}
      </div>
    </div>
  );
}

// 导出原有的简单模板以保持向后兼容
export function EmailTemplate({ firstName }: { firstName: string }) {
  return <WelcomeEmailTemplate firstName={firstName} />;
}