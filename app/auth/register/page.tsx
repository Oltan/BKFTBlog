import Link from 'next/link';
import RegisterForm from '@/components/auth/RegisterForm';

export default function RegisterPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <RegisterForm />
      <p className="text-center mt-6">
        Already have an account?{' '}
        <Link href="/auth/login" className="font-bold hover:underline">
          Login here
        </Link>
      </p>
    </div>
  );
}
