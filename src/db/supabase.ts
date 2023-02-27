import { createClient } from "@supabase/supabase-js";
import { SECRET_SUPABASE_KEY } from "$env/static/private";

const supabase_url = "https://lwmwmsrmmgecknlimsgr.supabase.co";

export const supabase = createClient(
	supabase_url,
	SECRET_SUPABASE_KEY
);
