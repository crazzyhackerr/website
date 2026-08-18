export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const { response, dateType, availability, note } = req.body || {};
  if (!["YES", "NO"].includes(response)) return res.status(400).json({ error: "Invalid response" });

  const key = process.env.RESEND_API_KEY, to = process.env.OWNER_EMAIL;

  if (!key || !to) return res.status(500).json({ error: "Email is not configured" });

  const esc = v => String(v || "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");

  const html = response === "YES"
    ? `<h1>💌 YOU GOT A YES!</h1><p><b>Date idea:</b> ${esc(dateType || "Not specified")}</p><p><b>Availability:</b> ${esc(availability || "Not specified")}</p><p><b>Note:</b> ${esc(note || "None")}</p>`
    : `<h1>💀 response</h1><p>She clicked <b>NO</b>.</p><p><b>Note:</b> ${esc(note || "None")}</p><p>Time to dramatically stare out a window for 7 minutes.</p>`;

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${key}` },
      body: JSON.stringify({
        from: "onboarding@resend.dev",
        to: [to],
        subject: response === "YES" ? "💌 YOU GOT A YES!" : "💀 NO",
        html,
      }),
    });
    if (!r.ok) return res.status(502).json({ error: "Email service failed" });
    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ error: "Unexpected server error" });
  }
}
