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

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  try {
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

🕒 *Дата и время заявки:* ${new Date().toLocaleString()}
`;

    await bot.api.sendMessage(adminChatId, escapeMessage(formattedMessage), {
      parse_mode: 'MarkdownV2',
    });

    return new NextResponse('OK', { status: 200 });
  } catch {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};
