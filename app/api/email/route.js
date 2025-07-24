// app/api/email/route.js (App Router)

import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { type, to, subject, text, html, ...templateProps } = await request.json();

    let emailHtml = html; // 默认使用传入的html
    let emailSubject = subject; // 默认使用传入的subject

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
      subject: subject,           // 邮件主题
      text: text,                 // 纯文本内容
      html: html,                 // HTML 内容
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