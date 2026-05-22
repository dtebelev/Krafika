import { useState } from 'react';
import { 
  ShieldCheck, 
  Calendar, 
  MapPin, 
  Phone, 
  Check, 
  ChevronRight, 
  ArrowRight, 
  X, 
  Star, 
  Sliders, 
  Home, 
  Users, 
  Briefcase 
} from 'lucide-react';
import './App.css';

export default function App() {
  // Calculator State
  const [area, setArea] = useState(60);
  const [coating, setCoating] = useState('paint'); // paint, silk, microcement
  const [method, setMethod] = useState('roller'); // roller, spray
  const [surface, setSurface] = useState('smooth'); // smooth, plaster, porous
  const [layers, setLayers] = useState(2);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('Заказ выездного чемодана с выкрасами');
  const [modalCTA, setModalCTA] = useState('Получить выездной чемодан');
  
  // Form submission state
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', comments: '' });

  // Calculation Logic
  const calculateMaterials = () => {
    let baseConsumption = 150; // ml per m2 per coat
    let unit = 'л';
    
    if (coating === 'silk') {
      baseConsumption = 180; // ml per m2 per coat
    } else if (coating === 'microcement') {
      baseConsumption = 1250; // g per m2 per coat (usually 2 layers total 2.5kg)
      unit = 'кг';
    }

    const methodMultiplier = method === 'spray' ? 1.15 : 1.0;
    
    let surfaceMultiplier = 1.0;
    if (surface === 'smooth') surfaceMultiplier = 0.9;
    if (surface === 'plaster') surfaceMultiplier = 1.1;
    if (surface === 'porous') surfaceMultiplier = 1.25;

    // Total in ml or grams
    let total = area * baseConsumption * layers * methodMultiplier * surfaceMultiplier;
    
    if (coating === 'microcement') {
      // microcement is in kg, convert grams to kg
      const totalKg = (total / 1000).toFixed(1);
      const cans = Math.ceil(parseFloat(totalKg) / 15); // assuming 15kg cans
      return { total: parseFloat(totalKg), unit, cans, canSize: '15 кг' };
    } else {
      // Paint/plaster is in liters, convert ml to liters
      const totalLiters = (total / 1000).toFixed(1);
      const cans = Math.ceil(parseFloat(totalLiters) / 5); // assuming 5L cans
      return { total: parseFloat(totalLiters), unit, cans, canSize: '5 л' };
    }
  };

  const results = calculateMaterials();

  const handleOpenModal = (title: string, ctaText: string) => {
    setModalTitle(title);
    setModalCTA(ctaText);
    setIsModalOpen(true);
    setFormSubmitted(false);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#EFEFEA] text-[#1C1C1A] selection:bg-[#B89B64] selection:text-white font-sans flex flex-col antialiased">
      
      {/* 0. NAVIGATION (HEADER) */}
      <header className="sticky top-0 z-40 bg-[#EFEFEA]/90 backdrop-blur-md border-b border-[#D5C7B7]/40 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          {/* Logo Section - Text Only, Premium Typography */}
          <div className="flex items-center space-x-2">
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-[0.05em] uppercase text-[#1C1C1A]">Крафика</span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#B89B64] -mt-1 font-semibold">Центр Декора</span>
            </div>
          </div>
          
          {/* Menu for desktop */}
          <nav className="hidden md:flex space-x-8 text-[10px] font-medium uppercase tracking-[0.2em] text-[#1C1C1A]">
            <a href="#about" className="hover:text-[#B89B64] transition-colors duration-200">Почему мы</a>
            <a href="#services" className="hover:text-[#B89B64] transition-colors duration-200">Решения</a>
            <a href="#calculator" className="hover:text-[#B89B64] transition-colors duration-200">Расчет</a>
            <a href="#experts" className="hover:text-[#B89B64] transition-colors duration-200">Эксперты</a>
            <a href="#reviews" className="hover:text-[#B89B64] transition-colors duration-200">Отзывы</a>
          </nav>

          {/* Action Button */}
          <div className="flex items-center space-x-4">
            <a 
              href="tel:+7381200000" 
              className="hidden lg:flex items-center text-xs tracking-wider text-[#1C1C1A] font-medium hover:text-[#B89B64] transition-colors duration-200"
            >
              <Phone className="w-3.5 h-3.5 mr-2 text-[#B89B64]" />
              <span className="font-semibold">Омск, Красный Путь</span>
            </a>
            <button 
              onClick={() => handleOpenModal('Заказать обратный звонок технолога', 'Перезвонить мне')}
              className="border border-[#1C1C1A] text-[#1C1C1A] hover:bg-[#1C1C1A] hover:text-white px-5 py-2 text-[10px] uppercase tracking-[0.15em] font-medium transition-all duration-300 sharp"
            >
              Связаться
            </button>
          </div>
        </div>
      </header>

      {/* 1. HERO SECTION (Aligned perfectly with premium serif-display reference) */}
      <section className="relative min-h-[90vh] flex flex-col justify-center py-12 px-6 overflow-hidden">
        {/* Subtle warm gray editorial grid line */}
        <div className="absolute left-[8%] top-0 bottom-0 w-[1px] bg-[#D5C7B7]/30 hidden md:block"></div>
        
        {/* Circle badge exactly like the "I'm Tiffanie..." freelance reference badge */}
        <div className="absolute top-[8%] left-[4%] md:left-[10%] w-44 h-44 rounded-full bg-[#EFEFEA] border border-[#1C1C1A]/10 shadow-none flex flex-col items-center justify-center p-6 text-center z-20">
          <p className="text-[10px] font-sans font-bold uppercase tracking-[0.18em] text-[#1C1C1A] leading-tight">
            ЦЕНТР КРАФИКА
          </p>
          <p className="text-[9px] font-sans uppercase tracking-[0.15em] text-[#B89B64] font-semibold my-2">
            — В ОМСКЕ —
          </p>
          <p className="text-[9px] font-sans uppercase tracking-[0.08em] text-[#1C1C1A]/70 leading-normal max-w-[120px]">
            100% СОВПАДЕНИЕ СТЕН И ТЕКСТИЛЯ
          </p>
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10 pt-16 md:pt-8 text-left">
          {/* GIGANTIC EDITORIAL TITLE: КРАФИКА (Saves visual style from Aebele reference) */}
          <div className="relative mb-6 select-none">
            <h2 className="font-serif text-[18vw] sm:text-[14vw] md:text-[12vw] lg:text-[10.5vw] font-normal text-[#B89B64] leading-[0.85] tracking-tight uppercase select-none opacity-90 transition-all duration-500">
              КРАФИКА
            </h2>
            <div className="absolute bottom-0 right-[15%] text-[10px] uppercase tracking-[0.3em] text-[#1C1C1A] font-medium hidden md:block">
              INTELLECTUAL HOME HUB / EST. 2026
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Content (Cols 7) */}
            <div className="lg:col-span-7 flex flex-col space-y-6 md:pl-16">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#1C1C1A]/60">
                ПРЕМИАЛЬНЫЕ ИНТЕРЬЕРНЫЕ РЕШЕНИЯ
              </span>
              
              {/* Secondary Editorial Title */}
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#1C1C1A] leading-tight uppercase max-w-2xl">
                Интерьер без риска дешёвого вида: <br className="hidden sm:inline"/>
                <span className="italic text-[#B89B64] font-normal">точное совпадение</span> стен и текстиля.
              </h1>
              
              <p className="text-sm md:text-base font-light text-[#1C1C1A]/80 max-w-xl leading-relaxed">
                Избавляем от поездок по десяткам салонов Омска. Центр «Крафика» объединяет премиальные покрытия DERUFA, лепнину и ткани в единую бесшовную концепцию. Переносим ответственность за стыковку материалов и точность колеровки с вас на наших технологов.
              </p>
              
              {/* CTA buttons */}
              <div className="pt-4 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button 
                  onClick={() => handleOpenModal('Заказать выездной чемодан с выкрасами', 'Заказать тест-драйв')}
                  className="bg-[#132D42] text-white hover:bg-[#132D42]/90 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.18em] px-8 py-5 transition-all duration-300 text-center flex items-center justify-center space-x-2 sharp"
                >
                  <span>Получить «выездной чемодан» с выкрасами</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
                <a 
                  href="#calculator"
                  className="border border-[#1C1C1A] text-[#1C1C1A] hover:bg-[#1C1C1A] hover:text-white text-[10px] sm:text-xs font-semibold uppercase tracking-[0.18em] px-8 py-5 transition-all duration-300 text-center flex items-center justify-center sharp"
                >
                  Рассчитать объем
                </a>
              </div>
            </div>

            {/* Right Asymmetrical Architectural Frame (Cols 5) */}
            <div className="lg:col-span-5 relative mt-8 lg:mt-0 lg:-translate-y-8">
              <div className="aspect-[4/5] w-full max-w-sm mx-auto bg-[#D5C7B7]/45 relative border border-[#D5C7B7] p-3 flex flex-col justify-between text-left overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#132D42]/5 to-[#B89B64]/10 mix-blend-multiply z-0"></div>
                
                <div className="flex justify-between items-start z-10">
                  <span className="text-[9px] uppercase tracking-widest text-[#B89B64] font-bold">K R A F I K A</span>
                  <span className="text-[8px] border border-[#1C1C1A]/20 px-2 py-0.5 uppercase tracking-wider text-[#1C1C1A]/60 font-medium">DESIGN HUB</span>
                </div>
                
                {/* Visual architectural frame with gold border overlap */}
                <div className="my-auto w-full aspect-square bg-[#EFEFEA] border-l-4 border-[#B89B64] flex flex-col justify-center p-6 relative z-10 cursor-pointer group">
                  <span className="text-[8px] uppercase tracking-[0.2em] text-[#B89B64] font-bold mb-2">DERUFA PARTNER</span>
                  <h3 className="font-serif italic text-xl text-[#1C1C1A] leading-snug">
                    «Интерьер, который подчеркивает ваш статус, а не просто скрывает стены».
                  </h3>
                  <p className="text-[9px] uppercase tracking-wider text-[#1C1C1A]/50 mt-4 leading-normal">
                    Комплексные выкрасы на жестких планшетах для примерки на объекте.
                  </p>
                </div>

                <div className="flex justify-between items-end z-10 border-t border-[#D5C7B7]/60 pt-4">
                  <div className="flex flex-col">
                    <span className="text-[8px] text-[#1C1C1A]/50 uppercase tracking-widest">Салон</span>
                    <span className="text-[10px] font-semibold text-[#1C1C1A] tracking-wider">Омск, Красный Путь, 77</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#132D42] text-white flex items-center justify-center">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Micro-facts underneath CTA */}
          <div className="pt-12 mt-12 border-t border-[#D5C7B7]/60 grid grid-cols-1 md:grid-cols-3 gap-6 text-left md:pl-16">
            <div>
              <p className="text-xs text-[#B89B64] uppercase tracking-wider font-semibold">100% Совпадение цвета</p>
              <p className="text-[11px] text-[#1C1C1A]/70 leading-relaxed mt-1">Трёхступенчатый компьютерный контроль колеровки под любое освещение.</p>
            </div>
            <div>
              <p className="text-xs text-[#B89B64] uppercase tracking-wider font-semibold">0 рублей переплаты</p>
              <p className="text-[11px] text-[#1C1C1A]/70 leading-relaxed mt-1">Рассчитываем объем до 500 мл и выкупаем запечатанные излишки обратно.</p>
            </div>
            <div>
              <p className="text-xs text-[#B89B64] uppercase tracking-wider font-semibold">3 года реальной гарантии</p>
              <p className="text-[11px] text-[#1C1C1A]/70 leading-relaxed mt-1">Покрытия DERUFA выдерживают когти домашних животных и мытье с химией.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST SECTION */}
      <section id="about" className="py-24 bg-[#D5C7B7]/25 border-y border-[#D5C7B7]/40 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="max-w-3xl text-left mb-16 flex flex-col space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#B89B64]">БЕЗОПАСНОСТЬ И ТОЧНОСТЬ</span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#1C1C1A] uppercase tracking-wide">
              Почему ремонт с нами — это не лотерея
            </h2>
            <p className="text-sm md:text-base font-light text-[#1C1C1A]/80">
              Масс-маркет предлагает «низкие цены», а мы предлагаем исключительную точность расчетов, исключение рисков человеческой ошибки строителей и долговечность, доказанную реальными проектами в Омске.
            </p>
          </div>

          {/* Grid of benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {/* Benefit 1 */}
            <div className="bg-[#EFEFEA] p-8 border border-[#D5C7B7] flex flex-col justify-between h-full transition-all duration-300 hover:border-[#B89B64]">
              <div>
                <div className="text-[#B89B64] font-serif text-4xl md:text-5xl font-light mb-6">100%</div>
                <h3 className="font-semibold text-base uppercase tracking-wider text-[#1C1C1A] mb-3">Совпадение цвета</h3>
                <p className="text-xs md:text-sm text-[#1C1C1A]/80 leading-relaxed font-light">
                  Используем систему трехступенчатого компьютерного контроля колеровки. Оттенок на ваших стенах будет в точности равен выбранному образцу в салоне при любом типе освещения (утро, день, холодные диодные лампы).
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#D5C7B7]/40 text-[10px] text-[#B89B64] font-semibold uppercase tracking-widest flex items-center">
                <span>Гарантия по договору</span>
                <Check className="w-3 h-3 ml-2" />
              </div>
            </div>

            {/* Benefit 2 */}
            <div className="bg-[#EFEFEA] p-8 border border-[#D5C7B7] flex flex-col justify-between h-full transition-all duration-300 hover:border-[#B89B64]">
              <div>
                <div className="text-[#B89B64] font-serif text-4xl md:text-5xl font-light mb-6">0 ₽</div>
                <h3 className="font-semibold text-base uppercase tracking-wider text-[#1C1C1A] mb-3">Переплаты за излишки</h3>
                <p className="text-xs md:text-sm text-[#1C1C1A]/80 leading-relaxed font-light">
                  Рассчитываем объём материалов с точностью до 500 мл с учётом впитываемости и фактуры стен. Запечатанные остатки принимаем обратно в течение 14 дней с возвратом 100% стоимости. Забудьте о банках в гараже.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#D5C7B7]/40 text-[10px] text-[#B89B64] font-semibold uppercase tracking-widest flex items-center">
                <span>Выкуп остатков 100%</span>
                <Check className="w-3 h-3 ml-2" />
              </div>
            </div>

            {/* Benefit 3 */}
            <div className="bg-[#EFEFEA] p-8 border border-[#D5C7B7] flex flex-col justify-between h-full transition-all duration-300 hover:border-[#B89B64]">
              <div>
                <div className="text-[#B89B64] font-serif text-4xl md:text-5xl font-light mb-6">3 года</div>
                <h3 className="font-semibold text-base uppercase tracking-wider text-[#1C1C1A] mb-3">Реальной гарантии</h3>
                <p className="text-xs md:text-sm text-[#1C1C1A]/80 leading-relaxed font-light">
                  Покрытия DERUFA на омских объектах (от ЖК «Пушкина 77» до ресторана «Шато») выдерживают когти домашних животных, детские рисунки маркером и частую влажную уборку с химией без потери первоначального вида.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#D5C7B7]/40 text-[10px] text-[#B89B64] font-semibold uppercase tracking-widest flex items-center">
                <span>Опыт эксплуатации 3+ года</span>
                <Check className="w-3 h-3 ml-2" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SERVICES SECTION (PRODUCT MATRIX) */}
      <section id="services" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-4">
          <div className="max-w-2xl text-left">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#B89B64]">НАПРАВЛЕНИЯ РАБОТЫ</span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#1C1C1A] uppercase tracking-wide mt-2">
              Решения для жилых и коммерческих объектов
            </h2>
          </div>
          <div className="text-left text-xs uppercase tracking-widest text-[#B89B64] font-semibold border-b border-[#B89B64] pb-1 cursor-pointer hover:text-[#1C1C1A] hover:border-[#1C1C1A] transition-all duration-300">
            <span>Единое окно: Стены, лепнина & текстиль</span>
          </div>
        </div>

        {/* Asymmetrical Cards Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Card 1: Жилые интерьеры (Large left card) */}
          <div className="lg:col-span-8 bg-[#D5C7B7]/40 border border-[#D5C7B7] p-8 md:p-12 flex flex-col justify-between text-left transition-all duration-300 hover:border-[#B89B64] relative overflow-hidden">
            <div className="absolute right-0 top-0 w-24 h-24 bg-[#B89B64]/10 rounded-full blur-2xl pointer-events-none"></div>
            <div>
              <div className="flex justify-between items-center mb-8">
                <span className="text-xs font-serif italic text-[#B89B64]">01 / Жилое пространство</span>
                <Home className="w-5 h-5 text-[#B89B64]" />
              </div>
              <h3 className="font-serif text-2xl md:text-3xl text-[#1C1C1A] uppercase tracking-wider mb-6">
                Жилые интерьеры премиум-класса
              </h3>
              
              {/* Pain vs Result Block */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8 pt-6 border-t border-[#D5C7B7]">
                <div className="bg-[#EFEFEA]/50 p-4 border border-[#D5C7B7]/60">
                  <p className="text-[10px] uppercase tracking-widest text-red-700 font-bold mb-2">Риск & Боли</p>
                  <p className="text-xs text-[#1C1C1A]/80 leading-relaxed font-light">
                    Выбранный в магазине оттенок дома превратится в грязный цвет из-за другого освещения, полностью испортив вид дорогого ремонта и текстиля.
                  </p>
                </div>
                <div className="bg-[#EFEFEA] p-4 border border-[#B89B64]/50">
                  <p className="text-[10px] uppercase tracking-widest text-[#B89B64] font-bold mb-2">Наше решение</p>
                  <p className="text-xs text-[#1C1C1A] leading-relaxed font-semibold">
                    Безупречные стены без сюрпризов. Наш технолог привозит на ваш объект реальные выкрасы на жестких планшетах. Вы примеряете их при разном свете на ваших стенах до покупки.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="pt-6 flex justify-between items-center">
              <span className="text-xs text-[#1C1C1A]/60">Широкий спектр материалов DERUFA</span>
              <button 
                onClick={() => handleOpenModal('Консультация по жилым премиум-интерьерам', 'Оформить заявку на жилой интерьер')}
                className="bg-[#1C1C1A] text-white hover:bg-[#B89B64] px-6 py-3 text-[10px] uppercase tracking-[0.15em] font-medium transition-all duration-300 sharp"
              >
                Начать проект
              </button>
            </div>
          </div>

          {/* Card 2: Дизайнеры (Right top/smaller card) */}
          <div className="lg:col-span-4 bg-[#EFEFEA] border border-[#D5C7B7] p-8 flex flex-col justify-between text-left transition-all duration-300 hover:border-[#B89B64]">
            <div>
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-serif italic text-[#B89B64]">02 / Сотрудничество</span>
                <Users className="w-5 h-5 text-[#B89B64]" />
              </div>
              <h3 className="font-serif text-xl text-[#1C1C1A] uppercase tracking-wider mb-4">
                Комплексное снабжение для дизайнеров
              </h3>
              <p className="text-xs text-[#1C1C1A]/80 leading-relaxed font-light mb-6">
                Мы — ваш технический бэк-офис. Берем на себя сверку остатков, технологический надзор за мастерами и гарантируем точную стыковку штор по тону с декоративными покрытиями стен.
              </p>
              
              <div className="bg-[#D5C7B7]/30 p-4 border-l-2 border-[#B89B64] text-xs">
                <p className="font-semibold text-[#1C1C1A]">Гарантия попадания «тон в тон»</p>
                <p className="text-[11px] text-[#1C1C1A]/70 mt-1">Даже при дозаказе колеровки через 6 месяцев.</p>
              </div>
            </div>

            <div className="pt-8">
              <button 
                onClick={() => handleOpenModal('Снабжение и решения для дизайнеров', 'Стать партнером центра')}
                className="w-full border border-[#1C1C1A] text-[#1C1C1A] hover:bg-[#1C1C1A] hover:text-white py-3 text-[10px] uppercase tracking-[0.15em] font-medium transition-all duration-300 sharp text-center"
              >
                Дизайнерский хаб
              </button>
            </div>
          </div>

          {/* Card 3: Коммерция (Bottom full width card - spans across all 12 cols or left layout) */}
          <div className="lg:col-span-12 bg-[#132D42] text-white p-8 md:p-12 flex flex-col md:flex-row justify-between items-center gap-8 text-left border-l-8 border-[#B89B64]">
            <div className="max-w-3xl">
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-xs uppercase tracking-widest text-[#B89B64] font-bold">03 / B2B коммерция</span>
                <Briefcase className="w-4 h-4 text-[#B89B64]" />
              </div>
              <h3 className="font-serif text-2xl md:text-3xl text-white uppercase tracking-wider mb-4">
                Решения для коммерческих пространств (HoReCa & Beauty)
              </h3>
              <p className="text-xs md:text-sm text-white/80 leading-relaxed font-light">
                Обновление интерьера за 4 дня без остановки бизнеса. Наносим антивандальный микроцемент DERUFA прямо на старую плитку или краску в ночные смены. Сверхвысокая стойкость: покрытие выдерживает 1500 гостей в сутки и обработку жесткой дезинфицирующей химией.
              </p>
            </div>
            
            <div className="w-full md:w-auto shrink-0 flex flex-col space-y-3">
              <div className="text-center md:text-right">
                <p className="text-2xl font-serif text-[#B89B64]">0 дней</p>
                <p className="text-[9px] uppercase tracking-widest text-white/60">простоя вашего заведения</p>
              </div>
              <button 
                onClick={() => handleOpenModal('Заказать коммерческое снабжение (HoReCa)', 'Получить B2B расчет')}
                className="bg-[#B89B64] text-white hover:bg-white hover:text-[#132D42] px-6 py-4 text-[10px] uppercase tracking-[0.15em] font-medium transition-all duration-300 sharp text-center"
              >
                Коммерческое предложение
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 4. INTERACTIVE CALCULATOR SECTION */}
      <section id="calculator" className="py-24 bg-[#EFEFEA] border-t border-[#D5C7B7]/40 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Form & Controls (Left 7 Cols) */}
          <div className="lg:col-span-7 bg-[#D5C7B7]/25 border border-[#D5C7B7] p-8 md:p-12 text-left flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#B89B64]">ЭКСПЕРТНЫЙ ИНТЕРАКТИВ</span>
                <Sliders className="w-4 h-4 text-[#B89B64]" />
              </div>
              <h2 className="font-serif text-2xl md:text-3xl text-[#1C1C1A] uppercase tracking-wider mb-6">
                Калькулятор объема материалов
              </h2>
              <p className="text-xs md:text-sm text-[#1C1C1A]/80 leading-relaxed font-light mb-8">
                Не знаете, сколько купить материалов? Мы учитываем фактуру стен, метод нанесения и тип финиша, чтобы рассчитать точный объем до 500 мл. Если останется лишняя закрытая банка — мы заберем её обратно.
              </p>

              {/* Slider Input for Area */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs uppercase tracking-wider font-semibold text-[#1C1C1A]">Площадь стен по замеру:</label>
                  <span className="font-serif text-lg font-bold text-[#132D42]">{area} м²</span>
                </div>
                <input 
                  type="range" 
                  min="10" 
                  max="400" 
                  step="5"
                  value={area} 
                  onChange={(e) => setArea(parseInt(e.target.value))}
                  className="w-full accent-[#132D42] bg-[#D5C7B7] h-1"
                />
                <div className="flex justify-between text-[9px] text-[#1C1C1A]/50 mt-1 uppercase tracking-wider">
                  <span>10 м²</span>
                  <span>150 м²</span>
                  <span>300 м²</span>
                  <span>400+ м²</span>
                </div>
              </div>

              {/* Coating Type Selection */}
              <div className="mb-6">
                <label className="text-xs uppercase tracking-wider font-semibold text-[#1C1C1A] block mb-3">Тип декоративного покрытия:</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button 
                    onClick={() => { setCoating('paint'); setLayers(2); }}
                    className={`p-3 text-xs text-left uppercase tracking-wider font-semibold border transition-all duration-300 sharp ${coating === 'paint' ? 'border-[#132D42] bg-[#132D42] text-white' : 'border-[#D5C7B7] bg-white text-[#1C1C1A]'}`}
                  >
                    Краска DERUFA
                    <span className="block text-[8px] font-normal uppercase tracking-widest text-[#B89B64] mt-1">2 слоя</span>
                  </button>
                  <button 
                    onClick={() => { setCoating('silk'); setLayers(2); }}
                    className={`p-3 text-xs text-left uppercase tracking-wider font-semibold border transition-all duration-300 sharp ${coating === 'silk' ? 'border-[#132D42] bg-[#132D42] text-white' : 'border-[#D5C7B7] bg-white text-[#1C1C1A]'}`}
                  >
                    Штукатурка / Шелк
                    <span className="block text-[8px] font-normal uppercase tracking-widest text-[#B89B64] mt-1">2 слоя</span>
                  </button>
                  <button 
                    onClick={() => { setCoating('microcement'); setLayers(1); }}
                    className={`p-3 text-xs text-left uppercase tracking-wider font-semibold border transition-all duration-300 sharp ${coating === 'microcement' ? 'border-[#132D42] bg-[#132D42] text-white' : 'border-[#D5C7B7] bg-white text-[#1C1C1A]'}`}
                  >
                    Микроцемент
                    <span className="block text-[8px] font-normal uppercase tracking-widest text-[#B89B64] mt-1">Бесшовный финиш</span>
                  </button>
                </div>
              </div>

              {/* Two Column Selector: Method and Surface */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Method */}
                <div>
                  <label className="text-[10px] uppercase tracking-wider font-bold text-[#1C1C1A] block mb-2">Метод нанесения:</label>
                  <select 
                    value={method} 
                    onChange={(e) => setMethod(e.target.value)}
                    className="w-full p-3 border border-[#D5C7B7] bg-white text-xs sharp outline-none focus:border-[#132D42]"
                  >
                    <option value="roller">Валик или кисть (стандарт)</option>
                    <option value="spray">Краскопульт безвоздушный (+15%)</option>
                  </select>
                </div>
                {/* Surface */}
                <div>
                  <label className="text-[10px] uppercase tracking-wider font-bold text-[#1C1C1A] block mb-2">Фактура и впитываемость стен:</label>
                  <select 
                    value={surface} 
                    onChange={(e) => setSurface(e.target.value)}
                    className="w-full p-3 border border-[#D5C7B7] bg-white text-xs sharp outline-none focus:border-[#132D42]"
                  >
                    <option value="smooth">Гладкий гипсокартон (низкий расход)</option>
                    <option value="plaster">Оштукатуренная стена (средний)</option>
                    <option value="porous">Пористая / шероховатая (повышенный)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="text-[10px] text-[#1C1C1A]/60 italic border-t border-[#D5C7B7]/50 pt-4 flex items-center">
              <ShieldCheck className="w-3.5 h-3.5 mr-2 text-[#B89B64]" />
              <span>Расчет основан на сертифицированных технологических картах DERUFA.</span>
            </div>
          </div>

          {/* Calculation Output (Right 5 Cols) */}
          <div className="lg:col-span-5 bg-[#132D42] text-white p-8 md:p-12 text-left flex flex-col justify-between relative overflow-hidden border-t-8 lg:border-t-0 lg:border-l-8 border-[#B89B64]">
            {/* Minimal Background Grid Design */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
              <div className="w-full h-full bg-[radial-gradient(#FFFFFF_1px,transparent_1px)] [background-size:16px_16px]"></div>
            </div>

            <div className="relative z-10">
              <span className="text-[8px] uppercase tracking-[0.25em] text-[#B89B64] font-bold">ТОЧНОСТЬ РАСЧЕТА</span>
              <h3 className="font-serif text-2xl text-white uppercase tracking-wider mt-2 mb-8">Результат объема:</h3>
              
              <div className="space-y-6">
                <div className="border-b border-white/10 pb-4">
                  <span className="text-[10px] text-white/50 uppercase tracking-widest">Требуемый объём:</span>
                  <div className="flex items-baseline space-x-1 mt-1">
                    <span className="text-4xl md:text-5xl font-serif text-[#B89B64] font-semibold">{results.total}</span>
                    <span className="text-xl font-light text-white">{results.unit}</span>
                  </div>
                </div>

                <div className="border-b border-white/10 pb-4">
                  <span className="text-[10px] text-white/50 uppercase tracking-widest">Необходимое количество тар:</span>
                  <div className="flex items-baseline space-x-2 mt-1">
                    <span className="text-2xl font-serif font-bold text-white">{results.cans} шт.</span>
                    <span className="text-xs text-white/60">(в фасовках по {results.canSize})</span>
                  </div>
                </div>

                <div className="bg-white/5 p-4 border-l-2 border-[#B89B64]">
                  <p className="text-[10px] uppercase tracking-wider text-[#B89B64] font-bold">Защита от переплаты:</p>
                  <p className="text-xs text-white/80 leading-relaxed font-light mt-1">
                    Если маляры потребуют больше — наш инженер приедет на объект для аудита нанесения абсолютно бесплатно.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-12 relative z-10">
              <button 
                onClick={() => handleOpenModal(`Заказать точный расчет для ${area} м²`, 'Отправить параметры для выезда')}
                className="w-full bg-[#B89B64] text-white hover:bg-white hover:text-[#132D42] text-xs font-semibold uppercase tracking-[0.18em] py-4 transition-all duration-300 sharp text-center"
              >
                Забронировать выезд с выкрасами
              </button>
              <p className="text-[9px] text-center text-white/40 uppercase tracking-widest mt-3">выезд в черте Омска — бесплатно</p>
            </div>
          </div>

        </div>
      </section>

      {/* 5. EXPERTS SECTION (MASTEPA) */}
      <section id="experts" className="py-24 px-6 bg-[#D5C7B7]/15 border-y border-[#D5C7B7]/40">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="max-w-3xl text-left mb-16 flex flex-col space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#B89B64]">КОМАНДА ТЕХНОЛОГОВ</span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#1C1C1A] uppercase tracking-wide">
              Наши эксперты, а не продавцы
            </h2>
            <p className="text-sm md:text-base font-light text-[#1C1C1A]/80">
              С вами будут работать сертифицированные технологи с многолетним опытом работы с немецкими покрытиями DERUFA. Наша задача — техническое совершенство вашего интерьера.
            </p>
          </div>

          {/* Experts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Expert 1 */}
            <div className="bg-white border border-[#D5C7B7] flex flex-col justify-between text-left transition-all duration-300 hover:border-[#B89B64] group">
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] text-[#B89B64] uppercase tracking-widest font-bold">Колеровка & Химия</span>
                  <span className="text-xs font-serif text-[#1C1C1A]/40 font-semibold">Опыт 8 лет</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1C1C1A] mb-1">Игорь Радченко</h3>
                <p className="text-xs text-[#B89B64] uppercase tracking-wider font-semibold mb-6">Главный технолог по колеровке</p>
                <p className="text-xs text-[#1C1C1A]/80 leading-relaxed font-light">
                  Лично откалибровал более 420 сложных оттенков для омских интерьеров. Результат его работы: на объектах в ЖК «Пушкина 77» ни один дизайнер не зафиксировал отклонения от палитры, а строители сдали стены с первого предъявления.
                </p>
              </div>
              <div className="bg-[#1C1C1A] text-white p-4 text-[10px] uppercase tracking-wider font-semibold text-center group-hover:bg-[#B89B64] transition-colors duration-300">
                Задать вопрос Игорю
              </div>
            </div>

            {/* Expert 2 */}
            <div className="bg-white border border-[#D5C7B7] flex flex-col justify-between text-left transition-all duration-300 hover:border-[#B89B64] group">
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] text-[#B89B64] uppercase tracking-widest font-bold">Стиль & Текстиль</span>
                  <span className="text-xs font-serif text-[#1C1C1A]/40 font-semibold">115+ объектов</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1C1C1A] mb-1">Елена Власова</h3>
                <p className="text-xs text-[#B89B64] uppercase tracking-wider font-semibold mb-6">Ведущий эксперт по текстилю</p>
                <p className="text-xs text-[#1C1C1A]/80 leading-relaxed font-light">
                  Спроектировала и адаптировала текстильное оформление для частных резиденций и коммерческих зон. Результат: шторы и обивка мебели идеально «бьются» по тону и фактуре с декоративной штукатуркой, создавая единую концепцию без визуального шума.
                </p>
              </div>
              <div className="bg-[#1C1C1A] text-white p-4 text-[10px] uppercase tracking-wider font-semibold text-center group-hover:bg-[#B89B64] transition-colors duration-300">
                Задать вопрос Елене
              </div>
            </div>

            {/* Expert 3 */}
            <div className="bg-white border border-[#D5C7B7] flex flex-col justify-between text-left transition-all duration-300 hover:border-[#B89B64] group">
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] text-[#B89B64] uppercase tracking-widest font-bold">Нанесение & Бесшовность</span>
                  <span className="text-xs font-serif text-[#1C1C1A]/40 font-semibold">Высшая категория</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1C1C1A] mb-1">Дмитрий Седов</h3>
                <p className="text-xs text-[#B89B64] uppercase tracking-wider font-semibold mb-6">Мастер-аппликатор</p>
                <p className="text-xs text-[#1C1C1A]/80 leading-relaxed font-light">
                  Специализируется на нанесении бесшовных покрытий и микроцемента в премиальном сегменте. Результат: обновил интерьер залов известного ресторана «Шато» за 4 ночные смены без закрытия заведения. Покрытие держится без сколов третью зиму.
                </p>
              </div>
              <div className="bg-[#1C1C1A] text-white p-4 text-[10px] uppercase tracking-wider font-semibold text-center group-hover:bg-[#B89B64] transition-colors duration-300">
                Задать вопрос Дмитрию
              </div>
            </div>

          </div>

          {/* Social / Proof Banner for Omsk */}
          <div className="mt-16 bg-[#132D42] text-white p-8 border border-white/10 text-left flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#B89B64] font-bold">Живое портфолио в Омске</p>
              <h3 className="font-serif text-lg md:text-xl text-white mt-1 leading-relaxed">
                От ЖК «Пушкина 77» до ресторана «Шато». Посмотрите, как наши материалы ведут себя через 3 года эксплуатации.
              </h3>
            </div>
            <button 
              onClick={() => handleOpenModal('Запрос каталога объектов и портфолио в Омске', 'Получить портфолио')}
              className="bg-transparent border-2 border-white hover:bg-white hover:text-[#132D42] px-6 py-3 text-[10px] uppercase tracking-[0.15em] font-semibold transition-all duration-300 sharp shrink-0 w-full md:w-auto"
            >
              Смотреть объекты в Омске
            </button>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS SECTION */}
      <section id="reviews" className="py-24 max-w-7xl mx-auto px-6">
        <div className="max-w-3xl text-left mb-16 flex flex-col space-y-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#B89B64]">ОЦЕНКА КЛИЕНТОВ</span>
          <h2 className="font-serif text-3xl md:text-4xl text-[#1C1C1A] uppercase tracking-wide">
            Что о нас говорят в Омске
          </h2>
        </div>

        {/* Elegant Grid for Reviews */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Review 1 */}
          <div className="bg-[#D5C7B7]/20 border border-[#D5C7B7]/70 p-8 text-left flex flex-col justify-between relative">
            <div className="absolute right-6 top-8 text-5xl font-serif text-[#B89B64]/20 pointer-events-none">“</div>
            <div>
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#B89B64] text-[#B89B64]" />
                ))}
              </div>
              <p className="text-xs md:text-sm text-[#1C1C1A] leading-relaxed italic mb-8 font-light">
                «Делали ремонт в квартире, жутко боялись прогадать с цветом стен, так как окна выходят на северную сторону и в комнатах вечно темно. Ребята из Крафики привезли готовые большие планшеты прямо на объект. В итоге выбрали цвет, который в магазине вообще казался блеклым, а на наших стенах заиграл идеально. Отдельный плюс за то, что забрали обратно две нераспечатанные банки краски и сразу вернули деньги на карту без лишней волокиты. Рекомендую».
              </p>
            </div>
            <div className="border-t border-[#D5C7B7] pt-4 flex justify-between items-center">
              <div>
                <p className="font-serif text-sm font-semibold text-[#1C1C1A]">Михаил К.</p>
                <p className="text-[9px] uppercase tracking-widest text-[#1C1C1A]/50">Частный заказчик</p>
              </div>
              <span className="text-[9px] text-[#B89B64] font-semibold border border-[#B89B64]/30 px-2 py-0.5 rounded-full">Частный объект</span>
            </div>
          </div>

          {/* Review 2 */}
          <div className="bg-[#D5C7B7]/20 border border-[#D5C7B7]/70 p-8 text-left flex flex-col justify-between relative">
            <div className="absolute right-6 top-8 text-5xl font-serif text-[#B89B64]/20 pointer-events-none">“</div>
            <div>
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#B89B64] text-[#B89B64]" />
                ))}
              </div>
              <p className="text-xs md:text-sm text-[#1C1C1A] leading-relaxed italic mb-8 font-light">
                «Для дизайнера Крафика — это спасение. Больше не нужно бегать между текстильщиками и салонами декоративки, пытаясь состыковать оттенки. Здесь менеджеры сами ведут весь проект, проверяют строителей и контролируют тон колеровки. Заказывала у них микроцемент DERUFA и шторы в один проект — всё приехало минута в минуту, совпадение по цвету стопроцентное. Клиент доволен, я спокойна за свою репутацию».
              </p>
            </div>
            <div className="border-t border-[#D5C7B7] pt-4 flex justify-between items-center">
              <div>
                <p className="font-serif text-sm font-semibold text-[#1C1C1A]">Анна Ш.</p>
                <p className="text-[9px] uppercase tracking-widest text-[#1C1C1A]/50">Дизайнер интерьеров</p>
              </div>
              <span className="text-[9px] text-[#B89B64] font-semibold border border-[#B89B64]/30 px-2 py-0.5 rounded-full">B2B Партнер</span>
            </div>
          </div>

          {/* Review 3 */}
          <div className="bg-[#D5C7B7]/20 border border-[#D5C7B7]/70 p-8 text-left flex flex-col justify-between relative">
            <div className="absolute right-6 top-8 text-5xl font-serif text-[#B89B64]/20 pointer-events-none">“</div>
            <div>
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#B89B64] text-[#B89B64]" />
                ))}
              </div>
              <p className="text-xs md:text-sm text-[#1C1C1A] leading-relaxed italic mb-8 font-light">
                «Стояла задача освежить входную группу и основной зал в кофейне, но закрываться даже на три дня — это огромные убытки. Обратились по поводу микроцемента. Мастера работали исключительно ночью, утром кофейня открывалась вовремя и без запаха отделочных материалов. Нанесли прямо на старое покрытие. Прошло полгода, проходимость у нас бешеная, стены моем каждый день жесткой химией — ни одной царапины или пятна от кофе. Факты говорят сами за себя».
              </p>
            </div>
            <div className="border-t border-[#D5C7B7] pt-4 flex justify-between items-center">
              <div>
                <p className="font-serif text-sm font-semibold text-[#1C1C1A]">Сергей</p>
                <p className="text-[9px] uppercase tracking-widest text-[#1C1C1A]/50">Управляющий партнер</p>
              </div>
              <span className="text-[9px] text-[#B89B64] font-semibold border border-[#B89B64]/30 px-2 py-0.5 rounded-full">Коммерция</span>
            </div>
          </div>

        </div>
      </section>

      {/* 7. FORM SECTION (CAPTURE) */}
      <section className="py-24 bg-[#132D42] text-white px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Info */}
          <div className="lg:col-span-6 text-left flex flex-col space-y-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#B89B64]">ЧЕСТНЫЙ МАРКЕТИНГ</span>
            <h2 className="font-serif text-3xl md:text-4xl text-white uppercase tracking-wide leading-tight">
              Никакого навязчивого маркетинга
            </h2>
            <p className="text-xs md:text-sm text-white/80 leading-relaxed font-light">
              Мы уважаем ваше время и нервы. Оставьте контакты, и с вами свяжется **инженер-технолог**, а не навязчивый менеджер по продажам с бесполезными скриптами. 
            </p>
            
            <div className="space-y-4 pt-4">
              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 bg-[#B89B64]/20 text-[#B89B64] flex items-center justify-center rounded-full mt-0.5">
                  <Check className="w-3 h-3" />
                </div>
                <p className="text-xs text-white/90">Спам полностью исключен: отправляем только технические расчеты.</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 bg-[#B89B64]/20 text-[#B89B64] flex items-center justify-center rounded-full mt-0.5">
                  <Check className="w-3 h-3" />
                </div>
                <p className="text-xs text-white/90">Сразу предложим удобное время для бесплатной примерки реальных выкрасов при вашем освещении.</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-6 bg-white p-8 md:p-10 border-t-8 border-[#B89B64] text-[#1C1C1A]">
            {formSubmitted ? (
              <div className="py-12 text-center flex flex-col items-center justify-center space-y-4 animate-fade-in">
                <div className="w-16 h-16 bg-[#D5C7B7]/40 rounded-full flex items-center justify-center text-[#B89B64] mb-2 border border-[#B89B64]/30">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl uppercase tracking-wider text-[#1C1C1A]">Заявка принята</h3>
                <p className="text-xs text-[#1C1C1A]/70 max-w-sm mx-auto leading-relaxed font-light">
                  Благодарим за доверие. Наш ведущий технолог уже ознакомился с параметрами вашего запроса и свяжется с вами в течение 30 минут без навязчивой рекламы.
                </p>
                <button 
                  onClick={() => setFormSubmitted(false)}
                  className="mt-6 border border-[#1C1C1A] px-6 py-2.5 text-[10px] uppercase tracking-wider font-semibold hover:bg-[#1C1C1A] hover:text-white transition-colors duration-300 sharp"
                >
                  Вернуться назад
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <p className="text-xs font-semibold text-[#1C1C1A] uppercase tracking-wider text-center border-b border-[#D5C7B7] pb-3 mb-6">
                  Заказать разбор от инженера
                </p>
                
                <div>
                  <label className="text-[9px] uppercase tracking-widest text-[#1C1C1A]/50 block mb-1 font-semibold">Ваше имя *</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    placeholder="Например, Александр"
                    value={formData.name}
                    onChange={handleFormChange}
                    className="w-full p-3 border border-[#D5C7B7] bg-[#EFEFEA]/30 text-xs sharp outline-none focus:border-[#132D42] text-[#1C1C1A]"
                  />
                </div>

                <div>
                  <label className="text-[9px] uppercase tracking-widest text-[#1C1C1A]/50 block mb-1 font-semibold">Номер телефона *</label>
                  <input 
                    type="tel" 
                    name="phone"
                    required
                    placeholder="+7 (___) ___-__-__"
                    value={formData.phone}
                    onChange={handleFormChange}
                    className="w-full p-3 border border-[#D5C7B7] bg-[#EFEFEA]/30 text-xs sharp outline-none focus:border-[#132D42] text-[#1C1C1A]"
                  />
                </div>

                <div>
                  <label className="text-[9px] uppercase tracking-widest text-[#1C1C1A]/50 block mb-1 font-semibold">Комментарий или площадь объекта (необязательно)</label>
                  <textarea 
                    name="comments"
                    rows={3}
                    placeholder="Параметры стен, ЖК, или удобное время для звонка..."
                    value={formData.comments}
                    onChange={handleFormChange}
                    className="w-full p-3 border border-[#D5C7B7] bg-[#EFEFEA]/30 text-xs sharp outline-none focus:border-[#132D42] text-[#1C1C1A] resize-none"
                  ></textarea>
                </div>

                <div className="pt-4">
                  <button 
                    type="submit"
                    className="w-full bg-[#132D42] text-white hover:bg-[#B89B64] text-xs font-semibold uppercase tracking-[0.18em] py-4 transition-all duration-300 sharp text-center"
                  >
                    Получить разбор от инженера-технолога
                  </button>
                  <p className="text-[9px] text-center text-[#1C1C1A]/40 uppercase tracking-widest mt-3">мы не рассылаем спам</p>
                </div>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* 8. FOOTER AND OFFICE TEST-DRIVE */}
      <footer className="bg-[#EFEFEA] border-t border-[#D5C7B7] text-[#1C1C1A] py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 text-left">
          
          {/* Branding (Left 4 Cols) */}
          <div className="md:col-span-4 flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold uppercase tracking-wider text-[#1C1C1A]">Крафика</span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-[#B89B64] -mt-1 font-semibold">Центр Декора</span>
              </div>
            </div>
            <p className="text-xs text-[#1C1C1A]/70 leading-relaxed font-light max-w-sm">
              Интеллектуальный хаб премиальных интерьерных решений. Официальный сертифицированный партнер DERUFA в Омске. Декоративные покрытия, текстиль и лепнина в одном месте.
            </p>
            <p className="text-[9px] text-[#1C1C1A]/40 uppercase tracking-widest pt-4">
              © {new Date().getFullYear()} Центр Декора «Крафика». Все права защищены.
            </p>
          </div>

          {/* Test Drive CTA (Middle 4 Cols) */}
          <div className="md:col-span-4 flex flex-col space-y-4 border-t md:border-t-0 md:border-x border-[#D5C7B7] pt-8 md:pt-0 md:px-8">
            <h4 className="font-serif text-base uppercase tracking-wider font-semibold text-[#1C1C1A]">Живой тест-драйв:</h4>
            <p className="text-xs text-[#1C1C1A]/80 leading-relaxed font-light">
              Не верите на слово? Приходите на чашку свежего кофе к нам в салон на **живой тест-драйв фактур**. Вы сможете лично поцарапать микроцемент, оценить текстиль на ощупь и протестировать цвета под профессиональными лампами.
            </p>
            <button 
              onClick={() => handleOpenModal('Запись на живой тест-драйв материалов', 'Записаться на тест-драйв')}
              className="text-xs text-[#B89B64] font-semibold uppercase tracking-wider hover:text-[#1C1C1A] text-left flex items-center transition-colors duration-200 mt-2"
            >
              <span>Записаться на кофе-тест</span>
              <ArrowRight className="w-3.5 h-3.5 ml-2" />
            </button>
          </div>

          {/* Contacts (Right 4 Cols) */}
          <div className="md:col-span-4 flex flex-col space-y-4 pt-8 md:pt-0">
            <h4 className="font-serif text-base uppercase tracking-wider font-semibold text-[#1C1C1A]">Контакты & Салон:</h4>
            <div className="space-y-3 text-xs">
              <p className="flex items-start">
                <MapPin className="w-4 h-4 mr-3 text-[#B89B64] shrink-0 mt-0.5" />
                <span className="text-[#1C1C1A]/80 leading-relaxed font-light">г. Омск, ул. Красный Путь, д. 77 (Центр)</span>
              </p>
              <p className="flex items-center">
                <Phone className="w-4 h-4 mr-3 text-[#B89B64] shrink-0" />
                <a href="tel:+7381200000" className="text-[#1C1C1A] font-semibold hover:text-[#B89B64]">+7 (3812) 00-00-00</a>
              </p>
              <p className="flex items-start">
                <Calendar className="w-4 h-4 mr-3 text-[#B89B64] shrink-0 mt-0.5" />
                <span className="text-[#1C1C1A]/80 font-light">Пн–Сб: с 10:00 до 19:00<br/>Вс: выходной (или по записи для дизайнеров)</span>
              </p>
            </div>
            
            <div className="pt-2">
              <span className="inline-block text-[9px] uppercase tracking-widest text-[#B89B64] border border-[#B89B64] px-3 py-1 font-semibold">
                Технический офис Омск
              </span>
            </div>
          </div>

        </div>
      </footer>

      {/* 9. MODAL POPUP FOR LEAD CAPTURE */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1C1A]/85 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#EFEFEA] w-full max-w-lg border-t-8 border-[#B89B64] p-8 md:p-10 relative sharp shadow-2xl">
            {/* Close Button */}
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-[#1C1C1A] hover:text-[#B89B64] transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>

            {formSubmitted ? (
              <div className="py-8 text-center flex flex-col items-center justify-center space-y-4">
                <div className="w-16 h-16 bg-[#D5C7B7]/40 rounded-full flex items-center justify-center text-[#B89B64] mb-2 border border-[#B89B64]/30">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl uppercase tracking-wider text-[#1C1C1A]">Заявка принята</h3>
                <p className="text-xs text-[#1C1C1A]/70 max-w-sm mx-auto leading-relaxed font-light">
                  Спасибо за обращение! Наш инженер-технолог уже готовит информацию по вашему запросу. Мы свяжемся с вами в течение получаса.
                </p>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="mt-6 bg-[#132D42] text-white px-8 py-3 text-[10px] uppercase tracking-wider font-semibold hover:bg-[#B89B64] transition-colors duration-300 sharp"
                >
                  Закрыть окно
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4 text-left">
                <h3 className="font-serif text-xl text-[#1C1C1A] uppercase tracking-wider border-b border-[#D5C7B7] pb-3 mb-6">
                  {modalTitle}
                </h3>
                
                <div>
                  <label className="text-[9px] uppercase tracking-widest text-[#1C1C1A]/50 block mb-1 font-semibold">Ваше имя *</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    placeholder="Например, Дмитрий"
                    value={formData.name}
                    onChange={handleFormChange}
                    className="w-full p-3 border border-[#D5C7B7] bg-[#EFEFEA]/30 text-xs sharp outline-none focus:border-[#132D42] text-[#1C1C1A]"
                  />
                </div>

                <div>
                  <label className="text-[9px] uppercase tracking-widest text-[#1C1C1A]/50 block mb-1 font-semibold">Номер телефона *</label>
                  <input 
                    type="tel" 
                    name="phone"
                    required
                    placeholder="+7 (___) ___-__-__"
                    value={formData.phone}
                    onChange={handleFormChange}
                    className="w-full p-3 border border-[#D5C7B7] bg-[#EFEFEA]/30 text-xs sharp outline-none focus:border-[#132D42] text-[#1C1C1A]"
                  />
                </div>

                <div>
                  <label className="text-[9px] uppercase tracking-widest text-[#1C1C1A]/50 block mb-1 font-semibold">Комментарий или пожелания (необязательно)</label>
                  <textarea 
                    name="comments"
                    rows={3}
                    placeholder="ЖК, площадь стен, тип покрытия, удобное время для приезда..."
                    value={formData.comments}
                    onChange={handleFormChange}
                    className="w-full p-3 border border-[#D5C7B7] bg-[#EFEFEA]/30 text-xs sharp outline-none focus:border-[#132D42] text-[#1C1C1A] resize-none"
                  ></textarea>
                </div>

                <div className="pt-4">
                  <button 
                    type="submit"
                    className="w-full bg-[#132D42] text-white hover:bg-[#B89B64] text-xs font-semibold uppercase tracking-[0.18em] py-4 transition-all duration-300 sharp text-center"
                  >
                    {modalCTA}
                  </button>
                  <p className="text-[8px] text-center text-[#1C1C1A]/40 uppercase tracking-widest mt-3">
                    Соглашаясь, вы получаете бесплатную экспертную консультацию без спама
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
