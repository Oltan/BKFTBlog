'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function ReviewForm() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    type: 'movie' as 'movie' | 'game' | 'rpg' | 'comic',
    rating: 5,
  });

  const types = [
    { value: 'movie', label: 'Movie' },
    { value: 'game', label: 'Video Game' },
    { value: 'rpg', label: 'Tabletop RPG' },
    { value: 'comic', label: 'Comic/Manga' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!user) {
      setError('You must be logged in to submit a review');
      setLoading(false);
      return;
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('username, full_name')
      .eq('id', user.id)
      .single();

    const authorName = profile?.full_name || profile?.username || 'Anonymous';

    const { error: submitError } = await supabase
      .from('reviews')
      .insert([
        {
          ...formData,
          author_id: user.id,
          author: authorName,
          published: false,
        },
      ]);

    if (submitError) {
      setError(submitError.message);
      setLoading(false);
    } else {
      router.push('/dashboard?success=review');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Submit Review</h2>

      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-500 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="title" className="block mb-2 font-semibold">
          Title *
        </label>
        <input
          id="title"
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          className="w-full px-4 py-2 rounded border bg-transparent focus:outline-none focus:ring-2 focus:ring-current"
          placeholder="e.g., Dune: Part Two"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="type" className="block mb-2 font-semibold">
            Type *
          </label>
          <select
            id="type"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
            required
            className="w-full px-4 py-2 rounded border bg-transparent focus:outline-none focus:ring-2 focus:ring-current"
          >
            {types.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="rating" className="block mb-2 font-semibold">
            Rating (1-5 stars) *
          </label>
          <div className="flex items-center gap-2">
            <input
              id="rating"
              type="range"
              min="1"
              max="5"
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
              className="flex-1"
            />
            <span className="text-2xl">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < formData.rating ? 'text-yellow-400' : 'opacity-30'}>
                  ⭐
                </span>
              ))}
            </span>
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="excerpt" className="block mb-2 font-semibold">
          Quick Take (Short Summary) *
        </label>
        <textarea
          id="excerpt"
          value={formData.excerpt}
          onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
          required
          rows={2}
          className="w-full px-4 py-2 rounded border bg-transparent focus:outline-none focus:ring-2 focus:ring-current"
          placeholder="Your quick thoughts in one sentence..."
        />
      </div>

      <div>
        <label htmlFor="content" className="block mb-2 font-semibold">
          Full Review *
        </label>
        <textarea
          id="content"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          required
          rows={12}
          className="w-full px-4 py-2 rounded border bg-transparent focus:outline-none focus:ring-2 focus:ring-current"
          placeholder="Write your detailed review here..."
        />
      </div>

      <div className="bg-blue-500/20 border border-blue-500 px-4 py-3 rounded">
        <p className="text-sm">
          ⭐ Your review will be reviewed by moderators before being published.
        </p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full btn-primary py-3 rounded-lg font-semibold disabled:opacity-50"
      >
        {loading ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
}
