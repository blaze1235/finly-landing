/* eslint-disable */
/* Five core screens for the Finly webapp UI kit. Each screen
   takes `data` (mock state) and a setter; all components are
   pulled from window globals (defined in components.jsx). */

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
    { ic: '➕', lbl: 'Добавить', tone: 'green',  cb: () => setTab('add') },
    { ic: '📊', lbl: 'Отчёты',   tone: 'red',    cb: () => setTab('analytics') },
    { ic: '🎯', lbl: 'Бюджет',   tone: 'amber',  cb: () => setTab('rewards') },
    { ic: '💰', lbl: 'Счета',    tone: 'blue',   cb: () => setTab('profile') },
  ];

  return (
    <>
      <StatusBar/>
      <AppHeader name={name} sub="Вторник, 13 мая" balance={balance}/>
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
              <IconChip emoji={q.ic} tone={q.tone} size={34}/>
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

        <SummaryGrid items={[
          { label: 'Доход · май',  value: '+' + fmt(income),  tone: 'green', sub: '+8% к апрелю' },
          { label: 'Расход · май', value: '−' + fmt(expense), tone: 'red',   sub: '64% от дохода' },
        ]}/>

        {/* Insight */}
        <div style={{
          background: 'var(--blue-bg)', border: '1px solid #BFDBFE',
          borderRadius: 14, padding: '12px 14px', marginBottom: 12,
          display: 'flex', alignItems: 'flex-start', gap: 10,
        }}>
          <div style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>💡</div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#1E40AF' }}>Еда дорожает</div>
            <div style={{ fontSize: 11, color: '#3B82F6', fontWeight: 500, marginTop: 2 }}>
              Эта неделя на 23% больше, чем в среднем. Пора проверить бюджет.
            </div>
          </div>
        </div>

        <SectionHeading title="Последнее" action="Все →" onAction={() => setTab('analytics')}/>
        {txs.slice(0, 6).map(tx => <TxCard key={tx.id} tx={tx} onTap={onTxTap}/>)}
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════
   ADD TRANSACTION SCREEN
   ═══════════════════════════════════════════════════════════ */
const EXP_CATS = [
  { ic: '🛒', name: 'Продукты' },     { ic: '🏠', name: 'Жильё' },
  { ic: '🚌', name: 'Транспорт' },    { ic: '🍕', name: 'Кафе' },
  { ic: '💊', name: 'Здоровье' },     { ic: '🎬', name: 'Развлечения' },
  { ic: '👕', name: 'Одежда' },       { ic: '📚', name: 'Учёба' },
  { ic: '•••', name: 'Прочее' },
];
const INC_CATS = [
  { ic: '💼', name: 'Зарплата' }, { ic: '💹', name: 'Подработка' },
  { ic: '🏦', name: 'Инвестиции' }, { ic: '🎁', name: 'Подарок' },
];

function AddScreen({ data, setData, setTab }) {
  const [type, setType]       = useState('expense');
  const [amount, setAmount]   = useState('');
  const [cat, setCat]         = useState(null);
  const [note, setNote]       = useState('');
  const [recurring, setRec]   = useState(false);
  const cats = type === 'expense' ? EXP_CATS : INC_CATS;

  function save() {
    if (!amount || !cat) return;
    const newTx = {
      id: Date.now(),
      type, amount: Number(amount.replace(/[\s,]/g, '')),
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
      <div style={screenScroll}>
        {/* Type toggle */}
        <div style={{
          display: 'flex', gap: 5, marginBottom: 16,
          background: 'var(--bg)', borderRadius: 14, padding: 4,
        }}>
          {['expense', 'income'].map(t => (
            <div key={t} onClick={() => { setType(t); setCat(null); }}
              style={{
                flex: 1, padding: '12px 6px', borderRadius: 11,
                fontFamily: 'var(--font-display)',
                fontSize: 13, fontWeight: 700, textAlign: 'center',
                cursor: 'pointer', transition: 'all 150ms',
                background: type === t
                  ? (t === 'expense' ? 'var(--red)' : 'var(--green)')
                  : 'transparent',
                color: type === t ? '#fff' : 'var(--ink-2)',
              }}>
              {t === 'expense' ? 'Расход' : 'Доход'}
            </div>
          ))}
        </div>

        <label style={lbl}>Сумма</label>
        <input style={fi} placeholder="0" value={amount}
          onChange={e => setAmount(e.target.value.replace(/[^\d]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ' '))}/>

        <label style={{ ...lbl, marginTop: 14 }}>Категория</label>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 8, marginBottom: 14,
        }}>
          {cats.map(c => {
            const sel = cat && cat.name === c.name;
            return (
              <div key={c.name} onClick={() => setCat(c)} style={{
                padding: '14px 6px', borderRadius: 14,
                background: sel
                  ? (type === 'expense' ? 'var(--red-bg)' : 'var(--green-bg)')
                  : 'var(--bg)',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: 5, cursor: 'pointer',
                transition: 'all 120ms',
              }}>
                <div style={{ fontSize: 24 }}>{c.ic}</div>
                <div style={{
                  fontSize: 11, fontWeight: 600,
                  color: sel
                    ? (type === 'expense' ? 'var(--red)' : 'var(--green)')
                    : 'var(--ink)',
                  textAlign: 'center', lineHeight: 1.2,
                }}>{c.name}</div>
              </div>
            );
          })}
        </div>

        <label style={lbl}>Комментарий</label>
        <textarea style={{
          ...fi, fontSize: 14, fontFamily: 'var(--font-body)',
          fontWeight: 400, height: 70, resize: 'none', padding: 14,
        }} placeholder="Например: Недельная закупка"
          value={note} onChange={e => setNote(e.target.value)}/>

        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '12px 14px', background: '#fff',
          border: '1px solid var(--border)', borderRadius: 14,
          marginTop: 14, marginBottom: 16,
        }}>
          <div style={{ flex: 1, fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>
            Повторяющийся платёж
          </div>
          <Toggle on={recurring} onChange={setRec}/>
        </div>

        <button onClick={save} style={{
          width: '100%', padding: 16, borderRadius: 16, border: 'none',
          background: amount && cat ? 'var(--ink)' : 'var(--ink-3)',
          color: '#fff', cursor: amount && cat ? 'pointer' : 'not-allowed',
          fontFamily: 'var(--font-display)',
          fontSize: 13, fontWeight: 700,
          letterSpacing: 1.5, textTransform: 'uppercase',
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
   ANALYTICS SCREEN
   ═══════════════════════════════════════════════════════════ */
function AnalyticsScreen({ data, setTab }) {
  const { txs } = data;
  const [filter, setFilter] = useState('all');

  const expenses = txs.filter(t => t.type === 'expense');
  const byCat = {};
  expenses.forEach(t => { byCat[t.catName] = (byCat[t.catName] || 0) + t.amount; });
  const totalExp = Object.values(byCat).reduce((a, b) => a + b, 0) || 1;
  const cats = Object.entries(byCat)
    .map(([n, v]) => ({ name: n, value: v, pct: (v / totalExp) * 100 }))
    .sort((a, b) => b.value - a.value);
  const filtered = filter === 'all' ? txs
                  : filter === 'in' ? txs.filter(t => t.type === 'income')
                  : txs.filter(t => t.type === 'expense');

  return (
    <>
      <StatusBar/>
      <PageHeader title="Отчёты" action="Май"/>
      <div style={screenScroll}>
        <KpiStrip items={[
          { val: '+' + fmt(txs.filter(t=>t.type==='income').reduce((a,b)=>a+b.amount,0)), lab: 'Доход', tone: 'green' },
          { val: '−' + fmt(totalExp), lab: 'Расход', tone: 'red' },
          { val: '64%', lab: 'Норма', tone: 'amber' },
        ]}/>

        {/* By-category bars */}
        <div style={{
          background: '#fff', border: '1px solid var(--border)',
          borderRadius: 18, padding: 16, marginBottom: 10,
        }}>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 13, fontWeight: 700, color: 'var(--ink)',
            marginBottom: 12,
          }}>По категориям</div>
          {cats.length === 0 && (
            <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>Нет расходов в этом периоде.</div>
          )}
          {cats.map(c => {
            const tx = expenses.find(t => t.catName === c.name);
            return (
              <div key={c.name} style={{
                display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10,
              }}>
                <div style={{ fontSize: 18, width: 22, textAlign: 'center' }}>{tx ? tx.icon : '•'}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink)', width: 88 }}>{c.name}</div>
                <div style={{ flex: 1, height: 6, background: 'var(--border)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{
                    width: c.pct + '%', height: '100%',
                    background: c.pct > 30 ? 'var(--red)' : c.pct > 15 ? 'var(--amber)' : 'var(--green)',
                  }}/>
                </div>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 11, fontWeight: 700, color: 'var(--ink-2)',
                  width: 66, textAlign: 'right',
                  fontVariantNumeric: 'tabular-nums',
                }}>{fmt(c.value)}</div>
              </div>
            );
          })}
        </div>

        {/* Filter pills */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 10, overflowX: 'auto' }}>
          <Pill active={filter==='all'} onClick={() => setFilter('all')}>Все</Pill>
          <Pill active={filter==='in'}  onClick={() => setFilter('in')}>Доход</Pill>
          <Pill active={filter==='out'} onClick={() => setFilter('out')}>Расход</Pill>
          <Pill active={filter==='rec'} onClick={() => setFilter('rec')}>Повтор</Pill>
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
        background: 'linear-gradient(160deg, #1a0a3e, #2d1069, #1C1C1E)',
        padding: '20px 20px 0', position: 'relative', overflow: 'hidden',
        flexShrink: 0,
      }}>
        <div style={{
          position: 'absolute', top: -60, right: -60,
          width: 200, height: 200, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.25), transparent 70%)',
        }}/>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 10, fontWeight: 700,
          color: 'rgba(255,255,255,0.4)',
          letterSpacing: 2, textTransform: 'uppercase',
          marginBottom: 6, position: 'relative', zIndex: 1,
        }}>Уровень {level}</div>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 28, fontWeight: 800, color: '#fff',
          marginBottom: 12, letterSpacing: '-0.5px',
          position: 'relative', zIndex: 1,
        }}>{xp} XP</div>
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          borderRadius: 12, padding: '10px 12px',
          border: '1px solid rgba(255,255,255,0.06)',
          marginBottom: 14, position: 'relative', zIndex: 1,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 9, fontWeight: 700,
              color: 'rgba(255,255,255,0.4)', letterSpacing: 1,
            }}>До уровня {level + 1}</div>
            <div style={{ fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.4)' }}>
              <em style={{ color: '#F59E0B', fontStyle: 'normal' }}>{xp}</em> / 1000
            </div>
          </div>
          <div style={{ height: 5, background: 'rgba(255,255,255,0.07)', borderRadius: 3, overflow: 'hidden' }}>
            <div style={{
              width: Math.min(100, (xp / 1000) * 100) + '%', height: '100%',
              background: 'linear-gradient(90deg, #D97706, #F59E0B)', borderRadius: 3,
            }}/>
          </div>
        </div>
        {/* Section tabs */}
        <div style={{ display: 'flex', gap: 4, position: 'relative', zIndex: 1 }}>
          {[
            { id: 'xp',     l: 'История' },
            { id: 'badges', l: 'Награды' },
            { id: 'board',  l: 'Лидеры' },
          ].map(t => (
            <div key={t.id} onClick={() => setSection(t.id)} style={{
              flex: 1, padding: '10px 4px',
              borderRadius: '11px 11px 0 0',
              fontFamily: 'var(--font-display)',
              fontSize: 11, fontWeight: 700, textAlign: 'center',
              letterSpacing: 0.5, textTransform: 'uppercase',
              cursor: 'pointer',
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
              { ic: '🔥', l: 'Серия сохранена', sub: '14:32 · Streak ×' + streak, pts: 20 },
              { ic: '➕', l: 'Добавлена операция', sub: '14:32 · Продукты', pts: 10 },
              { ic: '📊', l: 'Открыта аналитика', sub: '13:10', pts: 5 },
              { ic: '🔥', l: 'Серия сохранена', sub: 'Вчера · Streak ×' + (streak - 1), pts: 20 },
              { ic: '➕', l: 'Добавлена операция', sub: 'Вчера · Зарплата', pts: 10 },
            ].map((r, i) => (
              <div key={i} style={{
                background: '#fff', borderRadius: 14,
                border: '1px solid var(--border)',
                padding: '12px 14px', marginBottom: 7,
                display: 'flex', alignItems: 'center', gap: 12,
              }}>
                <IconChip emoji={r.ic} tone="amber" size={34}/>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{r.l}</div>
                  <div style={{ fontSize: 10, color: 'var(--ink-3)', marginTop: 2 }}>{r.sub}</div>
                </div>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 13, fontWeight: 800, color: 'var(--amber)',
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
                { ic: '🔥', n: 'Серия 7', d: 'Неделя подряд', earned: true },
                { ic: '💎', n: 'Серия 30', d: 'Месяц подряд' },
                { ic: '🏆', n: 'Бережливый', d: '7 дней в бюджете', earned: true },
                { ic: '🎯', n: 'Точно', d: 'Точно по бюджету' },
                { ic: '📊', n: 'Аналитик', d: '10 отчётов' },
                { ic: '⭐', n: '1000 XP', d: 'Первая 1k' },
              ].map((b, i) => (
                <div key={i} style={{
                  background: b.earned ? '#fff' : 'var(--bg)',
                  border: '1px solid var(--border)', borderRadius: 14,
                  padding: '12px 8px', textAlign: 'center',
                  opacity: b.earned ? 1 : 0.55,
                }}>
                  <div style={{
                    fontSize: 28, marginBottom: 6,
                    filter: b.earned ? 'none' : 'grayscale(1)',
                  }}>{b.ic}</div>
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 11, fontWeight: 700,
                    color: b.earned ? 'var(--ink)' : 'var(--ink-3)',
                    lineHeight: 1.2, marginBottom: 2,
                  }}>{b.n}</div>
                  <div style={{ fontSize: 9, color: 'var(--ink-3)', lineHeight: 1.3 }}>{b.d}</div>
                  {b.earned && (
                    <div style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 8, fontWeight: 700, color: 'var(--green)',
                      letterSpacing: 0.5, marginTop: 5,
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
              { rank: 1, name: 'Шахзод', sub: '@shahzod_d',   pts: 1240, you: false },
              { rank: 2, name: 'Алишер', sub: '@alisherjon',  pts: 870,  you: true },
              { rank: 3, name: 'Дилшод', sub: '@dilshod',     pts: 820,  you: false },
              { rank: 4, name: 'Камиль', sub: '@kamil',       pts: 510,  you: false },
              { rank: 5, name: 'Зухра',  sub: '@zuhra_m',     pts: 460,  you: false },
            ].map(p => (
              <div key={p.rank} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                background: p.you ? 'var(--purple-bg)' : '#fff',
                border: '1px solid ' + (p.you ? '#E9D5FF' : 'var(--border)'),
                borderRadius: 14, padding: '11px 13px', marginBottom: 7,
              }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 13, fontWeight: 800,
                  color: p.you ? 'var(--purple)' : 'var(--ink-3)',
                  width: 20, textAlign: 'center',
                }}>{p.rank}</div>
                <div style={{
                  width: 34, height: 34, borderRadius: 11,
                  background: ['#F59E0B', 'var(--ink)', '#6B7280', 'var(--ink)', 'var(--ink)'][p.rank - 1],
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-display)',
                  fontSize: 13, fontWeight: 800, color: '#fff',
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
                    fontFamily: 'var(--font-display)',
                    fontSize: 14, fontWeight: 800,
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
      {/* Hero */}
      <div style={{
        background: 'var(--ink-dark)', padding: '18px 20px 0',
        position: 'relative', overflow: 'hidden', flexShrink: 0,
      }}>
        <div style={{
          position: 'absolute', top: -50, right: -50,
          width: 180, height: 180, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245,158,11,0.08), transparent 70%)',
        }}/>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'flex-start', marginBottom: 14, position: 'relative', zIndex: 1,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 58, height: 58, borderRadius: 18,
              background: '#2C2C2E', border: '2px solid #3C3C3E',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-display)',
              fontSize: 22, fontWeight: 800, color: '#fff', position: 'relative',
            }}>
              {name[0]}
              <div style={{
                position: 'absolute', bottom: -6, left: '50%',
                transform: 'translateX(-50%)',
                background: 'linear-gradient(90deg, #D97706, #F59E0B)',
                color: '#1C1C1E', fontFamily: 'var(--font-display)',
                fontSize: 8, fontWeight: 800,
                padding: '2px 6px', borderRadius: 5,
                border: '1.5px solid var(--ink-dark)', whiteSpace: 'nowrap',
              }}>LVL {level}</div>
            </div>
            <div>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 20, fontWeight: 800, color: '#fff',
                marginBottom: 3,
              }}>{name}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>@alisherjon</div>
            </div>
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 9, padding: '6px 12px',
            fontFamily: 'var(--font-display)',
            fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.5)',
            letterSpacing: 1, textTransform: 'uppercase',
            cursor: 'pointer',
          }}>Изм.</div>
        </div>
        {/* Stats strip */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1px 1fr 1px 1fr',
          background: 'rgba(255,255,255,0.04)',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          padding: '12px 0', position: 'relative', zIndex: 1,
        }}>
          <PhStat val={streak} lab="Серия" tone="amber"/>
          <div style={{ background: 'rgba(255,255,255,0.06)' }}/>
          <PhStat val={xp} lab="XP" tone="green"/>
          <div style={{ background: 'rgba(255,255,255,0.06)' }}/>
          <PhStat val={'LVL ' + level} lab="Уровень" tone="purple"/>
        </div>
      </div>

      <div style={{ ...screenScroll, paddingTop: 14 }}>
        <SectionHeading title="Настройки"/>
        <div style={{
          background: '#fff', borderRadius: 18,
          border: '1px solid var(--border)', overflow: 'hidden',
          marginBottom: 12,
        }}>
          <SRow ic="🔔" tone="amber" label="Уведомления" sub="Напоминания добавлять операции"
            right={<Toggle on={notifs} onChange={setNotifs}/>}/>
          <SRow ic="🌙" tone="purple" label="Тёмная тема" sub="Скоро"
            right={<Toggle on={dark} onChange={setDark}/>}/>
          <SRow ic="💱" tone="green"  label="Валюта" sub="UZS · сум" right={<span style={chev}>›</span>}/>
          <SRow ic="🗂" tone="blue"   label="Категории" sub="10 категорий" right={<span style={chev}>›</span>}/>
        </div>

        <SectionHeading title="Аккаунт"/>
        <div style={{
          background: '#fff', borderRadius: 18,
          border: '1px solid var(--border)', overflow: 'hidden',
          marginBottom: 12,
        }}>
          <SRow ic="📥" tone="blue"  label="Экспорт CSV"  right={<span style={chev}>›</span>}/>
          <SRow ic="💬" tone="green" label="Поддержка"    sub="Telegram · @finly_help" right={<span style={chev}>›</span>}/>
          <SRow ic="📜" tone="gray"  label="О приложении" sub="Версия 1.0.4" right={<span style={chev}>›</span>}/>
        </div>

        <button style={{
          width: '100%', padding: 14, borderRadius: 14,
          background: 'var(--red-bg)', border: '1px solid var(--red-mid)',
          color: 'var(--red)', cursor: 'pointer',
          fontFamily: 'var(--font-display)',
          fontSize: 12, fontWeight: 700,
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
        fontFamily: 'var(--font-display)',
        fontSize: 14, fontWeight: 800, color: colors[tone] || '#fff',
      }}>{val}</div>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: 9, fontWeight: 700,
        color: 'rgba(255,255,255,0.4)',
        letterSpacing: 0.5, textTransform: 'uppercase', marginTop: 3,
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
