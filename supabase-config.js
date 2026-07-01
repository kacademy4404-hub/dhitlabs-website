const SUPABASE_URL = "https://wjlkuihncyrpsjvaveon.supabase.co";
const SUPABASE_KEY = "sb_publishable_7o8GN9lm57mzWrPnW_nh1w_ZYP-zYnm";

// Initialize the Supabase client
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
// Reassign to window.supabase so the rest of the code works
window.supabase = supabaseClient;
