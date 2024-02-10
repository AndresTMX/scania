import { createClient } from "@supabase/supabase-js"

const supabaseUrl = 'https://dvekjxtvnmnuwbfgxbjc.supabase.co'
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2ZWtqeHR2bm1udXdiZmd4YmpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDczNDg0NDEsImV4cCI6MjAyMjkyNDQ0MX0.xuPPW09lsV3whvkyIWzf_Fs5825CULV_daxgguaFXmw'

export const supabase = createClient(supabaseUrl, key)

