/* eslint-disable */
/* Finly webapp shared components.
   Every component reads tokens from colors_and_type.css — see the
   <link> tag in index.html. Component-local style objects are
   namespaced (e.g. `cardStyles`) to avoid `const styles = {...}`
   collisions across files. */

const { useState, useEffect, useRef } = React;

/* ── PHONE FRAME ──────────────────────────────────────────── */
function PhoneFrame({ children }) {
  return (
    <div style={{
      width: 375, height: 760, flexShrink: 0,
      background: 'var(--bg)',
      borderRadius: 48, overflow: 'hidden',
      border: '10px solid #1C1C1E',
      boxShadow: '0 0 0 1px #2C2C2E, 0 40px 100px rgba(0,0,0,0.55)',
      position: 'relative',
      display: 'flex', flexDirection: 'column',
    }}>{children}</div>
  );
}

/* ── STATUS BAR ───────────────────────────────────────────── */
function StatusBar({ dark }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '14px 22px 4px',
      fontFamily: 'var(--font-display)',
      fontSize: 12, fontWeight: 700,
      color: dark ? 'rgba(255,255,255,0.7)' : 'var(--ink)',
      background: dark ? 'var(--ink-dark)' : 'var(--bg)',
      flexShrink: 0,
    }}>
      <span>9:41</span>
      <span>●●●</span>
    </div>
  );
}

/* ── LOGO ─────────────────────────────────────────────────── */
function Logo({ size = 28, dark }) {
  return (
    <div style={{
      fontFamily: 'var(--font-display)',
      fontSize: size, fontWeight: 800,
      color: dark ? '#fff' : 'var(--ink)',
      letterSpacing: '-1px',
      lineHeight: 1,
    }}>Finly<span style={{ color: dark ? '#fff' : 'var(--ink)' }}>.</span></div>
  );
}

/* ── APP HEADER ───────────────────────────────────────────── */
function AppHeader({ name, sub, balance, balanceLabel = 'баланс · сум' }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '8px 20px 14px',
      background: 'var(--bg)', flexShrink: 0,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
        <div style={{
          width: 38, height: 38, borderRadius: 13,
          background: 'var(--ink)', color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 800,
        }}>{name[0]}</div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)' }}>Привет, {name} 👋</div>
          <div style={{ fontSize: 10, color: 'var(--ink-3)', fontWeight: 500, letterSpacing: 0.5, marginTop: 1 }}>{sub}</div>
        </div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 17, fontWeight: 800,
          color: balance >= 0 ? 'var(--green)' : 'var(--red)',
          fontVariantNumeric: 'tabular-nums',
        }}>{fmt(balance)}</div>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 9, color: 'var(--ink-3)',
          fontWeight: 700, letterSpacing: 1,
          textTransform: 'uppercase', textAlign: 'right',
        }}>{balanceLabel}</div>
      </div>
    </div>
  );
}

/* ── PAGE HEADER (back / title / action) ──────────────────── */
function PageHeader({ title, onBack, action }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '8px 20px 14px', background: 'var(--bg)', flexShrink: 0,
    }}>
      {onBack && (
        <div onClick={onBack} style={{
          fontSize: 22, color: 'var(--ink)', lineHeight: 1,
          width: 36, height: 36, display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          borderRadius: 10, cursor: 'pointer',
        }}>‹</div>
      )}
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: 19, fontWeight: 800, color: 'var(--ink)', flex: 1,
      }}>{title}</div>
      {action && (
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 11, fontWeight: 700, color: 'var(--ink-2)',
          letterSpacing: 1, textTransform: 'uppercase',
          padding: '8px 12px', borderRadius: 10, background: 'var(--bg)',
        }}>{action}</div>
      )}
    </div>
  );
}

