/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// export const dynamic = 'force-dynamic';
// import process from 'process';

// export const fetchCache = 'force-no-store';

// import { Bot, webhookCallback } from 'grammy';

// const token = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;

// if (!token)
//   throw new Error('TELEGRAM_BOT_TOKEN environment variable not found.');

// const bot = new Bot(token);
// bot.on('message:text', async (ctx) => {
//   await ctx.reply(ctx.message.text);
// });

// export const POST = webhookCallback(bot, 'std/http');

// // id: 691976114
import process from 'process';

import { Bot } from 'grammy';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// Токен бота
const token = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;

if (!token) {
  throw new Error('TELEGRAM_BOT_TOKEN environment variable not found.');
}

const bot = new Bot(token);
const adminChatId = 691976114; // ID для отправки сообщений

// Обработка текстовых сообщений
bot.on('message:text', async (ctx) => {
  await ctx.reply(ctx.message.text);
});

// Обработчик webhook запросов
export const POST = async (req: NextRequest) => {
  // Получение данных из запроса
  const data = await req.json();

  if (!data) {
    return new NextResponse('Bad Request', { status: 400 });
  }

  // Отправка сообщения на заданный chat_id
  try {
    await bot.api.sendMessage(
      adminChatId,
      'Новая заявка: ' + JSON.stringify(data),
    );
    return new NextResponse('OK', { status: 200 });
  } catch {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};
