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
const adminChatId = 691976114; // ID для отправки сообщений

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const data = await req.json();

    if (!data) {
      return new NextResponse('Bad Request', { status: 400 });
    }

    const {
      name,
      phone,
      email,
      deliveryMethod,
      address,
      comment,
      artikul,
      title,
    } = data;

    const deliveryText = {
      pickup: 'Самовывоз со склада',
      moscow: 'Доставка по г. Москва и МО',
      regions: 'Доставка в регионы РФ',
    } as const; // Добавляем 'as const' для строгой типизации объекта

    const deliveryMethodKey = deliveryMethod as keyof typeof deliveryText;

    const deliveryMessage = deliveryText[deliveryMethodKey] || 'Не указан';

    const formattedMessage = `
✨ *Новая заявка на заказ* ✨

👤 *Имя:* ${name || 'Не указано'}
📞 *Телефон:* ${phone || 'Не указан'}
📧 *Email:* ${email || 'Не указан'}
🚚 *Способ доставки:* ${deliveryMessage}
📍 *Адрес доставки:* ${address || 'Не указан'}
📝 *Комментарий:* ${comment || 'Нет комментария'}
📦 *Артикул:* ${artikul || 'Не указан'}
📜 *Заголовок:* ${title || 'Не указан'}

🕒 *Дата и время заказа:* ${new Date().toLocaleString()}
`;

    await bot.api.sendMessage(adminChatId, escapeMessage(formattedMessage), {
      parse_mode: 'MarkdownV2',
    });

    return new NextResponse('OK', { status: 200 });
  } catch {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};
