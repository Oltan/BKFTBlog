'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function ArticleForm() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: 'Analysis',
  });

  const categories = ['Analysis', 'News', 'Discussion', 'Lists', 'Educational', 'Opinion'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!user) {
      setError('You must be logged in to submit an article');
      setLoading(false);
      return;
    }

    // Get user profile for author name
    const { data: profile } = await supabase
      .from('profiles')
      .select('username, full_name')
      .eq('id', user.id)
      .single();

    const authorName = profile?.full_name || profile?.username || 'Anonymous';

    const { error: submitError } = await supabase
      .from('articles')
      .insert([
        {
          ...formData,
          author_id: user.id,
          author: authorName,
          published: false, // Articles need approval by default
        },
      ]);

    if (submitError) {
      setError(submitError.message);
      setLoading(false);
    } else {
      router.push('/dashboard?success=article');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Submit Article</h2>

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
          placeholder="Enter article title"
        />
      </div>

      <div>
        <label htmlFor="category" className="block mb-2 font-semibold">
          Category *
        </label>
        <select
          id="category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          required
          className="w-full px-4 py-2 rounded border bg-transparent focus:outline-none focus:ring-2 focus:ring-current"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="excerpt" className="block mb-2 font-semibold">
          Excerpt (Short Summary) *
        </label>
        <textarea
          id="excerpt"
          value={formData.excerpt}
          onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
          required
          rows={3}
          className="w-full px-4 py-2 rounded border bg-transparent focus:outline-none focus:ring-2 focus:ring-current"
          placeholder="Brief summary of your article..."
        />
      </div>

      <div>
        <label htmlFor="content" className="block mb-2 font-semibold">
          Content *
        </label>
        <textarea
          id="content"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          required
          rows={12}
          className="w-full px-4 py-2 rounded border bg-transparent focus:outline-none focus:ring-2 focus:ring-current"
          placeholder="Write your article here..."
        />
      </div>

      <div className="bg-blue-500/20 border border-blue-500 px-4 py-3 rounded">
        <p className="text-sm">
          📝 Your article will be reviewed by moderators before being published.
        </p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full btn-primary py-3 rounded-lg font-semibold disabled:opacity-50"
      >
        {loading ? 'Submitting...' : 'Submit Article'}
      </button>
    </form>
  );
}
