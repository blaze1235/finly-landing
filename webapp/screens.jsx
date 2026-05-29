/* eslint-disable */
/* Five core screens — faithfully matching the real Finly app design. */

const scr  = { flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' };
const scrl = { flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' };

/* ═══════════════════════════════════════════════════════════
   HOME SCREEN
   ═══════════════════════════════════════════════════════════ */
function HomeScreen({ data, setTab, onTxTap }) {
  const { txs, streak, name = 'Алишер' } = data;
  const income  = txs.filter(t => t.type === 'income').reduce((a, b) => a + b.amount, 0);
  const expense = txs.filter(t => t.type === 'expense').reduce((a, b) => a + b.amount, 0);
  const balance = income - expense;
  const d    = new Date();
  const days = ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'];
  const mons = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
  const hr = d.getHours();
  const greet = hr < 12 ? 'ДОБРОЕ УТРО' : hr < 17 ? 'ДОБРЫЙ ДЕНЬ' : 'ДОБРЫЙ ВЕЧЕР';

  return (
    <div style={scr}>
      <StatusBar dark bg="#111318"/>
      <div style={{ ...scrl, padding: '4px 16px 0' }}>
        {/* Dark hero card */}
        <div style={{
          background: '#111318', borderRadius: 24,
          padding: '12px 20px 16px', marginBottom: 10,
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: -50, right: -50,
            width: 150, height: 150, borderRadius: '50%',
            background: 'rgba(255,255,255,.03)',
          }}/>
          {/* Greeting + avatar */}
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'flex-start', marginBottom: 18, position: 'relative',
          }}>
            <div>
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: 9, fontWeight: 700,
                color: 'rgba(255,255,255,.35)', letterSpacing: 2,
                textTransform: 'uppercase', marginBottom: 3,
              }}>{greet}</div>
              <div style={{ fontSize: 17, fontWeight: 700, color: '#fff' }}>{name}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,.3)', marginTop: 1 }}>
                {days[d.getDay()]}, {d.getDate()} {mons[d.getMonth()]}
              </div>
            </div>
            <div style={{
              width: 42, height: 42, borderRadius: 14,
              background: 'rgba(255,255,255,.1)', color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 800, flexShrink: 0,
            }}>{name[0]}</div>
          </div>
          {/* Balance */}
          <div style={{ marginBottom: 18, position: 'relative' }}>
            <div style={{
              fontFamily: 'var(--font-display)', fontSize: 9, fontWeight: 700,
              color: 'rgba(255,255,255,.3)', letterSpacing: 2,
              textTransform: 'uppercase', marginBottom: 5,
            }}>ОБЩИЙ БАЛАНС</div>
            <div style={{
              fontFamily: 'var(--font-display)', fontSize: 38, fontWeight: 800,
              color: '#fff', lineHeight: 1.1,
            }}>{fmt(Math.abs(balance))}</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,.35)', marginTop: 4 }}>
              {balance < 0 ? '−  ' : ''}сум
            </div>
          </div>
          {/* Income / Expense sub-cards */}
          <div style={{ display: 'flex', gap: 8, position: 'relative' }}>
            <div style={{ flex: 1, background: 'rgba(74,222,128,.1)', borderRadius: 14, padding: '12px 14px' }}>
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: 9, fontWeight: 700,
                color: 'rgba(74,222,128,.6)', letterSpacing: 1.5,
                textTransform: 'uppercase', marginBottom: 4,
              }}>ДОХОД</div>
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: 18,
                fontWeight: 800, color: '#4ADE80',
              }}>{fmt(income)}</div>
            </div>
            <div style={{ flex: 1, background: 'rgba(248,113,113,.1)', borderRadius: 14, padding: '12px 14px' }}>
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: 9, fontWeight: 700,
                color: 'rgba(248,113,113,.6)', letterSpacing: 1.5,
                textTransform: 'uppercase', marginBottom: 4,
              }}>РАСХОД</div>
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: 18,
                fontWeight: 800, color: '#F87171',
              }}>{fmt(expense)}</div>
            </div>
          </div>
        </div>

        <StreakBanner streak={streak}/>

        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', marginBottom: 10,
        }}>
          <div style={{
            fontFamily: 'var(--font-display)', fontSize: 16,
            fontWeight: 800, color: 'var(--ink)',
          }}>Последнее</div>
          <div onClick={() => setTab('analytics')} style={{
            fontSize: 12, color: 'var(--ink-3)', cursor: 'pointer', fontWeight: 600,
          }}>Все →</div>
        </div>

        {txs.slice(0, 3).map(tx => <TxCard key={tx.id} tx={tx} onTap={onTxTap}/>)}
        <div style={{ height: 16 }}/>
      </div>

      {/* Fixed bottom button */}
      <div style={{ padding: '0 16px 10px', flexShrink: 0 }}>
        <div onClick={() => setTab('add')} style={{
          background: '#111318', color: '#fff', borderRadius: 16,
          padding: 16, fontFamily: 'var(--font-display)',
          fontSize: 14, fontWeight: 700, letterSpacing: 1.5,
          textTransform: 'uppercase', textAlign: 'center', cursor: 'pointer',
        }}>+ НОВАЯ ЗАПИСЬ</div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   ADD SCREEN
   ═══════════════════════════════════════════════════════════ */
