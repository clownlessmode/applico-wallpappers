// lib/supabaseClient.js
import process from 'process';

import { createClient } from '@supabase/supabase-js';
// Ваши данные из Supabase (URL и ключ)
const SUPABASE_URL = process.env.NEXT_PUBLIC_PROJECT_URL; // Замените на ваш URL Supabase
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_API_KEY; // Замените на ваш Anon API ключ

// Создаем экземпляр клиента
const supabase = createClient(
  SUPABASE_URL as string,
  SUPABASE_ANON_KEY as string,
);

export default supabase;
