/* eslint-disable */
/* Finly landing page — calm fintech, mobile-first, Russian copy.
   Renders the real WebApp UI kit inside an interactive phone bezel.
   Tweaks: accent color, hero copy variant, hero layout, sections, theme. */

const { useState: lnUseState, useEffect: lnUseEffect, useRef: lnUseRef } = React;

/* ── EDITMODE defaults (persisted via host) ───────────────── */
const LANDING_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "flame",
  "heroCopy": "control",
  "heroLayout": "split",
  "theme": "light",
  "showHowItWorks": true,
  "showMinimal": true,
  "showPreview": true,
  "showFooterCta": true
}/*EDITMODE-END*/;

/* ── ACCENT PALETTE MAP ───────────────────────────────────── */
const ACCENTS = {
  flame:  { c: '#D97706', soft: '#FFFBEB', mid: '#FEF3C7', label: 'Пламя' },
  green:  { c: '#16A34A', soft: '#F0FDF4', mid: '#DCFCE7', label: 'Свежий' },
  purple: { c: '#7C3AED', soft: '#FAF5FF', mid: '#EDE9FE', label: 'Аметист' },
};

/* ── HERO COPY VARIANTS ───────────────────────────────────── */
const HERO_COPY = {
  control: {
    eyebrow: 'Финансовый трекер · в Telegram',
    h1words: ['Ваши деньги — ', 'под контролем.', ' Каждый день.'],
    accentIndex: 1,
    sub: 'Finly живёт прямо в Telegram. Никаких отдельных приложений и регистраций. Только ваши деньги — наглядно.',
  },
  habit: {
    eyebrow: 'Превратите учёт в привычку',
    h1words: ['Тратьте осознанно. ', 'Считайте играя.', ''],
    accentIndex: 1,
    sub: 'Серия, XP и друзья в таблице лидеров. Открывайте Finly раз в день — и наблюдайте, как меняется ваш бюджет.',
  },
  simple: {
    eyebrow: 'Просто. Наглядно. Без таблиц',
    h1words: ['Финансы. ', 'Без сложного.', ''],
    accentIndex: 1,
    sub: '5 секунд на запись. 5 секунд на отчёт. Всё, что нужно — Telegram и одна минута в день.',
  },
};

/* ── HOOK: in-view fade-up ────────────────────────────────── */
function useFadeUp() {
  const ref = lnUseRef(null);
  lnUseEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(es => {
      es.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-visible'); });
    }, { threshold: 0.12 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return ref;
}

/* ═══════════════════════════════════════════════════════════
   TOP NAV
   ═══════════════════════════════════════════════════════════ */
function TopNav({ t, telegram }) {
  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 50,
      display: 'flex', alignItems: 'center',
      justifyContent: 'space-between',
      padding: '18px 48px',
      background: t.theme === 'dark' ? 'rgba(14,15,18,0.85)' : 'rgba(244,245,247,0.85)',
      backdropFilter: 'saturate(180%) blur(12px)',
      WebkitBackdropFilter: 'saturate(180%) blur(12px)',
      borderBottom: '1px solid ' + (t.theme === 'dark' ? '#1B1E23' : 'rgba(236,238,242,0.6)'),
    }} className="ln-section-pad">
      <Logo dark={t.theme === 'dark'} size={26}/>
      <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
        <a href="#how" style={navLink(t)}>Как работает</a>
        <a href="#minimal" style={navLink(t)}>Простота</a>
        <a href="#preview" style={navLink(t)}>Экраны</a>
        <a href={telegram} target="_blank" rel="noopener" className="ln-cta-primary"
           style={{ padding: '12px 18px', fontSize: 11 }}>
          Открыть в Telegram
        </a>
      </div>
    </nav>
  );
}
const navLink = (t) => ({
  fontFamily: 'var(--font-display)',
  fontSize: 11, fontWeight: 700,
  letterSpacing: 1.5, textTransform: 'uppercase',
  color: t.theme === 'dark' ? '#8A8E98' : 'var(--ink-2)',
  textDecoration: 'none',
});

