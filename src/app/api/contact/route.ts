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
  website?: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as ContactRequest;

    if (body.website) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const company = typeof body.company === 'string' ? body.company.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
    const area = typeof body.area === 'string' ? body.area.trim() : '';
    const message = typeof body.message === 'string' ? body.message.trim() : '';
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!name || !validEmail || !message || body.privacy !== true) {
      return NextResponse.json(
        { message: 'Controlla i dati obbligatori e il consenso privacy.' },
        { status: 400 }
      );
    }

    if (name.length > 120 || company.length > 160 || email.length > 254 || phone.length > 40 || area.length > 120 || message.length > 4000) {
      return NextResponse.json(
        { message: 'Uno o più campi superano la lunghezza consentita.' },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_EMAIL;
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'Prosperya <onboarding@resend.dev>';

    if (!apiKey || !toEmail) {
      return NextResponse.json(
        { message: 'Servizio di posta non configurato. Contatta la direzione tramite email o telefono.' },
        { status: 503 }
      );
    }

    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      reply_to: email,
      subject: `Nuova richiesta di contatto da ${name.replace(/[\r\n]/g, ' ')}`,
      text: `
Nome: ${name}
Azienda: ${company || '—'}
Email: ${email}
Telefono: ${phone || '—'}
Area di interesse: ${area || '—'}

Messaggio:
${message}
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
