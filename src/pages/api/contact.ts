import type { APIRoute } from "astro";
import { Resend } from "resend";

export const POST: APIRoute = async ({ request }) => {
  const resend = new Resend(import.meta.env.RESEND_API_KEY);

  try {
    const formData = await request.formData();
    const name = formData.get("name")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const message = formData.get("message")?.toString().trim();

    // Validation
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Wszystkie pola są wymagane." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return new Response(
        JSON.stringify({ error: "Nieprawidłowy adres email." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Send email via Resend
    const { error } = await resend.emails.send({
      from: "Gravaris Formularz <kontakt@gravaris.pl>",
      to: ["kontakt@gravaris.pl"],
      replyTo: email,
      subject: `Nowa wiadomość od ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #FFC107; border-bottom: 2px solid #FFC107; padding-bottom: 10px;">
            Nowa wiadomość z formularza kontaktowego
          </h2>
          <p><strong>Imię:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
          <p><strong>Wiadomość:</strong></p>
          <div style="background: #f5f5f5; padding: 15px; border-left: 3px solid #FFC107;">
            ${escapeHtml(message).replace(/\n/g, "<br>")}
          </div>
          <hr style="margin-top: 30px; border: none; border-top: 1px solid #ddd;">
          <p style="color: #666; font-size: 12px;">
            Wiadomość wysłana przez formularz na stronie gravaris.pl
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return new Response(
        JSON.stringify({ error: "Nie udało się wysłać wiadomości. Spróbuj ponownie później." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Wiadomość została wysłana." }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Contact form error:", err);
    return new Response(
      JSON.stringify({ error: "Wystąpił błąd serwera." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}
