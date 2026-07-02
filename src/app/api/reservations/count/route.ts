import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

// Affichage public : on ajoute un socle de 100 pour éviter l'effet « personne
// n'a réservé » sur les premiers visiteurs. La valeur réelle reste en BDD.
const PUBLIC_RESERVATION_BASELINE = 100;

export async function GET() {
  const supabase = createAdminClient();

  const { data, error } = await supabase.rpc("get_reservation_count");

  if (error) {
    return Response.json({ count: PUBLIC_RESERVATION_BASELINE }, { status: 500 });
  }

  return Response.json({ count: PUBLIC_RESERVATION_BASELINE + (data ?? 0) });
}
