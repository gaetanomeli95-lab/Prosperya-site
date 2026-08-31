'use client';

import { Mail, MessageCircle } from 'lucide-react';
import { company } from '@/data/company';

const whatsappNumber = company.telefono.replace(/\D/g, '');
const whatsappText = encodeURIComponent('Ciao Prosperya, vorrei ricevere informazioni sui vostri servizi.');
const whatsappHref = `https://wa.me/${whatsappNumber}?text=${whatsappText}`;
const emailHref = `mailto:${company.emailPubblica}`;

export function ContactDock() {
  return (
    <>
      <div className="fixed right-4 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-2 lg:flex xl:right-6">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contatta Prosperya su WhatsApp"
          className="group relative grid h-12 w-12 place-items-center border border-white/12 bg-[#172326]/94 !text-white shadow-[0_18px_50px_rgba(0,0,0,.18)] backdrop-blur-xl transition-all duration-300 hover:-translate-x-1 hover:bg-[#1F8F5F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand"
        >
          <MessageCircle className="h-[18px] w-[18px]" />
          <span className="pointer-events-none absolute right-[calc(100%+10px)] whitespace-nowrap border border-white/10 bg-[#172326]/96 px-3 py-2 text-[10px] font-semibold uppercase tracking-[.14em] !text-white opacity-0 shadow-lg backdrop-blur-xl transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100">
            WhatsApp
          </span>
        </a>

        <a
          href={emailHref}
          aria-label="Scrivi una email a Prosperya"
          className="group relative grid h-12 w-12 place-items-center border border-white/12 bg-[#172326]/94 !text-white shadow-[0_18px_50px_rgba(0,0,0,.18)] backdrop-blur-xl transition-all duration-300 hover:-translate-x-1 hover:bg-mediterranean focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand"
        >
          <Mail className="h-[18px] w-[18px]" />
          <span className="pointer-events-none absolute right-[calc(100%+10px)] whitespace-nowrap border border-white/10 bg-[#172326]/96 px-3 py-2 text-[10px] font-semibold uppercase tracking-[.14em] !text-white opacity-0 shadow-lg backdrop-blur-xl transition-all duration-200 group-hover:opacity-100">
            Email
          </span>
        </a>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 px-3 pb-[max(.75rem,env(safe-area-inset-bottom))] lg:hidden">
        <div className="mx-auto grid max-w-sm grid-cols-2 overflow-hidden border border-white/12 bg-[#172326]/96 shadow-[0_16px_55px_rgba(0,0,0,.26)] backdrop-blur-xl">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-12 items-center justify-center gap-2.5 border-r border-white/10 px-3 text-[11px] font-semibold uppercase tracking-[.12em] !text-white transition-colors active:bg-[#1F8F5F]"
          >
            <MessageCircle className="h-4 w-4 text-sand" />
            WhatsApp
          </a>
          <a
            href={emailHref}
            className="flex min-h-12 items-center justify-center gap-2.5 px-3 text-[11px] font-semibold uppercase tracking-[.12em] !text-white transition-colors active:bg-mediterranean"
          >
            <Mail className="h-4 w-4 text-sand" />
            Email
          </a>
        </div>
      </div>
    </>
  );
}
