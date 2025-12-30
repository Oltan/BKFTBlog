import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Hero Section */}
      <section className="text-center py-20">
        <h1 className="text-6xl font-bold mb-6 text-glow">
          Welcome to BKFT
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
          Your gateway to science fiction, fantasy, and role-playing culture.
          Explore reviews, guides, events, and join our community!
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/articles"
            className="btn-primary px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105"
          >
            Read Articles
          </Link>
          <Link
            href="/events"
            className="card px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105"
          >
            View Events
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
        <FeatureCard
          title="📚 Articles"
          description="Deep dives into sci-fi and fantasy worlds"
          href="/articles"
        />
        <FeatureCard
          title="⭐ Reviews"
          description="Movies, comics, video games, and RPGs"
          href="/reviews"
        />
        <FeatureCard
          title="🎲 RPG Guides"
          description="Learn to master tabletop role-playing games"
          href="/rpg-guides"
        />
        <FeatureCard
          title="🎉 Events"
          description="Join our activities and register for events"
          href="/events"
        />
      </section>

      {/* Latest News Section */}
      <section className="mt-20">
        <h2 className="text-4xl font-bold mb-8">Latest News</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <NewsCard
            title="New RPG Campaign Starting"
            date="Dec 30, 2024"
            excerpt="Join our Dungeons & Dragons campaign this January!"
          />
          <NewsCard
            title="Sci-Fi Movie Night"
            date="Dec 28, 2024"
            excerpt="We're watching Blade Runner 2049 this Friday"
          />
          <NewsCard
            title="Book Club: Foundation"
            date="Dec 25, 2024"
            excerpt="Discussing Asimov's masterpiece next week"
          />
        </div>
      </section>

      {/* Theme Showcase */}
      <section className="mt-20 text-center">
        <h2 className="text-4xl font-bold mb-4">Experience Different Worlds</h2>
        <p className="mb-8 opacity-80">
          Switch themes above to explore Cyberpunk, Medieval Fantasy, or Space Opera aesthetics
        </p>
      </section>
    </div>
  );
}

function FeatureCard({ title, description, href }: { title: string; description: string; href: string }) {
  return (
    <Link
      href={href}
      className="card p-6 rounded-lg hover:scale-105 transition-all"
    >
      <h3 className="text-2xl font-bold mb-3">{title}</h3>
      <p className="opacity-80">{description}</p>
    </Link>
  );
}

function NewsCard({ title, date, excerpt }: { title: string; date: string; excerpt: string }) {
  return (
    <article className="card p-6 rounded-lg">
      <p className="text-sm opacity-60 mb-2">{date}</p>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="opacity-80">{excerpt}</p>
    </article>
  );
}