/* ── BOTTOM NAV ───────────────────────────────────────────── */
const NAV_ITEMS = [
  { id: 'home',      icon: '⊞', label: 'Главная' },
  { id: 'add',       icon: '＋', label: 'Запись' },
  { id: 'analytics', icon: '📊', label: 'Отчёты' },
  { id: 'rewards',   icon: '🏆', label: 'Прогресс' },
  { id: 'profile',   icon: '👤', label: 'Профиль' },
];
function NavBar({ tab, setTab, hasDraft }) {
  return (
    <nav style={{
      background: '#fff', padding: '6px 4px 18px',
      display: 'flex', gap: 2, flexShrink: 0,
      borderTop: '1px solid var(--border)',
    }}>
      {NAV_ITEMS.map(it => {
        const active = tab === it.id;
        return (
          <div key={it.id} onClick={() => setTab(it.id)}
            style={{
              flex: 1, display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: 3, padding: '8px 4px',
              borderRadius: 12, cursor: 'pointer',
              background: active ? 'var(--bg)' : 'transparent',
              position: 'relative',
              transition: 'background 120ms',
            }}>
            <div style={{ fontSize: 20, lineHeight: 1 }}>{it.icon}</div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 8, fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: 0.5,
              color: active ? 'var(--ink)' : 'var(--ink-3)',
            }}>{it.label}</div>
            {it.id === 'add' && hasDraft && (
              <div style={{
                position: 'absolute', top: 6, right: 12,
                width: 7, height: 7, borderRadius: '50%',
                background: 'var(--red)',
                border: '2px solid ' + (active ? 'var(--bg)' : '#fff'),
              }}/>
            )}
          </div>
        );
      })}
    </nav>
  );
}

/* ── TX CARD ──────────────────────────────────────────────── */
function TxCard({ tx, onTap }) {
  const isIncome = tx.type === 'income';
  return (
    <div onClick={() => onTap && onTap(tx)} style={{
      background: '#fff', borderRadius: 18,
      padding: '14px 16px', marginBottom: 8,
      cursor: 'pointer', transition: 'transform 120ms',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 12,
            background: isIncome ? 'var(--green-bg)' : 'var(--red-bg)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18, flexShrink: 0,
          }}>{tx.icon}</div>
          <div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 13, fontWeight: 700, color: 'var(--ink)',
              letterSpacing: 0.3,
            }}>{tx.catName}</div>
            <div style={{
              fontSize: 10, color: 'var(--ink-3)', fontWeight: 500,
              marginTop: 1, display: 'flex', alignItems: 'center', gap: 6,
            }}>
              {tx.merchant || tx.note}
              {tx.recurring && (
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 9, fontWeight: 700,
                  color: 'var(--blue)', background: 'var(--blue-bg)',
                  padding: '2px 6px', borderRadius: 5, letterSpacing: 0.3,
                }}>↻ ежемес.</span>
              )}
            </div>
          </div>
        </div>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 16, fontWeight: 800,
          color: isIncome ? 'var(--green)' : 'var(--ink)',
          fontVariantNumeric: 'tabular-nums',
        }}>{(isIncome ? '+' : '−') + fmt(tx.amount)}</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 12, color: 'var(--ink-2)' }}>{tx.note || ''}</div>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 9, fontWeight: 700, color: 'var(--ink-3)',
          letterSpacing: 0.5, textTransform: 'uppercase',
        }}>{tx.dateLabel}</div>
      </div>
    </div>
  );
}