const EXP_CATS = [
  { ic: '🛒', name: 'Продукты' },  { ic: '🏠', name: 'Жильё' },
  { ic: '🚌', name: 'Транспорт' }, { ic: '🍕', name: 'Кафе' },
  { ic: '💊', name: 'Здоровье' },  { ic: '🎬', name: 'Развлечения' },
  { ic: '👕', name: 'Одежда' },    { ic: '📚', name: 'Образование' },
  { ic: '🤷', name: 'Забыл' },     { ic: '•••', name: 'Прочее' },
];
const INC_CATS = [
  { ic: '💼', name: 'Зарплата' },   { ic: '💹', name: 'Подработка' },
  { ic: '🏦', name: 'Инвестиции' }, { ic: '🎁', name: 'Подарок' },
];

function AddScreen({ data, setData, setTab }) {
  const [type, setType]         = useState('expense');
  const [amount, setAmount]     = useState('');
  const [currency, setCurrency] = useState('UZS');
  const [usdRate, setUsdRate]   = useState('12700');
  const [cat, setCat]           = useState(null);
  const [note, setNote]         = useState('');
  const [recurring, setRec]     = useState(false);
  const [draftMsg, setDraftMsg] = useState(false);
  const cats    = type === 'expense' ? EXP_CATS : INC_CATS;
  const canSave = amount.trim() && cat;
  const isExp   = type === 'expense';

  function save() {
    if (!canSave) return;
    const raw      = parseInt(amount.replace(/\D/g, '')) || 0;
    const finalAmt = currency === '$' ? raw * (parseInt(usdRate.replace(/\D/g, '')) || 12700) : raw;
    const tx = {
      id: Date.now(), type,
      cat: cat.ic, catName: cat.name,
      note: note || cat.name,
      amount: finalAmt,
      dateStr: today(), time: nowTime(),
      currency, recurring,
    };
    setData(d => ({ ...d, txs: [tx, ...d.txs], xp: d.xp + 10 }));
    setTab('home');
  }

  function draft() {
    if (!amount.trim()) return;
    const raw = parseInt(amount.replace(/\D/g, '')) || 0;
    const dr  = {
      id: Date.now(), type,
      cat: cat?.ic || '❓', catName: cat?.name || 'Без категории',
      note, amount: raw, dateStr: today(), time: nowTime(),
      currency, isDraft: true,
    };
    setData(d => ({ ...d, drafts: [dr, ...(d.drafts || [])] }));
    setDraftMsg(true); setTimeout(() => setDraftMsg(false), 2200);
    setAmount(''); setCat(null); setNote('');
  }

  return (
    <div style={scr}>
      {/* Page header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '8px 20px 14px', background: 'var(--bg)', flexShrink: 0,
      }}>
        <div onClick={() => setTab('home')} style={{
          fontSize: 22, cursor: 'pointer', color: 'var(--ink)',
          width: 36, height: 36, display: 'flex', alignItems: 'center',
          justifyContent: 'center', borderRadius: 10, background: 'var(--bg)',
        }}>←</div>
        <div style={{
          fontFamily: 'var(--font-display)', fontSize: 19,
          fontWeight: 800, color: 'var(--ink)', flex: 1,
        }}>Новая запись</div>
        <div style={{
          fontSize: 12, fontWeight: 700, color: 'var(--ink-2)',
          cursor: 'pointer', padding: '8px 12px', borderRadius: 10,
          background: 'var(--bg)', position: 'relative',
        }}>
          Черновики
          {(data.drafts?.length > 0) && (
            <div style={{
              position: 'absolute', top: -3, right: -3,
              width: 8, height: 8, borderRadius: '50%',
              background: 'var(--red)', border: '2px solid var(--bg)',
            }}/>
          )}
        </div>
      </div>

      {draftMsg && (
        <div style={{
          margin: '0 16px 8px', flexShrink: 0,
          background: 'var(--amber-bg)', borderRadius: 12,
          padding: '10px 14px', fontSize: 13, fontWeight: 700,
          color: 'var(--amber)',
        }}>✓ Черновик сохранён</div>
      )}

      <div style={{ ...scrl, padding: '0 16px' }}>
        <div style={{ background: '#fff', borderRadius: 20, padding: 18, marginBottom: 8 }}>
          {/* Type row */}
          <div style={{
            display: 'flex', gap: 5, marginBottom: 16,
            background: 'var(--bg)', borderRadius: 14, padding: 4,
          }}>
            {['expense', 'income'].map(t => (
              <div key={t} onClick={() => { setType(t); setCat(null); }} style={{
                flex: 1, padding: '12px 6px', borderRadius: 11,
                fontFamily: 'var(--font-display)', fontSize: 13,
                fontWeight: 700, textAlign: 'center', cursor: 'pointer',
                background: type === t ? (t === 'expense' ? 'var(--red)' : 'var(--green)') : 'transparent',
                color: type === t ? '#fff' : 'var(--ink-2)',
              }}>{t === 'expense' ? 'Расход' : 'Доход'}</div>
            ))}
          </div>

          {/* Amount + currency */}
          <label style={lbl}>СУММА</label>
          <div style={{ display: 'flex', gap: 8, marginBottom: 14, alignItems: 'center' }}>
            <div style={{
              display: 'flex', background: '#F0F0F2',
              borderRadius: 12, padding: 3, flexShrink: 0,
            }}>
              {['$', 'UZS'].map(c => (
                <div key={c} onClick={() => setCurrency(c)} style={{
                  padding: '10px 14px', borderRadius: 10,
                  fontFamily: 'var(--font-display)', fontSize: 14,
                  fontWeight: 700, cursor: 'pointer',
                  background: currency === c ? '#111318' : 'transparent',
                  color: currency === c ? '#fff' : 'var(--ink-2)',
                }}>{c}</div>
              ))}
            </div>
            <input
              style={{
                flex: 1, background: 'var(--bg)', border: 'none',
                borderRadius: 14, padding: '14px 16px',
                fontFamily: 'var(--font-display)', fontSize: 26,
                fontWeight: 700, color: 'var(--ink)', outline: 'none',
              }}
              placeholder="0"
              inputMode="numeric"
              value={amount}
              onChange={e => setAmount(e.target.value)}
            />
          </div>

          {currency === '$' && (
            <div style={{ marginBottom: 14 }}>
              <label style={lbl}>КУРС (1$ = ? СУМ)</label>
              <input style={{
                width: '100%', background: 'var(--bg)', border: 'none',
                borderRadius: 14, padding: '14px 16px',
                fontFamily: 'var(--font-display)', fontSize: 15,
                fontWeight: 600, color: 'var(--ink)', outline: 'none',
                boxSizing: 'border-box',
              }} value={usdRate} inputMode="numeric" onChange={e => setUsdRate(e.target.value)}/>
            </div>
          )}

          {/* Category grid */}
          <label style={lbl}>КАТЕГОРИЯ</label>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 8, marginBottom: 16,
          }}>
            {cats.map(c => {
              const sel = cat?.name === c.name;
              return (
                <div key={c.name} onClick={() => setCat(c)} style={{
                  padding: '14px 6px', borderRadius: 14,
                  background: sel ? (isExp ? 'var(--red-bg)' : 'var(--green-bg)') : 'var(--bg)',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', gap: 5, cursor: 'pointer',
                }}>
                  <div style={{ fontSize: 24 }}>{c.ic}</div>
                  <div style={{
                    fontSize: 11, fontWeight: 600, textAlign: 'center', lineHeight: 1.2,
                    color: sel ? (isExp ? 'var(--red)' : 'var(--green)') : 'var(--ink)',
                  }}>{c.name}</div>
                </div>
              );
            })}
          </div>

          {/* Note */}
          <label style={lbl}>ПРИМЕЧАНИЕ</label>
          <textarea style={{
            width: '100%', background: 'var(--bg)', border: 'none',
            borderRadius: 14, padding: '14px 16px', marginBottom: 12,
            fontFamily: 'var(--font-body)', fontSize: 14,
            resize: 'none', height: 70, color: 'var(--ink)',
            outline: 'none', boxSizing: 'border-box',
          }} placeholder="Необязательно..." value={note} onChange={e => setNote(e.target.value)}/>

          {/* Recurring */}
          <div style={{
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', padding: '12px 0', marginBottom: 10,
          }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>Повторяющаяся</div>
              <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 2 }}>Добавлять каждый месяц</div>
            </div>
            <Toggle on={recurring} onChange={setRec}/>
          </div>

          {/* XP hint */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '10px 12px', background: 'rgba(245,158,11,.06)',
            borderRadius: 12, marginBottom: 16,
          }}>
            <div style={{ fontSize: 18 }}>⭐</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--amber)' }}>
              +10 XP за запись · серия продолжается
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: 10 }}>
            <div onClick={draft} style={{
              flex: 1, padding: 16, borderRadius: 16,
              background: '#F0F0F2', color: 'var(--ink)',
              fontFamily: 'var(--font-display)', fontSize: 12,
              fontWeight: 700, letterSpacing: 1.5,
              textTransform: 'uppercase', textAlign: 'center', cursor: 'pointer',
            }}>Черновик</div>
            <div onClick={save} style={{
              flex: 2, padding: 16, borderRadius: 16,
              background: canSave ? '#111318' : 'var(--border)',
              color: canSave ? '#fff' : 'var(--ink-3)',
              fontFamily: 'var(--font-display)', fontSize: 12,
              fontWeight: 700, letterSpacing: 1.5,
              textTransform: 'uppercase', textAlign: 'center',
              cursor: canSave ? 'pointer' : 'default',
            }}>Сохранить</div>
          </div>
        </div>
        <div style={{ height: 20 }}/>
      </div>
    </div>
  );
}
const lbl = {
  fontFamily: 'var(--font-display)', fontSize: 10, fontWeight: 700,
  color: 'var(--ink-3)', letterSpacing: 1.5,
  textTransform: 'uppercase', marginBottom: 7, display: 'block',
};

