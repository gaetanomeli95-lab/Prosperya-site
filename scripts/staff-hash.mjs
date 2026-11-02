// Genera la voce per AREA_RISERVATA_UTENTI senza salvare la password da nessuna parte.
// Uso: npm run staff:hash -- nome@prosperya.it   (la password viene chiesta due volte e mostrata come asterischi)
import { randomBytes, scrypt } from 'node:crypto';
import { promisify } from 'node:util';

const user = (process.argv[2] ?? '').trim().toLowerCase();
if (!user || !user.includes('@')) {
  console.error('Uso: npm run staff:hash -- nome@prosperya.it');
  process.exit(1);
}

async function readHidden(prompt) {
  if (!process.stdin.isTTY) {
    let data = '';
    for await (const chunk of process.stdin) data += chunk;
    return data.replace(/\r?\n$/, '');
  }
  process.stdout.write(prompt);
  process.stdin.setRawMode(true);
  process.stdin.resume();
  return new Promise((resolve) => {
    let value = '';
    process.stdin.on('data', function onData(buffer) {
      for (const char of buffer.toString('utf8')) {
        if (char === '\r' || char === '\n') {
          process.stdin.off('data', onData);
          process.stdin.setRawMode(false);
          process.stdin.pause();
          process.stdout.write('\n');
          resolve(value);
          return;
        }
        if (char === '\u0003') process.exit(1);
        if (char === '\u007f' || char === '\b') {
          if (value) process.stdout.write('\b \b');
          value = value.slice(0, -1);
        } else {
          value += char;
          process.stdout.write('*');
        }
      }
    });
  });
}

const password = await readHidden('Password (min. 12 caratteri): ');
if (password.length < 12) {
  console.error('La password deve avere almeno 12 caratteri.');
  process.exit(1);
}

const repeat = await readHidden('Ripeti la password: ');
if (repeat !== password) {
  console.error('Le due password non coincidono. Riprova.');
  process.exit(1);
}

const salt = randomBytes(16);
const hash = await promisify(scrypt)(password, salt, 32);
console.log(`${user}=scrypt$${salt.toString('base64url')}$${hash.toString('base64url')}`);
console.log('\nAggiungi la riga sopra ad AREA_RISERVATA_UTENTI (più utenti separati da ";").');