/* ── STREAK BANNER ────────────────────────────────────────── */
function StreakBanner({ streak }) {
  const dots = Array.from({ length: 7 }, (_, i) => {
    const pos = ((streak - 1) % 7) + 1;
    if (i < pos - 1) return 'done';
    if (i === pos - 1) return 'today';
    return 'miss';
  });
  const dotStyle = {
    done:  { background: '#F59E0B', color: '#1C1C1E' },
    today: { background: 'rgba(245,158,11,0.15)', border: '1.5px solid #F59E0B', color: '#F59E0B' },
    miss:  { background: '#222', color: '#444' },
  };
  return (
    <div style={{
      background: 'linear-gradient(135deg, #1C1C1E, #28282C)',
      borderRadius: 20, padding: '14px 16px',
      display: 'flex', alignItems: 'center', gap: 14,
      marginBottom: 10, position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', right: -20, top: -20,
        width: 80, height: 80, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(245,158,11,0.12), transparent 70%)',
      }}/>
      <div style={{ fontSize: 32, flexShrink: 0, position: 'relative', zIndex: 1 }}>🔥</div>
      <div style={{ flex: 1, position: 'relative', zIndex: 1 }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 22, fontWeight: 800, color: '#fff', lineHeight: 1,
        }}><span style={{ color: '#F59E0B' }}>{streak}</span> дней подряд</div>
        <div style={{ fontSize: 11, color: '#666', fontWeight: 600, marginTop: 3 }}>Не упустите серию!</div>
        <div style={{ display: 'flex', gap: 5, marginTop: 9 }}>
          {dots.map((t, i) => (
            <div key={i} style={{
              width: 22, height: 22, borderRadius: 7,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11, fontWeight: 800, ...dotStyle[t],
            }}>{t === 'done' ? '✓' : '·'}</div>
          ))}
        </div>
      </div>
      <div style={{
        background: 'rgba(245,158,11,0.12)', color: '#F59E0B',
        fontFamily: 'var(--font-display)',
        fontSize: 10, fontWeight: 700,
        padding: '8px 12px', borderRadius: 11,
        flexShrink: 0, textAlign: 'center', lineHeight: 1.4,
        letterSpacing: 1, textTransform: 'uppercase',
        position: 'relative', zIndex: 1,
      }}>+20<br/>XP</div>
    </div>
  );
}

/* ── WALLET CARD ──────────────────────────────────────────── */
function WalletCard({ label = 'Баланс · сум', amount, sub }) {
  return (
    <div style={{
      background: 'var(--ink)', borderRadius: 22,
      padding: '22px 20px', marginBottom: 10,
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: -40, right: -40,
        width: 140, height: 140, borderRadius: '50%',
        background: 'rgba(255,255,255,0.03)',
      }}/>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: 9, fontWeight: 700,
        color: 'rgba(255,255,255,0.35)',
        letterSpacing: 2, textTransform: 'uppercase', marginBottom: 5,
        position: 'relative', zIndex: 1,
      }}>{label}</div>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: 36, fontWeight: 700,
        color: '#fff', lineHeight: 1.05,
        letterSpacing: '-0.5px',
        position: 'relative', zIndex: 1,
      }}>{fmt(amount)}</div>
      {sub && (
        <div style={{
          fontSize: 12, color: 'rgba(255,255,255,0.4)',
          marginTop: 6, fontWeight: 500, position: 'relative', zIndex: 1,
        }}>{sub}</div>
      )}
    </div>
  );
}

/* ── SUMMARY CARDS (2-up) ─────────────────────────────────── */
function SummaryGrid({ items }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 10 }}>
      {items.map((it, i) => (
        <div key={i} style={{
          background: '#fff', borderRadius: 18,
          padding: '14px 16px', border: '1px solid var(--border)',
        }}>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 9, fontWeight: 700, color: 'var(--ink-3)',
            letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 6,
          }}>{it.label}</div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 18, fontWeight: 800,
            color: it.tone === 'green' ? 'var(--green)' :
                   it.tone === 'red'   ? 'var(--red)'   : 'var(--ink)',
            fontVariantNumeric: 'tabular-nums',
          }}>{it.value}</div>
          {it.sub && (
            <div style={{ fontSize: 10, color: 'var(--ink-3)', marginTop: 3, fontWeight: 500 }}>{it.sub}</div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ── KPI STRIP ────────────────────────────────────────────── */
function KpiStrip({ items }) {
  const cells = [];
  items.forEach((it, i) => {
    if (i) cells.push(<div key={'d' + i} style={{ background: 'var(--border)' }}/>);
    cells.push(
      <div key={i} style={{ textAlign: 'center', padding: '16px 6px' }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 16, fontWeight: 800,
          color: it.tone === 'green' ? 'var(--green)' :
                 it.tone === 'red'   ? 'var(--red)' :
                 it.tone === 'amber' ? 'var(--amber)' : 'var(--ink)',
        }}>{it.val}</div>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 9, fontWeight: 700, color: 'var(--ink-3)',
          letterSpacing: 0.8, textTransform: 'uppercase', marginTop: 3,
        }}>{it.lab}</div>
      </div>
    );
  });
  const cols = items.map(() => '1fr').join(' 1px ');
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: cols,
      background: '#fff', borderRadius: 18,
      border: '1px solid var(--border)',
      marginBottom: 10, overflow: 'hidden',
    }}>{cells}</div>
  );
}