/* ═══════════════════════════════════════════════════════════
   ANALYTICS SCREEN
   ═══════════════════════════════════════════════════════════ */
function AnalyticsScreen({ data }) {
  const { txs } = data;
  const [search, setSearch]         = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selCats, setSelCats]       = useState([]);

  const monthsMap = {};
  txs.forEach(t => { if (t.dateStr) monthsMap[t.dateStr.slice(0, 7)] = true; });
  const availMonths = Object.keys(monthsMap).sort().reverse();
  const MONTH_RU    = ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'];
  const fmtMonth    = ym => { const [y, m] = ym.split('-'); return MONTH_RU[parseInt(m) - 1] + ' ' + y; };
  const curYM       = new Date().getFullYear() + '-' + String(new Date().getMonth() + 1).padStart(2, '0');
  const defMonth    = availMonths.length > 0 ? (availMonths.includes(curYM) ? curYM : availMonths[0]) : curYM;
  const [selMonth, setSelMonth] = useState(defMonth);

  const [mY, mM] = [parseInt(selMonth.slice(0, 4)), parseInt(selMonth.slice(5, 7))];
  const lastDay  = new Date(mY, mM, 0).getDate();
  const dateFrom = selMonth + '-01';
  const dateTo   = selMonth + '-' + String(lastDay).padStart(2, '0');

  const catIcons = {};
  txs.forEach(t => { catIcons[t.catName] = t.cat; });
  const allCats = [...new Set(txs.filter(t => filterType === 'all' || t.type === filterType).map(t => t.catName))];

  const filtered = txs.filter(t => {
    if (filterType !== 'all' && t.type !== filterType) return false;
    if (selCats.length > 0 && !selCats.includes(t.catName)) return false;
    if (search && !(t.catName.toLowerCase().includes(search.toLowerCase()) || (t.note || '').toLowerCase().includes(search.toLowerCase()))) return false;
    if (t.dateStr < dateFrom || t.dateStr > dateTo) return false;
    return true;
  }).sort((a, b) => b.dateStr.localeCompare(a.dateStr) || b.time.localeCompare(a.time));

  const income  = filtered.filter(t => t.type === 'income').reduce((a, b) => a + b.amount, 0);
  const expense = filtered.filter(t => t.type === 'expense').reduce((a, b) => a + b.amount, 0);
  const catMap  = {};
  filtered.filter(t => t.type === 'expense').forEach(t => { catMap[t.catName] = (catMap[t.catName] || 0) + t.amount; });
  const catRows = Object.entries(catMap).sort((a, b) => b[1] - a[1]);
  const maxCat  = catRows[0]?.[1] || 1;

  function selectType(ft)  { setFilterType(ft); setSelCats([]); }
  function selectMonth(ym) { setSelMonth(ym);   setSelCats([]); }

  const pillBase = { padding: '8px 16px', borderRadius: 999, fontSize: 11, fontWeight: 700, flexShrink: 0, cursor: 'pointer', transition: 'all .12s' };

  return (
    <div style={scr}>
      <StatusBar/>
      <div style={{ display: 'flex', alignItems: 'center', padding: '6px 20px 12px', background: 'var(--bg)', flexShrink: 0 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, color: 'var(--ink)' }}>Аналитика</div>
      </div>

      {availMonths.length > 0 && (
        <div style={{ display: 'flex', gap: 6, overflowX: 'auto', padding: '0 16px 10px', flexShrink: 0, scrollbarWidth: 'none' }}>
          {availMonths.map(ym => (
            <div key={ym} onClick={() => selectMonth(ym)} style={{
              ...pillBase, whiteSpace: 'nowrap',
              background: selMonth === ym ? '#111318' : '#fff',
              color: selMonth === ym ? '#fff' : 'var(--ink-2)',
            }}>{fmtMonth(ym)}</div>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', gap: 6, overflowX: 'auto', padding: '0 16px 10px', flexShrink: 0, scrollbarWidth: 'none' }}>
        {[{ id: 'all', l: 'Все' }, { id: 'expense', l: 'Расходы' }, { id: 'income', l: 'Доходы' }].map(({ id, l }) => (
          <div key={id} onClick={() => selectType(id)} style={{
            ...pillBase,
            background: filterType === id ? '#111318' : '#ECEEF2',
            color: filterType === id ? '#fff' : 'var(--ink-2)',
          }}>{l}</div>
        ))}
      </div>

      {allCats.length > 0 && (
        <div style={{ display: 'flex', gap: 6, overflowX: 'auto', padding: '0 16px 10px', flexShrink: 0, scrollbarWidth: 'none' }}>
          {allCats.map(name => (
            <div key={name} onClick={() => setSelCats(p => p.includes(name) ? p.filter(c => c !== name) : [...p, name])} style={{
              ...pillBase, display: 'flex', alignItems: 'center', gap: 4,
              background: selCats.includes(name) ? '#111318' : '#fff',
              color: selCats.includes(name) ? '#fff' : 'var(--ink-2)',
            }}>{(catIcons[name] || '') + ' ' + name}</div>
          ))}
        </div>
      )}

      <div style={{ padding: '0 16px 8px', flexShrink: 0 }}>
        <input style={{
          width: '100%', border: 'none', borderRadius: 14,
          padding: '12px 16px', fontSize: 14,
          fontFamily: 'var(--font-body)', color: 'var(--ink)',
          background: 'var(--bg)', outline: 'none', boxSizing: 'border-box',
        }} placeholder="🔍  Поиск..." value={search} onChange={e => setSearch(e.target.value)}/>
      </div>

      <div style={{ ...scrl, padding: '0 16px' }}>
        {/* KPI row */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1px 1fr 1px 1fr',
          background: '#fff', borderRadius: 18, marginBottom: 12, overflow: 'hidden',
        }}>
          <div style={{ textAlign: 'center', padding: '18px 4px' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 800, color: 'var(--red)' }}>{fmt(expense)}</div>
            <div style={{ fontSize: 9, fontWeight: 700, color: 'var(--ink-3)', letterSpacing: .5, textTransform: 'uppercase', marginTop: 3 }}>Расходы</div>
          </div>
          <div style={{ background: 'var(--border)' }}/>
          <div style={{ textAlign: 'center', padding: '18px 4px' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 800, color: 'var(--ink)' }}>{filtered.length}</div>
            <div style={{ fontSize: 9, fontWeight: 700, color: 'var(--ink-3)', letterSpacing: .5, textTransform: 'uppercase', marginTop: 3 }}>Операций</div>
          </div>
          <div style={{ background: 'var(--border)' }}/>
          <div style={{ textAlign: 'center', padding: '18px 4px' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 800, color: 'var(--green)' }}>{fmt(income)}</div>
            <div style={{ fontSize: 9, fontWeight: 700, color: 'var(--ink-3)', letterSpacing: .5, textTransform: 'uppercase', marginTop: 3 }}>Доход</div>
          </div>
        </div>

        {catRows.length > 0 && (
          <div style={{ background: '#fff', borderRadius: 18, padding: 16, marginBottom: 10 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 800, color: 'var(--ink)', marginBottom: 14 }}>По категориям</div>
            {catRows.map(([name, amt]) => (
              <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <div style={{ fontSize: 18, width: 26, textAlign: 'center', flexShrink: 0 }}>{catIcons[name] || '·'}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink)', width: 76, flexShrink: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</div>
                <div style={{ flex: 1, height: 6, background: 'var(--border)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ width: Math.round(amt / maxCat * 100) + '%', height: '100%', background: 'var(--red)', borderRadius: 3 }}/>
                </div>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-2)', width: 72, textAlign: 'right', flexShrink: 0 }}>{fmt(amt)}</div>
              </div>
            ))}
          </div>
        )}

        <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 800, color: 'var(--ink)', marginBottom: 10 }}>
          Операции ({filtered.length})
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <div style={{ fontSize: 44, marginBottom: 12 }}>📭</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 800, color: 'var(--ink)', marginBottom: 4 }}>
              {txs.length === 0 ? 'Нет записей' : 'Нет операций'}
            </div>
            <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>
              {txs.length === 0 ? 'Добавьте первую запись' : 'За этот период ничего нет'}
            </div>
          </div>
        ) : filtered.map(tx => <TxCard key={tx.id} tx={tx}/>)}
        <div style={{ height: 20 }}/>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   REWARDS SCREEN
   ═══════════════════════════════════════════════════════════ */
