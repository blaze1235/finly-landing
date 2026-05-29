/* eslint-disable */
/* Five core screens — redesigned for the Finly landing page mockup. */

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

  const quick = [
    { ic: '➕', lbl: 'Запись',   tone: 'green',  cb: () => setTab('add') },
    { ic: '📊', lbl: 'Отчёты',   tone: 'blue',   cb: () => setTab('analytics') },
    { ic: '🏆', lbl: 'Прогресс', tone: 'purple', cb: () => setTab('rewards') },
    { ic: '👤', lbl: 'Профиль',  tone: 'gray',   cb: () => setTab('profile') },
  ];

  return (
    <>
      <StatusBar/>

      {/* Compact header row */}
      <div style={{
        padding: '4px 20px 0',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: 'var(--bg)', flexShrink: 0,
      }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink)' }}>
            Привет, {name} 👋
          </div>
          <div style={{ fontSize: 10, color: 'var(--ink-3)', fontWeight: 500, marginTop: 1 }}>
            Вт, 13 мая 2025
          </div>
        </div>
        <div style={{
          width: 36, height: 36, borderRadius: 12,
          background: 'var(--ink)', color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 800,
        }}>{name[0]}</div>
      </div>

      {/* Balance hero card */}
      <div style={{ padding: '10px 16px 0', flexShrink: 0 }}>
        <div style={{
          background: 'linear-gradient(145deg, #111318 0%, #1a1f2e 100%)',
          borderRadius: 22, padding: '18px 20px',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: -50, right: -50,
            width: 160, height: 160, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(245,158,11,0.15), transparent 65%)',
          }}/>
          <div style={{
            position: 'absolute', bottom: -30, left: 20,
            width: 100, height: 100, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99,102,241,0.08), transparent 70%)',
          }}/>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 9, fontWeight: 700,
            color: 'rgba(255,255,255,0.35)',
            letterSpacing: 2.5, textTransform: 'uppercase',
            marginBottom: 5, position: 'relative', zIndex: 1,
          }}>Баланс · май</div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 30, fontWeight: 800,
            color: '#fff', letterSpacing: '-0.5px',
            lineHeight: 1.1, position: 'relative', zIndex: 1,
          }}>
            {fmt(balance)}
            <span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.35)', marginLeft: 6 }}>сум</span>
          </div>
          <div style={{
            display: 'flex', gap: 14, marginTop: 10,
            position: 'relative', zIndex: 1,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <div style={{ width: 6, height: 6, borderRadius: 2, background: '#4ADE80' }}/>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)', fontWeight: 600 }}>+{fmt(income)}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <div style={{ width: 6, height: 6, borderRadius: 2, background: '#F87171' }}/>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)', fontWeight: 600 }}>−{fmt(expense)}</div>
            </div>
          </div>
        </div>
      </div>

      <div style={screenScroll}>
        {/* Quick actions */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 7, marginBottom: 14 }}>
          {quick.map((q, i) => (
            <div key={i} onClick={q.cb} style={{
              background: '#fff', borderRadius: 14,
              border: '1px solid var(--border)',
              padding: '11px 4px',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: 6, cursor: 'pointer',
            }}>
              <IconChip emoji={q.ic} tone={q.tone} size={32}/>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 8, fontWeight: 700,
                color: 'var(--ink-2)', letterSpacing: 0.4,
                textTransform: 'uppercase', textAlign: 'center',
              }}>{q.lbl}</div>
            </div>
          ))}
        </div>

        <StreakBanner streak={streak}/>

        <SummaryGrid items={[
          { label: 'Доход · май',  value: '+' + fmt(income),  tone: 'green', sub: '↑ +8% к апрелю' },
          { label: 'Расход · май', value: '−' + fmt(expense), tone: 'red',   sub: '64% от дохода' },
        ]}/>

        {/* AI insight */}
        <div style={{
          background: 'linear-gradient(135deg, #EFF6FF 0%, #F0FDF4 100%)',
          border: '1px solid #BFDBFE',
          borderRadius: 16, padding: '12px 14px', marginBottom: 12,
          display: 'flex', alignItems: 'flex-start', gap: 10,
        }}>
          <div style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>💡</div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#1E40AF', marginBottom: 2 }}>Еда дорожает</div>
            <div style={{ fontSize: 11, color: '#3B82F6', fontWeight: 500, lineHeight: 1.4 }}>
              Эта неделя на 23% больше, чем в среднем.
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
  { ic: '💊', name: 'Здоровье' },  { ic: '🎬', name: 'Досуг' },
  { ic: '👕', name: 'Одежда' },    { ic: '📚', name: 'Учёба' },
  { ic: '•••', name: 'Прочее' },
];
const INC_CATS = [
  { ic: '💼', name: 'Зарплата' },   { ic: '💹', name: 'Подработка' },
  { ic: '🏦', name: 'Инвестиции' }, { ic: '🎁', name: 'Подарок' },
];

