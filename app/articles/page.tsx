import Link from 'next/link';

export default function ArticlesPage() {
  const articles = [
    {
      id: 1,
      title: "The Evolution of Cyberpunk in Modern Media",
      author: "Jane Doe",
      date: "Dec 20, 2024",
      category: "Analysis",
      excerpt: "From Blade Runner to Cyberpunk 2077, exploring how the genre has evolved...",
    },
    {
      id: 2,
      title: "Top 10 Fantasy Worlds We'd Love to Visit",
      author: "John Smith",
      date: "Dec 18, 2024",
      category: "Lists",
      excerpt: "Middle-earth, Westeros, and more incredible fantasy realms...",
    },
    {
      id: 3,
      title: "The Science Behind Science Fiction",
      author: "Dr. Sarah Johnson",
      date: "Dec 15, 2024",
      category: "Educational",
      excerpt: "How real science inspires and validates sci-fi storytelling...",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-5xl font-bold mb-8 text-glow">Articles</h1>
      <p className="text-xl mb-12 opacity-80">
        Deep dives, analysis, and thought-provoking pieces about sci-fi and fantasy
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <article key={article.id} className="card p-6 rounded-lg hover:scale-105 transition-all">
            <div className="text-sm opacity-60 mb-2">
              {article.category} • {article.date}
            </div>
            <h2 className="text-2xl font-bold mb-3">{article.title}</h2>
            <p className="opacity-80 mb-4">{article.excerpt}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm">By {article.author}</span>
              <button className="btn-primary px-4 py-2 rounded">Read More</button>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link href="/submit/article" className="inline-block btn-primary px-8 py-3 rounded-lg font-semibold">
          Submit Your Article
        </Link>
      </div>
    </div>
  );
}
