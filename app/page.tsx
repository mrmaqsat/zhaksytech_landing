"use client"

import type React from "react"

import { useState, useEffect } from "react"

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [expandedService, setExpandedService] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [isLoaded, setIsLoaded] = useState(false)
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
      setIsDarkMode(true)
      document.documentElement.classList.add("dark")
    }

    setTimeout(() => setIsLoaded(true), 100)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id))
          }
        })
      },
      { threshold: 0.1 },
    )

    const sections = document.querySelectorAll("[id]")
    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDarkMode
    setIsDarkMode(newTheme)
    localStorage.setItem("theme", newTheme ? "dark" : "light")
    document.documentElement.classList.toggle("dark", newTheme)
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/send-telegram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus("success")
        setFormData({ name: "", phone: "", email: "", message: "" })
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus("idle"), 5000)
    }
  }

  const services = [
    {
      title: "Разработка сайтов",
      description:
        "Создаем современные, быстрые и конверсионные лендинги, корпоративные сайты и интернет-магазины с уникальным дизайном.",
      features: ["Адаптивный дизайн", "SEO-оптимизация", "Быстрая загрузка", "Уникальный дизайн"],
    },
    {
      title: "SEO-оптимизация",
      description:
        "Выводим ваш сайт в топ поисковых систем (Яндекс, Google) для получения органического трафика и увеличения продаж.",
      features: ["Анализ конкурентов", "Техническая оптимизация", "Контент-оптимизация", "Отчеты и аналитика"],
    },
    {
      title: "Автоматизация",
      description:
        "Интегрируем Telegram-боты и CRM-системы для оптимизации бизнес-процессов и увеличения эффективности.",
      features: ["Telegram-боты", "CRM-системы", "Автоматизация процессов", "Интеграции"],
    },
  ]

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${isDarkMode ? "dark bg-gray-900 text-white" : "bg-white text-gray-900"}`}
    >
      {/* Header */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 transform ${
          isLoaded ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        } ${isDarkMode ? "bg-gray-900/95" : "bg-white/95"} backdrop-blur-sm border-b ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div
            className={`text-2xl font-bold transition-all duration-500 transform ${
              isLoaded ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
            }`}
          >
            Zhaksytech
          </div>

          {/* Desktop Navigation */}
          <nav
            className={`hidden md:flex items-center space-x-8 transition-all duration-700 transform ${
              isLoaded ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
            }`}
          >
            <button
              onClick={() => scrollToSection("services")}
              className="px-4 py-2 rounded-full bg-gray-900 text-white hover:bg-gray-800 hover:scale-105 transition-all duration-300"
            >
              Услуги
            </button>
            <button
              onClick={() => scrollToSection("cases")}
              className="px-4 py-2 rounded-full bg-gray-900 text-white hover:bg-gray-800 hover:scale-105 transition-all duration-300"
            >
              Кейсы
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="px-4 py-2 rounded-full bg-gray-900 text-white hover:bg-gray-800 hover:scale-105 transition-all duration-300"
            >
              О нас
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="px-4 py-2 rounded-full bg-gray-900 text-white hover:bg-gray-800 hover:scale-105 transition-all duration-300"
            >
              Контакты
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            <a
              href="tel:+77073803948"
              className={`hidden md:block text-lg font-semibold hover:text-red-500 hover:scale-105 transition-all duration-300 transform ${
                isLoaded ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              +7 707 380 39 48
            </a>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg hover:scale-110 transition-all duration-300 transform ${
                isLoaded ? "scale-100 opacity-100" : "scale-0 opacity-0"
              } ${isDarkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-100 hover:bg-gray-200"}`}
              style={{ transitionDelay: "300ms" }}
            >
              {isDarkMode ? "☀️" : "🌙"}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden p-2 hover:scale-110 transition-all duration-300 transform ${
                isLoaded ? "scale-100 opacity-100" : "scale-0 opacity-0"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span
                  className={`block w-5 h-0.5 ${isDarkMode ? "bg-white" : "bg-gray-900"} transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-1" : ""}`}
                ></span>
                <span
                  className={`block w-5 h-0.5 ${isDarkMode ? "bg-white" : "bg-gray-900"} transition-all duration-300 mt-1 ${isMenuOpen ? "opacity-0" : ""}`}
                ></span>
                <span
                  className={`block w-5 h-0.5 ${isDarkMode ? "bg-white" : "bg-gray-900"} transition-all duration-300 mt-1 ${isMenuOpen ? "-rotate-45 -translate-y-1" : ""}`}
                ></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          } ${isDarkMode ? "bg-gray-900" : "bg-white"} border-t ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}
        >
          <div className="container mx-auto px-4 py-4 space-y-4">
            {["services", "cases", "about", "contact"].map((section, index) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`block w-full text-left hover:text-red-500 hover:translate-x-2 transition-all duration-300 transform ${
                  isMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {section === "services"
                  ? "Услуги"
                  : section === "cases"
                    ? "Кейсы"
                    : section === "about"
                      ? "О нас"
                      : "Контакты"}
              </button>
            ))}
            <a
              href="tel:+77073803948"
              className={`block w-full text-left text-lg font-semibold hover:text-red-500 hover:translate-x-2 transition-all duration-300 transform ${
                isMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              +7 707 380 39 48
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 relative overflow-hidden gradient-mesh">
        {/* Background Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className={`text-[12rem] md:text-[20rem] font-black opacity-5 select-none transition-all duration-1000 transform ${
              isLoaded ? "scale-100 opacity-5" : "scale-110 opacity-0"
            } text-primary/20`}
          >
            Zhaksytech
          </div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <h1
                className={`text-4xl md:text-6xl font-bold mb-6 transition-all duration-800 transform bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent ${
                  isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
              >
                Ваш бизнес в интернете на автопилоте
              </h1>
              <p
                className={`text-lg md:text-xl mb-8 text-muted-foreground transition-all duration-800 transform ${
                  isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: "200ms" }}
              >
                Full-Cycle Digital Agency | Опыт с 2020 года
              </p>
              <p
                className={`text-base md:text-lg mb-8 text-muted-foreground transition-all duration-800 transform ${
                  isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: "400ms" }}
              >
                Разрабатываем сайты, создаем брендинг и запускаем эффективный performance-маркетинг, который приносит
                измеримый рост продаж.
              </p>

              {/* Service List */}
              <ul className="space-y-3 mb-8">
                {["Разработка сайтов и интернет-магазинов", "SEO-продвижение", "Автоматизация бизнес-процессов"].map(
                  (service, index) => (
                    <li
                      key={index}
                      className={`flex items-center transition-all duration-600 transform hover:translate-x-2 ${
                        isLoaded ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
                      }`}
                      style={{ transitionDelay: `${600 + index * 100}ms` }}
                    >
                      <span className="w-2 h-2 bg-primary rounded-full mr-3 animate-pulse"></span>
                      <span className="hover:text-primary transition-colors duration-300">{service}</span>
                    </li>
                  ),
                )}
              </ul>

              <div
                className={`flex flex-col sm:flex-row gap-4 transition-all duration-800 transform ${
                  isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: "900ms" }}
              >
                <button
                  onClick={() => scrollToSection("contact")}
                  className="px-8 py-4 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Получить предложение
                </button>

                <button
                  onClick={() => scrollToSection("cases")}
                  className="px-8 py-4 bg-transparent border-2 border-red-600 text-red-600 dark:text-red-400 rounded-lg font-semibold hover:bg-red-600 hover:text-white hover:scale-105 transition-all duration-300"
                >
                  Смотреть наши кейсы
                </button>
              </div>
            </div>

            <div
              className={`relative transition-all duration-1000 transform ${
                isLoaded ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
              }`}
              style={{ transitionDelay: "600ms" }}
            >
              {/* Enhanced geometric shapes with emerald theme */}
              <div className="relative">
                <div
                  className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-primary to-accent rounded-full opacity-20 transition-all duration-1000 transform animate-float ${
                    isLoaded ? "scale-100 rotate-0" : "scale-0 rotate-45"
                  }`}
                  style={{ transitionDelay: "800ms" }}
                ></div>
                <div
                  className={`absolute -bottom-10 -left-10 w-24 h-24 bg-gradient-to-tr from-accent to-primary opacity-30 transition-all duration-1000 transform animate-pulse-glow ${
                    isLoaded ? "scale-100 rotate-45" : "scale-0 rotate-90"
                  }`}
                  style={{ transitionDelay: "1000ms" }}
                ></div>
                <img
                  src="/classical-statue-digital-marketing.png"
                  alt="Digital Marketing"
                  className={`relative z-10 mx-auto transition-all duration-1000 transform hover:scale-105 ${
                    isLoaded ? "scale-100 opacity-100" : "scale-95 opacity-0"
                  }`}
                  style={{ transitionDelay: "700ms" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 px-4 bg-card">
        <div className="container mx-auto">
          <h2
            className={`text-3xl md:text-4xl font-bold text-center mb-4 transition-all duration-800 transform text-card-foreground ${
              visibleSections.has("services") ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            Наши услуги
          </h2>
          <p
            className={`text-center text-muted-foreground mb-12 max-w-3xl mx-auto transition-all duration-800 transform ${
              visibleSections.has("services") ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            Мы предлагаем полный спектр услуг для создания и продвижения вашего бизнеса в цифровом пространстве.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className={`bg-background rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:transform hover:scale-105 hover:-translate-y-2 transform border border-border hover:border-primary/50 ${
                  visibleSections.has("services") ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                }`}
                style={{ transitionDelay: `${400 + index * 200}ms` }}
              >
                <h3 className="text-xl font-bold mb-3 text-primary hover:text-accent transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-4">{service.description}</p>

                <div className="space-y-2 mb-4">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center group">
                      <span className="w-2 h-2 bg-primary rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></span>
                      <span className="text-sm group-hover:translate-x-1 transition-transform duration-300 group-hover:text-primary">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setExpandedService(expandedService === index ? null : index)}
                  className="text-primary hover:text-accent font-semibold hover:translate-x-1 transition-all duration-300"
                >
                  {expandedService === index ? "Скрыть детали" : "Подробнее"}
                </button>

                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    expandedService === index ? "max-h-32 opacity-100 mt-4" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="pt-4 border-t border-border">
                    <p className="text-sm text-muted-foreground">
                      Свяжитесь с нами для получения подробной консультации и расчета стоимости проекта под ваши задачи.
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="about" className="py-16 px-4">
        <div className="container mx-auto">
          <h2
            className={`text-3xl md:text-4xl font-bold text-center mb-4 transition-all duration-800 transform text-card-foreground ${
              visibleSections.has("about") ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            Почему выбирают нас
          </h2>
          <p
            className={`text-center text-muted-foreground mb-12 max-w-3xl mx-auto transition-all duration-800 transform ${
              visibleSections.has("about") ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            С 2020 года мы помогаем бизнесу расти, используя проверенные и инновационные методы цифрового маркетинга.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { number: "4+", label: "года опыта" },
              { number: "50+", label: "успешных проектов" },
              { number: "8+", label: "штатных специалистов" },
              { number: "40+", label: "клиентов остаются с нами" },
            ].map((stat, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-200 dark:border-gray-700 ${
                  visibleSections.has("about") ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
                style={{ transitionDelay: `${400 + index * 100}ms` }}
              >
                <div className="text-4xl font-bold text-emerald-600 mb-2">{stat.number}</div>
                <div className="text-gray-700 dark:text-gray-300 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cases Section */}
      <section id="cases" className={`py-16 px-4 ${isDarkMode ? "bg-gray-800" : "bg-gray-50"}`}>
        <div className="container mx-auto">
          <h2
            className={`text-3xl md:text-4xl font-bold text-center mb-4 transition-all duration-800 transform ${
              visibleSections.has("cases") ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            Наши кейсы
          </h2>
          <p
            className={`text-center text-muted-foreground mb-12 max-w-3xl mx-auto transition-all duration-800 transform ${
              visibleSections.has("cases") ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            Реальные истории успеха наших клиентов, основанные на данных и детальной аналитике результатов.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                category: "E-commerce",
                title: "Digital Mart",
                desc: "Разработка современного интернет-магазина с интеграцией платежных систем и системой управления заказами.",
                result: "Увеличили конверсию на 38%",
              },
              {
                category: "Automation",
                title: "HR-бот для найма",
                desc: "Создание Telegram-бота для автоматизации процесса подбора персонала и первичного скрининга кандидатов.",
                result: "Сократили время подбора на 35%",
              },
              {
                category: "FinTech",
                title: "AI-ассистент",
                desc: "Разработка AI-ассистента для финансовой отчетности с использованием машинного обучения и аналитики данных.",
                result: "Ускорили отчетность на 44%",
              },
            ].map((caseItem, index) => (
              <div
                key={index}
                className={`${isDarkMode ? "bg-gray-900" : "bg-white"} rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:transform hover:scale-105 hover:-translate-y-2 transform ${
                  visibleSections.has("cases") ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                }`}
                style={{ transitionDelay: `${400 + index * 200}ms` }}
              >
                <div className="text-sm text-primary font-semibold mb-2 hover:text-accent transition-colors duration-300">
                  {caseItem.category}
                </div>
                <h3 className="text-xl font-bold mb-3 hover:text-primary transition-colors duration-300">
                  {caseItem.title}
                </h3>
                <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"} mb-4`}>{caseItem.desc}</p>
                <div className="text-primary font-semibold hover:text-accent transition-colors duration-300">
                  {caseItem.result}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2
            className={`text-3xl md:text-4xl font-bold text-center mb-4 transition-all duration-800 transform ${
              visibleSections.has("contact") ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            Готовы обсудить ваш проект?
          </h2>
          <p
            className={`text-center text-muted-foreground mb-12 max-w-3xl mx-auto transition-all duration-800 transform ${
              visibleSections.has("contact") ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            Оставьте заявку, и мы свяжемся с вами в течение одного рабочего дня, чтобы обсудить цели и предложить
            эффективные решения для вашего бизнеса.
          </p>

          <div className="grid md:grid-cols-2 gap-12">
            <div
              className={`transition-all duration-800 transform ${
                visibleSections.has("contact") ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              <h3 className="text-2xl font-bold mb-6">Свяжитесь с нами</h3>
              <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"} mb-8`}>
                Заполните форму или используйте удобный для вас способ связи для обсуждения вашего проекта.
              </p>
              <div className="space-y-4">
                {[
                  { href: "tel:+77073803948", text: "+7 707 380 39 48", type: "phone" },
                  { href: "https://wa.me/77073803948", text: "WhatsApp", type: "whatsapp" },
                  { href: "https://t.me/zhaksy_tech", text: "@zhaksy_tech", type: "telegram" },
                  { href: "mailto:zhaksytech@gmail.com", text: "zhaksytech@gmail.com", type: "email" },
                ].map((contact, index) => (
                  <div
                    key={index}
                    className={`flex items-center group transition-all duration-500 transform ${
                      visibleSections.has("contact") ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
                    }`}
                    style={{ transitionDelay: `${600 + index * 100}ms` }}
                  >
                    <div className="w-8 h-8 mr-4 flex items-center justify-center bg-primary rounded-full group-hover:scale-125 transition-transform duration-300">
                      {contact.type === "phone" && (
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                      )}
                      {contact.type === "whatsapp" && (
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.1 4H3.9C3.4 4 3 4.4 3 4.9v14.2c0 .5.4 1 1 1h16.2c.5 0 1-.5 1-1V4.9c0-.5-.4-1-1-1zm0 10.2h8.2v6h-8.2v-6zm-1.5 2.1c2.3 0 4.2-1.9 4.2-4.2s-1.9-4.2-4.2-4.2-4.2 1.9-4.2 4.2 1.9 4.2 4.2 4.2zm3.1-9.3l-4.4 3.2c-.1.1-.2.2-.4.2-.3 0-.5-.1-.7-.2l-1.3-1.2c-.2-.2-.3-.5-.3-.7s.1-.5.3-.7l1.3-1.2c.2-.2.4-.3.7-.3.3 0 .5.1.7.2l4.4 3.2c.3.2.3.7 0 1-.4.3-1 .4-1.4 0l-3.2-4.4c-.2-.2-.5-.2-.7 0-.2.2-.2.6 0 .8l3.2 4.4z" />
                        </svg>
                      )}
                      {contact.type === "telegram" && (
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                        </svg>
                      )}
                      {contact.type === "email" && (
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      )}
                    </div>
                    <a
                      href={contact.href}
                      target={contact.type === "whatsapp" || contact.type === "telegram" ? "_blank" : undefined}
                      rel={
                        contact.type === "whatsapp" || contact.type === "telegram" ? "noopener noreferrer" : undefined
                      }
                      className="hover:text-primary group-hover:translate-x-2 transition-all duration-300"
                    >
                      {contact.text}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className={`space-y-6 transition-all duration-800 transform ${
                visibleSections.has("contact") ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
              }`}
              style={{ transitionDelay: "600ms" }}
            >
              {[
                { type: "text", placeholder: "Введите ваше имя *", value: formData.name, key: "name" },
                { type: "tel", placeholder: "Введите номер телефона *", value: formData.phone, key: "phone" },
                { type: "email", placeholder: "Введите ваш email *", value: formData.email, key: "email" },
              ].map((field, index) => (
                <div key={field.key}>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    value={field.value}
                    onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                    required
                    className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:scale-105 focus:shadow-lg ${isDarkMode ? "bg-gray-800 border-gray-700 text-white focus:border-primary placeholder-gray-400" : "bg-white border-gray-300 focus:border-primary placeholder-gray-500"} focus:outline-none`}
                  />
                </div>
              ))}
              <div>
                <textarea
                  placeholder="Расскажите подробнее о вашем проекте, целях и задачах *"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:scale-105 focus:shadow-lg ${isDarkMode ? "bg-gray-800 border-gray-700 text-white focus:border-primary placeholder-gray-400" : "bg-white border-gray-300 focus:border-primary placeholder-gray-500"} focus:outline-none resize-none`}
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 hover:scale-105 hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100"
              >
                {isSubmitting ? "Отправляем..." : "Отправить заявку"}
              </button>

              <div
                className={`transition-all duration-500 ${
                  submitStatus === "success"
                    ? "opacity-100 translate-y-0"
                    : submitStatus === "error"
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                }`}
              >
                {submitStatus === "success" && (
                  <p className="text-green-500 text-center">
                    Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.
                  </p>
                )}
                {submitStatus === "error" && (
                  <p className="text-red-500 text-center">
                    Произошла ошибка при отправке заявки. Пожалуйста, попробуйте еще раз.
                  </p>
                )}
              </div>

              <p className="text-xs text-muted-foreground text-center">
                Нажимая «Отправить», вы соглашаетесь с обработкой персональных данных.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`py-8 px-4 transition-all duration-800 transform ${
          visibleSections.has("contact") ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        } ${isDarkMode ? "bg-gray-900 border-t border-gray-800" : "bg-gray-50 border-t border-gray-200"}`}
        style={{ transitionDelay: "800ms" }}
      >
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div
              className={`transition-all duration-600 transform ${
                visibleSections.has("contact") ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: "1000ms" }}
            >
              <div className="text-2xl font-bold mb-4 hover:text-primary transition-colors duration-300">
                Zhaksytech
              </div>
              <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"} mb-4`}>
                Цифровое агентство полного цикла для роста вашего бизнеса. Создаем эффективные решения с 2020 года.
              </p>
            </div>
            <div
              className={`transition-all duration-600 transform ${
                visibleSections.has("contact") ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: "1100ms" }}
            >
              <h4 className="font-semibold mb-4">Навигация</h4>
              <div className="space-y-2">
                {[
                  { section: "services", label: "Услуги" },
                  { section: "cases", label: "Кейсы" },
                  { section: "about", label: "О нас" },
                  { section: "contact", label: "Контакты" },
                ].map((item, index) => (
                  <button
                    key={item.section}
                    onClick={() => scrollToSection(item.section)}
                    className="block hover:text-primary hover:translate-x-1 transition-all duration-300"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
            <div
              className={`transition-all duration-600 transform ${
                visibleSections.has("contact") ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: "1200ms" }}
            >
              <h4 className="font-semibold mb-4">Контакты</h4>
              <div className="space-y-2">
                <a
                  href="tel:+77073803948"
                  className="block hover:text-primary hover:translate-x-1 transition-all duration-300"
                >
                  +7 707 380 39 48
                </a>
                <a
                  href="https://wa.me/77073803948"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:text-primary hover:translate-x-1 transition-all duration-300"
                >
                  WhatsApp
                </a>
                <a
                  href="https://t.me/zhaksy_tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:text-primary hover:translate-x-1 transition-all duration-300"
                >
                  @zhaksy_tech
                </a>
                <a
                  href="mailto:zhaksytech@gmail.com"
                  className="block hover:text-primary hover:translate-x-1 transition-all duration-300"
                >
                  zhaksytech@gmail.com
                </a>
              </div>
            </div>
          </div>
          <div
            className={`border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 text-center transition-all duration-800 transform ${
              visibleSections.has("contact") ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
            style={{ transitionDelay: "1300ms" }}
          >
            <p
              className={`${isDarkMode ? "text-gray-500" : "text-gray-500"} text-sm hover:text-primary transition-colors duration-300`}
            >
              © 2025 Zhaksytech. Все права защищены.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
