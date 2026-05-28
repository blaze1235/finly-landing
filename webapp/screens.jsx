/* eslint-disable */
/* Five core screens for the Finly webapp UI kit. */

const screenScroll = {
  flex: 1, overflowY: 'auto',
  WebkitOverflowScrolling: 'touch',
  padding: '0 16px 80px',
  scrollbarWidth: 'none',
};

/* ═══════════════════════════════════════════════════════════
   HOME SCREEN
   ═══════════════════════════════════════════════════════════ */
function HomeScreen({ data, setTab, onTxTap }) {
  const { txs, streak, name } = data;
  const income  = txs.filter(t => t.type === 'income').reduce((a, b) => a + b.amount, 0);
  const expense = txs.filter(t => t.type === 'expense').reduce((a, b) => a + b.amount, 0);
  const balance = income - expense;
  const spentPct = income > 0 ? Math.round((expense / income) * 100) : 0;

  const quick = [
    { ic: '➕', lbl: 'Запись',   tone: 'green',  cb: () => setTab('add') },
    { ic: '📊', lbl: 'Отчёты',  tone: 'blue',   cb: () => setTab('analytics') },
    { ic: '🏆', lbl: 'Прогресс',tone: 'purple', cb: () => setTab('rewards') },
    { ic: '👤', lbl: 'Профиль', tone: 'amber',  cb: () => setTab('profile') },
  ];

  return (
    <>
      <StatusBar/>
      {/* Greeting header */}
      <div style={{
        padding: '2px 20px 12px',
        background: 'var(--bg)', flexShrink: 0,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div>
          <div style={{ fontSize: 11, color: 'var(--ink-3)', fontWeight: 500, marginBottom: 2, letterSpacing: 0.3 }}>
            Вторник, 13 мая
          </div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 20, fontWeight: 800, color: 'var(--ink)',
            letterSpacing: '-0.3px',
          }}>Привет, {name} 👋</div>
        </div>
        <div style={{
          width: 42, height: 42, borderRadius: 14,
          background: 'linear-gradient(135deg, #111318, #2a2a30)',
          color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 800,
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          cursor: 'pointer',
        }}>{name[0]}</div>
      </div>

      <div style={screenScroll}>
        {/* Gradient wallet card */}
        <div style={{
          background: 'linear-gradient(140deg, #111318 0%, #1a1d24 45%, #0e1116 100%)',
          borderRadius: 24, padding: '20px 20px 18px',
          marginBottom: 12, position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: -50, right: -20,
            width: 170, height: 170, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(245,158,11,0.14), transparent 65%)',
          }}/>
          <div style={{
            position: 'absolute', bottom: -40, left: 30,
            width: 100, height: 100, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(34,197,94,0.07), transparent 70%)',
          }}/>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.3)',
            letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8,
            position: 'relative', zIndex: 1,
          }}>Баланс · сум</div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 38, fontWeight: 800, color: '#fff',
            letterSpacing: '-1px', lineHeight: 1,
            position: 'relative', zIndex: 1, marginBottom: 18,
            fontVariantNumeric: 'tabular-nums',
          }}>{fmt(balance)}</div>

          {/* Mini spend bar */}
          <div style={{
            position: 'relative', zIndex: 1,
            height: 3, borderRadius: 2, background: 'rgba(255,255,255,0.08)',
            marginBottom: 14,
          }}>
            <div style={{
              height: '100%', borderRadius: 2,
              width: Math.min(spentPct, 100) + '%',
              background: spentPct > 75 ? '#F87171' : spentPct > 50 ? '#FBBF24' : '#4ADE80',
              transition: 'width 0.6s ease',
            }}/>
          </div>

          {/* Income / Expense */}
          <div style={{ display: 'flex', gap: 10, position: 'relative', zIndex: 1 }}>
            <div style={{
              flex: 1, background: 'rgba(255,255,255,0.06)',
              borderRadius: 14, padding: '10px 12px',
              border: '1px solid rgba(255,255,255,0.05)',
            }}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 9, color: 'rgba(255,255,255,0.3)',
                letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4, fontWeight: 700,
              }}>↑ Доход</div>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 14, fontWeight: 800, color: '#4ADE80',
                fontVariantNumeric: 'tabular-nums',
              }}>{fmt(income)}</div>
            </div>
            <div style={{
              flex: 1, background: 'rgba(255,255,255,0.06)',
              borderRadius: 14, padding: '10px 12px',
              border: '1px solid rgba(255,255,255,0.05)',
            }}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 9, color: 'rgba(255,255,255,0.3)',
                letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4, fontWeight: 700,
              }}>↓ Расход</div>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 14, fontWeight: 800, color: '#F87171',
                fontVariantNumeric: 'tabular-nums',
              }}>{fmt(expense)}</div>
            </div>
            <div style={{
              background: 'rgba(255,255,255,0.06)',
              borderRadius: 14, padding: '10px 12px',
              border: '1px solid rgba(255,255,255,0.05)',
              display: 'flex', flexDirection: 'column', justifyContent: 'center',
              minWidth: 58,
            }}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 9, color: 'rgba(255,255,255,0.3)',
                letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4, fontWeight: 700,
              }}>% трат</div>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 14, fontWeight: 800,
                color: spentPct > 75 ? '#F87171' : spentPct > 50 ? '#FBBF24' : '#fff',
              }}>{spentPct}%</div>
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 12 }}>
          {quick.map((q, i) => (
            <div key={i} onClick={q.cb} style={{
              background: '#fff', borderRadius: 18,
              boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
              padding: '14px 4px',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: 7, cursor: 'pointer',
            }}>
              <IconChip emoji={q.ic} tone={q.tone} size={36}/>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 8, fontWeight: 700,
                color: 'var(--ink-2)', letterSpacing: 0.5,
                textTransform: 'uppercase', textAlign: 'center',
              }}>{q.lbl}</div>
            </div>
          ))}
        </div>

        <StreakBanner streak={streak}/>

        {/* Insight card */}
        <div style={{
          background: '#EFF6FF', border: '1px solid #BFDBFE',
          borderRadius: 18, padding: '12px 14px', marginBottom: 12,
          display: 'flex', alignItems: 'flex-start', gap: 10,
        }}>
          <div style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>💡</div>
          <div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 12, fontWeight: 700, color: '#1E40AF',
            }}>Еда дорожает</div>
            <div style={{ fontSize: 11, color: '#3B82F6', fontWeight: 500, marginTop: 2, lineHeight: 1.4 }}>
              Эта неделя на 23% больше среднего. Стоит пересмотреть бюджет.
            </div>
          </div>
        </div>

        <SectionHeading title="Последнее" action="Все →" onAction={() => setTab('analytics')}/>
        {txs.slice(0, 5).map(tx => <TxCard key={tx.id} tx={tx} onTap={onTxTap}/>)}
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════
   ADD TRANSACTION SCREEN
   ═══════════════════════════════════════════════════════════ */
