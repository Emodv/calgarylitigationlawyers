// Server-only Supabase REST helper. Uses the service-role key, which bypasses RLS.
// Import this only from server code (route handlers, server components). Never from a client component.

const TABLES = ["leads"] as const;
export type WritableTable = (typeof TABLES)[number];

export async function insertRow<T extends Record<string, unknown>>(
  table: WritableTable,
  row: T,
): Promise<{ id: string }> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase environment variables are not configured");

  const res = await fetch(`${url}/rest/v1/${table}`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify(row),
    cache: "no-store",
  });

  // Do not echo the response body: it can contain row data.
  if (!res.ok) throw new Error(`Supabase insert into ${table} failed with status ${res.status}`);

  const data = (await res.json()) as { id: string }[];
  if (!Array.isArray(data) || !data[0]?.id) throw new Error("Supabase insert returned no id");
  return { id: data[0].id };
}
