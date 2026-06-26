import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://dpwglrpyuvdqgnglvnbm.supabase.co";
const supabaseKey = "sb_publishable_0Tld6AUQjSXcgY_CHMeWRg_hvj5JBc_";

export const supabase = createClient(supabaseUrl, supabaseKey);