import Link from 'next/link';

export default function EventsPage() {
  const upcomingEvents = [
    {
      id: 1,
      title: "D&D Campaign: Dragon's Descent",
      date: "Jan 5, 2025",
      time: "18:00",
      location: "Room 204",
      spots: "3/6 spots left",
      type: "RPG Session",
    },
    {
      id: 2,
      title: "Sci-Fi Movie Marathon",
      date: "Jan 12, 2025",
      time: "14:00",
      location: "Main Hall",
      spots: "Unlimited",
      type: "Social",
    },
    {
      id: 3,
      title: "Board Game Night: Twilight Imperium",
      date: "Jan 15, 2025",
      time: "17:00",
      location: "Game Room",
      spots: "2/6 spots left",
      type: "Board Games",
    },
    {
      id: 4,
      title: "Guest Speaker: Author Sarah J. Maas",
      date: "Jan 20, 2025",
      time: "19:00",
      location: "Auditorium",
      spots: "50/100 spots left",
      type: "Special Event",
    },
  ];

  const pastEvents = [
    {
      id: 5,
      title: "Cosplay Workshop",
      date: "Dec 10, 2024",
      attendees: 15,
    },
    {
      id: 6,
      title: "Warhammer 40K Tournament",
      date: "Dec 8, 2024",
      attendees: 24,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-5xl font-bold mb-8 text-glow">Events</h1>
      <p className="text-xl mb-12 opacity-80">
        Join our activities and connect with fellow sci-fi and fantasy enthusiasts
      </p>

      <h2 className="text-3xl font-bold mb-6">Upcoming Events</h2>
      <div className="grid md:grid-cols-2 gap-6 mb-16">
        {upcomingEvents.map((event) => (
          <div key={event.id} className="card p-6 rounded-lg">
            <span className="text-sm opacity-60">{event.type}</span>
            <h3 className="text-2xl font-bold mt-2 mb-4">{event.title}</h3>
            <div className="space-y-2 mb-4 opacity-80">
              <p>📅 {event.date} at {event.time}</p>
              <p>📍 {event.location}</p>
              <p>👥 {event.spots}</p>
            </div>
            <button className="btn-primary w-full py-3 rounded-lg font-semibold">
              Register Now
            </button>
          </div>
        ))}
      </div>

      <h2 className="text-3xl font-bold mb-6">Past Events</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {pastEvents.map((event) => (
          <div key={event.id} className="card p-4 rounded-lg opacity-75">
            <h3 className="font-bold mb-2">{event.title}</h3>
            <p className="text-sm opacity-60">{event.date}</p>
            <p className="text-sm mt-2">{event.attendees} attendees</p>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link href="/submit/event" className="inline-block btn-primary px-8 py-3 rounded-lg font-semibold">
          Create an Event
        </Link>
      </div>
    </div>
  );
}
