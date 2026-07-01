const SUPABASE_URL = "https://hvelxafhjxqtxwkilrfg.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2ZWx4YWZoanhxdHh3a2lscmZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkwODQ3OTIsImV4cCI6MjA4NDY2MDc5Mn0.-Y394YjFci90F3OpSrEGINKw2MSdg2KF9_54Ph1Eutk";

var supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  }
);