/* ═══════════════════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════════════════ */
function Hero({ t, telegram }) {
  const copy = HERO_COPY[t.heroCopy] || HERO_COPY.control;
  const accent = ACCENTS[t.accent].c;
  const accentSoft = ACCENTS[t.accent].soft;
  const accentMid = ACCENTS[t.accent].mid;
  const isCentered = t.heroLayout === 'centered';

  const headline = (
    <h1 className="ln-h1 ln-text-ink" style={{
      fontFamily: 'var(--font-display)',
      fontSize: 64, fontWeight: 800,
      letterSpacing: '-2px', lineHeight: 1.02,
      margin: '0 0 24px',
      color: 'var(--ink)',
      textWrap: 'balance',
    }}>
      {copy.h1words.map((w, i) => (
        <span key={i} style={{
          color: i === copy.accentIndex ? accent : undefined,
        }}>{w}</span>
      ))}
    </h1>
  );

  const sub = (
    <p className="ln-text-muted" style={{
      fontFamily: 'var(--font-body)',
      fontSize: 18, fontWeight: 400,
      lineHeight: 1.55, color: 'var(--ink-2)',
      margin: '0 0 32px', maxWidth: 480,
      textWrap: 'pretty',
    }}>{copy.sub}</p>
  );

  const eyebrow = (
    <div className="ln-eyebrow" style={{
      color: accent, marginBottom: 20,
      display: 'inline-flex', alignItems: 'center', gap: 10,
      padding: '8px 14px',
      background: accentSoft,
      borderRadius: 999,
    }}>
      <span style={{
        width: 6, height: 6, borderRadius: '50%', background: accent,
      }}/>
      {copy.eyebrow}
    </div>
  );

  const ctas = (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 22 }}>
      <a href={telegram} target="_blank" rel="noopener" className="ln-cta-primary">
        <span>Открыть в Telegram</span>
        <span style={{ fontSize: 14 }}>→</span>
      </a>
      <a href="#how" className="ln-cta-secondary">
        Как это работает
      </a>
    </div>
  );

  const trust = (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      fontSize: 13, color: 'var(--ink-3)', fontWeight: 500,
    }} className="ln-text-faint">
      <span style={{ fontSize: 14 }}>✓</span>
      Без пароля — только ваш Telegram аккаунт
    </div>
  );

  const phoneCol = (
    <div className="ln-hero-phone-col ln-phone-wrap" style={{
      justifySelf: isCentered ? 'center' : 'end',
      position: 'relative',
    }}>
      {/* Soft accent glow behind phone */}
      <div aria-hidden style={{
        position: 'absolute', inset: -60,
        background: `radial-gradient(circle at 50% 40%, ${accent}1A, transparent 60%)`,
        zIndex: 0, pointerEvents: 'none',
      }}/>
      <div className="ln-floaty" style={{ position: 'relative', zIndex: 1 }}>
        <FinlyPhone initialTab="home"/>
      </div>
      {/* Floating badges */}
      <FloatingBadge style={{ top: 40, left: -30 }}
        emoji="🔥" title="12 дней подряд" sub="Серия не прервана"
        accent={accent} accentSoft={accentSoft}/>
      <FloatingBadge style={{ bottom: 100, right: -30 }}
        emoji="✨" title="+10 XP" sub="За каждую запись"
        accent={accent} accentSoft={accentSoft}/>
    </div>
  );

  if (isCentered) {
    return (
      <section style={{
        padding: '64px 48px 100px',
        textAlign: 'center',
      }} className="ln-section-pad">
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ display: 'inline-block' }}>{eyebrow}</div>
          {headline}
          <div style={{ display: 'flex', justifyContent: 'center' }}>{sub}</div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>{ctas}</div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>{trust}</div>
        </div>
        <div style={{ marginTop: 56, display: 'flex', justifyContent: 'center', position: 'relative' }}>
          {phoneCol}
        </div>
      </section>
    );
  }

  return (
    <section style={{
      padding: '64px 48px 100px',
    }} className="ln-section-pad">
      <div className="ln-hero-split" style={{
        display: 'grid',
        gridTemplateColumns: '1.05fr 1fr',
        gap: 64,
        maxWidth: 1280, margin: '0 auto',
        alignItems: 'center',
      }}>
        <div>
          {eyebrow}
          {headline}
          {sub}
          {ctas}
          {trust}
        </div>
        {phoneCol}
      </div>
    </section>
  );
}

