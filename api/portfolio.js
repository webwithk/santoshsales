import supabase from './db-client.js';

const corsHeaders = (res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
};

const queryOrThrow = async (query, label) => {
  const { data, error } = await query;
  if (error) {
    throw new Error(`${label}: ${error.message}`);
  }
  return data;
};

export default async function handler(req, res) {
  corsHeaders(res);
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'GET') {
      const [profileRows, navItems, sections, stats, experience, timeline, reviews] = await Promise.all([
        queryOrThrow(
          supabase
            .from('portfolio_profile')
            .select('*')
            .eq('slug', 'santosh-panwar')
            .limit(1),
          'Profile'
        ),
        queryOrThrow(
          supabase
            .from('portfolio_nav_items')
            .select('*')
            .order('sort_order', { ascending: true })
            .order('id', { ascending: true }),
          'Navigation'
        ),
        queryOrThrow(
          supabase
            .from('portfolio_section_copy')
            .select('*')
            .order('sort_order', { ascending: true })
            .order('id', { ascending: true }),
          'Section copy'
        ),
        queryOrThrow(
          supabase
            .from('portfolio_stats')
            .select('*')
            .order('sort_order', { ascending: true })
            .order('id', { ascending: true }),
          'Stats'
        ),
        queryOrThrow(
          supabase
            .from('portfolio_experience_items')
            .select('*')
            .order('sort_order', { ascending: true })
            .order('id', { ascending: true }),
          'Experience'
        ),
        queryOrThrow(
          supabase
            .from('portfolio_timeline_entries')
            .select('*')
            .order('sort_order', { ascending: true })
            .order('id', { ascending: true }),
          'Timeline'
        ),
        queryOrThrow(
          supabase
            .from('portfolio_reviews')
            .select('*')
            .order('sort_order', { ascending: true })
            .order('id', { ascending: true }),
          'Reviews'
        )
      ]);

      const profile = profileRows?.[0] ?? null;
      if (!profile) {
        return res.status(404).json({ error: 'Portfolio profile not found.' });
      }

      return res.status(200).json({
        profile,
        navItems,
        sections,
        stats,
        experience,
        timeline,
        reviews
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API error:', err);
    return res.status(500).json({ error: err.message || 'Unexpected server error' });
  }
}
