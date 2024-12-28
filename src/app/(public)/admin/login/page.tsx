'use client';

import process from 'process';

import type { FC, FormEvent } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';

import { Button } from '@/src/shared/ui/button';
import { Input } from '@/src/shared/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/src/shared/ui/card';
import { Label } from '@/src/shared/ui/label';
import { Alert, AlertDescription } from '@/src/shared/ui/alert';

const AdminLogin: FC = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    // Получаем код из переменных окружения
    const adminCode = process.env.NEXT_PUBLIC_ADMIN_CODE;

    // Сравниваем введенный код с кодом из окружения
    if (code === adminCode) {
      // Если код правильный, перенаправляем в админку
      router.push('/admin/dashboard');
    } else {
      // Если код неправильный, выводим ошибку
      setError('Неправильный код доступа');
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-[350px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Админ панель</CardTitle>
          <CardDescription className="text-center">
            Введите код доступа для входа
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="code">Код доступа</Label>
                <Input
                  id="code"
                  type="password"
                  placeholder="Введите код"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" disabled={loading} variant={'dark'}>
                {loading ? (
                  <Lock className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Lock className="mr-2 h-4 w-4" />
                )}
                {loading ? 'Вход...' : 'Войти'}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          {error && (
            <Alert variant="destructive" className="w-full">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminLogin;
