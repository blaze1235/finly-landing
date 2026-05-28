/* eslint-disable */
/* Finly webapp shared components.
   Every component reads tokens from colors_and_type.css — see the
   <link> tag in index.html. Component-local style objects are
   namespaced to avoid collisions across files. */

const { useState, useEffect, useRef } = React;

/* ── PHONE FRAME ──────────────────────────────────────────── */
function PhoneFrame({ children }) {
  return (
    <div style={{
      width: 375, height: 760, flexShrink: 0,
      background: 'var(--bg)',
      borderRadius: 52, overflow: 'hidden',
      border: '11px solid #0D0D0F',
      boxShadow: [
        '0 0 0 1px #2a2a2e',
        '0 60px 140px rgba(0,0,0,0.55)',
        '0 20px 60px rgba(0,0,0,0.3)',
        'inset 0 1px 0 rgba(255,255,255,0.05)',
      ].join(', '),
      position: 'relative',
      display: 'flex', flexDirection: 'column',
    }}>{children}</div>
  );
}

/* ── STATUS BAR ───────────────────────────────────────────── */
function StatusBar({ dark }) {
  const fg = dark ? 'rgba(255,255,255,0.75)' : 'var(--ink)';
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '13px 22px 5px',
      fontFamily: 'var(--font-display)',
      color: fg,
      background: dark ? 'var(--ink-dark)' : 'var(--bg)',
      flexShrink: 0,
    }}>
      <span style={{ fontSize: 12, fontWeight: 700 }}>9:41</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
          <rect x="0" y="7" width="2.5" height="4" rx="0.8" fill={fg}/>
          <rect x="3.5" y="4.5" width="2.5" height="6.5" rx="0.8" fill={fg}/>
          <rect x="7" y="2" width="2.5" height="9" rx="0.8" fill={fg}/>
          <rect x="10.5" y="0" width="2.5" height="11" rx="0.8" fill={fg}/>
        </svg>
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke={fg} strokeOpacity="0.35"/>
          <rect x="22" y="3.5" width="2.5" height="5" rx="1.25" fill={fg} fillOpacity="0.4"/>
          <rect x="1.5" y="1.5" width="16" height="9" rx="1.5" fill={fg}/>
        </svg>
      </div>
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
    }}>Finly<span style={{ color: 'var(--accent)' }}>.</span></div>
  );
}

/* ── APP HEADER ───────────────────────────────────────────── */
function AppHeader({ name, sub, balance, balanceLabel = 'баланс · сум' }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '6px 20px 14px',
      background: 'var(--bg)', flexShrink: 0,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
        <div style={{
          width: 40, height: 40, borderRadius: 14,
          background: 'linear-gradient(135deg, #1C1C1E, #333)',
          color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 800,
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        }}>{name[0]}</div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)' }}>Привет, {name} 👋</div>
          <div style={{ fontSize: 10, color: 'var(--ink-3)', fontWeight: 500, marginTop: 1 }}>{sub}</div>
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
      padding: '6px 20px 14px', background: 'var(--bg)', flexShrink: 0,
    }}>
      {onBack && (
        <div onClick={onBack} style={{
          fontSize: 20, color: 'var(--ink)', lineHeight: 1,
          width: 36, height: 36, display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          borderRadius: 11, cursor: 'pointer',
          background: 'var(--border)',
        }}>‹</div>
      )}
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: 19, fontWeight: 800, color: 'var(--ink)', flex: 1,
        letterSpacing: '-0.3px',
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
      background: '#fff', padding: '5px 4px 18px',
      display: 'flex', gap: 2, flexShrink: 0,
      borderTop: '1px solid var(--border)',
    }}>
      {NAV_ITEMS.map(it => {
        const active = tab === it.id;
        return (
          <div key={it.id} onClick={() => setTab(it.id)}
            style={{
              flex: 1, display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: 3, padding: '7px 4px',
              borderRadius: 12, cursor: 'pointer',
              position: 'relative',
              transition: 'background 120ms',
            }}>
            {active && (
              <div style={{
                position: 'absolute', top: 0, left: '50%',
                transform: 'translateX(-50%)',
                width: 24, height: 3, borderRadius: '0 0 3px 3px',
                background: 'var(--ink)',
              }}/>
            )}
            <div style={{
              fontSize: 19, lineHeight: 1,
              filter: active ? 'none' : 'grayscale(0.4) opacity(0.6)',
              transition: 'filter 120ms',
            }}>{it.icon}</div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 8, fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: 0.5,
              color: active ? 'var(--ink)' : 'var(--ink-3)',
              transition: 'color 120ms',
            }}>{it.label}</div>
            {it.id === 'add' && hasDraft && (
              <div style={{
                position: 'absolute', top: 6, right: 10,
                width: 7, height: 7, borderRadius: '50%',
                background: 'var(--red)',
                border: '1.5px solid #fff',
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
      padding: '14px 16px', marginBottom: 7,
      cursor: 'pointer',
      boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 42, height: 42, borderRadius: 14,
          background: isIncome ? 'var(--green-bg)' : 'var(--red-bg)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 20, flexShrink: 0,
        }}>{tx.icon}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 13, fontWeight: 700, color: 'var(--ink)',
              }}>{tx.catName}</div>
              <div style={{
                fontSize: 11, color: 'var(--ink-3)', fontWeight: 500,
                marginTop: 2, display: 'flex', alignItems: 'center', gap: 5,
              }}>
                {tx.merchant || tx.note}
                {tx.recurring && (
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 9, fontWeight: 700,
                    color: 'var(--blue)', background: 'var(--blue-bg)',
                    padding: '2px 6px', borderRadius: 5,
                  }}>↻</span>
                )}
              </div>
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 14, fontWeight: 800,
                color: isIncome ? 'var(--green)' : 'var(--ink)',
                fontVariantNumeric: 'tabular-nums',
              }}>{(isIncome ? '+' : '−') + fmt(tx.amount)}</div>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 9, fontWeight: 700, color: 'var(--ink-3)',
                letterSpacing: 0.5, marginTop: 2,
              }}>{tx.dateLabel}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── STREAK BANNER ────────────────────────────────────────── */
