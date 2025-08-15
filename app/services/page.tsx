"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Code, Palette, TrendingUp, Target, Share2, Zap, CheckCircle, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function ServicesPage() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [activeService, setActiveService] = useState(0)

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDarkMode(true)
      document.documentElement.classList.add("dark")
    }
  }, [])

  const services = [
    {
      id: "web-development",
      title: "Веб-разработка",
      icon: Code,
      description: "Создаем современные, быстрые и адаптивные веб-сайты и приложения",
      fullDescription:
        "Наша команда разработчиков создает высококачественные веб-решения, используя современные технологии и лучшие практики. Мы специализируемся на создании быстрых, безопасных и масштабируемых веб-приложений.",
      features: [
        "Адаптивный дизайн для всех устройств",
        "Оптимизация скорости загрузки",
        "SEO-оптимизация",
        "Интеграция с CMS системами",
        "E-commerce решения",
        "Техническая поддержка 24/7",
      ],
      technologies: ["React", "Next.js", "Node.js", "TypeScript", "MongoDB", "PostgreSQL"],
      price: "от 150,000 ₸",
      duration: "2-8 недель",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "branding",
      title: "Брендинг и дизайн",
      icon: Palette,
      description: "Разрабатываем уникальную визуальную идентичность для вашего бренда",
      fullDescription:
        "Создаем комплексную визуальную идентичность, которая отражает ценности вашего бренда и привлекает целевую аудиторию. От логотипа до полного брендбука.",
      features: [
        "Разработка логотипа и фирменного стиля",
        "Создание брендбука",
        "Дизайн упаковки и полиграфии",
        "Веб-дизайн и UI/UX",
        "Социальные медиа дизайн",
        "Ребрендинг существующих компаний",
      ],
      technologies: ["Adobe Creative Suite", "Figma", "Sketch", "Principle", "InVision"],
      price: "от 100,000 ₸",
      duration: "1-4 недели",
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "seo",
      title: "SEO продвижение",
      icon: TrendingUp,
      description: "Повышаем видимость вашего сайта в поисковых системах",
      fullDescription:
        "Комплексное SEO продвижение, включающее техническую оптимизацию, контент-маркетинг и наращивание ссылочной массы для достижения топовых позиций в поиске.",
      features: [
        "Техническая SEO оптимизация",
        "Исследование ключевых слов",
        "Контент-маркетинг",
        "Локальное SEO",
        "Аналитика и отчетность",
        "Оптимизация скорости сайта",
      ],
      technologies: ["Google Analytics", "Search Console", "Ahrefs", "SEMrush", "Screaming Frog"],
      price: "от 80,000 ₸/мес",
      duration: "3-12 месяцев",
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "advertising",
      title: "Контекстная реклама",
      icon: Target,
      description: "Настраиваем эффективную рекламу в Google Ads и Яндекс.Директ",
      fullDescription:
        "Профессиональная настройка и ведение рекламных кампаний с максимальной конверсией и минимальной стоимостью привлечения клиентов.",
      features: [
        "Настройка Google Ads и Яндекс.Директ",
        "Ретаргетинг и ремаркетинг",
        "A/B тестирование объявлений",
        "Оптимизация конверсий",
        "Аналитика и отчеты",
        "Управление бюджетом",
      ],
      technologies: ["Google Ads", "Яндекс.Директ", "Facebook Ads", "Google Tag Manager"],
      price: "от 50,000 ₸/мес",
      duration: "от 1 месяца",
      color: "from-orange-500 to-red-500",
    },
    {
      id: "smm",
      title: "SMM продвижение",
      icon: Share2,
      description: "Развиваем ваш бренд в социальных сетях",
      fullDescription:
        "Комплексное продвижение в социальных сетях: от создания контент-стратегии до ведения сообществ и запуска таргетированной рекламы.",
      features: [
        "Разработка контент-стратегии",
        "Создание и публикация контента",
        "Ведение сообществ",
        "Таргетированная реклама",
        "Работа с блогерами",
        "Аналитика эффективности",
      ],
      technologies: ["Facebook Business", "Instagram Creator Studio", "Hootsuite", "Buffer"],
      price: "от 60,000 ₸/мес",
      duration: "от 1 месяца",
      color: "from-pink-500 to-rose-500",
    },
    {
      id: "automation",
      title: "Автоматизация бизнеса",
      icon: Zap,
      description: "Автоматизируем рутинные процессы и повышаем эффективность",
      fullDescription:
        "Внедряем системы автоматизации для оптимизации бизнес-процессов, снижения затрат и повышения производительности вашей команды.",
      features: [
        "CRM системы",
        "Автоматизация продаж",
        "Интеграция сервисов",
        "Чат-боты и автоответчики",
        "Автоматические отчеты",
        "Workflow оптимизация",
      ],
      technologies: ["Zapier", "Make.com", "Bitrix24", "AmoCRM", "Telegram Bot API"],
      price: "от 120,000 ₸",
      duration: "2-6 недель",
      color: "from-yellow-500 to-amber-500",
    },
  ]

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDarkMode ? "dark bg-gray-900" : "bg-white"}`}>
      {/* Header */}
      <header
        className={`sticky top-0 z-50 ${isDarkMode ? "bg-gray-900/95 border-gray-700/50" : "bg-white/95 border-gray-200/50"} backdrop-blur-md border-b`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/">
              <Button variant="ghost" className="flex items-center space-x-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Назад на главную</span>
              </Button>
            </Link>
            <h1 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Наши услуги</h1>
            <div className="w-24" />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 via-white to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className={`text-4xl md:text-6xl font-bold mb-6 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            Полный спектр
            <span className="block bg-gradient-to-r from-cyan-600 to-amber-500 bg-clip-text text-transparent">
              цифровых услуг
            </span>
          </h1>
          <p className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
            Помогаем бизнесу расти в цифровой среде с помощью современных технологий и проверенных стратегий
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Services List */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-4">
                {services.map((service, index) => {
                  const Icon = service.icon
                  return (
                    <button
                      key={service.id}
                      onClick={() => setActiveService(index)}
                      className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                        activeService === index
                          ? `bg-gradient-to-r ${service.color} text-white shadow-lg`
                          : `${isDarkMode ? "bg-gray-800 hover:bg-gray-700 text-gray-300" : "bg-gray-50 hover:bg-gray-100 text-gray-700"}`
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="w-6 h-6" />
                        <div>
                          <h3 className="font-semibold">{service.title}</h3>
                          <p
                            className={`text-sm ${activeService === index ? "text-white/80" : isDarkMode ? "text-gray-400" : "text-gray-500"}`}
                          >
                            {service.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Service Details */}
            <div className="lg:col-span-2">
              <div className={`${isDarkMode ? "bg-gray-800" : "bg-white"} rounded-2xl shadow-xl p-8`}>
                {(() => {
                  const service = services[activeService]
                  const Icon = service.icon
                  return (
                    <>
                      <div className="flex items-center space-x-4 mb-6">
                        <div
                          className={`w-16 h-16 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center`}
                        >
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h2 className={`text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                            {service.title}
                          </h2>
                          <div className="flex items-center space-x-4 mt-2">
                            <Badge variant="secondary">{service.price}</Badge>
                            <Badge variant="outline">{service.duration}</Badge>
                          </div>
                        </div>
                      </div>

                      <p className={`text-lg mb-8 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                        {service.fullDescription}
                      </p>

                      <div className="grid md:grid-cols-2 gap-8 mb-8">
                        <div>
                          <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                            Что входит в услугу:
                          </h3>
                          <ul className="space-y-3">
                            {service.features.map((feature, index) => (
                              <li key={index} className="flex items-start space-x-3">
                                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className={isDarkMode ? "text-gray-300" : "text-gray-600"}>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                            Технологии:
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {service.technologies.map((tech, index) => (
                              <Badge key={index} variant="secondary" className="text-sm">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button
                          size="lg"
                          className={`bg-gradient-to-r ${service.color} text-white hover:opacity-90 flex-1`}
                        >
                          Заказать услугу
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                        <Button variant="outline" size="lg">
                          Получить консультацию
                        </Button>
                      </div>
                    </>
                  )
                })()}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className={`${isDarkMode ? "bg-gray-800" : "bg-gradient-to-r from-cyan-50 to-amber-50"} rounded-2xl p-12`}
          >
            <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              Готовы начать проект?
            </h2>
            <p className={`text-xl mb-8 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              Свяжитесь с нами для бесплатной консультации и обсуждения вашего проекта
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/#contact">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-cyan-600 to-cyan-700 text-white hover:from-cyan-700 hover:to-cyan-800"
                >
                  Связаться с нами
                </Button>
              </Link>
              <Button variant="outline" size="lg">
                <a href="tel:+77777777777">Позвонить сейчас</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