function FloatingBadge({ style, emoji, title, sub, accent, accentSoft }) {
  return (
    <div style={{
      position: 'absolute', zIndex: 5,
      background: '#fff',
      borderRadius: 16,
      padding: '12px 16px 12px 12px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
      border: '1px solid var(--border)',
      display: 'flex', alignItems: 'center', gap: 12,
      ...style,
    }}>
      <div style={{
        width: 38, height: 38, borderRadius: 12,
        background: accentSoft,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 20,
      }}>{emoji}</div>
      <div>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 13, fontWeight: 800,
          color: 'var(--ink)', lineHeight: 1.1,
        }}>{title}</div>
        <div style={{
          fontSize: 10, color: 'var(--ink-3)',
          fontWeight: 600, marginTop: 2,
          letterSpacing: 0.3,
        }}>{sub}</div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   HOW IT WORKS — 3 steps
   ═══════════════════════════════════════════════════════════ */
function HowItWorks({ t }) {
  const accent = ACCENTS[t.accent].c;
  const accentSoft = ACCENTS[t.accent].soft;
  const ref = useFadeUp();

  const steps = [
    {
      n: '01',
      emoji: '💬',
      title: 'Откройте бот',
      body: 'Найдите @finly_bot в Telegram и нажмите Start. Регистрации нет — ваш Telegram уже всё знает.',
    },
    {
      n: '02',
      emoji: '➕',
      title: 'Добавьте операцию',
      body: 'Сумма, категория, готово. 5 секунд — и запись в системе. +10 XP идут в копилку.',
    },
    {
      n: '03',
      emoji: '🔥',
      title: 'Держите серию',
      body: 'Заходите каждый день. Серия растёт, отчёты собираются, привычка закрепляется.',
    },
  ];

  return (
    <section id="how" ref={ref} className="ln-fade-up ln-section ln-section-pad" style={{
      padding: '120px 48px',
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
      background: 'var(--surface)',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ maxWidth: 640, marginBottom: 64 }}>
          <div className="ln-eyebrow" style={{ color: accent, marginBottom: 16 }}>
            Как это работает
          </div>
          <h2 className="ln-text-ink" style={{
            fontFamily: 'var(--font-display)',
            fontSize: 46, fontWeight: 800,
            letterSpacing: '-1.2px', lineHeight: 1.05,
            margin: 0, color: 'var(--ink)',
            textWrap: 'balance',
          }}>
            Три шага между вами и понятным бюджетом.
          </h2>
        </div>

        <div className="ln-three-up" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 16,
        }}>
          {steps.map((s, i) => (
            <div key={i} className="ln-card ln-border" style={{
              background: '#fff',
              border: '1px solid var(--border)',
              borderRadius: 24,
              padding: '32px 28px',
              position: 'relative',
              overflow: 'hidden',
              transition: 'transform 220ms var(--ease-out), border-color 220ms',
            }} onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.borderColor = accent;
            }} onMouseLeave={(e) => {
              e.currentTarget.style.transform = '';
              e.currentTarget.style.borderColor = '';
            }}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 11, fontWeight: 800,
                color: accent,
                letterSpacing: 2, marginBottom: 24,
              }}>{s.n} / 03</div>

              <div style={{
                width: 56, height: 56, borderRadius: 18,
                background: accentSoft,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 28, marginBottom: 24,
              }}>{s.emoji}</div>

              <h3 className="ln-text-ink" style={{
                fontFamily: 'var(--font-display)',
                fontSize: 22, fontWeight: 800,
                letterSpacing: '-0.3px', lineHeight: 1.15,
                margin: '0 0 10px', color: 'var(--ink)',
              }}>{s.title}</h3>
              <p className="ln-text-muted" style={{
                fontFamily: 'var(--font-body)',
                fontSize: 14, fontWeight: 400,
                lineHeight: 1.55, color: 'var(--ink-2)',
                margin: 0,
              }}>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   MINIMAL — how minimal the app is
   ═══════════════════════════════════════════════════════════ */
