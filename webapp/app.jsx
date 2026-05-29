/* eslint-disable */
/* Top-level shell. Manages tab + mock data; passes them down. */

const INIT_TXS = [
  { id: 1, type: 'expense', amount: 85000,   cat: '🛒', catName: 'Продукты',    note: 'Недельная закупка',     dateStr: '2025-05-13', time: '14:32' },
  { id: 2, type: 'income',  amount: 3450000, cat: '💼', catName: 'Зарплата',    note: 'Основное место работы', recurring: true, dateStr: '2025-05-12', time: '09:00' },
  { id: 3, type: 'expense', amount: 25000,   cat: '🚌', catName: 'Транспорт',   note: 'Поездка на работу',     dateStr: '2025-05-11', time: '08:47' },
  { id: 4, type: 'expense', amount: 120000,  cat: '🍕', catName: 'Кафе',        note: 'Ужин с друзьями',       dateStr: '2025-05-10', time: '21:14' },
  { id: 5, type: 'expense', amount: 540000,  cat: '🏠', catName: 'Жильё',       note: 'Май',                   recurring: true, dateStr: '2025-05-01', time: '12:00' },
  { id: 6, type: 'expense', amount: 65000,   cat: '💊', catName: 'Здоровье',    note: 'Витамины',              dateStr: '2025-05-08', time: '18:30' },
  { id: 7, type: 'expense', amount: 38000,   cat: '🎬', catName: 'Развлечения', note: '',                      dateStr: '2025-05-07', time: '20:00' },
];

const INIT_ACHIEVEMENTS = [
  { id: 1, icon: '🔥', name: 'Серия 7',   desc: 'Неделя подряд',  earned: true,  date: '07.05', xp: 100, bg: 'rgba(245,158,11,0.15)' },
  { id: 2, icon: '🏆', name: 'Аналитик',  desc: '5 отчётов',      earned: true,  date: '10.05', xp: 150, bg: 'rgba(74,222,128,0.15)' },
  { id: 3, icon: '💎', name: 'Серия 30',  desc: 'Месяц подряд',   earned: false, locked: false, progress: 40, label: '12/30 дней', xp: 500, bg: 'rgba(139,92,246,0.15)' },
  { id: 4, icon: '🎯', name: 'Точность',  desc: 'По бюджету',     earned: false, locked: false, progress: 65, label: '13/20 дней', xp: 200, bg: 'rgba(37,99,235,0.15)'  },
  { id: 5, icon: '⭐', name: '1000 XP',   desc: 'Первая тысяча',  earned: false, locked: true,  xp: 250, bg: 'rgba(245,158,11,0.1)' },
  { id: 6, icon: '📊', name: 'Аналитик+', desc: '20 отчётов',     earned: false, locked: true,  xp: 300, bg: 'rgba(74,222,128,0.1)' },
];

const INIT_DATA = {
  name: 'Алишер',
  streak: 12,
  xp: 870,
  level: 4,
  txs: INIT_TXS,
  drafts: [],
  achievements: INIT_ACHIEVEMENTS,
};

function FinlyPhone({ initialTab = 'home' }) {
  const [tab, setTab]   = useState(initialTab);
  const [data, setData] = useState(INIT_DATA);
  const [toast, setToast] = useState(null);

  function onTxTap(tx) {
    setToast({ ic: tx.cat, t1: tx.catName, t2: (tx.type === 'income' ? '+' : '−') + fmt(tx.amount) + ' сум' });
    setTimeout(() => setToast(null), 2000);
  }

  let screen;
  if (tab === 'home')           screen = <HomeScreen      data={data} setTab={setTab} onTxTap={onTxTap}/>;
  else if (tab === 'add')       screen = <AddScreen       data={data} setData={setData} setTab={setTab}/>;
  else if (tab === 'analytics') screen = <AnalyticsScreen data={data}/>;
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
      <NavBar tab={tab} setTab={setTab} hasDraft={data.drafts?.length > 0}/>
    </PhoneFrame>
  );
}

window.FinlyPhone = FinlyPhone;
if (document.getElementById('finly-phone-root')) {
  ReactDOM.createRoot(document.getElementById('finly-phone-root')).render(<FinlyPhone/>);
}