const EXP_CATS = [
  { ic: '🛒', name: 'Продукты' },  { ic: '🏠', name: 'Жильё' },
  { ic: '🚌', name: 'Транспорт' }, { ic: '🍕', name: 'Кафе' },
  { ic: '💊', name: 'Здоровье' },  { ic: '🎬', name: 'Развлечения' },
  { ic: '👕', name: 'Одежда' },    { ic: '📚', name: 'Учёба' },
  { ic: '•••', name: 'Прочее' },
];
const INC_CATS = [
  { ic: '💼', name: 'Зарплата' },   { ic: '💹', name: 'Подработка' },
  { ic: '🏦', name: 'Инвестиции' }, { ic: '🎁', name: 'Подарок' },
];

function AddScreen({ data, setData, setTab }) {
  const [type, setType]    = useState('expense');
  const [amount, setAmount]= useState('');
  const [cat, setCat]      = useState(null);
  const [note, setNote]    = useState('');
  const [recurring, setRec]= useState(false);
  const cats = type === 'expense' ? EXP_CATS : INC_CATS;
  const accentColor = type === 'expense' ? '#DC2626' : '#16A34A';
  const accentBg    = type === 'expense' ? '#FEF2F2' : '#F0FDF4';

  function save() {
    if (!amount || !cat) return;
    const newTx = {
      id: Date.now(), type,
      amount: Number(amount.replace(/[\s,]/g, '')),
      icon: cat.ic, catName: cat.name,
      note, recurring, dateLabel: 'Сейчас',
    };
    setData(d => ({ ...d, txs: [newTx, ...d.txs] }));
    setTab('home');
  }

  return (
    <>
      <StatusBar/>
      <PageHeader title="Новая запись" onBack={() => setTab('home')}/>
      <div style={screenScroll}>
        {/* Large amount display */}
        <div style={{
          textAlign: 'center', padding: '12px 16px 20px',
          background: '#fff', borderRadius: 22,
          marginBottom: 12,
          boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
        }}>
          {/* Type toggle */}
          <div style={{
            display: 'inline-flex', gap: 4, marginBottom: 16,
            background: 'var(--bg)', borderRadius: 14, padding: 4,
          }}>
            {['expense', 'income'].map(t => (
              <div key={t} onClick={() => { setType(t); setCat(null); }}
                style={{
                  padding: '8px 20px', borderRadius: 11,
                  fontFamily: 'var(--font-display)',
                  fontSize: 12, fontWeight: 700, textAlign: 'center',
                  cursor: 'pointer', transition: 'all 150ms',
                  background: type === t
                    ? (t === 'expense' ? '#DC2626' : '#16A34A')
                    : 'transparent',
                  color: type === t ? '#fff' : 'var(--ink-2)',
                }}>
                {t === 'expense' ? '↓ Расход' : '↑ Доход'}
              </div>
            ))}
          </div>

          {/* Big amount */}
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: amount ? 42 : 36,
            fontWeight: 800,
            color: amount ? accentColor : 'var(--ink-3)',
            letterSpacing: '-1px',
            fontVariantNumeric: 'tabular-nums',
            transition: 'font-size 150ms, color 150ms',
            minHeight: 52, lineHeight: 1.15,
          }}>
            {amount || '0'}
          </div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 10, fontWeight: 700, color: 'var(--ink-3)',
            letterSpacing: 2, textTransform: 'uppercase', marginTop: 4,
          }}>сум</div>

          {/* Hidden input */}
          <input
            style={{
              position: 'absolute', opacity: 0, width: 1, height: 1,
              pointerEvents: 'none',
            }}
            value={amount}
            onChange={e => setAmount(
              e.target.value.replace(/[^\d]/g, '')
                .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
            )}
          />
          <div style={{
            background: 'var(--bg)', borderRadius: 12, padding: '10px 14px',
            marginTop: 12, cursor: 'text',
            fontFamily: 'var(--font-display)',
            fontSize: 13, fontWeight: 600, color: amount ? 'var(--ink)' : 'var(--ink-3)',
          }}
            onClick={e => {
              const inp = e.currentTarget.parentNode.querySelector('input');
              if (inp) inp.focus();
            }}>
            {amount ? amount : 'Нажмите, чтобы ввести сумму'}
          </div>
        </div>

        {/* Category grid */}
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 10, fontWeight: 700,
          color: 'var(--ink-3)', letterSpacing: 1.5,
          textTransform: 'uppercase', marginBottom: 8,
        }}>Категория</div>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 8, marginBottom: 14,
        }}>
          {cats.map(c => {
            const sel = cat && cat.name === c.name;
            return (
              <div key={c.name} onClick={() => setCat(c)} style={{
                padding: '14px 6px', borderRadius: 16,
                background: sel ? accentBg : '#fff',
                border: sel ? `1.5px solid ${accentColor}` : '1px solid var(--border)',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: 6, cursor: 'pointer',
                transition: 'all 120ms',
                boxShadow: sel ? `0 0 0 3px ${accentColor}18` : 'none',
              }}>
                <div style={{ fontSize: 24 }}>{c.ic}</div>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 10, fontWeight: 700,
                  color: sel ? accentColor : 'var(--ink)',
                  textAlign: 'center', lineHeight: 1.2,
                }}>{c.name}</div>
              </div>
            );
          })}
        </div>

        {/* Note */}
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 10, fontWeight: 700,
          color: 'var(--ink-3)', letterSpacing: 1.5,
          textTransform: 'uppercase', marginBottom: 8,
        }}>Комментарий</div>
        <textarea style={{
          width: '100%', background: '#fff', border: '1px solid var(--border)',
          borderRadius: 14, padding: '12px 14px',
          fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 400,
          color: 'var(--ink)', outline: 'none', boxSizing: 'border-box',
          height: 66, resize: 'none', marginBottom: 10,
          lineHeight: 1.5,
        }} placeholder="Напр.: недельная закупка"
          value={note} onChange={e => setNote(e.target.value)}/>

        {/* Recurring */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '12px 14px', background: '#fff',
          border: '1px solid var(--border)', borderRadius: 14,
          marginBottom: 14,
        }}>
          <IconChip emoji="🔄" tone="blue" size={34}/>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>Повторяющийся</div>
            <div style={{ fontSize: 10, color: 'var(--ink-3)', marginTop: 1 }}>Ежемесячный платёж</div>
          </div>
          <Toggle on={recurring} onChange={setRec}/>
        </div>

        <button onClick={save} style={{
          width: '100%', padding: '16px 20px', borderRadius: 16, border: 'none',
          background: amount && cat
            ? `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`
            : 'var(--ink-3)',
          color: '#fff', cursor: amount && cat ? 'pointer' : 'not-allowed',
          fontFamily: 'var(--font-display)',
          fontSize: 12, fontWeight: 800,
          letterSpacing: 2, textTransform: 'uppercase',
          boxShadow: amount && cat ? `0 8px 24px ${accentColor}40` : 'none',
          transition: 'all 200ms',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
        }}>
          <span>Сохранить</span>
          <span style={{
            background: 'rgba(255,255,255,0.2)',
            padding: '2px 8px', borderRadius: 8,
            fontSize: 11,
          }}>+10 XP</span>
        </button>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════
   ANALYTICS SCREEN
   ═══════════════════════════════════════════════════════════ */
