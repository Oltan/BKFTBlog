'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

function DashboardContent() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [userContent, setUserContent] = useState({
    articles: [] as any[],
    reviews: [] as any[],
    guides: [] as any[],
    events: [] as any[],
  });
  const [contentLoading, setContentLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      loadUserContent();
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    if (!user) return;

    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    setProfile(data);
  };

  const loadUserContent = async () => {
    if (!user) return;

    setContentLoading(true);

    const [articles, reviews, guides, events] = await Promise.all([
      supabase.from('articles').select('*').eq('author_id', user.id).order('created_at', { ascending: false }),
      supabase.from('reviews').select('*').eq('author_id', user.id).order('created_at', { ascending: false }),
      supabase.from('rpg_guides').select('*').eq('author_id', user.id).order('created_at', { ascending: false }),
      supabase.from('events').select('*').eq('created_by', user.id).order('created_at', { ascending: false }),
    ]);

    setUserContent({
      articles: articles.data || [],
      reviews: reviews.data || [],
      guides: guides.data || [],
      events: events.data || [],
    });

    setContentLoading(false);
  };

  if (loading || !user) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12 text-center">
        <p>Loading...</p>
      </div>
    );
  }

  const successType = searchParams?.get('success');

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

      {successType && (
        <div className="bg-green-500/20 border border-green-500 text-green-500 px-4 py-3 rounded mb-6">
          {successType === 'article' && '✅ Article submitted successfully! It will be reviewed by moderators.'}
          {successType === 'review' && '✅ Review submitted successfully! It will be reviewed by moderators.'}
          {successType === 'event' && '✅ Event created successfully!'}
          {successType === 'guide' && '✅ Guide submitted successfully! It will be reviewed by moderators.'}
        </div>
      )}

      {/* User Info */}
      <div className="card p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
        <div className="space-y-2">
          <p><strong>Name:</strong> {profile?.full_name || 'Not set'}</p>
          <p><strong>Username:</strong> {profile?.username || 'Not set'}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <Link href="/submit/article" className="card p-6 rounded-lg text-center hover:scale-105 transition-all">
          <div className="text-3xl mb-2">📝</div>
          <div className="font-semibold">Submit Article</div>
        </Link>
        <Link href="/submit/review" className="card p-6 rounded-lg text-center hover:scale-105 transition-all">
          <div className="text-3xl mb-2">⭐</div>
          <div className="font-semibold">Submit Review</div>
        </Link>
        <Link href="/submit/event" className="card p-6 rounded-lg text-center hover:scale-105 transition-all">
          <div className="text-3xl mb-2">🎉</div>
          <div className="font-semibold">Create Event</div>
        </Link>
        <Link href="/submit/guide" className="card p-6 rounded-lg text-center hover:scale-105 transition-all">
          <div className="text-3xl mb-2">🎲</div>
          <div className="font-semibold">Submit Guide</div>
        </Link>
      </div>

      {contentLoading ? (
        <p>Loading your content...</p>
      ) : (
        <div className="space-y-8">
          {/* Articles */}
          <ContentSection
            title="Your Articles"
            items={userContent.articles}
            emptyMessage="You haven't submitted any articles yet."
          />

          {/* Reviews */}
          <ContentSection
            title="Your Reviews"
            items={userContent.reviews}
            emptyMessage="You haven't submitted any reviews yet."
          />

          {/* Events */}
          <ContentSection
            title="Your Events"
            items={userContent.events}
            emptyMessage="You haven't created any events yet."
          />

          {/* Guides */}
          <ContentSection
            title="Your RPG Guides"
            items={userContent.guides}
            emptyMessage="You haven't submitted any guides yet."
          />
        </div>
      )}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-6 py-12 text-center">Loading...</div>}>
      <DashboardContent />
    </Suspense>
  );
}

function ContentSection({ title, items, emptyMessage }: { title: string; items: any[]; emptyMessage: string }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      {items.length === 0 ? (
        <p className="opacity-70">{emptyMessage}</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <div key={item.id} className="card p-4 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold">{item.title}</h3>
                <span className={`text-xs px-2 py-1 rounded ${
                  item.published
                    ? 'bg-green-500/20 text-green-500'
                    : 'bg-yellow-500/20 text-yellow-500'
                }`}>
                  {item.published ? 'Published' : 'Pending'}
                </span>
              </div>
              <p className="text-sm opacity-70">
                {new Date(item.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
