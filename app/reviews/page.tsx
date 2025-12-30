export default function ReviewsPage() {
  const reviews = [
    {
      id: 1,
      title: "Dune: Part Two",
      type: "Movie",
      rating: 5,
      author: "Alex Chen",
      date: "Dec 22, 2024",
      excerpt: "Villeneuve delivers another masterpiece that expands on Herbert's universe...",
    },
    {
      id: 2,
      title: "Baldur's Gate 3",
      type: "Video Game",
      rating: 5,
      author: "Mike Rodriguez",
      date: "Dec 20, 2024",
      excerpt: "The best D&D video game experience ever created...",
    },
    {
      id: 3,
      title: "The Expanse RPG",
      type: "Tabletop RPG",
      rating: 4,
      author: "Emma Watson",
      date: "Dec 18, 2024",
      excerpt: "A solid adaptation of the beloved sci-fi series...",
    },
    {
      id: 4,
      title: "Saga Volume 11",
      type: "Comic",
      rating: 5,
      author: "Chris Lee",
      date: "Dec 15, 2024",
      excerpt: "Brian K. Vaughan and Fiona Staples return with their space opera epic...",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-5xl font-bold mb-8 text-glow">Reviews</h1>
      <p className="text-xl mb-12 opacity-80">
        Honest reviews of movies, comics, video games, and tabletop RPGs
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {reviews.map((review) => (
          <article key={review.id} className="card p-6 rounded-lg hover:scale-105 transition-all">
            <div className="flex justify-between items-start mb-3">
              <span className="px-3 py-1 bg-opacity-50 rounded text-sm">{review.type}</span>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < review.rating ? 'text-yellow-400' : 'opacity-30'}>
                    ⭐
                  </span>
                ))}
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-3">{review.title}</h2>
            <p className="opacity-80 mb-4">{review.excerpt}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm">By {review.author} • {review.date}</span>
              <button className="btn-primary px-4 py-2 rounded">Read Review</button>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-12 text-center">
        <button className="btn-primary px-8 py-3 rounded-lg font-semibold">
          Submit Your Review
        </button>
      </div>
    </div>
  );
}
