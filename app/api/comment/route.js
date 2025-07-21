import { z } from "zod";
import prisma from '../../../lib/prisma'; 

const commentSchema = z.object({
  message: z.string().min(1, { message: "Message cannot be empty." }).max(500, { message: "Message cannot exceed 500 characters." }),
  authorName: z.string().min(1, { message: "Author name cannot be empty." }).max(100, { message: "Author name cannot exceed 100 characters." }),
  authorEmail: z.string().email({ message: "Invalid email address." }).optional().or(z.literal("")),
  parentId: z.number().int().positive().optional().nullable(),
});

export async function POST(req) { // 明确 req 的类型为 Request
  const body = await req.json();
  const result = commentSchema.safeParse(body);

  if (!result.success) {
    // Zod 验证失败，返回 400 Bad Request
    return Response.json({ error: result.error.errors }, { status: 400 }); // 返回 result.error.errors 获取详细验证错误
  }

  try {
    // 使用 await 等待 Prisma 创建操作完成
    const comment = await prisma.comment.create({
      data: result.data,
    });

    // 成功创建评论，返回 201 Created
    return Response.json({ data: comment }, { status: 201 });
  } catch (error) {
    // 捕获数据库操作或其他服务器端错误
    console.error("Error creating comment:", error);
    // 返回 500 Internal Server Error
    return Response.json({ error: "Failed to create comment due to a server error." }, { status: 500 });
  }
}


export function GET() {
    return new Response("Hello World!")
}