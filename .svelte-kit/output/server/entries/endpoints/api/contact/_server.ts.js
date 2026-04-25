const POST = async ({ request, platform }) => {
  const cloudflareEnv = platform?.env;
  const apiKey = cloudflareEnv?.RESEND_API_KEY ?? process.env.RESEND_API_KEY;
  const senderEmail = cloudflareEnv?.SENDER_EMAIL ?? process.env.SENDER_EMAIL;
  const recipientEmail = cloudflareEnv?.RECIPIENT_EMAIL ?? process.env.RECIPIENT_EMAIL;
  try {
    const { name, email, message } = await request.json();
    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    if (!apiKey || !senderEmail || !recipientEmail) {
      return new Response(JSON.stringify({ error: "Contact API not configured" }), {
        status: 503,
        headers: { "Content-Type": "application/json" }
      });
    }
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: senderEmail,
        to: recipientEmail,
        reply_to: email,
        subject: `Contact form submission from ${name}`,
        html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong> ${message}</p>`
      })
    });
    if (!res.ok) {
      console.error("Resend error:", await res.text());
      return new Response(JSON.stringify({ error: "Failed to send email" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    console.error("Contact error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
const GET = async () => {
  return new Response(JSON.stringify({ message: "Contact API ready" }), {
    headers: { "Content-Type": "application/json" }
  });
};
export {
  GET,
  POST
};
