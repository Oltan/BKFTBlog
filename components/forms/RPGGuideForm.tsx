'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function RPGGuideForm() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    game: '',
    difficulty: 'beginner' as 'beginner' | 'intermediate' | 'advanced',
    topics: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!user) {
      setError('You must be logged in to submit a guide');
      setLoading(false);
      return;
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('username, full_name')
      .eq('id', user.id)
      .single();

    const authorName = profile?.full_name || profile?.username || 'Anonymous';

    // Convert comma-separated topics to array
    const topicsArray = formData.topics.split(',').map(t => t.trim()).filter(t => t);

    const { error: submitError } = await supabase
      .from('rpg_guides')
      .insert([
        {
          title: formData.title,
          content: formData.content,
          game: formData.game,
          difficulty: formData.difficulty,
          topics: topicsArray,
          author_id: user.id,
          author: authorName,
          published: false,
        },
      ]);

    if (submitError) {
      setError(submitError.message);
      setLoading(false);
    } else {
      router.push('/dashboard?success=guide');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Submit RPG Guide</h2>

      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-500 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="title" className="block mb-2 font-semibold">
          Guide Title *
        </label>
        <input
          id="title"
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          className="w-full px-4 py-2 rounded border bg-transparent focus:outline-none focus:ring-2 focus:ring-current"
          placeholder="e.g., Beginner's Guide to D&D 5e"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="game" className="block mb-2 font-semibold">
            Game System *
          </label>
          <input
            id="game"
            type="text"
            value={formData.game}
            onChange={(e) => setFormData({ ...formData, game: e.target.value })}
            required
            className="w-full px-4 py-2 rounded border bg-transparent focus:outline-none focus:ring-2 focus:ring-current"
            placeholder="e.g., D&D 5e, Pathfinder 2e"
          />
        </div>

        <div>
          <label htmlFor="difficulty" className="block mb-2 font-semibold">
            Difficulty Level *
          </label>
          <select
            id="difficulty"
            value={formData.difficulty}
            onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as any })}
            required
            className="w-full px-4 py-2 rounded border bg-transparent focus:outline-none focus:ring-2 focus:ring-current"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="topics" className="block mb-2 font-semibold">
          Topics (comma-separated) *
        </label>
        <input
          id="topics"
          type="text"
          value={formData.topics}
          onChange={(e) => setFormData({ ...formData, topics: e.target.value })}
          required
          className="w-full px-4 py-2 rounded border bg-transparent focus:outline-none focus:ring-2 focus:ring-current"
          placeholder="e.g., Character Creation, Combat, Rules"
        />
        <p className="text-sm opacity-70 mt-1">Separate topics with commas</p>
      </div>

      <div>
        <label htmlFor="content" className="block mb-2 font-semibold">
          Guide Content *
        </label>
        <textarea
          id="content"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          required
          rows={15}
          className="w-full px-4 py-2 rounded border bg-transparent focus:outline-none focus:ring-2 focus:ring-current"
          placeholder="Write your guide here... Include tips, examples, and clear explanations."
        />
      </div>

      <div className="bg-blue-500/20 border border-blue-500 px-4 py-3 rounded">
        <p className="text-sm">
          🎲 Your guide will be reviewed by moderators before being published.
        </p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full btn-primary py-3 rounded-lg font-semibold disabled:opacity-50"
      >
        {loading ? 'Submitting...' : 'Submit Guide'}
      </button>
    </form>
  );
}