const CAT_COLORS = ['#2563EB', '#16A34A', '#D97706', '#7C3AED', '#DC2626', '#0891B2'];

function DonutChart({ cats }) {
  const R = 46, CX = 65, CY = 65, SW = 13;
  const CIRC = 2 * Math.PI * R;
  let offset = 0;
  const segs = cats.slice(0, 5).map((c, i) => {
    const len = (c.pct / 100) * CIRC;
    const seg = { len, dashoffset: -offset, color: CAT_COLORS[i] };
    offset += len;
    return seg;
  });
  return (
    <div style={{ position: 'relative', width: CX * 2, height: CY * 2, flexShrink: 0 }}>
      <svg width={CX * 2} height={CY * 2} style={{ transform: 'rotate(-90deg)', display: 'block' }}>
        <circle cx={CX} cy={CY} r={R} fill="none" stroke="var(--border)" strokeWidth={SW}/>
        {segs.map((seg, i) => (
          <circle key={i} cx={CX} cy={CY} r={R} fill="none"
            stroke={seg.color} strokeWidth={SW}
            strokeDasharray={`${seg.len} ${CIRC - seg.len}`}
            strokeDashoffset={seg.dashoffset}
          />
        ))}
      </svg>
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 14, fontWeight: 800, color: 'var(--ink)',
        }}>Май</div>
        <div style={{ fontSize: 9, color: 'var(--ink-3)', fontWeight: 700, letterSpacing: 0.5, marginTop: 1 }}>2025</div>
      </div>
    </div>
  );
}

