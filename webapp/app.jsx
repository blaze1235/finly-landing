/* eslint-disable */
/* Top-level shell. Manages tab + mock data; passes them down. */

const INIT_TXS = [
  { id: 1, type: 'expense', amount: 85000,   icon: '🛒', catName: 'Продукты',  merchant: 'Korzinka', note: 'Недельная закупка',  dateLabel: 'Сегодня · 14:32' },
  { id: 2, type: 'income',  amount: 3450000, icon: '💼', catName: 'Зарплата',  merchant: 'Май',      note: 'Основное место работы', recurring: true, dateLabel: 'Вчера · 09:00' },
  { id: 3, type: 'expense', amount: 25000,   icon: '🚌', catName: 'Транспорт', merchant: 'Такси',    note: 'Поездка на работу',     dateLabel: '11.05 · 08:47' },
  { id: 4, type: 'expense', amount: 120000,  icon: '🍕', catName: 'Кафе',      merchant: 'Bon',      note: 'Ужин с друзьями',       dateLabel: '10.05 · 21:14' },
  { id: 5, type: 'expense', amount: 540000,  icon: '🏠', catName: 'Жильё',     merchant: 'Аренда',   note: 'Май',                    recurring: true, dateLabel: '01.05 · 12:00' },
  { id: 6, type: 'expense', amount: 65000,   icon: '💊', catName: 'Здоровье',  merchant: 'Аптека',   note: 'Витамины',               dateLabel: '08.05 · 18:30' },
  { id: 7, type: 'expense', amount: 38000,   icon: '🎬', catName: 'Развлечения', merchant: 'Кино',   note: '',                       dateLabel: '07.05 · 20:00' },
];

const INIT_DATA = {
  name: 'Алишер',
  streak: 12,
  xp: 870,
  level: 4,
  txs: INIT_TXS,
};

function FinlyPhone({ initialTab = 'home' }) {
  const [tab, setTab]   = useState(initialTab);
  const [data, setData] = useState(INIT_DATA);
  const [toast, setToast] = useState(null);

  function onTxTap(tx) {
    setToast({ ic: '🧾', t1: tx.catName, t2: (tx.type === 'income' ? '+' : '−') + fmt(tx.amount) + ' сум' });
    setTimeout(() => setToast(null), 2000);
  }

  let screen;
  if (tab === 'home')      screen = <HomeScreen      data={data} setTab={setTab} onTxTap={onTxTap}/>;
  else if (tab === 'add')  screen = <AddScreen       data={data} setData={setData} setTab={setTab}/>;
  else if (tab === 'analytics') screen = <AnalyticsScreen data={data} setTab={setTab}/>;
  else if (tab === 'rewards')   screen = <RewardsScreen   data={data} setData={setData}/>;
  else if (tab === 'profile')   screen = <ProfileScreen   data={data} setData={setData}/>;

  return (
    <PhoneFrame>
      {screen}
      {toast && (
        <div style={{
          position: 'absolute', top: 14, left: 12, right: 12,
          background: '#1C1C1E', borderRadius: 16,
          padding: '12px 14px', display: 'flex',
          alignItems: 'center', gap: 11, zIndex: 100,
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          animation: 'fly .2s ease',
        }}>
          <div style={{ fontSize: 22 }}>{toast.ic}</div>
          <div style={{ flex: 1 }}>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 13, fontWeight: 700, color: '#fff',
            }}>{toast.t1}</div>
            <div style={{ fontSize: 10, color: '#888', marginTop: 1 }}>{toast.t2}</div>
          </div>
        </div>
      )}
      <NavBar tab={tab} setTab={setTab}/>
    </PhoneFrame>
  );
}

window.FinlyPhone = FinlyPhone;
if (document.getElementById('finly-phone-root')) {
  ReactDOM.createRoot(document.getElementById('finly-phone-root')).render(<FinlyPhone/>);
}