function MinimalSection({ t }) {
  const accent = ACCENTS[t.accent].c;
  const accentSoft = ACCENTS[t.accent].soft;
  const ref = useFadeUp();

  const list = [
    { k: '5 сек', l: 'На добавление записи' },
    { k: '0', l: 'Полей-обязаловок' },
    { k: '1', l: 'Кнопка — Сохранить' },
    { k: '0₽', l: 'Стоимость использования' },
  ];

  return (
    <section id="minimal" ref={ref} className="ln-fade-up ln-section-pad" style={{
      padding: '120px 48px',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div className="ln-mosaic" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 0.9fr',
          gap: 80,
          alignItems: 'center',
        }}>
          <div>
            <div className="ln-eyebrow" style={{ color: accent, marginBottom: 16 }}>
              Минимализм по делу
            </div>
            <h2 className="ln-text-ink" style={{
              fontFamily: 'var(--font-display)',
              fontSize: 52, fontWeight: 800,
              letterSpacing: '-1.4px', lineHeight: 1.02,
              margin: '0 0 24px', color: 'var(--ink)',
              textWrap: 'balance',
            }}>
              Меньше полей.<br/>
              <span style={{ color: accent }}>Больше ясности.</span>
            </h2>
            <p className="ln-text-muted" style={{
              fontFamily: 'var(--font-body)',
              fontSize: 17, fontWeight: 400,
              lineHeight: 1.55, color: 'var(--ink-2)',
              margin: '0 0 40px', maxWidth: 480,
              textWrap: 'pretty',
            }}>
              В Finly нет полей "тип операции", "счёт списания", "тег", "проект".
              Есть сумма, категория и кнопка — всё. Остальное за вас делает экран отчётов.
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 1,
              background: 'var(--border)',
              borderRadius: 20,
              overflow: 'hidden',
              border: '1px solid var(--border)',
              maxWidth: 460,
            }} className="ln-hairline">
              {list.map((it, i) => (
                <div key={i} className="ln-card" style={{
                  background: '#fff',
                  padding: '24px 22px',
                }}>
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 32, fontWeight: 800,
                    color: accent,
                    letterSpacing: '-0.8px', lineHeight: 1,
                    marginBottom: 8,
                  }}>{it.k}</div>
                  <div className="ln-text-muted" style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 13, fontWeight: 500,
                    color: 'var(--ink-2)',
                  }}>{it.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Phone showing the Add screen */}
          <div className="ln-phone-wrap" style={{
            position: 'relative', justifySelf: 'end',
          }}>
            <div aria-hidden style={{
              position: 'absolute', inset: -40,
              background: `radial-gradient(circle at 60% 40%, ${accent}14, transparent 65%)`,
              zIndex: 0, pointerEvents: 'none',
            }}/>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <FinlyPhone initialTab="add" key="add-phone"/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   LIVE PREVIEW — interactive screens
   ═══════════════════════════════════════════════════════════ */
