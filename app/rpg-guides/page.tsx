import Link from 'next/link';

export default function RPGGuidesPage() {
  const guides = [
    {
      id: 1,
      title: "Complete Beginner's Guide to D&D 5e",
      difficulty: "Beginner",
      game: "D&D 5e",
      author: "GameMaster Alex",
      topics: ["Character Creation", "Basic Rules", "First Session"],
    },
    {
      id: 2,
      title: "Advanced Combat Tactics in Pathfinder 2e",
      difficulty: "Advanced",
      game: "Pathfinder 2e",
      author: "Sarah the Strategist",
      topics: ["Combat", "Tactics", "Team Composition"],
    },
    {
      id: 3,
      title: "Running Your First RPG Campaign",
      difficulty: "Intermediate",
      game: "General",
      author: "DM Mike",
      topics: ["Game Mastering", "Story Writing", "World Building"],
    },
    {
      id: 4,
      title: "Call of Cthulhu: Creating Horror",
      difficulty: "Intermediate",
      game: "Call of Cthulhu",
      author: "Emma the Keeper",
      topics: ["Horror Elements", "Atmosphere", "Pacing"],
    },
  ];

  const resources = [
    { name: "Character Sheet Templates", link: "#" },
    { name: "Dice Roller Tools", link: "#" },
    { name: "Campaign Planning Templates", link: "#" },
    { name: "NPC Generator", link: "#" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-5xl font-bold mb-8 text-glow">RPG Guides</h1>
      <p className="text-xl mb-12 opacity-80">
        Learn to play, master, and create amazing tabletop RPG experiences
      </p>

      <div className="grid lg:grid-cols-3 gap-6 mb-16">
        {guides.map((guide) => (
          <article key={guide.id} className="card p-6 rounded-lg">
            <div className="flex justify-between items-start mb-3">
              <span className="text-sm font-semibold">{guide.game}</span>
              <span className={`px-3 py-1 rounded text-xs ${
                guide.difficulty === 'Beginner' ? 'bg-green-500/20' :
                guide.difficulty === 'Intermediate' ? 'bg-yellow-500/20' :
                'bg-red-500/20'
              }`}>
                {guide.difficulty}
              </span>
            </div>
            <h2 className="text-xl font-bold mb-3">{guide.title}</h2>
            <p className="text-sm opacity-60 mb-4">By {guide.author}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {guide.topics.map((topic, idx) => (
                <span key={idx} className="text-xs px-2 py-1 bg-opacity-30 rounded">
                  {topic}
                </span>
              ))}
            </div>
            <button className="btn-primary w-full py-2 rounded">Read Guide</button>
          </article>
        ))}
      </div>

      <h2 className="text-3xl font-bold mb-6">Useful Resources</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {resources.map((resource, idx) => (
          <a
            key={idx}
            href={resource.link}
            className="card p-4 rounded-lg text-center hover:scale-105 transition-all"
          >
            {resource.name}
          </a>
        ))}
      </div>

      <div className="text-center">
        <Link href="/submit/guide" className="inline-block btn-primary px-8 py-3 rounded-lg font-semibold">
          Submit Your Guide
        </Link>
      </div>
    </div>
  );
}
