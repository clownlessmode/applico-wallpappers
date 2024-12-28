import process from 'process';

import { Bot } from 'grammy';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import escapeMessage from '../../../shared/lib/escape-message';

// Токен бота
const token = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;

if (!token) {
  throw new Error('TELEGRAM_BOT_TOKEN environment variable not found.');
}

const bot = new Bot(token);
const adminChatId = 517746645; // ID для отправки сообщений

// Обработка текстовых сообщений
bot.on('message:text', async (ctx) => {
  await ctx.reply(ctx.message.text);
});

// Обработчик webhook запросов
export const POST = async (req: NextRequest): Promise<NextResponse> => {
  // Получение данных из запроса
  const data = await req.json();

  if (!data) {
    return new NextResponse('Bad Request', { status: 400 });
  }
  const { name, phone, budget } = data;

  const formattedMessage = `
✨ *Новая заявка на консультацию* ✨

👤 *Имя:* ${name || 'Не указано'}
📞 *Телефон:* ${phone || 'Не указан'}
💰 *Бюджет:* ${budget || 'Не указан'}

`;
  try {
    await bot.api.sendMessage(adminChatId, escapeMessage(formattedMessage), {
      parse_mode: 'MarkdownV2',
    });
    return new NextResponse('OK', { status: 200 });
  } catch {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};
