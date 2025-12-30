'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function EventForm() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    type: 'Social',
    max_attendees: 0,
  });

  const eventTypes = ['Social', 'RPG Session', 'Board Games', 'Movie Night', 'Tournament', 'Workshop', 'Special Event'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!user) {
      setError('You must be logged in to create an event');
      setLoading(false);
      return;
    }

    const { error: submitError } = await supabase
      .from('events')
      .insert([
        {
          ...formData,
          created_by: user.id,
          current_attendees: 0,
          max_attendees: formData.max_attendees > 0 ? formData.max_attendees : null,
        },
      ]);

    if (submitError) {
      setError(submitError.message);
      setLoading(false);
    } else {
      router.push('/dashboard?success=event');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Create Event</h2>

      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-500 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="title" className="block mb-2 font-semibold">
          Event Title *
        </label>
        <input
          id="title"
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          className="w-full px-4 py-2 rounded border bg-transparent focus:outline-none focus:ring-2 focus:ring-current"
          placeholder="e.g., D&D Campaign Night"
        />
      </div>

      <div>
        <label htmlFor="type" className="block mb-2 font-semibold">
          Event Type *
        </label>
        <select
          id="type"
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          required
          className="w-full px-4 py-2 rounded border bg-transparent focus:outline-none focus:ring-2 focus:ring-current"
        >
          {eventTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="date" className="block mb-2 font-semibold">
            Date *
          </label>
          <input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-2 rounded border bg-transparent focus:outline-none focus:ring-2 focus:ring-current"
          />
        </div>

        <div>
          <label htmlFor="time" className="block mb-2 font-semibold">
            Time *
          </label>
          <input
            id="time"
            type="time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            required
            className="w-full px-4 py-2 rounded border bg-transparent focus:outline-none focus:ring-2 focus:ring-current"
          />
        </div>
      </div>

      <div>
        <label htmlFor="location" className="block mb-2 font-semibold">
          Location *
        </label>
        <input
          id="location"
          type="text"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          required
          className="w-full px-4 py-2 rounded border bg-transparent focus:outline-none focus:ring-2 focus:ring-current"
          placeholder="e.g., Room 204, Student Center"
        />
      </div>

      <div>
        <label htmlFor="max_attendees" className="block mb-2 font-semibold">
          Max Attendees (0 = unlimited)
        </label>
        <input
          id="max_attendees"
          type="number"
          min="0"
          value={formData.max_attendees}
          onChange={(e) => setFormData({ ...formData, max_attendees: parseInt(e.target.value) || 0 })}
          className="w-full px-4 py-2 rounded border bg-transparent focus:outline-none focus:ring-2 focus:ring-current"
          placeholder="0"
        />
      </div>

      <div>
        <label htmlFor="description" className="block mb-2 font-semibold">
          Description *
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
          rows={6}
          className="w-full px-4 py-2 rounded border bg-transparent focus:outline-none focus:ring-2 focus:ring-current"
          placeholder="Describe your event..."
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full btn-primary py-3 rounded-lg font-semibold disabled:opacity-50"
      >
        {loading ? 'Creating...' : 'Create Event'}
      </button>
    </form>
  );
}
