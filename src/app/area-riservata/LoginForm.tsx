'use client';

import { useActionState } from 'react';
import { login, type LoginState } from './actions';

export function LoginForm() {
  const [state, action, pending] = useActionState<LoginState, FormData>(login, {});

  return (
    <form action={action} className="space-y-5">
      <div>
        <label htmlFor="staff-user" className="premium-label">Email</label>
        <input id="staff-user" name="user" type="email" autoComplete="username" required className="premium-input simposio-input" />
      </div>
      <div>
        <label htmlFor="staff-password" className="premium-label">Password</label>
        <input id="staff-password" name="password" type="password" autoComplete="current-password" required className="premium-input simposio-input" />
      </div>
      <div role="alert" aria-live="assertive">
        {state.error && <p className="border border-logo-magenta/25 bg-logo-magenta/[0.05] px-4 py-3 text-sm text-[#9C1452]">{state.error}</p>}
      </div>
      <button type="submit" disabled={pending} className="premium-button-dark w-full disabled:opacity-60">{pending ? 'Accesso in corso…' : 'Accedi'}</button>
    </form>
  );
}