function RewardsScreen({ data }) {
  const [section, setSection] = useState('badges');
  const { streak, xp, level, achievements = [] } = data;
  const xpNext = level * 500;
  const tabs = [{ id: 'badges', l: 'Значки' }, { id: 'leaderboard', l: 'Рейтинг' }, { id: 'xp', l: 'Очки' }];

  return (
    <div style={scr}>
      <StatusBar dark bg="#1a0a3e"/>
      <div style={{
        background: 'linear-gradient(160deg, #1a0a3e, #2d1069, #1C1C1E)',
        padding: '4px 20px 0', position: 'relative', overflow: 'hidden', flexShrink: 0,
      }}>
        <div style={{
          position: 'absolute', top: -60, right: -60, width: 200, height: 200,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,.25), transparent 70%)',
        }}/>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            fontFamily: 'var(--font-display)', fontSize: 10, fontWeight: 700,
            color: 'rgba(255,255,255,.3)', letterSpacing: 2,
            textTransform: 'uppercase', marginBottom: 4,
          }}>ВСЕГО ОЧКОВ</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
            <div style={{
              fontFamily: 'var(--font-display)', fontSize: 44,
              fontWeight: 800, color: '#F59E0B', lineHeight: 1,
            }}>{fmt(xp)}</div>
            <div style={{
              fontFamily: 'var(--font-display)', fontSize: 18,
              fontWeight: 700, color: 'rgba(245,158,11,.5)',
            }}>XP</div>
          </div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,.4)', marginBottom: 14 }}>
            Gold Analyst · Уровень {level}
          </div>

          {/* Stats grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1px 1fr 1px 1fr', marginBottom: 14 }}>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 800, color: '#fff' }}>+120</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,.3)', letterSpacing: 1, textTransform: 'uppercase', marginTop: 2 }}>Сегодня</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,.1)' }}/>
            <div style={{ paddingLeft: 12 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 800, color: '#fff' }}>+840</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,.3)', letterSpacing: 1, textTransform: 'uppercase', marginTop: 2 }}>Эта неделя</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,.1)' }}/>
            <div style={{ paddingLeft: 12 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 800, color: '#F59E0B' }}>+{fmt(xp)}</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,.3)', letterSpacing: 1, textTransform: 'uppercase', marginTop: 2 }}>Этот месяц</div>
            </div>
          </div>

          {/* XP bar */}
          <div style={{
            background: 'rgba(255,255,255,.06)', borderRadius: 12,
            padding: '10px 12px', marginBottom: 14,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,.4)', letterSpacing: 1 }}>Уровень {level} → {level + 1}</div>
              <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,.3)' }}>
                <span style={{ color: '#F59E0B' }}>{fmt(xp)}</span> / {fmt(xpNext)}
              </div>
            </div>
            <div style={{ height: 6, background: 'rgba(255,255,255,.07)', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{
                width: Math.min(Math.round(xp / xpNext * 100), 100) + '%',
                height: '100%', borderRadius: 3,
                background: 'linear-gradient(90deg, #D97706, #F59E0B)',
              }}/>
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: 4 }}>
            {tabs.map(t => (
              <div key={t.id} onClick={() => setSection(t.id)} style={{
                flex: 1, padding: '10px 4px', borderRadius: '12px 12px 0 0',
                fontFamily: 'var(--font-display)', fontSize: 10, fontWeight: 700,
                textAlign: 'center', textTransform: 'uppercase', cursor: 'pointer',
                background: section === t.id ? 'var(--bg)' : 'transparent',
                color: section === t.id ? 'var(--ink)' : 'rgba(255,255,255,.4)',
              }}>{t.l}</div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ ...scrl, padding: '12px 16px 0' }}>
        {section === 'badges'      && <BadgesSection achievements={achievements}/>}
        {section === 'leaderboard' && <LeaderboardSection/>}
        {section === 'xp'          && <XpSection xp={xp} streak={streak}/>}
        <div style={{ height: 20 }}/>
      </div>
    </div>
  );
}