function AddScreen({ data, setData, setTab }) {
  const [type, setType]     = useState('expense');
  const [amount, setAmount] = useState('');
  const [cat, setCat]       = useState(null);
  const [note, setNote]     = useState('');
  const [recurring, setRec] = useState(false);
  const cats = type === 'expense' ? EXP_CATS : INC_CATS;

  const isExp      = type === 'expense';
  const accentColor = isExp ? 'var(--red)' : 'var(--green)';
  const accentBg    = isExp ? 'var(--red-bg)' : 'var(--green-bg)';
  const accentMid   = isExp ? 'var(--red-mid)' : 'var(--green-mid)';

  function save() {
    if (!amount || !cat) return;
    const newTx = {
      id: Date.now(),
      type, amount: Number(amount.replace(/[\s]/g, '')),
      icon: cat.ic, catName: cat.name,
      note, recurring,
      dateLabel: 'Сейчас',
    };
    setData(d => ({ ...d, txs: [newTx, ...d.txs] }));
    setTab('home');
  }

  return (
    <>
      <StatusBar/>
      <PageHeader title="Новая запись" onBack={() => setTab('home')}/>

      {/* Type + amount block */}
      <div style={{ padding: '0 16px 12px', background: 'var(--bg)', flexShrink: 0 }}>
        {/* Type toggle */}
        <div style={{
          display: 'flex', gap: 5, marginBottom: 12,
          background: '#fff', borderRadius: 14, padding: 4,
          border: '1px solid var(--border)',
        }}>
          {['expense', 'income'].map(t => (
            <div key={t} onClick={() => { setType(t); setCat(null); }} style={{
              flex: 1, padding: '10px 6px', borderRadius: 10,
              fontFamily: 'var(--font-display)',
              fontSize: 12, fontWeight: 700, textAlign: 'center',
              cursor: 'pointer', transition: 'all 150ms',
              background: type === t
                ? (t === 'expense' ? 'var(--red)' : 'var(--green)')
                : 'transparent',
              color: type === t ? '#fff' : 'var(--ink-3)',
            }}>
              {t === 'expense' ? '↑ Расход' : '↓ Доход'}
            </div>
          ))}
        </div>

        {/* Amount input hero */}
        <div style={{
          background: accentBg, borderRadius: 18, padding: '14px 16px',
          border: '1.5px solid ' + accentMid,
        }}>
          <div style={{
            fontSize: 9, fontWeight: 700, color: accentColor,
            letterSpacing: 1.8, textTransform: 'uppercase',
            fontFamily: 'var(--font-display)', marginBottom: 6,
          }}>{isExp ? 'Расход' : 'Доход'} · UZS</div>
          <input
            style={{
              width: '100%', background: 'transparent', border: 'none',
              outline: 'none', boxSizing: 'border-box',
              fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 800,
              color: accentColor, letterSpacing: '-0.5px',
              caretColor: accentColor,
            }}
            placeholder="0"
            value={amount}
            inputMode="numeric"
            onChange={e =>
              setAmount(
                e.target.value.replace(/[^\d]/g, '')
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
              )
            }
          />
        </div>
      </div>

      <div style={screenScroll}>
        <label style={lbl}>Категория</label>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 8, marginBottom: 14,
        }}>
          {cats.map(c => {
            const sel = cat && cat.name === c.name;
            return (
              <div key={c.name} onClick={() => setCat(c)} style={{
                padding: '12px 6px', borderRadius: 14,
                background: sel ? accentBg : '#fff',
                border: '1px solid ' + (sel ? accentMid : 'var(--border)'),
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: 5, cursor: 'pointer',
                transition: 'all 120ms',
              }}>
                <div style={{ fontSize: 22 }}>{c.ic}</div>
                <div style={{
                  fontSize: 11, fontWeight: 600, textAlign: 'center',
                  color: sel ? accentColor : 'var(--ink)', lineHeight: 1.2,
                }}>{c.name}</div>
              </div>
            );
          })}
        </div>

        <label style={lbl}>Комментарий</label>
        <textarea style={{
          ...fi, fontFamily: 'var(--font-body)', fontWeight: 400,
          fontSize: 14, height: 64, resize: 'none', padding: 14,
          border: '1px solid var(--border)',
        }} placeholder="Например: Недельная закупка"
          value={note} onChange={e => setNote(e.target.value)}/>

        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '12px 14px', background: '#fff',
          border: '1px solid var(--border)', borderRadius: 14,
          marginTop: 10, marginBottom: 16,
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>Повторяющийся</div>
            <div style={{ fontSize: 10, color: 'var(--ink-3)', marginTop: 1 }}>Каждый месяц</div>
          </div>
          <Toggle on={recurring} onChange={setRec}/>
        </div>

        <button onClick={save} style={{
          width: '100%', padding: 16, borderRadius: 16, border: 'none',
          background: amount && cat ? accentColor : 'var(--ink-3)',
          color: '#fff', cursor: amount && cat ? 'pointer' : 'not-allowed',
          fontFamily: 'var(--font-display)',
          fontSize: 13, fontWeight: 700,
          letterSpacing: 1.5, textTransform: 'uppercase',
          transition: 'background 200ms',
        }}>Сохранить · +10 XP</button>
      </div>
    </>
  );
}
const lbl = {
  fontFamily: 'var(--font-display)',
  fontSize: 10, fontWeight: 700,
  color: 'var(--ink-3)', letterSpacing: 1.5,
  textTransform: 'uppercase', marginBottom: 7, display: 'block',
};
const fi = {
  width: '100%', background: 'var(--bg)', border: 'none',
  borderRadius: 14, padding: '14px 16px',
  fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700,
  color: 'var(--ink)', outline: 'none', boxSizing: 'border-box',
};