function StreakBanner({ streak }) {
  const total = 7;
  const pos = ((streak - 1) % total);
  const dots = Array.from({ length: total }, (_, i) => {
    if (i < pos) return 'done';
    if (i === pos) return 'today';
    return 'miss';
  });
  return (
    <div style={{
      background: 'linear-gradient(135deg, #111318 0%, #1e2028 60%, #0f1115 100%)',
      borderRadius: 22, padding: '16px 18px',
      display: 'flex', alignItems: 'center', gap: 14,
      marginBottom: 10, position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', right: -30, top: -30,
        width: 110, height: 110, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(245,158,11,0.16), transparent 70%)',
      }}/>
      <div style={{
        position: 'absolute', left: -10, bottom: -20,
        width: 80, height: 80, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(239,68,68,0.06), transparent 70%)',
      }}/>
      <div style={{ fontSize: 34, flexShrink: 0, position: 'relative', zIndex: 1 }}>🔥</div>
      <div style={{ flex: 1, position: 'relative', zIndex: 1 }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 20, fontWeight: 800, color: '#fff', lineHeight: 1.1,
        }}>
          <span style={{ color: '#F59E0B' }}>{streak}</span>
          {' '}дней подряд
        </div>
        <div style={{ display: 'flex', gap: 4, marginTop: 10 }}>
          {dots.map((t, i) => {
            const styles = {
              done:  { bg: '#F59E0B', color: '#1C1C1E', border: 'none' },
              today: { bg: 'rgba(245,158,11,0.12)', color: '#F59E0B', border: '1.5px solid #F59E0B' },
              miss:  { bg: 'rgba(255,255,255,0.05)', color: '#333', border: 'none' },
            }[t];
            return (
              <div key={i} style={{
                width: 24, height: 24, borderRadius: 8,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 10, fontWeight: 800,
                background: styles.bg, color: styles.color,
                border: styles.border,
              }}>{t === 'done' ? '✓' : t === 'today' ? '●' : ''}</div>
            );
          })}
        </div>
      </div>
      <div style={{
        background: 'rgba(245,158,11,0.15)',
        border: '1px solid rgba(245,158,11,0.3)',
        color: '#F59E0B',
        fontFamily: 'var(--font-display)',
        fontSize: 11, fontWeight: 800,
        padding: '8px 12px', borderRadius: 12,
        flexShrink: 0, textAlign: 'center', lineHeight: 1.4,
        letterSpacing: 0.5,
        position: 'relative', zIndex: 1,
      }}>+20<br/><span style={{ fontSize: 9, opacity: 0.7 }}>XP</span></div>
    </div>
  );
}

/* ── WALLET CARD ──────────────────────────────────────────── */
function WalletCard({ label = 'Баланс · сум', amount, sub }) {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #111318 0%, #1C1E26 60%, #0F1115 100%)',
      borderRadius: 24, padding: '20px 20px', marginBottom: 10,
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: -50, right: -30,
        width: 160, height: 160, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(245,158,11,0.1), transparent 70%)',
      }}/>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: 9, fontWeight: 700,
        color: 'rgba(255,255,255,0.3)',
        letterSpacing: 2, textTransform: 'uppercase', marginBottom: 6,
        position: 'relative', zIndex: 1,
      }}>{label}</div>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: 36, fontWeight: 800,
        color: '#fff', lineHeight: 1.05,
        letterSpacing: '-0.5px',
        position: 'relative', zIndex: 1,
        fontVariantNumeric: 'tabular-nums',
      }}>{fmt(amount)}</div>
      {sub && (
        <div style={{
          fontSize: 12, color: 'rgba(255,255,255,0.35)',
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
          padding: '14px 16px',
          boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
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
    if (i) cells.push(<div key={'d' + i} style={{ background: 'var(--border)', width: 1 }}/>);
    cells.push(
      <div key={i} style={{ textAlign: 'center', padding: '14px 6px' }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 15, fontWeight: 800,
          color: it.tone === 'green' ? 'var(--green)' :
                 it.tone === 'red'   ? 'var(--red)' :
                 it.tone === 'amber' ? 'var(--amber)' : 'var(--ink)',
          fontVariantNumeric: 'tabular-nums',
        }}>{it.val}</div>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 9, fontWeight: 700, color: 'var(--ink-3)',
          letterSpacing: 0.8, textTransform: 'uppercase', marginTop: 3,
        }}>{it.lab}</div>
      </div>
    );
  });
  return (
    <div style={{
      display: 'flex',
      background: '#fff', borderRadius: 18,
      boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
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
      padding: '7px 16px', borderRadius: 999,
      fontSize: 11, fontWeight: 700,
      background: active ? 'var(--ink)' : '#fff',
      color: active ? '#fff' : 'var(--ink-2)',
      border: active ? 'none' : '1px solid var(--border)',
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

/* ── ICON CHIP ────────────────────────────────────────────── */
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
      borderRadius: Math.round(size * 0.32),
      background: bgs[tone] || 'var(--bg)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.46, flexShrink: 0,
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