function BadgesSection({ achievements }) {
  const earned = achievements.filter(a => a.earned);
  const inProg = achievements.filter(a => !a.earned);
  const eyebrow = { fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 700, color: 'var(--ink-3)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 };
  const grid    = { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 16 };
  return (
    <>
      {earned.length > 0 && (
        <>
          <div style={eyebrow}>ПОЛУЧЕНО</div>
          <div style={grid}>
            {earned.map(a => (
              <div key={a.id} style={{ background: '#fff', borderRadius: 16, padding: '12px 8px', textAlign: 'center' }}>
                <div style={{ width: 48, height: 48, borderRadius: 15, background: a.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, margin: '0 auto 8px' }}>{a.icon}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 700, color: 'var(--ink)', lineHeight: 1.2, marginBottom: 2 }}>{a.name}</div>
                <div style={{ fontSize: 10, color: 'var(--ink-3)' }}>{a.desc}</div>
                <div style={{ fontSize: 9, fontWeight: 700, color: 'var(--green)', marginTop: 4 }}>✓ {a.date}</div>
                <div style={{ marginTop: 4, background: 'var(--amber-bg)', color: 'var(--amber)', fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 6, display: 'inline-block' }}>+{a.xp} XP</div>
              </div>
            ))}
          </div>
        </>
      )}
      {inProg.length > 0 && (
        <>
          <div style={eyebrow}>В ПРОЦЕССЕ</div>
          <div style={grid}>
            {inProg.map(a => (
              <div key={a.id} style={{ background: a.locked ? 'var(--bg)' : '#fff', borderRadius: 16, padding: '12px 8px', textAlign: 'center' }}>
                <div style={{ width: 48, height: 48, borderRadius: 15, background: a.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, margin: '0 auto 8px', filter: a.locked ? 'grayscale(1)' : 'none', opacity: a.locked ? 0.3 : 1 }}>{a.icon}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 700, color: a.locked ? 'var(--ink-3)' : 'var(--ink)', lineHeight: 1.2, marginBottom: 2 }}>{a.name}</div>
                <div style={{ fontSize: 10, color: 'var(--ink-3)' }}>{a.desc}</div>
                {!a.locked && a.progress != null && (
                  <div style={{ marginTop: 6 }}>
                    <div style={{ height: 4, background: 'var(--border)', borderRadius: 2, overflow: 'hidden' }}>
                      <div style={{ width: a.progress + '%', height: '100%', background: 'var(--amber)', borderRadius: 2 }}/>
                    </div>
                    <div style={{ fontSize: 9, color: 'var(--ink-3)', marginTop: 3 }}>{a.label}</div>
                  </div>
                )}
                <div style={{ marginTop: 4, background: a.locked ? 'var(--bg)' : 'var(--amber-bg)', color: a.locked ? 'var(--ink-3)' : 'var(--amber)', fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 6, display: 'inline-block' }}>+{a.xp} XP</div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}

const LB_ROWS = [
  { rank: 1, name: 'Шахзод', xp: 1240, level: 5, streak: 14 },
  { rank: 2, name: 'Алишер', xp: 870,  level: 4, streak: 12, is_you: true },
  { rank: 3, name: 'Дилшод', xp: 820,  level: 4, streak: 8  },
  { rank: 4, name: 'Камиль', xp: 510,  level: 3, streak: 5  },
  { rank: 5, name: 'Зухра',  xp: 460,  level: 3, streak: 3  },
];
const LB_COLORS = ['#D97706','#2563EB','#374151','#059669','#7C3AED'];

function LeaderboardSection() {
  const rows     = LB_ROWS;
  const top3     = rows.slice(0, 3);
  const podium   = [top3[1], top3[0], top3[2]].filter(Boolean);
  const hMap     = { 1: 50, 2: 36, 3: 26 };

  return (
    <>
      <div style={{ background: '#1C1C1E', borderRadius: 20, padding: '16px 14px 0', marginBottom: 10, overflow: 'hidden' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,.25)', letterSpacing: 2, textTransform: 'uppercase', textAlign: 'center', marginBottom: 16 }}>Рейтинг · Все время</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 10 }}>
          {podium.map(f => {
            const isFirst = f.rank === 1;
            const color   = LB_COLORS[(f.rank - 1) % LB_COLORS.length];
            const h_      = hMap[f.rank] || 26;
            return (
              <div key={f.rank} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {isFirst ? (
                  <div style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', fontSize: 14 }}>👑</div>
                    <div style={{
                      width: 52, height: 52, borderRadius: 18,
                      background: f.is_you ? '#7C3AED' : color,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800, color: '#fff',
                      marginBottom: 6, boxShadow: '0 0 0 2px #F59E0B, 0 4px 16px rgba(245,158,11,.3)',
                    }}>{f.name[0]}</div>
                  </div>
                ) : (
                  <div style={{
                    width: 44, height: 44, borderRadius: 14,
                    background: f.is_you ? '#7C3AED' : color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 800, color: '#fff', marginBottom: 6,
                  }}>{f.name[0]}</div>
                )}
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 700, color: '#fff', marginBottom: 2 }}>{f.is_you ? 'Вы' : f.name}</div>
                <div style={{ fontSize: 10, color: isFirst ? '#F59E0B' : 'rgba(255,255,255,.35)', marginBottom: 6 }}>{fmt(f.xp)} XP</div>
                <div style={{
                  borderRadius: '9px 9px 0 0', width: 84, height: h_,
                  background: isFirst ? 'rgba(245,158,11,.12)' : 'rgba(255,255,255,.05)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 800,
                  color: isFirst ? '#F59E0B' : 'rgba(255,255,255,.25)',
                }}>{f.rank}</div>
              </div>
            );
          })}
        </div>
      </div>
      {rows.map(f => {
        const color = LB_COLORS[(f.rank - 1) % LB_COLORS.length];
        return (
          <div key={f.rank} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            background: f.is_you ? 'var(--purple-bg)' : '#fff',
            borderRadius: 14, padding: '12px 14px', marginBottom: 7,
          }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, color: f.is_you ? 'var(--purple)' : 'var(--ink-3)', width: 20, textAlign: 'center', flexShrink: 0 }}>{f.rank}</div>
            <div style={{ width: 36, height: 36, borderRadius: 11, background: f.is_you ? '#7C3AED' : color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 800, color: '#fff', flexShrink: 0 }}>{f.name[0]}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: f.is_you ? '#5B21B6' : 'var(--ink)' }}>{f.name}{f.is_you ? ' · Вы' : ''}</div>
              <div style={{ fontSize: 10, color: 'var(--ink-3)', marginTop: 2 }}>LV {f.level} · {f.streak}🔥</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: f.is_you ? 'var(--purple)' : 'var(--ink)' }}>{fmt(f.xp)}</div>
              <div style={{ fontSize: 10, color: 'var(--ink-3)' }}>XP</div>
            </div>
          </div>
        );
      })}
    </>
  );
}