/* ═══════════════════════════════════════════════════════════
   DONUT CHART (pure SVG, no dependencies)
   ═══════════════════════════════════════════════════════════ */
const CHART_COLORS = ['#EF4444', '#F59E0B', '#3B82F6', '#8B5CF6', '#10B981', '#EC4899'];

function DonutChart({ cats, total }) {
  const size = 100;
  const cx = size / 2, cy = size / 2, r = size * 0.35;
  const circ = 2 * Math.PI * r;
  let offset = 0;
  const arcs = cats.slice(0, 5).map((c, i) => {
    const dash = (c.value / total) * circ;
    const a = { dash, offset, color: CHART_COLORS[i % CHART_COLORS.length] };
    offset += dash;
    return a;
  });
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)', flexShrink: 0 }}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--border)" strokeWidth={size * 0.16}/>
      {arcs.map((a, i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill="none"
          stroke={a.color} strokeWidth={size * 0.16}
          strokeDasharray={`${a.dash} ${circ - a.dash}`}
          strokeDashoffset={-a.offset}/>
      ))}
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════
   ANALYTICS SCREEN
   ═══════════════════════════════════════════════════════════ */
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
                 : txs.filter(t => t.type === 'expense');

  return (
    <>
      <StatusBar/>
      <PageHeader title="Отчёты" action="Май 2025"/>
      <div style={screenScroll}>
        <KpiStrip items={[
          { val: '+' + fmt(income),   lab: 'Доход',  tone: 'green' },
          { val: '−' + fmt(totalExp), lab: 'Расход', tone: 'red' },
          { val: '64%',               lab: 'Норма',  tone: 'amber' },
        ]}/>

        {/* Category card */}
        <div style={{
          background: '#fff', border: '1px solid var(--border)',
          borderRadius: 18, padding: 16, marginBottom: 10,
        }}>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 13, fontWeight: 700, color: 'var(--ink)', marginBottom: 14,
          }}>По категориям</div>

          {/* Donut + legend */}
          <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 14 }}>
            <DonutChart cats={cats} total={totalExp}/>
            <div style={{ flex: 1 }}>
              {cats.slice(0, 4).map((c, i) => (
                <div key={c.name} style={{
                  display: 'flex', alignItems: 'center', gap: 7, marginBottom: 7,
                }}>
                  <div style={{
                    width: 8, height: 8, borderRadius: 2, flexShrink: 0,
                    background: CHART_COLORS[i % CHART_COLORS.length],
                  }}/>
                  <div style={{ fontSize: 11, color: 'var(--ink)', fontWeight: 600, flex: 1 }}>{c.name}</div>
                  <div style={{
                    fontSize: 11, fontWeight: 700, color: 'var(--ink-2)',
                    fontVariantNumeric: 'tabular-nums',
                  }}>{Math.round(c.pct)}%</div>
                </div>
              ))}
            </div>
          </div>

          {/* Bar list */}
          {cats.map((c, i) => {
            const tx = expenses.find(t => t.catName === c.name);
            return (
              <div key={c.name} style={{
                display: 'flex', alignItems: 'center', gap: 9, marginBottom: 9,
              }}>
                <div style={{ fontSize: 15, width: 20, textAlign: 'center' }}>{tx ? tx.icon : '•'}</div>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--ink)', width: 76 }}>{c.name}</div>
                <div style={{ flex: 1, height: 5, background: 'var(--border)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{
                    width: c.pct + '%', height: '100%', borderRadius: 3,
                    background: CHART_COLORS[i % CHART_COLORS.length],
                  }}/>
                </div>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 10, fontWeight: 700, color: 'var(--ink-2)',
                  width: 58, textAlign: 'right', fontVariantNumeric: 'tabular-nums',
                }}>{fmt(c.value)}</div>
              </div>
            );
          })}
        </div>

        {/* Filter pills */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
          <Pill active={filter==='all'} onClick={() => setFilter('all')}>Все</Pill>
          <Pill active={filter==='in'}  onClick={() => setFilter('in')}>Доход</Pill>
          <Pill active={filter==='out'} onClick={() => setFilter('out')}>Расход</Pill>
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

  return (
    <>
      <StatusBar dark/>
      {/* Dark hero */}
      <div style={{
        background: 'linear-gradient(160deg, #1a0a3e 0%, #2d1069 60%, #1C1C1E 100%)',
        padding: '16px 20px 0', position: 'relative', overflow: 'hidden', flexShrink: 0,
      }}>
        <div style={{
          position: 'absolute', top: -60, right: -60, width: 200, height: 200,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.3), transparent 70%)',
        }}/>
        <div style={{
          position: 'absolute', bottom: 10, left: -30, width: 120, height: 120,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245,158,11,0.08), transparent 70%)',
        }}/>
        <div style={{
          fontFamily: 'var(--font-display)', fontSize: 10, fontWeight: 700,
          color: 'rgba(255,255,255,0.4)', letterSpacing: 2, textTransform: 'uppercase',
          marginBottom: 4, position: 'relative', zIndex: 1,
        }}>Уровень {level}</div>
        <div style={{
          fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800,
          color: '#fff', marginBottom: 12, letterSpacing: '-0.5px',
          position: 'relative', zIndex: 1,
        }}>{xp} <span style={{ fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.4)' }}>XP</span></div>
        <div style={{
          background: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: '10px 14px',
          border: '1px solid rgba(255,255,255,0.07)',
          marginBottom: 14, position: 'relative', zIndex: 1,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
            <div style={{
              fontFamily: 'var(--font-display)', fontSize: 9, fontWeight: 700,
              color: 'rgba(255,255,255,0.4)', letterSpacing: 1,
            }}>До уровня {level + 1}</div>
            <div style={{ fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.4)' }}>
              <em style={{ color: '#F59E0B', fontStyle: 'normal' }}>{xp}</em> / 1000
            </div>
          </div>
          <div style={{ height: 6, background: 'rgba(255,255,255,0.07)', borderRadius: 3, overflow: 'hidden' }}>
            <div style={{
              width: Math.min(100, (xp / 1000) * 100) + '%', height: '100%',
              background: 'linear-gradient(90deg, #D97706, #F59E0B)', borderRadius: 3,
            }}/>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 4, position: 'relative', zIndex: 1 }}>
          {[{ id: 'xp', l: 'История' }, { id: 'badges', l: 'Награды' }, { id: 'board', l: 'Лидеры' }]
            .map(t => (
              <div key={t.id} onClick={() => setSection(t.id)} style={{
                flex: 1, padding: '10px 4px', borderRadius: '11px 11px 0 0',
                fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 700,
                textAlign: 'center', letterSpacing: 0.5, textTransform: 'uppercase',
                cursor: 'pointer', transition: 'all 150ms',
                background: section === t.id ? 'var(--bg)' : 'rgba(255,255,255,0.06)',
                color: section === t.id ? 'var(--ink)' : 'rgba(255,255,255,0.4)',
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
              { ic: '🔥', l: 'Серия сохранена',    sub: '14:32 · Streak ×' + streak,       pts: 20 },
              { ic: '➕', l: 'Добавлена операция', sub: '14:32 · Продукты',                pts: 10 },
              { ic: '📊', l: 'Открыта аналитика',  sub: '13:10',                            pts: 5  },
              { ic: '🔥', l: 'Серия сохранена',    sub: 'Вчера · Streak ×' + (streak - 1), pts: 20 },
              { ic: '➕', l: 'Добавлена операция', sub: 'Вчера · Зарплата',                pts: 10 },
            ].map((r, i) => (
              <div key={i} style={{
                background: '#fff', borderRadius: 14, border: '1px solid var(--border)',
                padding: '12px 14px', marginBottom: 7,
                display: 'flex', alignItems: 'center', gap: 12,
              }}>
                <IconChip emoji={r.ic} tone="amber" size={34}/>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{r.l}</div>
                  <div style={{ fontSize: 10, color: 'var(--ink-3)', marginTop: 2 }}>{r.sub}</div>
                </div>
                <div style={{
                  fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 800, color: 'var(--amber)',
                }}>+{r.pts} XP</div>
              </div>
            ))}
          </>
        )}

        {section === 'badges' && (
          <>
            <SectionHeading title="Награды"/>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
              {[
                { ic: '🔥', n: 'Серия 7',    d: 'Неделя подряд',    earned: true  },
                { ic: '💎', n: 'Серия 30',   d: 'Месяц подряд',     earned: false },
                { ic: '🏆', n: 'Бережливый', d: '7 дней в бюджете', earned: true  },
                { ic: '🎯', n: 'Точно',      d: 'Точно по бюджету', earned: false },
                { ic: '📊', n: 'Аналитик',   d: '10 отчётов',       earned: false },
                { ic: '⭐', n: '1 000 XP',   d: 'Первая тысяча',    earned: false },
              ].map((b, i) => (
                <div key={i} style={{
                  background: b.earned ? '#fff' : 'var(--bg)',
                  border: '1px solid ' + (b.earned ? 'var(--green-mid)' : 'var(--border)'),
                  borderRadius: 14, padding: '12px 8px', textAlign: 'center',
                  opacity: b.earned ? 1 : 0.6,
                }}>
                  <div style={{ fontSize: 26, marginBottom: 6, filter: b.earned ? 'none' : 'grayscale(1)' }}>{b.ic}</div>
                  <div style={{
                    fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 700,
                    color: b.earned ? 'var(--ink)' : 'var(--ink-3)',
                    lineHeight: 1.2, marginBottom: 2,
                  }}>{b.n}</div>
                  <div style={{ fontSize: 9, color: 'var(--ink-3)', lineHeight: 1.3 }}>{b.d}</div>
                  {b.earned && (
                    <div style={{
                      fontFamily: 'var(--font-display)', fontSize: 8, fontWeight: 700,
                      color: 'var(--green)', letterSpacing: 0.5, marginTop: 5,
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
              { rank: 1, name: 'Шахзод', sub: '@shahzod_d',  pts: 1240, you: false },
              { rank: 2, name: 'Алишер', sub: '@alisherjon', pts: 870,  you: true  },
              { rank: 3, name: 'Дилшод', sub: '@dilshod',    pts: 820,  you: false },
              { rank: 4, name: 'Камиль', sub: '@kamil',      pts: 510,  you: false },
              { rank: 5, name: 'Зухра',  sub: '@zuhra_m',    pts: 460,  you: false },
            ].map(p => (
              <div key={p.rank} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                background: p.you ? 'var(--purple-bg)' : '#fff',
                border: '1px solid ' + (p.you ? '#E9D5FF' : 'var(--border)'),
                borderRadius: 14, padding: '11px 13px', marginBottom: 7,
              }}>
                <div style={{
                  fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 800,
                  width: 24, textAlign: 'center', fontSize: p.rank <= 3 ? 16 : 13,
                  color: p.you ? 'var(--purple)' : 'var(--ink-3)',
                }}>{p.rank === 1 ? '🥇' : p.rank === 2 ? '🥈' : p.rank === 3 ? '🥉' : p.rank}</div>
                <div style={{
                  width: 34, height: 34, borderRadius: 11, flexShrink: 0,
                  background: ['#F59E0B', '#5B21B6', '#6B7280', '#374151', '#374151'][p.rank - 1],
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 800, color: '#fff',
                }}>{p.name[0]}</div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: 13, fontWeight: 700,
                    color: p.you ? '#5B21B6' : 'var(--ink)',
                  }}>{p.name}{p.you ? ' · вы' : ''}</div>
                  <div style={{ fontSize: 10, color: 'var(--ink-3)', marginTop: 1 }}>{p.sub}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{
                    fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 800,
                    color: p.you ? 'var(--purple)' : 'var(--ink)',
                  }}>{p.pts}</div>
                  <div style={{ fontSize: 9, color: 'var(--ink-3)' }}>XP</div>
                </div>
              </div>
            ))}
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
        background: 'linear-gradient(145deg, #111318, #1a1f2e)',
        padding: '16px 20px 0', position: 'relative', overflow: 'hidden', flexShrink: 0,
      }}>
        <div style={{
          position: 'absolute', top: -50, right: -50, width: 180, height: 180,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245,158,11,0.1), transparent 70%)',
        }}/>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'flex-start', marginBottom: 16, position: 'relative', zIndex: 1,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 56, height: 56, borderRadius: 18,
              background: 'linear-gradient(135deg, #2C2C2E, #3A3A3C)',
              border: '2px solid rgba(255,255,255,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800,
              color: '#fff', position: 'relative',
            }}>
              {name[0]}
              <div style={{
                position: 'absolute', bottom: -7, left: '50%',
                transform: 'translateX(-50%)',
                background: 'linear-gradient(90deg, #D97706, #F59E0B)',
                color: '#1C1C1E', fontFamily: 'var(--font-display)',
                fontSize: 8, fontWeight: 800,
                padding: '2px 6px', borderRadius: 5,
                border: '1.5px solid #111318', whiteSpace: 'nowrap',
              }}>LVL {level}</div>
            </div>
            <div>
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 800,
                color: '#fff', marginBottom: 2,
              }}>{name}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>@alisherjon · Finly Pro</div>
            </div>
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 9, padding: '6px 12px',
            fontFamily: 'var(--font-display)', fontSize: 9, fontWeight: 700,
            color: 'rgba(255,255,255,0.5)', letterSpacing: 1, textTransform: 'uppercase',
            cursor: 'pointer',
          }}>Изм.</div>
        </div>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1px 1fr 1px 1fr',
          background: 'rgba(255,255,255,0.04)',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          padding: '12px 0', position: 'relative', zIndex: 1,
        }}>
          <PhStat val={streak}       lab="Серия"   tone="amber"/>
          <div style={{ background: 'rgba(255,255,255,0.07)' }}/>
          <PhStat val={xp}           lab="XP"      tone="green"/>
          <div style={{ background: 'rgba(255,255,255,0.07)' }}/>
          <PhStat val={'LVL ' + level} lab="Уровень" tone="purple"/>
        </div>
      </div>

      <div style={{ ...screenScroll, paddingTop: 14 }}>
        <SectionHeading title="Настройки"/>
        <div style={{
          background: '#fff', borderRadius: 18,
          border: '1px solid var(--border)', overflow: 'hidden', marginBottom: 12,
        }}>
          <SRow ic="🔔" tone="amber" label="Уведомления" sub="Напоминания каждый день"
            right={<Toggle on={notifs} onChange={setNotifs}/>}/>
          <SRow ic="🌙" tone="purple" label="Тёмная тема" sub="Скоро"
            right={<Toggle on={dark} onChange={setDark}/>}/>
          <SRow ic="💱" tone="green" label="Валюта" sub="UZS · сум" right={<span style={chev}>›</span>}/>
          <SRow ic="🗂" tone="blue" label="Категории" sub="10 категорий" right={<span style={chev}>›</span>}/>
        </div>

        <SectionHeading title="Аккаунт"/>
        <div style={{
          background: '#fff', borderRadius: 18,
          border: '1px solid var(--border)', overflow: 'hidden', marginBottom: 12,
        }}>
          <SRow ic="📥" tone="blue"  label="Экспорт CSV"  right={<span style={chev}>›</span>}/>
          <SRow ic="💬" tone="green" label="Поддержка"    sub="@finly_help" right={<span style={chev}>›</span>}/>
          <SRow ic="📜" tone="gray"  label="О приложении" sub="Версия 1.0.4" right={<span style={chev}>›</span>}/>
        </div>

        <button style={{
          width: '100%', padding: 14, borderRadius: 14,
          background: 'var(--red-bg)', border: '1px solid var(--red-mid)',
          color: 'var(--red)', cursor: 'pointer',
          fontFamily: 'var(--font-display)', fontSize: 12, fontWeight: 700,
          letterSpacing: 1.5, textTransform: 'uppercase',
        }}>Выйти</button>
      </div>
    </>
  );
}
function PhStat({ val, lab, tone }) {
  const colors = { amber: '#F59E0B', green: '#4ADE80', purple: '#C4B5FD' };
  return (
    <div style={{ textAlign: 'center', padding: '0 4px' }}>
      <div style={{
        fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 800,
        color: colors[tone] || '#fff',
      }}>{val}</div>
      <div style={{
        fontFamily: 'var(--font-display)', fontSize: 9, fontWeight: 700,
        color: 'rgba(255,255,255,0.4)', letterSpacing: 0.5,
        textTransform: 'uppercase', marginTop: 3,
      }}>{lab}</div>
    </div>
  );
}
function SRow({ ic, tone, label, sub, right }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center',
      padding: '15px 16px', gap: 13, cursor: 'pointer',
      borderBottom: '1px solid var(--border)',
    }}>
      <IconChip emoji={ic} tone={tone} size={36}/>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{label}</div>
        {sub && <div style={{ fontSize: 10, color: 'var(--ink-3)', marginTop: 1 }}>{sub}</div>}
      </div>
      {right}
    </div>
  );
}
const chev = { color: 'var(--ink-3)', fontSize: 18, lineHeight: 1 };

Object.assign(window, { HomeScreen, AddScreen, AnalyticsScreen, RewardsScreen, ProfileScreen });
