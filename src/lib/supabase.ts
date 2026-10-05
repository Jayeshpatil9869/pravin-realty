import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://deiqcqpwcqbzfijblqgj.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRlaXFjcXB3Y3FiemZpamJscWdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEyMTMwNDgsImV4cCI6MjEwNjc4OTA0OH0.iTuIUvs8VWFxjKDCGWuKCve-J8gyKhdTa5kBdWrPH0I';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});