function AnalyticsScreen({ data, setTab }) {
  const { txs } = data;
  const [filter, setFilter] = useState('all');

  const expenses = txs.filter(t => t.type === 'expense');
  const income   = txs.filter(t => t.type === 'income').reduce((a, b) => a + b.amount, 0);
  const byCat = {};
  expenses.forEach(t => { byCat[t.catName] = (byCat[t.catName] || 0) + t.amount; });
  const totalExp = Object.values(byCat).reduce((a, b) => a + b, 0) || 1;
  const cats = Object.entries(byCat)
    .map(([n, v]) => ({ name: n, value: v, pct: (v / totalExp) * 100 }))
    .sort((a, b) => b.value - a.value);

  const filtered = filter === 'all' ? txs
                 : filter === 'in'  ? txs.filter(t => t.type === 'income')
                 : filter === 'out' ? txs.filter(t => t.type === 'expense')
                 : txs.filter(t => t.recurring);

  return (
    <>
      <StatusBar/>
      <PageHeader title="Отчёты" action="Май ▾"/>
      <div style={screenScroll}>
        {/* KPI row */}
        <KpiStrip items={[
          { val: '+' + fmt(income), lab: 'Доход',   tone: 'green' },
          { val: '−' + fmt(totalExp), lab: 'Расход', tone: 'red' },
          { val: Math.round((totalExp / (income || 1)) * 100) + '%', lab: 'Потрачено', tone: 'amber' },
        ]}/>

        {/* Chart + top categories side by side */}
        <div style={{
          background: '#fff', borderRadius: 22,
          boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
          padding: '16px', marginBottom: 10,
          display: 'flex', gap: 14, alignItems: 'center',
        }}>
          <DonutChart cats={cats}/>
          <div style={{ flex: 1, minWidth: 0 }}>
            {cats.slice(0, 5).map((c, i) => {
              const tx = expenses.find(t => t.catName === c.name);
              return (
                <div key={c.name} style={{ marginBottom: i < cats.length - 1 ? 10 : 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                    <div style={{
                      width: 8, height: 8, borderRadius: 3, flexShrink: 0,
                      background: CAT_COLORS[i % CAT_COLORS.length],
                    }}/>
                    <div style={{
                      fontSize: 11, fontWeight: 600, color: 'var(--ink)',
                      flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    }}>{c.name}</div>
                    <div style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 10, fontWeight: 700, color: 'var(--ink-2)',
                      fontVariantNumeric: 'tabular-nums', flexShrink: 0,
                    }}>{Math.round(c.pct)}%</div>
                  </div>
                  <div style={{ height: 4, background: 'var(--border)', borderRadius: 2, overflow: 'hidden' }}>
                    <div style={{
                      width: c.pct + '%', height: '100%', borderRadius: 2,
                      background: CAT_COLORS[i % CAT_COLORS.length],
                    }}/>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Filter pills */}
        <div style={{ display: 'flex', gap: 7, marginBottom: 12, overflowX: 'auto', paddingBottom: 2 }}>
          {[
            { id: 'all', l: 'Все' },
            { id: 'in',  l: 'Доход' },
            { id: 'out', l: 'Расход' },
            { id: 'rec', l: 'Повтор' },
          ].map(f => (
            <Pill key={f.id} active={filter === f.id} onClick={() => setFilter(f.id)}>{f.l}</Pill>
          ))}
        </div>

        <SectionHeading title="Операции"/>
        {filtered.map(tx => <TxCard key={tx.id} tx={tx}/>)}
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════
   REWARDS SCREEN
   ═══════════════════════════════════════════════════════════ */
function RewardsScreen({ data }) {
  const [section, setSection] = useState('xp');
  const { streak, xp, level } = data;
  const xpToNext = 1000;
  const xpPct = Math.min((xp / xpToNext) * 100, 100);

  return (
    <>
      <StatusBar dark/>
      <div style={{
        background: 'linear-gradient(150deg, #1a0a3e 0%, #2d1069 40%, #1C1C1E 100%)',
        padding: '16px 20px 0', position: 'relative', overflow: 'hidden',
        flexShrink: 0,
      }}>
        {/* Glow orbs */}
        <div style={{
          position: 'absolute', top: -60, right: -50,
          width: 220, height: 220, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.3), transparent 65%)',
        }}/>
        <div style={{
          position: 'absolute', bottom: 20, left: -40,
          width: 140, height: 140, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245,158,11,0.1), transparent 70%)',
        }}/>

        {/* Level label */}
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 10, fontWeight: 700,
          color: 'rgba(255,255,255,0.35)',
          letterSpacing: 2, textTransform: 'uppercase',
          marginBottom: 8, position: 'relative', zIndex: 1,
        }}>Уровень {level}</div>

        {/* XP display */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, marginBottom: 16, position: 'relative', zIndex: 1 }}>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 40, fontWeight: 800, color: '#fff',
            letterSpacing: '-1px', lineHeight: 1,
          }}>{xp}</div>
          <div style={{ paddingBottom: 6 }}>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 13, fontWeight: 700, color: '#F59E0B',
            }}>XP</div>
          </div>
        </div>

        {/* XP bar */}
        <div style={{
          background: 'rgba(255,255,255,0.06)',
          borderRadius: 14, padding: '12px 14px',
          border: '1px solid rgba(255,255,255,0.08)',
          marginBottom: 14, position: 'relative', zIndex: 1,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 9, fontWeight: 700,
              color: 'rgba(255,255,255,0.35)', letterSpacing: 1,
            }}>До LVL {level + 1}</div>
            <div style={{ fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.35)' }}>
              <span style={{ color: '#F59E0B' }}>{xp}</span> / {xpToNext} XP
            </div>
          </div>
          <div style={{ height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{
              width: xpPct + '%', height: '100%',
              background: 'linear-gradient(90deg, #D97706, #F59E0B, #FCD34D)',
              borderRadius: 4, transition: 'width 0.8s ease',
            }}/>
          </div>
        </div>

        {/* Section tabs */}
        <div style={{ display: 'flex', gap: 4, position: 'relative', zIndex: 1 }}>
          {[
            { id: 'xp', l: 'История' },
            { id: 'badges', l: 'Награды' },
            { id: 'board', l: 'Лидеры' },
          ].map(t => (
            <div key={t.id} onClick={() => setSection(t.id)} style={{
              flex: 1, padding: '10px 4px',
              borderRadius: '12px 12px 0 0',
              fontFamily: 'var(--font-display)',
              fontSize: 11, fontWeight: 700, textAlign: 'center',
              letterSpacing: 0.5, textTransform: 'uppercase',
              cursor: 'pointer',
              background: section === t.id ? 'var(--bg)' : 'rgba(255,255,255,0.06)',
              color: section === t.id ? 'var(--ink)' : 'rgba(255,255,255,0.4)',
              transition: 'all 150ms',
            }}>{t.l}</div>
          ))}
        </div>
      </div>

      <div style={{ ...screenScroll, paddingTop: 14 }}>
        {section === 'xp' && (
          <>
            <StreakBanner streak={streak}/>
            <SectionHeading title="История XP"/>
            {[
              { ic: '🔥', l: 'Серия сохранена',  sub: '14:32 · ×' + streak,            pts: 20 },
              { ic: '➕', l: 'Новая операция',    sub: '14:29 · Продукты · 85 000',     pts: 10 },
              { ic: '📊', l: 'Аналитика открыта', sub: '13:10',                          pts: 5  },
              { ic: '🔥', l: 'Серия сохранена',  sub: 'Вчера · ×' + (streak - 1),       pts: 20 },
              { ic: '➕', l: 'Новая операция',    sub: 'Вчера · Зарплата',               pts: 10 },
            ].map((r, i) => (
              <div key={i} style={{
                background: '#fff', borderRadius: 16,
                boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
                padding: '12px 14px', marginBottom: 7,
                display: 'flex', alignItems: 'center', gap: 12,
              }}>
                <IconChip emoji={r.ic} tone="amber" size={36}/>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{r.l}</div>
                  <div style={{ fontSize: 10, color: 'var(--ink-3)', marginTop: 2 }}>{r.sub}</div>
                </div>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 13, fontWeight: 800, color: 'var(--amber)',
                  background: 'var(--amber-bg)',
                  padding: '4px 10px', borderRadius: 10,
                }}>+{r.pts}</div>
              </div>
            ))}
          </>
        )}

        {section === 'badges' && (
          <>
            <SectionHeading title="Достижения"/>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
              {[
                { ic: '🔥', n: 'Серия 7',      d: 'Неделя подряд',     earned: true },
                { ic: '💎', n: 'Серия 30',     d: 'Месяц без перерыва',earned: false },
                { ic: '🏆', n: 'Бережливый',  d: '7 дней в бюджете',  earned: true },
                { ic: '🎯', n: 'Точность',     d: 'Точно по бюджету',  earned: false },
                { ic: '📊', n: 'Аналитик',    d: '10 отчётов',        earned: false },
                { ic: '⭐', n: '1000 XP',     d: 'Первая тысяча',     earned: false },
              ].map((b, i) => (
                <div key={i} style={{
                  background: b.earned
                    ? 'linear-gradient(135deg, #fff, #fffbeb)'
                    : 'var(--bg)',
                  border: b.earned ? '1px solid #FEF3C7' : '1px solid var(--border)',
                  borderRadius: 16, padding: '14px 8px', textAlign: 'center',
                  opacity: b.earned ? 1 : 0.5,
                  boxShadow: b.earned ? '0 2px 8px rgba(245,158,11,0.12)' : 'none',
                }}>
                  <div style={{
                    fontSize: 30, marginBottom: 7,
                    filter: b.earned ? 'none' : 'grayscale(1)',
                  }}>{b.ic}</div>
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 11, fontWeight: 700,
                    color: b.earned ? 'var(--ink)' : 'var(--ink-3)',
                    lineHeight: 1.2, marginBottom: 3,
                  }}>{b.n}</div>
                  <div style={{ fontSize: 9, color: 'var(--ink-3)', lineHeight: 1.3 }}>{b.d}</div>
                  {b.earned && (
                    <div style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 8, fontWeight: 800, color: '#D97706',
                      letterSpacing: 0.5, marginTop: 6,
                      background: '#FEF3C7', padding: '3px 8px', borderRadius: 6, display: 'inline-block',
                    }}>ПОЛУЧЕНО</div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {section === 'board' && (
          <>
            <SectionHeading title="На этой неделе"/>
            {[
              { rank: 1, name: 'Шахзод',  sub: '@shahzod_d',  pts: 1240, you: false, avatarBg: '#F59E0B' },
              { rank: 2, name: 'Алишер',  sub: '@alisherjon', pts: 870,  you: true,  avatarBg: 'var(--purple)' },
              { rank: 3, name: 'Дилшод',  sub: '@dilshod',    pts: 820,  you: false, avatarBg: '#6B7280' },
              { rank: 4, name: 'Камиль',  sub: '@kamil',      pts: 510,  you: false, avatarBg: '#374151' },
              { rank: 5, name: 'Зухра',   sub: '@zuhra_m',    pts: 460,  you: false, avatarBg: '#374151' },
            ].map(p => {
              const medal = p.rank === 1 ? '🥇' : p.rank === 2 ? '🥈' : p.rank === 3 ? '🥉' : null;
              return (
                <div key={p.rank} style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  background: p.you ? 'var(--purple-bg)' : '#fff',
                  border: '1px solid ' + (p.you ? '#E9D5FF' : 'var(--border)'),
                  borderRadius: 16, padding: '12px 14px', marginBottom: 7,
                  boxShadow: p.you ? '0 2px 8px rgba(124,58,237,0.1)' : '0 1px 4px rgba(0,0,0,0.04)',
                }}>
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 12, fontWeight: 800,
                    color: p.you ? 'var(--purple)' : 'var(--ink-3)',
                    width: 18, textAlign: 'center', flexShrink: 0,
                  }}>{medal || p.rank}</div>
                  <div style={{
                    width: 36, height: 36, borderRadius: 12, flexShrink: 0,
                    background: p.avatarBg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-display)',
                    fontSize: 14, fontWeight: 800, color: '#fff',
                  }}>{p.name[0]}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: 13, fontWeight: 700,
                      color: p.you ? '#5B21B6' : 'var(--ink)',
                    }}>{p.name}{p.you ? ' · вы' : ''}</div>
                    <div style={{ fontSize: 10, color: 'var(--ink-3)', marginTop: 1 }}>{p.sub}</div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 15, fontWeight: 800,
                      color: p.you ? 'var(--purple)' : 'var(--ink)',
                    }}>{p.pts}</div>
                    <div style={{ fontSize: 9, color: 'var(--ink-3)' }}>XP</div>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════
   PROFILE SCREEN
   ═══════════════════════════════════════════════════════════ */
