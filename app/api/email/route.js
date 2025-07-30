// app/api/email/route.js (App Router)

import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { type, to, subject, text, html, ...templateProps } = await request.json();

    let emailHtml = html; // 默认使用传入的html
    let emailSubject = subject; // 默认使用传入的subject

    // 添加欢迎订阅模板
    if (type === 'welcome') {
      emailSubject = '欢迎订阅我的博客！';
      emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 28px;">欢迎订阅！</h1>
          </div>
          <div style="background: #f9f9f9; padding: 30px; border: 1px solid #eee;">
            <h2 style="color: #333;">亲爱的用户，</h2>
            <p style="color: #666; line-height: 1.6; font-size: 16px;">
              感谢您订阅我们的服务！我们很高兴能与您分享最新资讯和独家内容。
            </p>
            <p style="color: #666; line-height: 1.6; font-size: 16px;">
              在这里，您将获得：
            </p>
            <ul style="color: #666; line-height: 1.6; font-size: 16px;">
              <li>最新产品更新和功能发布</li>
              <li>独家优惠和折扣信息</li>
              <li>行业洞察和专业建议</li>
              <li>精选内容和实用资源</li>
            </ul>
        
            <p style="color: #666; line-height: 1.6; font-size: 16px;">
              如有任何问题，请随时联系我们。<br/>
              祝您使用愉快！
            </p>
          </div>
          <div style="background: #333; color: #fff; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; font-size: 14px;">
            <p style="margin: 0;">© 2025 yyp123.xyz  </p>
          </div>
        </div>
      `;
    }

    // 创建一个 Nodemailer 传输器
    // 生产环境请使用环境变量来存储敏感信息
    let transporter = nodemailer.createTransport({
      host: 'smtp.163.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,    // 你的网易邮箱地址
        pass: process.env.EMAIL_PASS,    // 你的邮箱密码或授权码
      },
    });

    // 发送邮件
    await transporter.sendMail({
      from: process.env.EMAIL_USER, // 发件人地址
      to: to,                     // 收件人地址
      subject: emailSubject,      // 邮件主题
      text: text,                 // 纯文本内容
      html: emailHtml,            // HTML 内容
    });

    return NextResponse.json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { message: 'Failed to send email.', error: error.message },
      { status: 500 }
    );
  }
}

// 添加发送邮件的JSON请求示例
/*
发送邮件的JSON请求示例:

1. 发送普通邮件:
{
  "to": "recipient@example.com",
  "subject": "Test Subject",
  "text": "This is a plain text email",
  "html": "<h1>This is an HTML email</h1><p>With some content</p>"
}

2. 发送欢迎订阅邮件:
{
  "type": "welcome",
  "to": "newsubscriber@example.com"
}

3. 发送自定义HTML邮件:
{
  "to": "user@example.com",
  "subject": "Custom Subject",
  "html": "<div><h1>Custom HTML content</h1><p>This is a custom email</p></div>"
}
*/