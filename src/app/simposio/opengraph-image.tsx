import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { simposio } from '@/data/simposio';
import { formatEventDateShort } from '@/lib/simposio/schedule';

export const alt = 'Simposio Prosperya, 27 gennaio 2027, Saracen Hotel, Isola delle Femmine. Partecipazione gratuita.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpenGraphImage() {
  const logo = await readFile(join(process.cwd(), 'public/brand/prosperya-logo.png'));
  const logoSrc = `data:image/png;base64,${logo.toString('base64')}`;

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', background: 'linear-gradient(135deg, #213236 0%, #172326 100%)', color: '#fff', fontFamily: 'Georgia, serif', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 8, display: 'flex', background: 'linear-gradient(90deg, #F2C94C, #4CAF50, #1976D2, #C81A69, #FF7F2A)' }} />
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '64px 72px', width: 780 }}>
          <div style={{ fontSize: 22, letterSpacing: 6, color: '#C9B991', textTransform: 'uppercase', fontFamily: 'sans-serif' }}>Evento gratuito · Prosperya</div>
          <div style={{ fontSize: 86, lineHeight: 1, marginTop: 28 }}>{simposio.name}</div>
          <div style={{ fontSize: 38, fontStyle: 'italic', color: 'rgba(255,255,255,.78)', marginTop: 18 }}>Dall’idea all’impresa, un passo alla volta.</div>
          <div style={{ display: 'flex', flexDirection: 'column', marginTop: 44, fontSize: 30, fontFamily: 'sans-serif', color: '#fff' }}>
            <div style={{ display: 'flex' }}>{formatEventDateShort()}</div>
            <div style={{ display: 'flex', color: 'rgba(255,255,255,.75)', marginTop: 8 }}>{`${simposio.venue.name} · ${simposio.venue.locality} (${simposio.venue.province})`}</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <div style={{ width: 340, height: 340, borderRadius: 340, background: '#F3F0E9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
            <img src={logoSrc} width={270} height={270} />
          </div>
        </div>
      </div>
    ),
    size,
  );
}
