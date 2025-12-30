import Link from 'next/link';
import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <LoginForm />
      <p className="text-center mt-6">
        Don&apos;t have an account?{' '}
        <Link href="/auth/register" className="font-bold hover:underline">
          Register here
        </Link>
      </p>
    </div>
  );
}