/* ── CHIP / PILL ──────────────────────────────────────────── */
function Chip({ tone = 'gray', children }) {
  const tones = {
    gray:   { bg: 'var(--bg)',       fg: 'var(--ink-2)' },
    green:  { bg: 'var(--green-bg)', fg: 'var(--green)' },
    red:    { bg: 'var(--red-bg)',   fg: 'var(--red)' },
    amber:  { bg: 'var(--amber-bg)', fg: 'var(--amber)' },
    blue:   { bg: 'var(--blue-bg)',  fg: 'var(--blue)' },
    purple: { bg: 'var(--purple-bg)',fg: 'var(--purple)' },
  }[tone];
  return (
    <span style={{
      fontFamily: 'var(--font-display)',
      fontSize: 10, fontWeight: 700, letterSpacing: 0.8,
      padding: '4px 10px', borderRadius: 8,
      textTransform: 'uppercase', display: 'inline-block',
      background: tones.bg, color: tones.fg,
    }}>{children}</span>
  );
}
function Pill({ active, onClick, children }) {
  return (
    <span onClick={onClick} style={{
      padding: '8px 16px', borderRadius: 999,
      fontSize: 11, fontWeight: 700,
      background: active ? 'var(--ink)' : 'var(--border)',
      color: active ? '#fff' : 'var(--ink-2)',
      cursor: 'pointer', flexShrink: 0, transition: 'all 120ms',
    }}>{children}</span>
  );
}

/* ── TOGGLE ───────────────────────────────────────────────── */
function Toggle({ on, onChange }) {
  return (
    <div onClick={() => onChange(!on)} style={{
      width: 44, height: 26, borderRadius: 13,
      background: on ? 'var(--ink)' : '#D1D5DB',
      position: 'relative', cursor: 'pointer',
      transition: 'background 200ms', flexShrink: 0,
    }}>
      <div style={{
        width: 20, height: 20, borderRadius: '50%',
        background: '#fff', position: 'absolute', top: 3,
        left: on ? 21 : 3, transition: 'left 150ms',
        boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
      }}/>
    </div>
  );
}

/* ── ICON CHIP (the emoji-on-tint rounded square) ─────────── */
function IconChip({ emoji, tone = 'gray', size = 40 }) {
  const bgs = {
    gray:   'var(--bg)',
    green:  'var(--green-bg)',
    red:    'var(--red-bg)',
    amber:  'var(--amber-bg)',
    blue:   'var(--blue-bg)',
    purple: 'var(--purple-bg)',
  };
  return (
    <div style={{
      width: size, height: size,
      borderRadius: Math.round(size * 0.3),
      background: bgs[tone],
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.45, flexShrink: 0,
    }}>{emoji}</div>
  );
}

/* ── SECTION HEADING ──────────────────────────────────────── */
function SectionHeading({ title, action, onAction }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      marginBottom: 10, marginTop: 4,
    }}>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: 13, fontWeight: 700, color: 'var(--ink)',
      }}>{title}</div>
      {action && (
        <div onClick={onAction} style={{
          fontSize: 11, fontWeight: 600, color: 'var(--ink-3)',
          cursor: 'pointer',
        }}>{action}</div>
      )}
    </div>
  );
}

/* ── UTILITIES ────────────────────────────────────────────── */
function fmt(n) {
  return Math.round(Number(n) || 0).toLocaleString('ru-RU');
}
function today() {
  const d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0')
       + '-' + String(d.getDate()).padStart(2, '0');
}

/* ── EXPORTS ──────────────────────────────────────────────── */
Object.assign(window, {
  PhoneFrame, StatusBar, Logo, AppHeader, PageHeader,
  NavBar, TxCard, StreakBanner, WalletCard,
  SummaryGrid, KpiStrip, Chip, Pill, Toggle, IconChip,
  SectionHeading, fmt, today,
});
