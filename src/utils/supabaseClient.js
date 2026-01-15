import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hputeuurrlygeapzlydn.supabase.co';
const supabaseAnonKey = 'sb_publishable_KUT1-X_y8VKIoH6aVpq9fg_qsVBovi9';

let supabase = null;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables are missing. Check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export { supabase };
