export const SAMPLE_POSTS = [
  {
    id: 1,
    title: 'Watching the sunset in Dubai',
    content: 'Watching the sunset from Burj Al Arab is unforgettable. The way the light catches the sail-shaped hotel as it dips below the horizon is something you can\'t capture with a camera — you just have to be there.',
    image_url: 'https://images.pexels.com/photos/9467802/pexels-photo-9467802.jpeg',
    location: 'Dubai, United Arab Emirates',
    category: 'City',
    author_id: 'Traveler_4821',
    upvotes: 147,
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    title: 'Sailing through the Greek Islands',
    content: 'Exploring the glorious Greek Islands by sailboat is the only way to see them. Wake up anchored in a quiet cove, swim to shore for coffee, sail to the next island by noon. No schedule, no crowds, just wind and water.',
    image_url: 'https://images.unsplash.com/photo-1539020140153-e479b8f22986?w=800&q=80',
    location: 'Greece',
    category: 'Adventure',
    author_id: 'Traveler_2039',
    upvotes: 213,
    created_at: new Date(Date.now() - 86400000 * 0.5).toISOString(),
  },
  {
    id: 3,
    title: "Street food crawl through Osaka's Dotonbori",
    content:
      "Takoyaki, okonomiyaki, kushikatsu — Osaka is the culinary capital of Japan and nowhere is this more alive than Dotonbori at night. Follow the crowds, look for the longest queues, and just eat everything.",
    image_url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
    location: 'Osaka, Japan',
    category: 'Food',
    author_id: 'Traveler_7712',
    upvotes: 189,
    created_at: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
  {
    id: 4,
    title: 'Camping under the Milky Way in Namibia',
    content:
      'The NamibRand Nature Reserve is one of the few International Dark Sky Reserves in Africa. No light pollution for hundreds of miles means you see the full arm of the galaxy stretching overhead. I brought my camera but ended up just lying in the sleeping bag staring up.',
    image_url: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&q=80',
    location: 'Namibia',
    category: 'Nature',
    author_id: 'Traveler_3345',
    upvotes: 302,
    created_at: new Date(Date.now() - 86400000 * 7).toISOString(),
  },
  {
    id: 5,
    title: 'Morning tea ceremony in Kyoto',
    content:
      'A small tatami room, a charcoal brazier, matcha whisked into jade froth. Our host, a woman in her seventies who had practiced this art for fifty years, made every movement feel like poetry. No phones allowed. Just presence.',
    image_url: 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=800&q=80',
    location: 'Kyoto, Japan',
    category: 'Culture',
    author_id: 'Traveler_9001',
    upvotes: 256,
    created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: 6,
    title: 'Lost in the Medina of Marrakech',
    content:
      'Getting lost is the entire point. Turn off your phone, pocket the map, and just walk. Around every corner: a riot of color, the smell of spices, the sound of hammers on copper. Let someone\'s grandmother sell you mint tea and sit with her for an hour.',
      image_url: 'https://i0.wp.com/www.worldwanderista.com/wp-content/uploads/2019/05/Marrakech-travel-guide.jpg?ssl=1',
    location: 'Marrakech, Morocco',
    category: 'Culture',
    author_id: 'Traveler_5544',
    upvotes: 178,
    created_at: new Date(Date.now() - 86400000 * 10).toISOString(),
  },
]

export const CATEGORIES = ['All', 'Adventure', 'Food', 'Nature', 'City', 'Culture']