function ProfileScreen({ data, setData }) {
  const { name, xp, level, streak } = data;
  const [notifs, setNotifs] = useState(true);
  const [dark, setDark]     = useState(false);

  return (
    <>
      <StatusBar dark/>
      <div style={{
        background: 'linear-gradient(160deg, #111318 0%, #1a1d24 70%, #0e1116 100%)',
        padding: '16px 20px 0',
        position: 'relative', overflow: 'hidden', flexShrink: 0,
      }}>
        <div style={{
          position: 'absolute', top: -40, right: -40,
          width: 160, height: 160, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245,158,11,0.1), transparent 70%)',
        }}/>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'flex-start', marginBottom: 18, position: 'relative', zIndex: 1,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ position: 'relative' }}>
              <div style={{
                width: 60, height: 60, borderRadius: 20,
                background: 'linear-gradient(135deg, #1f2937, #374151)',
                border: '2px solid rgba(255,255,255,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-display)',
                fontSize: 24, fontWeight: 800, color: '#fff',
              }}>{name[0]}</div>
              <div style={{
                position: 'absolute', bottom: -8, left: '50%',
                transform: 'translateX(-50%)',
                background: 'linear-gradient(90deg, #D97706, #F59E0B)',
                color: '#1C1C1E', fontFamily: 'var(--font-display)',
                fontSize: 8, fontWeight: 900,
                padding: '3px 7px', borderRadius: 6,
                border: '1.5px solid #0D0D0F', whiteSpace: 'nowrap',
              }}>LVL {level}</div>
            </div>
            <div style={{ paddingTop: 4 }}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 21, fontWeight: 800, color: '#fff',
                letterSpacing: '-0.3px',
              }}>{name}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>@alisherjon</div>
            </div>
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 10, padding: '7px 14px',
            fontFamily: 'var(--font-display)',
            fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.45)',
            letterSpacing: 1, textTransform: 'uppercase', cursor: 'pointer',
          }}>Изм.</div>
        </div>

        {/* Stats row */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1px 1fr 1px 1fr',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          padding: '14px 0', position: 'relative', zIndex: 1,
        }}>
          {[
            { val: streak, label: 'Серия 🔥', color: '#F59E0B' },
            null,
            { val: xp,     label: 'XP',       color: '#4ADE80' },
            null,
            { val: 'LVL ' + level, label: 'Уровень', color: '#C4B5FD' },
          ].map((s, i) => s === null
            ? <div key={i} style={{ background: 'rgba(255,255,255,0.07)' }}/>
            : (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 14, fontWeight: 800, color: s.color,
                }}>{s.val}</div>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 9, fontWeight: 700,
                  color: 'rgba(255,255,255,0.35)',
                  letterSpacing: 0.5, textTransform: 'uppercase', marginTop: 3,
                }}>{s.label}</div>
              </div>
            )
          )}
        </div>
      </div>

      <div style={{ ...screenScroll, paddingTop: 14 }}>
        <SectionHeading title="Настройки"/>
        <div style={{
          background: '#fff', borderRadius: 20,
          boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
          overflow: 'hidden', marginBottom: 12,
        }}>
          {[
            { ic: '🔔', tone: 'amber',  label: 'Уведомления',  sub: 'Напоминания записывать операции', right: <Toggle on={notifs} onChange={setNotifs}/> },
            { ic: '🌙', tone: 'purple', label: 'Тёмная тема',  sub: 'Скоро',                           right: <Toggle on={dark} onChange={setDark}/> },
            { ic: '💱', tone: 'green',  label: 'Валюта',       sub: 'UZS · сум',                       right: <span style={{ color: 'var(--ink-3)', fontSize: 20 }}>›</span> },
            { ic: '🗂', tone: 'blue',   label: 'Категории',    sub: '10 категорий',                     right: <span style={{ color: 'var(--ink-3)', fontSize: 20 }}>›</span> },
          ].map((row, i, arr) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center',
              padding: '14px 16px', gap: 13, cursor: 'pointer',
              borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none',
            }}>
              <IconChip emoji={row.ic} tone={row.tone} size={36}/>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{row.label}</div>
                {row.sub && <div style={{ fontSize: 10, color: 'var(--ink-3)', marginTop: 1 }}>{row.sub}</div>}
              </div>
              {row.right}
            </div>
          ))}
        </div>

        <SectionHeading title="Аккаунт"/>
        <div style={{
          background: '#fff', borderRadius: 20,
          boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
          overflow: 'hidden', marginBottom: 12,
        }}>
          {[
            { ic: '📥', tone: 'blue',  label: 'Экспорт CSV',   sub: 'Скачать все операции' },
            { ic: '💬', tone: 'green', label: 'Поддержка',      sub: 'Telegram · @finly_help' },
            { ic: '📜', tone: 'gray',  label: 'О приложении',   sub: 'Версия 1.0.4' },
          ].map((row, i, arr) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center',
              padding: '14px 16px', gap: 13, cursor: 'pointer',
              borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none',
            }}>
              <IconChip emoji={row.ic} tone={row.tone} size={36}/>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{row.label}</div>
                {row.sub && <div style={{ fontSize: 10, color: 'var(--ink-3)', marginTop: 1 }}>{row.sub}</div>}
              </div>
              <span style={{ color: 'var(--ink-3)', fontSize: 20 }}>›</span>
            </div>
          ))}
        </div>

        <button style={{
          width: '100%', padding: '14px', borderRadius: 16,
          background: 'var(--red-bg)', border: '1px solid var(--red-mid)',
          color: 'var(--red)', cursor: 'pointer',
          fontFamily: 'var(--font-display)',
          fontSize: 12, fontWeight: 800,
          letterSpacing: 1.5, textTransform: 'uppercase',
        }}>Выйти</button>
      </div>
    </>
  );
}

Object.assign(window, { HomeScreen, AddScreen, AnalyticsScreen, RewardsScreen, ProfileScreen });
