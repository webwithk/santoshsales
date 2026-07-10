import supabase from './db-client.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const env = {
      VITE_SUPABASE_URL: Boolean(import.meta.env.VITE_SUPABASE_URL),
      VITE_SUPABASE_ANON_KEY: Boolean(import.meta.env.VITE_SUPABASE_ANON_KEY),
      
    };

    const missing = Object.entries(env)
      .filter(([, configured]) => !configured)
      .map(([key]) => key);

    if (missing.length > 0) {
      return res.status(500).json({
        ok: false,
        message: 'Supabase environment variables are missing.',
        configured: env,
        missing
      });
    }

    const { data, error, count } = await supabase
      .from('portfolio_profile')
      .select('id, slug, name', { count: 'exact' })
      .limit(1);

    if (error) throw error;

    return res.status(200).json({
      ok: true,
      message: 'Supabase connection is healthy and the portfolio tables are reachable.',
      configured: env,
      profileCount: count ?? data.length,
      sampleProfile: data?.[0] ?? null
    });
  } catch (err) {
    console.error('Supabase health API error:', err);
    return res.status(500).json({
      ok: false,
      message: err.message || 'Unable to reach Supabase.',
      configured: {
        VITE_SUPABASE_URL: Boolean(import.meta.env.VITE_SUPABASE_URL),
        VITE_SUPABASE_ANON_KEY: Boolean(import.meta.env.VITE_SUPABASE_ANON_KEY),
      },
      error: {
        message: err.message,
        stack: err.stack
      }
    });
  }
}
