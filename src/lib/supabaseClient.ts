import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
// console.log("supabaseUrl is : " + supabaseUrl)
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY || ''
// console.log("supabaseKey is : " + supabaseKey)

export const supabase = createClient(supabaseUrl, supabaseKey)
