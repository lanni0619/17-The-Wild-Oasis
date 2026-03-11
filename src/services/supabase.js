import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://iakxigbyeawvncezifmf.supabase.co';
const supabaseKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlha3hpZ2J5ZWF3dm5jZXppZm1mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwMzY1NjYsImV4cCI6MjA4ODYxMjU2Nn0.fjAz94noyZkSLjuOizAnzJbS_h8L5TcE8tm4EmmoFGA';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
