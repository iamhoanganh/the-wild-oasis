import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://tohgbibdkhbplmwsllpz.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRvaGdiaWJka2hicGxtd3NsbHB6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE1OTg3MDYsImV4cCI6MjAwNzE3NDcwNn0.6uaGgpODMLRQjoqjuFeGCE1K8Zoljil0YNtRZN18l7c";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