function XpSection({ xp, streak }) {
  const howTo = [
    { icon: '➕', name: 'Операция',  pts: '+10 XP', desc: 'За каждую добавленную запись' },
    { icon: '🔥', name: 'Серия',     pts: '+20 XP', desc: 'Ежедневный вход + операция'  },
    { icon: '✅', name: 'Черновик',  pts: '+15 XP', desc: 'Завершить черновик'           },
    { icon: '📂', name: 'Категория', pts: '+5 XP',  desc: 'Указать категорию'            },
    { icon: '📊', name: 'Отчёт',     pts: '+5 XP',  desc: 'Открыть раздел аналитики'    },
    { icon: '🥇', name: 'Значок',    pts: '+50–500', desc: 'Разблокировать достижение'   },
  ];
  const xpLog = [
    { icon: '🔥', label: 'Серия сохранена',    sub: '14:32 · Streak ×' + streak,       pts: 20 },
    { icon: '➕', label: 'Добавлена операция', sub: '14:32 · Продукты',                pts: 10 },
    { icon: '📊', label: 'Открыта аналитика',  sub: '13:10',                            pts: 5  },
    { icon: '🔥', label: 'Серия сохранена',    sub: 'Вчера · Streak ×' + (streak - 1), pts: 20 },
    { icon: '➕', label: 'Добавлена операция', sub: 'Вчера · Зарплата',                pts: 10 },
  ];
  return (
    <>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 700, color: 'var(--ink-3)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>КАК ЗАРАБАТЫВАТЬ ОЧКИ</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
        {howTo.map(({ icon, name, pts, desc }) => (
          <div key={name} style={{ background: '#fff', borderRadius: 16, padding: 14 }}>
            <div style={{ fontSize: 30, marginBottom: 6 }}>{icon}</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, color: 'var(--ink)', marginBottom: 3 }}>{name}</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 800, color: 'var(--amber)', marginBottom: 4 }}>{pts}</div>
            <div style={{ fontSize: 11, color: 'var(--ink-3)', lineHeight: 1.4 }}>{desc}</div>
          </div>
        ))}
      </div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 700, color: 'var(--ink-3)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 }}>ИСТОРИЯ · СЕГОДНЯ</div>
      {xpLog.map((e, i) => (
        <div key={i} style={{ background: '#fff', borderRadius: 14, padding: '12px 14px', marginBottom: 7, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 11, background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{e.icon}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{e.label}</div>
            <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 2 }}>{e.sub}</div>
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, color: '#F59E0B' }}>+{e.pts}</div>
        </div>
      ))}
    </>
  );
}

