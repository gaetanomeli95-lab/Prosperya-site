import { NextResponse } from 'next/server';
import { Resend } from 'resend';

interface ContactRequest {
  name: string;
  company: string;
  email: string;
  phone: string;
  area: string;
  message: string;
  privacy: boolean;
}

export async function POST(request: Request) {
  try {
    const body: ContactRequest = await request.json();

    if (!body.name || !body.email || !body.message || !body.privacy) {
      return NextResponse.json(
        { message: 'Dati obbligatori mancanti o consenso non fornito.' },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_EMAIL;

    if (!apiKey || !toEmail) {
      return NextResponse.json(
        { message: 'Servizio di posta non configurato. Contatta la direzione tramite email o telefono.' },
        { status: 503 }
      );
    }

    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: 'Prosperya <onboarding@resend.dev>',
      to: toEmail,
      subject: `Nuova richiesta di contatto da ${body.name}`,
      text: `
Nome: ${body.name}
Azienda: ${body.company || '—'}
Email: ${body.email}
Telefono: ${body.phone || '—'}
Area di interesse: ${body.area || '—'}

Messaggio:
${body.message}
      `.trim(),
    });

    if (error) {
      return NextResponse.json(
        { message: 'Errore nell’invio dell’email. Riprova più tardi.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: 'Errore tecnico. Riprova più tardi.' },
      { status: 500 }
    );
  }
}
