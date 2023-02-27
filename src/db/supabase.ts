import { createClient } from "@supabase/supabase-js";
import { SECRET_SUPABASE_KEY } from "$env/static/private";

const supabaseURL = "https://lwmwmsrmmgecknlimsgr.supabase.co";

export const supabase = createClient(
	supabaseURL,
	SECRET_SUPABASE_KEY
);
