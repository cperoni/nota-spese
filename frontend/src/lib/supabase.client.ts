import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ilpbvlgiptpiraomqpbq.supabase.co';
const supabaseKey = 'sb_publishable_ruHL_Xj9lL6AQ-sw7YKvTw_X-CvU4LJ';

export const supabase = createClient(supabaseUrl, supabaseKey);

// 👇 forza TypeScript a trattarlo come modulo
export {};