import { createClient } from "@supabase/supabase-js";
import { SECRET_SUPABASE_KEY } from "$env/static/private";
import type { Database } from "@/types/supabase";

const supabase_url = "https://lwmwmsrmmgecknlimsgr.supabase.co";

export const supabase = createClient<Database>(
	supabase_url,
	SECRET_SUPABASE_KEY
);
