import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const IMAGES = {
  concert: "https://cdn.poehali.dev/projects/c4374e31-05e2-408c-ba38-6c2326bfa6e6/files/2d394383-7138-415c-9493-c311bb16ed87.jpg",
  conference: "https://cdn.poehali.dev/projects/c4374e31-05e2-408c-ba38-6c2326bfa6e6/files/491c99f8-d27a-4551-aba0-bb010a4ff3e4.jpg",
  outdoor: "https://cdn.poehali.dev/projects/c4374e31-05e2-408c-ba38-6c2326bfa6e6/files/2a082c93-f25f-46ae-8be3-a86765742ed7.jpg",
  led: "https://cdn.poehali.dev/projects/c4374e31-05e2-408c-ba38-6c2326bfa6e6/files/d173e183-7b55-45d0-9f80-7442189f89e7.jpg",
};

const NAV_LINKS = [
  { label: "Услуги", href: "#services" },
  { label: "Портфолио", href: "#portfolio" },
  { label: "Оборудование", href: "#equipment" },
  { label: "Цены", href: "#pricing" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Блог", href: "#blog" },
  { label: "Контакты", href: "#contacts" },
];

const SERVICES = [
  { icon: "Music", title: "Концерты", desc: "Грандиозные LED-конструкции для сцены, фоновые экраны, боковые дисплеи. Поддержка любых технических райдеров.", tag: "Концерты" },
  { icon: "Presentation", title: "Конференции", desc: "Профессиональные видеостены для деловых мероприятий. Чёткая картинка, быстрая установка, техподдержка на месте.", tag: "B2B" },
  { icon: "Star", title: "Ивенты", desc: "LED-арки, нестандартные формы, интерактивные инсталляции. Создаём уникальные пространства под любой бюджет.", tag: "Event" },
  { icon: "Building2", title: "Выставки", desc: "Выставочные стенды с LED-дисплеями. Привлекаем внимание посетителей и усиливаем бренд.", tag: "Expo" },
];

const EQUIPMENT = [
  {
    name: "LUMIX Pro P3.9",
    type: "Внутренний",
    res: "3.9 мм",
    brightness: "1200 нит",
    size: "до 20 × 8 м",
    img: IMAGES.led,
    tag: "Хит",
  },
  {
    name: "LUMIX Stage P2.6",
    type: "Сценический",
    res: "2.6 мм",
    brightness: "1800 нит",
    size: "до 30 × 10 м",
    img: IMAGES.concert,
    tag: "Премиум",
  },
  {
    name: "LUMIX Outdoor P6",
    type: "Уличный",
    res: "6.0 мм",
    brightness: "6500 нит",
    size: "до 50 × 15 м",
    img: IMAGES.outdoor,
    tag: "Outdoor",
  },
];

const PRICING = [
  {
    name: "Старт",
    price: "от 35 000",
    period: "/ сутки",
    features: ["Экран до 20 м²", "Доставка и монтаж", "Технический оператор", "Поддержка 8 часов"],
    highlight: false,
  },
  {
    name: "Бизнес",
    price: "от 85 000",
    period: "/ сутки",
    features: ["Экран до 60 м²", "Доставка и монтаж", "2 технических оператора", "Поддержка 24 часа", "Медиасервер в аренду", "Разработка контента"],
    highlight: true,
  },
  {
    name: "Премиум",
    price: "Индивидуально",
    period: "",
    features: ["Экран любого размера", "Нестандартные формы", "Полная продакшн поддержка", "Авторский контент", "VIP-менеджер", "Постпродакшн"],
    highlight: false,
  },
];

const REVIEWS = [
  { name: "Алексей Воронов", role: "Продюсер, Major Events", text: "Работаем с LUMIX уже 3 года. На всех наших концертах — только их оборудование. Надёжность и качество картинки — на высшем уровне.", rating: 5 },
  { name: "Ирина Соколова", role: "Директор по маркетингу, TechForum", text: "Для нашей конференции на 2000 человек выстроили видеостену 18×6 м. Всё прошло без единого сбоя. Очень профессиональная команда.", rating: 5 },
  { name: "Дмитрий Климов", role: "Event-агентство «Формат»", text: "Лучшие на рынке по соотношению цена/качество. Всегда предложат нестандартное решение и уложатся в бюджет.", rating: 5 },
];

const BLOG = [
  { title: "Как выбрать LED экран для концерта: полное руководство", date: "15 марта 2026", cat: "Гайды", img: IMAGES.concert },
  { title: "P2.6 vs P3.9: какой шаг пикселя нужен вашему мероприятию", date: "8 марта 2026", cat: "Оборудование", img: IMAGES.led },
  { title: "5 трендов LED-дизайна на ивентах в 2026 году", date: "1 марта 2026", cat: "Тренды", img: IMAGES.outdoor },
];

const GALLERY_ITEMS = [
  { img: IMAGES.concert, title: "Rock Fest 2025", cat: "Концерт", tall: true },
  { img: IMAGES.conference, title: "TechForum 2025", cat: "Конференция", tall: false },
  { img: IMAGES.led, title: "LED Wall P2.6", cat: "Оборудование", tall: false },
  { img: IMAGES.outdoor, title: "Open Air Moscow", cat: "Outdoor", tall: false },
  { img: IMAGES.concert, title: "Pop Awards", cat: "Концерт", tall: true },
  { img: IMAGES.conference, title: "Business Summit", cat: "Конференция", tall: false },
];

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightbox, setLightbox] = useState<{ img: string; title: string } | null>(null);
  const [activeFilter, setActiveFilter] = useState("Все");
  const [scrolled, setScrolled] = useState(false);
  const [counters, setCounters] = useState({ events: 0, screens: 0, years: 0, clients: 0 });
  const statsRef = useRef<HTMLDivElement>(null);
  const statsAnimated = useRef(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !statsAnimated.current) {
        statsAnimated.current = true;
        animateCounters();
      }
    }, { threshold: 0.3 });
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const animateCounters = () => {
    const targets = { events: 850, screens: 120, years: 8, clients: 340 };
    const duration = 2000;
    const steps = 60;
    let step = 0;
    const interval = setInterval(() => {
      step++;
      const progress = step / steps;
      const ease = 1 - Math.pow(1 - progress, 3);
      setCounters({
        events: Math.round(targets.events * ease),
        screens: Math.round(targets.screens * ease),
        years: Math.round(targets.years * ease),
        clients: Math.round(targets.clients * ease),
      });
      if (step >= steps) clearInterval(interval);
    }, duration / steps);
  };

  const filters = ["Все", "Концерт", "Конференция", "Outdoor", "Оборудование"];
  const filteredGallery = activeFilter === "Все"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((i) => i.cat === activeFilter);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f0e8d0] overflow-x-hidden">

      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[rgba(201,162,39,0.15)]" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <span className="font-['Cormorant'] text-2xl font-bold gold-text tracking-widest">LUMIX</span>
            <span className="text-[10px] text-[rgba(201,162,39,0.6)] tracking-[0.3em] uppercase font-['Montserrat'] mt-1">LED</span>
          </a>
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <a key={l.label} href={l.href} className="nav-link">{l.label}</a>
            ))}
          </div>
          <a href="#contacts" className="hidden lg:block btn-gold px-5 py-2 text-xs rounded-sm font-['Montserrat']">
            Получить расчёт
          </a>
          <button className="lg:hidden text-[#c9a227]" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
        {menuOpen && (
          <div className="lg:hidden bg-[#0d0d0d] border-t border-[rgba(201,162,39,0.15)] px-6 py-4 flex flex-col gap-4">
            {NAV_LINKS.map((l) => (
              <a key={l.label} href={l.href} className="nav-link py-2" onClick={() => setMenuOpen(false)}>{l.label}</a>
            ))}
            <a href="#contacts" className="btn-gold px-5 py-2 text-xs rounded-sm text-center font-['Montserrat'] mt-2">Получить расчёт</a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMAGES.concert} alt="hero" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/60 via-[#0a0a0a]/40 to-[#0a0a0a]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/80 via-transparent to-[#0a0a0a]/60" />
        </div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-[rgba(201,162,39,0.04)] blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-[rgba(201,162,39,0.06)] blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 pt-20">
          <div className="max-w-3xl">
            <p className="section-tag mb-6 animate-fade-up opacity-0" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
              Премиальная аренда LED экранов
            </p>
            <h1 className="font-['Cormorant'] text-6xl md:text-8xl font-bold leading-[0.95] mb-8 animate-fade-up opacity-0" style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}>
              Свет,<br />
              <span className="gold-text italic">который</span><br />
              запомнят
            </h1>
            <p className="text-[rgba(240,232,208,0.65)] text-lg leading-relaxed max-w-xl mb-10 font-['Montserrat'] font-light animate-fade-up opacity-0" style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}>
              Профессиональные LED экраны для концертов, конференций и premium ивентов. Монтаж под ключ, техническая поддержка 24/7.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-up opacity-0" style={{ animationDelay: "0.8s", animationFillMode: "forwards" }}>
              <a href="#contacts" className="btn-gold px-8 py-4 rounded-sm font-['Montserrat'] text-sm">
                Рассчитать стоимость
              </a>
              <a href="#portfolio" className="btn-ghost px-8 py-4 rounded-sm font-['Montserrat'] text-sm">
                Смотреть работы
              </a>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-float">
          <a href="#services">
            <Icon name="ChevronDown" size={24} className="text-[rgba(201,162,39,0.5)]" />
          </a>
        </div>
      </section>

      {/* STATS */}
      <section ref={statsRef} className="py-16 border-y border-[rgba(201,162,39,0.15)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { val: counters.events, suffix: "+", label: "Мероприятий" },
              { val: counters.screens, suffix: " ед.", label: "Экранов в парке" },
              { val: counters.years, suffix: " лет", label: "На рынке" },
              { val: counters.clients, suffix: "+", label: "Довольных клиентов" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="font-['Cormorant'] text-5xl font-bold gold-text mb-2">
                  {s.val}{s.suffix}
                </div>
                <div className="text-[rgba(240,232,208,0.5)] text-xs tracking-[0.2em] uppercase font-['Montserrat']">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <p className="section-tag mb-4">Что мы делаем</p>
            <h2 className="font-['Cormorant'] text-5xl md:text-6xl font-bold">
              Наши <span className="gold-text italic">услуги</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((s, i) => (
              <div key={i} className="card-hover bg-[#0d0d0d] rounded-sm p-8">
                <div className="w-12 h-12 rounded-sm bg-[rgba(201,162,39,0.1)] flex items-center justify-center mb-6 border border-[rgba(201,162,39,0.2)]">
                  <Icon name={s.icon} size={20} className="text-[#c9a227]" />
                </div>
                <div className="text-[10px] text-[rgba(201,162,39,0.6)] tracking-[0.25em] uppercase mb-3 font-['Montserrat']">{s.tag}</div>
                <h3 className="font-['Cormorant'] text-2xl font-semibold mb-3">{s.title}</h3>
                <p className="text-[rgba(240,232,208,0.55)] text-sm leading-relaxed font-['Montserrat'] font-light">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO GALLERY */}
      <section id="portfolio" className="py-24 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <p className="section-tag mb-4">Наши работы</p>
              <h2 className="font-['Cormorant'] text-5xl md:text-6xl font-bold">
                <span className="gold-text italic">Портфолио</span>
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-4 py-2 text-xs tracking-[0.15em] uppercase font-['Montserrat'] rounded-sm transition-all ${
                    activeFilter === f
                      ? "bg-[#c9a227] text-[#0a0a0a] font-semibold"
                      : "border border-[rgba(201,162,39,0.3)] text-[rgba(201,162,39,0.7)] hover:border-[#c9a227]"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="columns-2 md:columns-3 gap-3 space-y-3">
            {filteredGallery.map((item, i) => (
              <div
                key={i}
                className="relative overflow-hidden rounded-sm cursor-pointer group break-inside-avoid mb-3"
                onClick={() => setLightbox({ img: item.img, title: item.title })}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${item.tall ? "h-80" : "h-48"}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <div className="text-[10px] text-[#c9a227] tracking-[0.2em] uppercase mb-1 font-['Montserrat']">{item.cat}</div>
                  <div className="font-['Cormorant'] text-lg font-semibold">{item.title}</div>
                </div>
                <div className="absolute top-3 right-3 w-8 h-8 rounded-sm bg-[rgba(201,162,39,0.9)] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Icon name="ZoomIn" size={14} className="text-[#0a0a0a]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      {lightbox && (
        <div className="lightbox-overlay" onClick={() => setLightbox(null)}>
          <button className="absolute top-6 right-6 text-[rgba(240,232,208,0.5)] hover:text-[#c9a227] transition-colors">
            <Icon name="X" size={28} />
          </button>
          <div className="max-w-5xl w-full mx-6" onClick={(e) => e.stopPropagation()}>
            <img src={lightbox.img} alt={lightbox.title} className="w-full h-auto rounded-sm max-h-[80vh] object-contain" />
            <p className="font-['Cormorant'] text-xl text-center mt-4 text-[rgba(240,232,208,0.7)]">{lightbox.title}</p>
          </div>
        </div>
      )}

      {/* EQUIPMENT */}
      <section id="equipment" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <p className="section-tag mb-4">Парк техники</p>
            <h2 className="font-['Cormorant'] text-5xl md:text-6xl font-bold">
              Оборудование <span className="gold-text italic">премиум-класса</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {EQUIPMENT.map((eq, i) => (
              <div key={i} className="card-hover bg-[#0d0d0d] rounded-sm overflow-hidden">
                <div className="relative h-52 overflow-hidden">
                  <img src={eq.img} alt={eq.name} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                  <div className="absolute top-3 left-3 px-3 py-1 bg-[#c9a227] rounded-sm text-[10px] font-semibold text-[#0a0a0a] tracking-[0.15em] uppercase font-['Montserrat']">
                    {eq.tag}
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-[10px] text-[rgba(201,162,39,0.6)] tracking-[0.25em] uppercase mb-2 font-['Montserrat']">{eq.type}</div>
                  <h3 className="font-['Cormorant'] text-2xl font-bold mb-4">{eq.name}</h3>
                  <div className="space-y-2 text-sm font-['Montserrat']">
                    {[
                      { label: "Шаг пикселя", val: eq.res },
                      { label: "Яркость", val: eq.brightness },
                      { label: "Макс. размер", val: eq.size },
                    ].map((spec, j) => (
                      <div key={j} className="flex justify-between items-center border-b border-[rgba(201,162,39,0.08)] pb-2">
                        <span className="text-[rgba(240,232,208,0.45)] text-xs">{spec.label}</span>
                        <span className="text-[rgba(240,232,208,0.85)] text-xs font-medium">{spec.val}</span>
                      </div>
                    ))}
                  </div>
                  <a href="#contacts" className="mt-6 w-full btn-ghost py-3 rounded-sm text-xs text-center block font-['Montserrat']">
                    Забронировать
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-24 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="section-tag mb-4">Тарифы</p>
            <h2 className="font-['Cormorant'] text-5xl md:text-6xl font-bold">
              Прозрачные <span className="gold-text italic">цены</span>
            </h2>
            <p className="text-[rgba(240,232,208,0.5)] text-sm mt-4 font-['Montserrat'] font-light">
              Финальная стоимость зависит от размера экрана, продолжительности и локации
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {PRICING.map((p, i) => (
              <div
                key={i}
                className={`relative rounded-sm p-8 transition-all duration-300 ${
                  p.highlight
                    ? "bg-[#0d0d0d] border border-[#c9a227] gold-glow"
                    : "bg-[#0d0d0d] border border-[rgba(201,162,39,0.1)] hover:border-[rgba(201,162,39,0.3)]"
                }`}
              >
                {p.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#c9a227] rounded-sm text-[10px] font-bold text-[#0a0a0a] tracking-[0.2em] uppercase font-['Montserrat']">
                    Популярный
                  </div>
                )}
                <div className="text-[10px] text-[rgba(201,162,39,0.6)] tracking-[0.3em] uppercase mb-4 font-['Montserrat']">{p.name}</div>
                <div className="mb-6">
                  <span className="font-['Cormorant'] text-4xl font-bold gold-text">{p.price}</span>
                  {p.period && <span className="text-[rgba(240,232,208,0.4)] text-sm ml-2 font-['Montserrat']">{p.period}</span>}
                </div>
                <div className="gold-divider mb-6" />
                <ul className="space-y-3 mb-8">
                  {p.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm font-['Montserrat'] text-[rgba(240,232,208,0.7)]">
                      <Icon name="Check" size={14} className="text-[#c9a227] flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contacts"
                  className={`block text-center py-3 rounded-sm text-xs font-['Montserrat'] ${
                    p.highlight ? "btn-gold" : "btn-ghost"
                  }`}
                >
                  Выбрать тариф
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <p className="section-tag mb-4">Клиенты о нас</p>
            <h2 className="font-['Cormorant'] text-5xl md:text-6xl font-bold">
              <span className="gold-text italic">Отзывы</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.map((r, i) => (
              <div key={i} className="card-hover bg-[#0d0d0d] rounded-sm p-8">
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <Icon key={j} name="Star" size={14} className="text-[#c9a227]" fallback="Star" />
                  ))}
                </div>
                <p className="text-[rgba(240,232,208,0.7)] text-sm leading-relaxed mb-6 font-['Montserrat'] font-light italic">
                  «{r.text}»
                </p>
                <div className="gold-divider mb-6" />
                <div>
                  <div className="font-['Cormorant'] text-lg font-semibold">{r.name}</div>
                  <div className="text-[rgba(201,162,39,0.6)] text-xs tracking-[0.15em] uppercase mt-1 font-['Montserrat']">{r.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section id="blog" className="py-24 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <p className="section-tag mb-4">Экспертиза</p>
              <h2 className="font-['Cormorant'] text-5xl md:text-6xl font-bold">
                <span className="gold-text italic">Блог</span>
              </h2>
            </div>
            <a href="#" className="btn-ghost px-6 py-3 rounded-sm text-xs font-['Montserrat'] inline-block">Все статьи</a>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {BLOG.map((b, i) => (
              <div key={i} className="card-hover bg-[#0d0d0d] rounded-sm overflow-hidden cursor-pointer group">
                <div className="relative h-48 overflow-hidden">
                  <img src={b.img} alt={b.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute top-3 left-3 px-3 py-1 bg-[rgba(10,10,10,0.8)] rounded-sm border border-[rgba(201,162,39,0.3)] text-[10px] text-[#c9a227] tracking-[0.15em] uppercase font-['Montserrat']">
                    {b.cat}
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-[rgba(240,232,208,0.35)] text-xs mb-3 font-['Montserrat']">{b.date}</div>
                  <h3 className="font-['Cormorant'] text-xl font-semibold leading-snug group-hover:text-[#c9a227] transition-colors">
                    {b.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMAGES.outdoor} alt="cta" className="w-full h-full object-cover opacity-15" />
          <div className="absolute inset-0 bg-[#0a0a0a]/80" />
        </div>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[rgba(201,162,39,0.05)] blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <p className="section-tag mb-6">Начните сейчас</p>
          <h2 className="font-['Cormorant'] text-5xl md:text-7xl font-bold mb-6">
            Ваше мероприятие<br />
            <span className="gold-text italic">заслуживает лучшего</span>
          </h2>
          <p className="text-[rgba(240,232,208,0.55)] text-base leading-relaxed mb-10 font-['Montserrat'] font-light max-w-xl mx-auto">
            Оставьте заявку — в течение часа перезвоним, обсудим задачу и подберём оптимальное решение.
          </p>
          <a href="#contacts" className="btn-gold px-10 py-4 rounded-sm font-['Montserrat'] text-sm inline-block">
            Оставить заявку
          </a>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <p className="section-tag mb-4">Связаться с нами</p>
              <h2 className="font-['Cormorant'] text-5xl font-bold mb-8">
                <span className="gold-text italic">Контакты</span>
              </h2>
              <div className="space-y-6">
                {[
                  { icon: "Phone", label: "Телефон", val: "+7 (495) 000-00-00" },
                  { icon: "Mail", label: "Email", val: "info@lumix-led.ru" },
                  { icon: "MapPin", label: "Адрес", val: "Москва, ул. Ленинская слобода, 26" },
                  { icon: "Clock", label: "Режим работы", val: "Пн-Вс: 9:00 — 21:00" },
                ].map((c, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-sm bg-[rgba(201,162,39,0.1)] flex items-center justify-center border border-[rgba(201,162,39,0.2)] flex-shrink-0">
                      <Icon name={c.icon} size={16} className="text-[#c9a227]" />
                    </div>
                    <div>
                      <div className="text-[10px] text-[rgba(201,162,39,0.6)] tracking-[0.2em] uppercase mb-1 font-['Montserrat']">{c.label}</div>
                      <div className="text-[rgba(240,232,208,0.8)] font-['Montserrat'] text-sm">{c.val}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#0d0d0d] rounded-sm p-8 border border-[rgba(201,162,39,0.1)]">
              <h3 className="font-['Cormorant'] text-3xl font-bold mb-2">Получить расчёт</h3>
              <p className="text-[rgba(240,232,208,0.45)] text-xs mb-8 font-['Montserrat']">Ответим в течение 1 часа</p>
              <div className="space-y-4">
                {[
                  { placeholder: "Ваше имя", type: "text" },
                  { placeholder: "Телефон", type: "tel" },
                  { placeholder: "Email", type: "email" },
                ].map((f, i) => (
                  <input
                    key={i}
                    type={f.type}
                    placeholder={f.placeholder}
                    className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(201,162,39,0.15)] focus:border-[rgba(201,162,39,0.5)] rounded-sm px-4 py-3 text-sm outline-none transition-colors font-['Montserrat'] text-[rgba(240,232,208,0.8)] placeholder-[rgba(240,232,208,0.25)]"
                  />
                ))}
                <select className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(201,162,39,0.15)] focus:border-[rgba(201,162,39,0.5)] rounded-sm px-4 py-3 text-sm outline-none transition-colors font-['Montserrat'] text-[rgba(240,232,208,0.5)]">
                  <option value="">Тип мероприятия</option>
                  <option>Концерт</option>
                  <option>Конференция</option>
                  <option>Ивент / Корпоратив</option>
                  <option>Выставка</option>
                  <option>Другое</option>
                </select>
                <textarea
                  placeholder="Описание задачи — дата, место, примерный размер экрана"
                  rows={4}
                  className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(201,162,39,0.15)] focus:border-[rgba(201,162,39,0.5)] rounded-sm px-4 py-3 text-sm outline-none transition-colors font-['Montserrat'] text-[rgba(240,232,208,0.8)] placeholder-[rgba(240,232,208,0.25)] resize-none"
                />
                <button className="w-full btn-gold py-4 rounded-sm font-['Montserrat'] text-sm">
                  Отправить заявку
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-[rgba(201,162,39,0.15)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <span className="font-['Cormorant'] text-2xl font-bold gold-text tracking-widest">LUMIX</span>
              <span className="text-[10px] text-[rgba(201,162,39,0.5)] tracking-[0.3em] uppercase font-['Montserrat'] mt-1">LED</span>
            </div>
            <div className="flex flex-wrap gap-6 justify-center">
              {NAV_LINKS.map((l) => (
                <a key={l.label} href={l.href} className="nav-link text-[10px]">{l.label}</a>
              ))}
            </div>
            <div className="flex gap-3">
              {["Instagram", "Youtube", "Send"].map((icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-sm border border-[rgba(201,162,39,0.2)] flex items-center justify-center text-[rgba(201,162,39,0.5)] hover:border-[#c9a227] hover:text-[#c9a227] transition-all">
                  <Icon name={icon} size={14} />
                </a>
              ))}
            </div>
          </div>
          <div className="gold-divider my-8" />
          <div className="text-center text-[rgba(240,232,208,0.25)] text-xs font-['Montserrat']">
            © 2026 LUMIX LED. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}