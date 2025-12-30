'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeSwitcher from './ThemeSwitcher';

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Home' },
    { href: '/articles', label: 'Articles' },
    { href: '/reviews', label: 'Reviews' },
    { href: '/events', label: 'Events' },
    { href: '/rpg-guides', label: 'RPG Guides' },
  ];

  return (
    <nav className="header sticky top-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-glow">
          BKFT Blog
        </Link>

        <div className="hidden md:flex gap-6">
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

        <ThemeSwitcher />
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
