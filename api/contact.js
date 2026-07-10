import supabase from './db-client.js';

const corsHeaders = (res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
};

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const clean = (value) => (typeof value === 'string' ? value.trim() : '');

export default async function handler(req, res) {
  corsHeaders(res);
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'GET') {
      const { count, error } = await supabase
        .from('contact_messages')
        .select('id', { count: 'exact', head: true });
      if (error) throw error;
      return res.status(200).json({ ok: true, receivedMessages: count ?? 0 });
    }

    if (req.method === 'POST') {
      const name = clean(req.body?.name);
      const email = clean(req.body?.email).toLowerCase();
      const company = clean(req.body?.company);
      const message = clean(req.body?.message);

      const errors = {};
      if (!name || name.length < 2) errors.name = 'Please enter your full name.';
      if (!email || !isValidEmail(email)) errors.email = 'Please enter a valid email address.';
      if (!message || message.length < 20) errors.message = 'Please share at least 20 characters about your requirement.';

      if (Object.keys(errors).length > 0) {
        return res.status(400).json({ error: 'Validation failed', errors });
      }

      const { data, error } = await supabase
        .from('contact_messages')
        .insert({
          name,
          email,
          company: company || null,
          message,
          status: 'new'
        })
        .select()
        .single();

      if (error) throw error;
      return res.status(201).json({
        ok: true,
        message: 'Your message has been received. Santosh will review it and respond shortly.',
        submission: data
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API error:', err);
    return res.status(500).json({ error: err.message || 'Unexpected server error' });
  }
}
