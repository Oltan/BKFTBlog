'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import ThemeSwitcher from './ThemeSwitcher';

export default function Navbar() {
  const pathname = usePathname();
  const { user, signOut, loading } = useAuth();

  const links = [
    { href: '/', label: 'Home' },
    { href: '/articles', label: 'Articles' },
    { href: '/reviews', label: 'Reviews' },
    { href: '/events', label: 'Events' },
    { href: '/rpg-guides', label: 'RPG Guides' },
  ];

  return (
    <nav className="header sticky top-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-4">
        <Link href="/" className="text-2xl font-bold text-glow">
          BKFT Blog
        </Link>

        <div className="hidden md:flex gap-6 items-center">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`hover:text-glow transition-all ${
                pathname === link.href ? 'font-bold underline' : ''
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <ThemeSwitcher />

          {!loading && (
            <>
              {user ? (
                <div className="flex gap-2 items-center">
                  <Link
                    href="/dashboard"
                    className="px-4 py-2 rounded-lg btn-primary text-sm font-semibold"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="px-4 py-2 rounded-lg card text-sm font-semibold hover:opacity-80"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Link
                    href="/auth/login"
                    className="px-4 py-2 rounded-lg card text-sm font-semibold"
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/register"
                    className="px-4 py-2 rounded-lg btn-primary text-sm font-semibold"
                  >
                    Register
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden flex flex-wrap gap-4 mt-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-sm ${
              pathname === link.href ? 'font-bold underline' : ''
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