function PreviewSection({ t }) {
  const accent = ACCENTS[t.accent].c;
  const accentSoft = ACCENTS[t.accent].soft;
  const ref = useFadeUp();
  const [active, setActive] = lnUseState('home');

  const tabs = [
    { id: 'home',      label: 'Главная',   emoji: '⊞', desc: 'Баланс, серия, последние операции и быстрые действия. Всё, что нужно в первом касании.' },
    { id: 'analytics', label: 'Отчёты',    emoji: '📊', desc: 'Категории, нормы расходов, история. Видно, куда уходят деньги — без сводных таблиц.' },
    { id: 'rewards',   label: 'Прогресс',  emoji: '🏆', desc: 'XP, награды и таблица лидеров среди друзей. Делайте учёт привычкой.' },
    { id: 'profile',   label: 'Профиль',   emoji: '👤', desc: 'Уровень, серия и настройки. Экспорт CSV. Поддержка одной кнопкой.' },
  ];
  const activeDesc = tabs.find(x => x.id === active);

  return (
    <section id="preview" ref={ref} className="ln-fade-up ln-section ln-section-pad" style={{
      padding: '120px 48px',
      background: 'var(--surface)',
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div className="ln-eyebrow" style={{ color: accent, marginBottom: 16 }}>
            Живой превью
          </div>
          <h2 className="ln-text-ink" style={{
            fontFamily: 'var(--font-display)',
            fontSize: 46, fontWeight: 800,
            letterSpacing: '-1.2px', lineHeight: 1.05,
            margin: '0 auto', color: 'var(--ink)',
            maxWidth: 720, textWrap: 'balance',
          }}>
            Полистайте экраны прямо здесь.
          </h2>
          <p className="ln-text-muted" style={{
            fontFamily: 'var(--font-body)',
            fontSize: 16, color: 'var(--ink-2)',
            marginTop: 12, maxWidth: 540,
            marginLeft: 'auto', marginRight: 'auto',
            textWrap: 'pretty',
          }}>
            Никаких видеороликов и анимаций — это сам интерфейс,
            тот же, что увидите в Telegram.
          </p>
        </div>

        <div className="ln-mosaic" style={{
          display: 'grid',
          gridTemplateColumns: '0.85fr 1fr',
          gap: 64,
          alignItems: 'center',
        }}>
          {/* Tab list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {tabs.map(tab => {
              const isActive = active === tab.id;
              return (
                <button key={tab.id} onClick={() => setActive(tab.id)} style={{
                  textAlign: 'left',
                  background: isActive ? accentSoft : 'transparent',
                  border: '1px solid ' + (isActive ? accent : 'var(--border)'),
                  borderRadius: 18,
                  padding: '18px 20px',
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 16,
                  transition: 'all 180ms var(--ease-out)',
                  fontFamily: 'inherit',
                }} className="ln-card ln-border">
                  <div style={{
                    width: 44, height: 44, borderRadius: 14,
                    background: isActive ? '#fff' : 'var(--bg)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 22, flexShrink: 0,
                  }}>{tab.emoji}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 16, fontWeight: 800,
                      color: isActive ? accent : 'var(--ink)',
                      letterSpacing: '-0.2px',
                      marginBottom: isActive ? 4 : 0,
                    }} className={isActive ? '' : 'ln-text-ink'}>{tab.label}</div>
                    {isActive && (
                      <div className="ln-text-muted" style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 13, color: 'var(--ink-2)',
                        lineHeight: 1.45, marginTop: 4,
                      }}>{tab.desc}</div>
                    )}
                  </div>
                  <div style={{
                    fontSize: 20, color: isActive ? accent : 'var(--ink-3)',
                    transform: isActive ? 'translateX(2px)' : 'none',
                    transition: 'transform 180ms',
                  }}>›</div>
                </button>
              );
            })}
          </div>

          {/* Phone */}
          <div className="ln-phone-wrap" style={{
            position: 'relative', justifySelf: 'center',
          }}>
            <div aria-hidden style={{
              position: 'absolute', inset: -50,
              background: `radial-gradient(circle at 50% 30%, ${accent}14, transparent 60%)`,
              zIndex: 0, pointerEvents: 'none',
            }}/>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <FinlyPhone initialTab={active} key={'preview-' + active}/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   FOOTER CTA
   ═══════════════════════════════════════════════════════════ */
function FooterCta({ t, telegram }) {
  const accent = ACCENTS[t.accent].c;
  const ref = useFadeUp();

  return (
    <section ref={ref} className="ln-fade-up ln-section-pad" style={{
      padding: '120px 48px',
    }}>
      <div className="ln-card ln-border" style={{
        maxWidth: 1100, margin: '0 auto',
        background: 'var(--ink)',
        borderRadius: 32,
        padding: '80px 64px',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
      }}>
        {/* Soft radial accent */}
        <div aria-hidden style={{
          position: 'absolute', top: -100, right: -100,
          width: 360, height: 360, borderRadius: '50%',
          background: `radial-gradient(circle, ${accent}33, transparent 70%)`,
        }}/>
        <div aria-hidden style={{
          position: 'absolute', bottom: -120, left: -80,
          width: 320, height: 320, borderRadius: '50%',
          background: `radial-gradient(circle, ${accent}1F, transparent 70%)`,
        }}/>

        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 11, fontWeight: 700,
          color: accent, letterSpacing: 2,
          textTransform: 'uppercase', marginBottom: 20,
          position: 'relative', zIndex: 1,
        }}>Готовы начать?</div>

        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 56, fontWeight: 800,
          letterSpacing: '-1.5px', lineHeight: 1.02,
          margin: '0 0 16px',
          color: '#fff', position: 'relative', zIndex: 1,
          textWrap: 'balance',
        }}>Откройте Finly. <br/>
          <span style={{ color: accent }}>Сегодня же.</span>
        </h2>

        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 17, fontWeight: 400,
          color: 'rgba(255,255,255,0.6)',
          lineHeight: 1.5, margin: '0 auto 36px',
          maxWidth: 480, position: 'relative', zIndex: 1,
          textWrap: 'pretty',
        }}>
          Бесплатно. Без регистрации.
          Прямо в Telegram, рядом с чатами друзей.
        </p>

        <a href={telegram} target="_blank" rel="noopener" style={{
          display: 'inline-flex', alignItems: 'center', gap: 12,
          background: '#fff', color: 'var(--ink)',
          padding: '20px 32px', borderRadius: 16,
          fontFamily: 'var(--font-display)',
          fontSize: 14, fontWeight: 700,
          letterSpacing: 1.5, textTransform: 'uppercase',
          textDecoration: 'none',
          position: 'relative', zIndex: 1,
          transition: 'transform 120ms var(--ease-out)',
        }} onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.97)'}
           onMouseUp={(e) => e.currentTarget.style.transform = ''}
           onMouseLeave={(e) => e.currentTarget.style.transform = ''}>
          <span style={{ fontSize: 18 }}>✈</span>
          Открыть в Telegram
          <span style={{ fontSize: 14 }}>→</span>
        </a>

        <div style={{
          fontSize: 12, color: 'rgba(255,255,255,0.35)',
          fontWeight: 500, marginTop: 22,
          position: 'relative', zIndex: 1,
        }}>
          @finly_bot · Без пароля · Сделано в Ташкенте
        </div>
      </div>

      {/* Bottom footer line */}
      <footer style={{
        maxWidth: 1280, margin: '64px auto 0',
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', flexWrap: 'wrap', gap: 16,
        paddingTop: 32,
        borderTop: '1px solid var(--border)',
      }} className="ln-border">
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Logo dark={t.theme === 'dark'} size={20}/>
          <span style={{
            fontSize: 12, color: 'var(--ink-3)', fontWeight: 500,
          }} className="ln-text-faint">© 2026 · Personal finance, made personal.</span>
        </div>
        <div style={{ display: 'flex', gap: 24 }}>
          <a href="#" style={navLink(t)}>Поддержка</a>
          <a href="#" style={navLink(t)}>Приватность</a>
          <a href="#" style={navLink(t)}>Условия</a>
        </div>
      </footer>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   TWEAKS
   ═══════════════════════════════════════════════════════════ */
