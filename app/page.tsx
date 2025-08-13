"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Phone,
  MessageCircle,
  Mail,
  CheckCircle,
  TrendingUp,
  Users,
  ArrowRight,
  Sparkles,
  Zap,
  Target,
} from "lucide-react"
import { useEffect, useState } from "react"

export default function ZhaksytechLanding() {
  const [scrollY, setScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({})
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting,
          }))
        })
      },
      { threshold: 0.1 },
    )

    const elements = document.querySelectorAll("[data-animate]")
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage("")

    try {
      const response = await fetch("/api/send-telegram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.success) {
        setSubmitMessage("✅ Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.")
        setFormData({ name: "", phone: "", email: "", message: "" })
      } else {
        setSubmitMessage("❌ Ошибка при отправке. Попробуйте еще раз или свяжитесь с нами напрямую.")
      }
    } catch (error) {
      setSubmitMessage("❌ Ошибка при отправке. Попробуйте еще раз или свяжитесь с нами напрямую.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-x-hidden">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        />
        <div
          className="absolute top-40 right-20 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl"
          style={{ transform: `translateY(${scrollY * -0.15}px)` }}
        />
        <div
          className="absolute bottom-40 left-1/4 w-40 h-40 bg-cyan-500/10 rounded-full blur-xl"
          style={{ transform: `translateY(${scrollY * 0.08}px)` }}
        />
      </div>

      {/* Sticky Header with Transform */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrollY > 50 ? "bg-white/95 backdrop-blur-md shadow-lg py-2" : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center group">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl mr-3 flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-black text-gray-900">Zhaksytech</span>
                <div className="text-xs text-blue-600 font-medium">цифровое агентство</div>
              </div>
            </div>

            <nav className="hidden lg:flex space-x-2">
              {[
                { name: "Маркетинг", id: "hero" },
                { name: "Услуги", id: "services" },
                { name: "Портфолио", id: "cases" },
                { name: "О студии", id: "about" },
                { name: "Контакты", id: "contact" },
              ].map((item, index) => (
                <Button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  variant={index === 0 ? "default" : "ghost"}
                  className={`${
                    index === 0
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700"
                      : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  } rounded-full px-6 py-2 text-sm font-medium transition-all duration-300 transform hover:scale-105`}
                >
                  {item.name}
                </Button>
              ))}
            </nav>

            <div className="flex items-center space-x-3">
              <div className="hidden md:flex items-center space-x-2 text-gray-900 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2">
                <Phone className="h-4 w-4 text-blue-600" />
                <span className="font-semibold">+7 707 380 39 48</span>
              </div>
              <a
                href="https://t.me/zhaksy_tech"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg"
              >
                <MessageCircle className="h-4 w-4 text-white" />
              </a>
              <a
                href="mailto:zhaksytech@gmail.com"
                className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg"
              >
                <Mail className="h-4 w-4 text-white" />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Parallax */}
      <section id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Animated Background Grid */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgb(59 130 246) 1px, transparent 0)`,
              backgroundSize: "50px 50px",
              transform: `translate(${scrollY * 0.1}px, ${scrollY * 0.05}px)`,
            }}
          />
        </div>

        {/* Large Animated Background Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <h1
            className="text-[8rem] sm:text-[12rem] lg:text-[16rem] xl:text-[20rem] font-black text-blue-600/5 select-none leading-none whitespace-nowrap"
            style={{ transform: `translateX(${scrollY * -0.2}px)` }}
          >
            Zhaksytech
          </h1>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid lg:grid-cols-12 gap-8 items-center min-h-[80vh]">
            {/* Left Content - Asymmetric Layout */}
            <div className="lg:col-span-7 space-y-8">
              <div
                className={`space-y-6 transform transition-all duration-1000 ${
                  isVisible.hero ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
                data-animate
                id="hero"
              >
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full px-4 py-2 text-sm font-medium text-blue-700">
                  <Zap className="w-4 h-4" />
                  <span>Transforming Visions into Digital Reality</span>
                </div>

                <h2 className="text-4xl lg:text-6xl xl:text-7xl font-black text-gray-900 leading-tight">
                  Маркетинговое
                  <br />
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    агентство
                  </span>
                  <br />
                  полного цикла
                </h2>

                <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
                  С 2011 года мы превращаем идеи в цифровые решения, которые работают. Более 150 успешных проектов и
                  растущий бизнес наших клиентов.
                </p>

                {/* Animated Service List */}
                <div className="space-y-4 text-lg">
                  {[
                    "Сайты, Лендинги, Интернет-магазины",
                    "Яндекс Директ, SEO, SMM, Таргетинг",
                    "Логотипы, Брендинг, Презентации",
                    "Telegram-боты и автоматизация",
                    "Разработка в 1С и интеграции",
                  ].map((service, index) => (
                    <div
                      key={index}
                      className={`flex items-center space-x-4 transform transition-all duration-700 ${
                        isVisible.hero ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
                      }`}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full animate-pulse" />
                      <span className="text-gray-700 hover:text-blue-600 transition-colors cursor-default">
                        {service}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Button
                    size="lg"
                    onClick={() => scrollToSection("contact")}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group"
                  >
                    Получить консультацию
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => scrollToSection("cases")}
                    className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-full px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-300"
                  >
                    Смотреть кейсы
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Content - Floating Elements */}
            <div className="lg:col-span-5 relative">
              <div className="relative flex justify-center">
                {/* Animated Geometric Shapes */}
                <div
                  className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl transform rotate-12 animate-pulse"
                  style={{ transform: `rotate(${12 + scrollY * 0.1}deg)` }}
                />
                <div
                  className="absolute -bottom-10 -left-10 w-24 h-24 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full animate-bounce"
                  style={{ animationDelay: "1s" }}
                />
                <div
                  className="absolute top-1/2 -right-20 w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl transform -rotate-45"
                  style={{ transform: `rotate(${-45 + scrollY * -0.1}deg)` }}
                />

                {/* Main Visual Element */}
                <div className="relative z-10 w-80 h-80 rounded-3xl overflow-hidden bg-gradient-to-br from-blue-100 to-indigo-100 shadow-2xl transform hover:scale-105 transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-indigo-600/20" />
                  <img
                    src="/digital-marketer-statue.png"
                    alt="Digital Innovation"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="text-white font-bold text-lg">13+ лет опыта</div>
                    <div className="text-blue-200 text-sm">в цифровом маркетинге</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section with Staggered Animation */}
      <section id="services" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center space-y-4 mb-16 transform transition-all duration-1000 ${
              isVisible.services ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
            data-animate
            id="services"
          >
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900">
              Наши{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">услуги</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Полный спектр цифровых решений для роста вашего бизнеса
            </p>
          </div>

          {/* Asymmetric Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Разработка сайтов",
                description: "Современные, быстрые и конверсионные решения с уникальным дизайном",
                icon: "💻",
                gradient: "from-blue-500 to-indigo-500",
                delay: "0ms",
              },
              {
                title: "Брендинг",
                description: "Фирменный стиль и логотипы, которые выделяют среди конкурентов",
                icon: "🎨",
                gradient: "from-purple-500 to-pink-500",
                delay: "100ms",
              },
              {
                title: "SEO-оптимизация",
                description: "Выводим в топ поисковых систем для органического трафика",
                icon: "📈",
                gradient: "from-green-500 to-emerald-500",
                delay: "200ms",
              },
              {
                title: "Контекстная реклама",
                description: "Эффективные кампании в Яндекс.Директ и Google Ads",
                icon: "🎯",
                gradient: "from-orange-500 to-red-500",
                delay: "300ms",
              },
              {
                title: "SMM и Таргет",
                description: "Управление соцсетями и таргетированная реклама",
                icon: "📱",
                gradient: "from-cyan-500 to-blue-500",
                delay: "400ms",
              },
              {
                title: "Автоматизация",
                description: "Telegram-боты и CRM-системы для оптимизации процессов",
                icon: "🤖",
                gradient: "from-indigo-500 to-purple-500",
                delay: "500ms",
              },
            ].map((service, index) => (
              <Card
                key={index}
                className={`group hover:shadow-2xl transition-all duration-500 border-0 bg-white/80 backdrop-blur-sm transform hover:scale-105 hover:-translate-y-2 ${
                  isVisible.services ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: service.delay }}
              >
                <CardContent className="p-8 space-y-6 relative overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  />
                  <div className="text-5xl transform group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3
                    className={`text-xl font-bold text-gray-900 group-hover:bg-gradient-to-r group-hover:${service.gradient} group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300`}
                  >
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                    {service.description}
                  </p>
                  <div
                    className={`w-12 h-1 bg-gradient-to-r ${service.gradient} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cases Section with Parallax Cards */}
      <section id="cases" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(45deg, transparent 40%, rgba(59, 130, 246, 0.1) 50%, transparent 60%)`,
              backgroundSize: "100px 100px",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div
            className={`text-center space-y-4 mb-16 transform transition-all duration-1000 ${
              isVisible.cases ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
            data-animate
            id="cases"
          >
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900">
              Наши{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">кейсы</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Реальные истории успеха с измеримыми результатами</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Digital Mart",
                category: "E-commerce",
                result: "Увеличили конверсию на 38%",
                image: "/ecommerce-dashboard-growth.png",
                gradient: "from-green-500 to-emerald-500",
                delay: "0ms",
              },
              {
                title: "HR-бот для найма",
                category: "Automation",
                result: "Сократили время подбора на 35%",
                image: "/hr-chatbot-interface.png",
                gradient: "from-blue-500 to-indigo-500",
                delay: "200ms",
              },
              {
                title: "AI-ассистент",
                category: "FinTech",
                result: "Ускорили отчетность на 44%",
                image: "/ai-financial-dashboard.png",
                gradient: "from-purple-500 to-pink-500",
                delay: "400ms",
              },
            ].map((caseStudy, index) => (
              <Card
                key={index}
                className={`group hover:shadow-2xl transition-all duration-700 overflow-hidden border-0 bg-white/90 backdrop-blur-sm transform hover:scale-105 hover:-translate-y-4 ${
                  isVisible.cases ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: caseStudy.delay }}
              >
                <div className="aspect-video overflow-hidden relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${caseStudy.gradient} opacity-20 z-10`} />
                  <img
                    src={caseStudy.image || "/placeholder.svg"}
                    alt={caseStudy.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <CardContent className="p-6 space-y-4">
                  <Badge className={`bg-gradient-to-r ${caseStudy.gradient} text-white border-0`}>
                    {caseStudy.category}
                  </Badge>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {caseStudy.title}
                  </h3>
                  <p className="text-lg font-semibold text-green-600">{caseStudy.result}</p>
                  <div className="flex items-center text-blue-600 font-medium group-hover:translate-x-2 transition-transform duration-300">
                    <span>Подробнее</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Блог</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Полезные статьи о цифровом маркетинге, веб-разработке и продвижении бизнеса.
            </p>
            <div className="pt-8">
              <p className="text-gray-500">Раздел в разработке</p>
            </div>
          </div>
        </div>
      </section>

      {/* Careers Section */}
      <section id="careers" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Вакансии</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Присоединяйтесь к нашей команде профессионалов в области цифрового маркетинга.
            </p>
            <div className="pt-8">
              <p className="text-gray-500">Открытых вакансий пока нет</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center space-y-4 mb-16 transform transition-all duration-1000 ${
              isVisible.about ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
            data-animate
            id="about"
          >
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900">
              Почему{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                выбирают нас
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              13 лет опыта в создании цифровых решений, которые работают
            </p>
          </div>

          {/* Stats with Animation */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              { number: "13+", label: "лет опыта", icon: Target },
              { number: "150+", label: "успешных проектов", icon: CheckCircle },
              { number: "30+", label: "штатных специалистов", icon: Users },
              { number: "95+", label: "клиентов остаются с нами", icon: TrendingUp },
            ].map((stat, index) => (
              <div
                key={index}
                className={`text-center group transform transition-all duration-700 ${
                  isVisible.about ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Gradient */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="space-y-8">
            <h2 className="text-4xl lg:text-5xl font-black text-white">Готовы обсудить ваш проект?</h2>
            <p className="text-xl text-blue-100 leading-relaxed max-w-2xl mx-auto">
              Получите персональную консультацию и узнайте, как мы можем помочь вашему бизнесу расти
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => scrollToSection("contact")}
                className="bg-white text-blue-600 hover:bg-gray-100 rounded-full px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Заполнить бриф
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => window.open("https://t.me/zhaksy_tech", "_blank")}
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 bg-transparent rounded-full px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-300"
              >
                Написать в Telegram
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div
              className={`space-y-8 transform transition-all duration-1000 ${
                isVisible.contact ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
              }`}
              data-animate
              id="contact"
            >
              <div className="space-y-4">
                <h2 className="text-4xl font-black text-gray-900">
                  Свяжитесь{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    с нами
                  </span>
                </h2>
                <p className="text-xl text-gray-600">Обсудим ваш проект и предложим эффективные решения</p>
              </div>
              <div className="space-y-6">
                {[
                  { icon: Phone, text: "+7 707 380 39 48", gradient: "from-green-500 to-emerald-500" },
                  { icon: MessageCircle, text: "@zhaksy_tech", gradient: "from-blue-500 to-indigo-500" },
                  { icon: Mail, text: "zhaksytech@gmail.com", gradient: "from-purple-500 to-pink-500" },
                ].map((contact, index) => (
                  <div key={index} className="flex items-center space-x-4 group">
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${contact.gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <contact.icon className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-lg text-gray-900 font-medium group-hover:text-blue-600 transition-colors">
                      {contact.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <Card className="border-0 bg-white/90 backdrop-blur-sm shadow-2xl">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Имя</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Ваше имя"
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Телефон</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+7 (___) ___-__-__"
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Сообщение</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Расскажите о вашем проекте..."
                      rows={4}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                    />
                  </div>

                  {submitMessage && (
                    <div
                      className={`p-4 rounded-xl text-sm font-medium ${
                        submitMessage.includes("✅")
                          ? "bg-green-50 text-green-700 border border-green-200"
                          : "bg-red-50 text-red-700 border border-red-200"
                      }`}
                    >
                      {submitMessage}
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? "Отправляем..." : "Отправить заявку"}
                  </Button>
                  <p className="text-sm text-gray-500 text-center">
                    Нажимая «Отправить», вы соглашаетесь с обработкой персональных данных
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-black">Zhaksytech</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Цифровое агентство полного цикла. Создаем эффективные решения с 2011 года.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-bold">Навигация</h4>
              <div className="space-y-2">
                {["Услуги", "Кейсы", "О нас", "Контакты"].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="block text-gray-400 hover:text-white transition-colors hover:translate-x-1 transform duration-300"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-bold">Контакты</h4>
              <div className="space-y-2 text-gray-400">
                <p className="hover:text-white transition-colors">+7 707 380 39 48</p>
                <p className="hover:text-white transition-colors">@zhaksy_tech</p>
                <p className="hover:text-white transition-colors">zhaksytech@gmail.com</p>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-bold">Социальные сети</h4>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
                >
                  <span className="text-xs font-bold">VK</span>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>© 2025 Zhaksytech. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
