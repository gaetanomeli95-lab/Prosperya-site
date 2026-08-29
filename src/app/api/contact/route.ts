import { NextResponse } from 'next/server';
import { Resend } from 'resend';

interface ContactRequest {
  name: string;
  company: string;
  email: string;
  phone: string;
  area: string;
  companySize: string;
  urgency: string;
  message: string;
  website?: string;
  privacy: boolean;
}

const clean = (value: unknown) => typeof value === 'string' ? value.trim() : '';

export async function POST(request: Request) {
  try {
    const body = await request.json() as ContactRequest;

    if (clean(body.website)) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    const name = clean(body.name);
    const company = clean(body.company);
    const email = clean(body.email);
    const phone = clean(body.phone);
    const area = clean(body.area);
    const companySize = clean(body.companySize);
    const urgency = clean(body.urgency);
    const message = clean(body.message);

    if (!name || !company || !email || !area || !companySize || !urgency || message.length < 20 || !body.privacy) {
      return NextResponse.json(
        { message: 'Completa tutti i dati richiesti prima dell’invio.' },
        { status: 400 }
      );
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json(
        { message: 'Inserisci un indirizzo email valido.' },
        { status: 400 }
      );
    }

    if ([name, company, email, phone, area, companySize, urgency].some((value) => value.length > 180) || message.length > 5000) {
      return NextResponse.json(
        { message: 'Uno o più campi superano la lunghezza consentita.' },
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
      reply_to: email,
      subject: `[${area}] Nuova richiesta da ${company}`,
      text: `
NUOVA RICHIESTA PROSPERYA

AZIENDA
Ragione sociale / progetto: ${company}
Dimensione: ${companySize}

ESIGENZA
Area: ${area}
Tempistica: ${urgency}

CONTESTO
${message}

CONTATTO
Nome: ${name}
Email: ${email}
Telefono: ${phone || '—'}
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