function FinlyTweaks({ t, setTweak }) {
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Тема">
        <TweakRadio label="Theme" value={t.theme}
          options={[{ value: 'light', label: 'Light' }, { value: 'dark', label: 'Dark' }]}
          onChange={v => setTweak('theme', v)}/>
      </TweakSection>

      <TweakSection label="Акцент">
        <TweakRadio label="Accent" value={t.accent}
          options={[
            { value: 'flame',  label: 'Flame' },
            { value: 'green',  label: 'Green' },
            { value: 'purple', label: 'Purple' },
          ]}
          onChange={v => setTweak('accent', v)}/>
      </TweakSection>

      <TweakSection label="Hero">
        <TweakSelect label="Copy variant" value={t.heroCopy}
          options={[
            { value: 'control', label: 'Под контролем' },
            { value: 'habit',   label: 'Привычка + игра' },
            { value: 'simple',  label: 'Просто. Наглядно.' },
          ]}
          onChange={v => setTweak('heroCopy', v)}/>
        <TweakRadio label="Layout" value={t.heroLayout}
          options={[
            { value: 'split',    label: 'Split' },
            { value: 'centered', label: 'Centered' },
          ]}
          onChange={v => setTweak('heroLayout', v)}/>
      </TweakSection>

      <TweakSection label="Секции">
        <TweakToggle label="How it works" value={t.showHowItWorks}
          onChange={v => setTweak('showHowItWorks', v)}/>
        <TweakToggle label="Minimalism" value={t.showMinimal}
          onChange={v => setTweak('showMinimal', v)}/>
        <TweakToggle label="Live preview" value={t.showPreview}
          onChange={v => setTweak('showPreview', v)}/>
        <TweakToggle label="Footer CTA" value={t.showFooterCta}
          onChange={v => setTweak('showFooterCta', v)}/>
      </TweakSection>
    </TweaksPanel>
  );
}

/* ═══════════════════════════════════════════════════════════
   LANDING ROOT
   ═══════════════════════════════════════════════════════════ */
function Landing() {
  const [t, setTweak] = useTweaks(LANDING_DEFAULTS);
  const telegram = 'https://t.me/finly_bot';

  // Apply theme + accent globally
  lnUseEffect(() => {
    document.body.classList.toggle('theme-dark', t.theme === 'dark');
    document.documentElement.style.setProperty('--accent',      ACCENTS[t.accent].c);
    document.documentElement.style.setProperty('--accent-soft', ACCENTS[t.accent].soft);
    document.documentElement.style.setProperty('--accent-mid',  ACCENTS[t.accent].mid);
  }, [t.theme, t.accent]);

  return (
    <>
      <TopNav t={t} telegram={telegram}/>
      <Hero t={t} telegram={telegram}/>
      {t.showHowItWorks && <HowItWorks t={t}/>}
      {t.showMinimal    && <MinimalSection t={t}/>}
      {t.showPreview    && <PreviewSection t={t}/>}
      {t.showFooterCta  && <FooterCta t={t} telegram={telegram}/>}
      <FinlyTweaks t={t} setTweak={setTweak}/>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('ln-root')).render(<Landing/>);
