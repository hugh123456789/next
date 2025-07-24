'use client';

import { useState } from 'react';

export default function TestEmailPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [emailType, setEmailType] = useState('welcome');

  // 发送欢迎邮件
  const sendWelcomeEmail = async () => {
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'welcome',
          to: 'test@example.com', // 请替换为您的测试邮箱
          firstName: '张三',
          userEmail: 'test@example.com',
          activationLink: 'https://yoursite.com/activate?token=abc123',
          companyName: '科技创新公司',
          primaryColor: '#2563eb',
          footerText: '这是一封自动发送的邮件，请勿回复。',
          socialLinks: {
            website: 'https://yoursite.com',
            twitter: 'https://twitter.com/yourcompany',
            facebook: 'https://facebook.com/yourcompany'
          },
          unsubscribeLink: 'https://yoursite.com/unsubscribe'
        }),
      });

      const result = await response.json();
      
      if (response.ok) {
        setMessage('✅ 欢迎邮件发送成功！');
      } else {
        setMessage(`❌ 发送失败: ${result.message}`);
      }
    } catch (error) {
      setMessage(`❌ 发送失败: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // 发送通知邮件
  const sendNotificationEmail = async () => {
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'notification',
          to: 'test@example.com', // 请替换为您的测试邮箱
          title: '账户安全提醒',
          message: '我们检测到您的账户在新设备上登录。\n\n如果这是您本人的操作，请忽略此邮件。\n如果不是，请立即更改密码并联系客服。',
          actionText: '查看登录详情',
          actionLink: 'https://yoursite.com/security',
          userName: '李四',
          companyName: '安全科技',
          primaryColor: '#dc2626',
          footerText: '为了您的账户安全，请定期更换密码。'
        }),
      });

      const result = await response.json();
      
      if (response.ok) {
        setMessage('✅ 通知邮件发送成功！');
      } else {
        setMessage(`❌ 发送失败: ${result.message}`);
      }
    } catch (error) {
      setMessage(`❌ 发送失败: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // 发送营销邮件
  const sendMarketingEmail = async () => {
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'marketing',
          to: 'test@example.com', // 请替换为您的测试邮箱
          title: '限时优惠！新产品上线',
          subtitle: '专为您精心打造的解决方案',
          content: '我们很高兴地宣布，全新的产品系列现已正式上线！\n\n这款产品集成了最新的技术，为您提供前所未有的用户体验。现在购买可享受限时8折优惠。\n\n不要错过这个难得的机会，立即行动吧！',
          ctaText: '立即购买',
          ctaLink: 'https://yoursite.com/products/new',
          imageUrl: 'https://via.placeholder.com/600x300/2563eb/ffffff?text=新产品',
          companyName: '创新产品公司',
          primaryColor: '#059669',
          secondaryColor: '#6b7280',
          footerText: '感谢您对我们产品的关注与支持！',
          socialLinks: {
            website: 'https://yoursite.com',
            twitter: 'https://twitter.com/yourcompany',
            linkedin: 'https://linkedin.com/company/yourcompany'
          }
        }),
      });

      const result = await response.json();
      
      if (response.ok) {
        setMessage('✅ 营销邮件发送成功！');
      } else {
        setMessage(`❌ 发送失败: ${result.message}`);
      }
    } catch (error) {
      setMessage(`❌ 发送失败: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          邮件模板测试
        </h1>

        <div className="space-y-4">
          <button
            onClick={sendWelcomeEmail}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '发送中...' : '发送欢迎邮件'}
          </button>

          <button
            onClick={sendNotificationEmail}
            disabled={loading}
            className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '发送中...' : '发送通知邮件'}
          </button>

          <button
            onClick={sendMarketingEmail}
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '发送中...' : '发送营销邮件'}
          </button>
        </div>

        {message && (
          <div className="mt-6 p-4 rounded-md bg-gray-100">
            <p className="text-sm text-gray-700">{message}</p>
          </div>
        )}

        <div className="mt-8 text-sm text-gray-600">
          <h3 className="font-semibold mb-2">使用说明：</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>请先配置环境变量 EMAIL_USER 和 EMAIL_PASS</li>
            <li>将测试邮箱地址替换为您的真实邮箱</li>
            <li>确保邮件服务配置正确</li>
            <li>检查垃圾邮件文件夹</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