/* ═══════════════════════════════════════════════════════════
   PROFILE SCREEN
   ═══════════════════════════════════════════════════════════ */
function ProfileScreen({ data, setData }) {
  const { name = 'Алишер', xp, level, streak, achievements = [] } = data;
  const [notifs, setNotifs] = useState(true);
  const [weekly, setWeekly] = useState(false);
  const xpNext       = level * 500;
  const badgesEarned = achievements.filter(a => a.earned).length;
  const badgesTotal  = achievements.length;

  return (
    <div style={scr}>
      <StatusBar dark bg="#1C1C1E"/>
      {/* Hero */}
      <div style={{
        background: '#1C1C1E', padding: '4px 20px 0',
        position: 'relative', overflow: 'hidden', flexShrink: 0,
      }}>
        <div style={{
          position: 'absolute', top: -50, right: -50, width: 180, height: 180,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245,158,11,.08), transparent 70%)',
        }}/>
        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Avatar + name row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ position: 'relative' }}>
                <div style={{
                  width: 60, height: 60, borderRadius: 20,
                  background: '#2C2C2E', border: '2px solid #3C3C3E',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, color: '#fff',
                }}>{name[0]}</div>
                <div style={{
                  position: 'absolute', bottom: -7, left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'linear-gradient(90deg, #D97706, #F59E0B)',
                  color: '#1C1C1E', fontFamily: 'var(--font-display)',
                  fontSize: 9, fontWeight: 800,
                  padding: '2px 7px', borderRadius: 5,
                  whiteSpace: 'nowrap', border: '2px solid #1C1C1E',
                }}>LV {level}</div>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, color: '#fff' }}>{name}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,.35)', marginTop: 2 }}>@alisherjon · Silver Saver 🥈</div>
              </div>
            </div>
            <div style={{
              background: 'rgba(255,255,255,.08)', borderRadius: 11,
              padding: '8px 14px', fontFamily: 'var(--font-display)',
              fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,.5)',
              letterSpacing: 1, textTransform: 'uppercase', cursor: 'pointer',
            }}>Изменить</div>
          </div>

          {/* XP bar */}
          <div style={{ background: 'rgba(255,255,255,.05)', borderRadius: 14, padding: '10px 14px', marginBottom: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,.4)', letterSpacing: 1 }}>Уровень {level} → {level + 1}</div>
              <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,.3)' }}>
                <span style={{ color: '#F59E0B' }}>{fmt(xp)}</span> / {fmt(xpNext)} XP
              </div>
            </div>
            <div style={{ height: 6, background: 'rgba(255,255,255,.08)', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{
                width: Math.min(Math.round(xp / xpNext * 100), 100) + '%',
                height: '100%', borderRadius: 3,
                background: 'linear-gradient(90deg, #D97706, #F59E0B)',
              }}/>
            </div>
          </div>

          {/* Stats strip */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1px 1fr 1px 1fr',
            background: 'rgba(255,255,255,.04)',
            borderTop: '1px solid rgba(255,255,255,.06)',
            padding: '10px 0', marginTop: 12,
          }}>
            <div style={{ textAlign: 'center', padding: '0 4px' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, color: '#F59E0B', marginBottom: 2 }}>🔥 {streak}</div>
              <div style={{ fontSize: 9, fontWeight: 600, color: 'rgba(255,255,255,.25)', letterSpacing: .5, textTransform: 'uppercase' }}>Серия</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,.06)' }}/>
            <div style={{ textAlign: 'center', padding: '0 4px' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, color: '#F59E0B', marginBottom: 2 }}>{fmt(xp)} XP</div>
              <div style={{ fontSize: 9, fontWeight: 600, color: 'rgba(255,255,255,.25)', letterSpacing: .5, textTransform: 'uppercase' }}>Очки</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,.06)' }}/>
            <div style={{ textAlign: 'center', padding: '0 4px' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, color: '#C4B5FD', marginBottom: 2 }}>{badgesEarned}/{badgesTotal}</div>
              <div style={{ fontSize: 9, fontWeight: 600, color: 'rgba(255,255,255,.25)', letterSpacing: .5, textTransform: 'uppercase' }}>Значки</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ ...scrl, padding: '0 16px' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 10, fontWeight: 700, color: 'var(--ink-3)', letterSpacing: 2, textTransform: 'uppercase', padding: '14px 4px 10px' }}>Настройки</div>

        {/* Settings scard */}
        <div style={{ background: '#fff', borderRadius: 20, overflow: 'hidden', marginBottom: 10 }}>
          <ProfRow ic="💳" bg="var(--blue-bg)"  label="Счета"           sub="Баланс по счетам"/>
          <Div1/>
          <ProfRow ic="🎯" bg="var(--amber-bg)" label="Бюджеты"         sub="0 активных лимита"/>
          <Div1/>
          <ProfRow ic="💱" bg="var(--bg)"       label="Основная валюта" sub="UZS — Узбекский сум" tag="UZS"/>
          <Div1/>
          <ProfRow ic="📂" bg="var(--bg)"       label="Категории"       sub="10 расходов · 4 дохода"/>
        </div>

        {/* Notifications scard */}
        <div style={{ background: '#fff', borderRadius: 20, overflow: 'hidden', marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', padding: '15px 16px', gap: 13 }}>
            <div style={{ width: 36, height: 36, borderRadius: 11, background: 'var(--blue-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, flexShrink: 0 }}>🔔</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>Уведомления</div>
              <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 2 }}>Напоминания и инсайты</div>
            </div>
            <Toggle on={notifs} onChange={setNotifs}/>
          </div>
          <Div1/>
          <div style={{ display: 'flex', alignItems: 'center', padding: '15px 16px', gap: 13 }}>
            <div style={{ width: 36, height: 36, borderRadius: 11, background: 'var(--green-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, flexShrink: 0 }}>📊</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>Еженедельный отчёт</div>
              <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 2 }}>Каждое воскресенье в 18:00</div>
            </div>
            <Toggle on={weekly} onChange={setWeekly}/>
          </div>
          <Div1/>
          <ProfRow ic="📤" bg="var(--green-bg)" label="Экспорт данных" sub="Excel, PDF"/>
        </div>

        <div onClick={() => {}} style={{
          padding: 16, borderRadius: 16,
          background: 'var(--red-bg)', color: 'var(--red)',
          fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700,
          letterSpacing: 1.5, textTransform: 'uppercase',
          textAlign: 'center', cursor: 'pointer', marginTop: 4,
        }}>Выйти из аккаунта</div>

        <div style={{ textAlign: 'center', padding: 14, fontSize: 10, fontWeight: 700, color: 'var(--ink-3)', letterSpacing: 1.5, textTransform: 'uppercase' }}>Finly v4.0 · Personal Finance</div>
        <div style={{ height: 20 }}/>
      </div>
    </div>
  );
}

function Div1() {
  return <div style={{ height: 1, background: 'var(--border)', marginLeft: 50 }}/>;
}
function ProfRow({ ic, bg, label, sub, tag }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '15px 16px', gap: 13, cursor: 'pointer' }}>
      <div style={{ width: 36, height: 36, borderRadius: 11, background: bg || 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, flexShrink: 0 }}>{ic}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>{label}</div>
        {sub && <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 2 }}>{sub}</div>}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        {tag && <div style={{ background: 'var(--bg)', color: 'var(--ink-2)', fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 8 }}>{tag}</div>}
        <div style={{ color: 'var(--ink-3)', fontSize: 18 }}>›</div>
      </div>
    </div>
  );
}

Object.assign(window, { HomeScreen, AddScreen, AnalyticsScreen, RewardsScreen, ProfileScreen });
