"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Phone, MessageCircle, Mail, CheckCircle, Users, ArrowRight, Sparkles, Star, Award, Rocket } from "lucide-react"
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

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    setIsLoaded(true)

    return () => window.removeEventListener("mousemove", handleMouseMove)
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
    <div className="min-h-screen gradient-mesh overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute top-20 left-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-xl animate-pulse-glow transition-transform duration-1000 ease-out"
          style={{
            transform: `translateY(${scrollY * 0.1}px) translateX(${mousePosition.x * 20}px) translateY(${mousePosition.y * 15}px)`,
          }}
        />
        <div
          className="absolute top-40 right-20 w-24 h-24 bg-amber-500/10 rounded-full blur-xl animate-float transition-transform duration-1000 ease-out"
          style={{
            transform: `translateY(${scrollY * -0.15}px) translateX(${mousePosition.x * -25}px) translateY(${mousePosition.y * -20}px)`,
          }}
        />
        <div
          className="absolute bottom-40 left-1/4 w-40 h-40 bg-cyan-600/10 rounded-full blur-xl transition-transform duration-1000 ease-out"
          style={{
            transform: `translateY(${scrollY * 0.08}px) translateX(${mousePosition.x * 15}px) translateY(${mousePosition.y * 10}px)`,
          }}
        />
        <div
          className="absolute top-1/3 left-1/2 w-20 h-20 bg-gradient-to-r from-cyan-400/20 to-amber-400/20 rounded-full blur-lg animate-pulse transition-transform duration-1000 ease-out"
          style={{
            transform: `translateX(${mousePosition.x * -30}px) translateY(${mousePosition.y * 25}px)`,
            animationDelay: "2s",
          }}
        />
      </div>

      <header
        className={`fixed top-0 w-full z-50 transition-all duration-700 ease-out ${
          scrollY > 50
            ? "bg-white/95 backdrop-blur-md shadow-lg py-2 border-b border-cyan-100/50"
            : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center group cursor-pointer">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-600 to-cyan-700 rounded-xl mr-3 flex items-center justify-center transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 ease-out shadow-lg group-hover:shadow-cyan-500/25">
                <Sparkles className="w-6 h-6 text-white group-hover:animate-spin transition-all duration-500" />
              </div>
              <div className="transform group-hover:translate-x-1 transition-transform duration-300">
                <span className="text-2xl font-serif font-black text-gray-900 group-hover:text-cyan-600 transition-colors duration-300">
                  Zhaksytech
                </span>
                <div className="text-xs text-cyan-600 font-medium opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                  цифровое агентство
                </div>
              </div>
            </div>

            <nav className="hidden lg:flex space-x-2">
              {[
                { name: "Главная", id: "hero" },
                { name: "Услуги", id: "services" },
                { name: "Кейсы", id: "cases" },
                { name: "О нас", id: "about" },
                { name: "Контакты", id: "contact" },
              ].map((item, index) => (
                <Button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  variant={index === 0 ? "default" : "ghost"}
                  className={`${
                    index === 0
                      ? "bg-gradient-to-r from-cyan-600 to-cyan-700 text-white hover:from-cyan-700 hover:to-cyan-800 shadow-lg hover:shadow-cyan-500/25"
                      : "text-gray-700 hover:bg-cyan-50 hover:text-cyan-600 hover:shadow-md"
                  } rounded-full px-6 py-2 text-sm font-medium transition-all duration-500 ease-out transform hover:scale-105 hover:-translate-y-0.5 relative overflow-hidden group`}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-amber-400/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 ease-out" />
                  <span className="relative z-10">{item.name}</span>
                </Button>
              ))}
            </nav>

            <div className="flex items-center space-x-3">
              <div className="hidden md:flex items-center space-x-2 text-gray-900 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-cyan-100/50 hover:border-cyan-200 transition-all duration-300 hover:shadow-lg group">
                <Phone className="h-4 w-4 text-cyan-600 group-hover:animate-bounce" />
                <span className="font-semibold group-hover:text-cyan-600 transition-colors duration-300">
                  +7 707 380 39 48
                </span>
              </div>
              <a
                href="https://t.me/zhaksy_tech"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-500 ease-out shadow-lg hover:shadow-green-500/25 hover:rotate-12 group"
              >
                <MessageCircle className="h-4 w-4 text-white group-hover:animate-pulse" />
              </a>
              <a
                href="mailto:zhaksytech@gmail.com"
                className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-500 ease-out shadow-lg hover:shadow-cyan-500/25 hover:-rotate-12 group"
              >
                <Mail className="h-4 w-4 text-white group-hover:animate-pulse" />
              </a>
            </div>
          </div>
        </div>
      </header>

      <section id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0 transition-transform duration-1000 ease-out"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgb(8 145 178) 1px, transparent 0)`,
              backgroundSize: "50px 50px",
              transform: `translate(${scrollY * 0.1 + mousePosition.x * 10}px, ${scrollY * 0.05 + mousePosition.y * 5}px)`,
            }}
          />
        </div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <h1
            className="text-[8rem] sm:text-[12rem] lg:text-[16rem] xl:text-[20rem] font-serif font-black text-cyan-600/5 select-none leading-none whitespace-nowrap transition-transform duration-1000 ease-out"
            style={{
              transform: `translateX(${scrollY * -0.2 + mousePosition.x * -20}px) rotateY(${mousePosition.x * 5}deg)`,
              textShadow: "0 0 100px rgba(8, 145, 178, 0.1)",
            }}
          >
            Zhaksytech
          </h1>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid lg:grid-cols-12 gap-8 items-center min-h-[80vh]">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-8">
              <div
                className={`space-y-6 transform transition-all duration-1500 ease-out ${
                  isVisible.hero ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
                data-animate
                id="hero"
              >
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-100 to-amber-100 rounded-full px-4 py-2 text-sm font-medium text-cyan-700 border border-cyan-200/50 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 animate-float group">
                  <Rocket className="w-4 h-4 group-hover:animate-bounce" />
                  <span>Поднимите свое цифровое присутствие</span>
                </div>

                <h2 className="text-4xl lg:text-6xl xl:text-7xl font-serif font-black text-gray-900 leading-tight">
                  <span
                    className={`inline-block transform transition-all duration-700 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                    style={{ transitionDelay: "200ms" }}
                  >
                    Превращаем идеи
                  </span>
                  <br />
                  <span
                    className={`inline-block bg-gradient-to-r from-cyan-600 to-amber-500 bg-clip-text text-transparent transform transition-all duration-700 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                    style={{ transitionDelay: "400ms" }}
                  >
                    в результат
                  </span>
                  <br />
                  <span
                    className={`inline-block transform transition-all duration-700 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                    style={{ transitionDelay: "600ms" }}
                  >
                    Цифровые решения
                  </span>
                </h2>

                <p
                  className={`text-xl text-gray-600 max-w-2xl leading-relaxed font-sans transform transition-all duration-1000 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                  style={{ transitionDelay: "800ms" }}
                >
                  С 2011 года мы превращаем идеи в цифровые решения, которые работают. Более 150 успешных проектов и
                  растущий бизнес наших клиентов.
                </p>

                {/* Service List */}
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
                      className={`flex items-center space-x-4 transform transition-all duration-700 hover:translate-x-2 hover:scale-105 cursor-default group ${
                        isVisible.hero ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
                      }`}
                      style={{ transitionDelay: `${1000 + index * 100}ms` }}
                    >
                      <div className="w-3 h-3 bg-gradient-to-r from-cyan-500 to-amber-500 rounded-full animate-pulse group-hover:animate-bounce group-hover:scale-125 transition-transform duration-300" />
                      <span className="text-gray-700 hover:text-cyan-600 transition-colors duration-300 font-sans group-hover:font-semibold">
                        {service}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Button
                    size="lg"
                    onClick={() => scrollToSection("contact")}
                    className="bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 text-white rounded-full px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-500 ease-out shadow-lg hover:shadow-cyan-500/25 hover:-translate-y-1 group relative overflow-hidden"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 ease-out opacity-20" />
                    <span className="relative z-10 flex items-center">
                      Получить бесплатную консультацию
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 group-hover:animate-pulse transition-all duration-300" />
                    </span>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => scrollToSection("cases")}
                    className="border-2 border-amber-500 text-amber-600 hover:bg-amber-500 hover:text-white rounded-full px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-500 ease-out hover:shadow-amber-500/25 hover:-translate-y-1 group relative overflow-hidden"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 ease-out" />
                    <span className="relative z-10">Посмотреть наши работы</span>
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="lg:col-span-5 relative">
              <div className="relative flex justify-center">
                <div
                  className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-3xl animate-pulse shadow-lg transition-transform duration-1000 ease-out hover:scale-110"
                  style={{
                    transform: `rotate(${12 + scrollY * 0.1 + mousePosition.x * 10}deg) translateX(${mousePosition.x * 5}px) translateY(${mousePosition.y * 5}px)`,
                    boxShadow: "0 20px 40px rgba(8, 145, 178, 0.3)",
                  }}
                />
                <div
                  className="absolute -bottom-10 -left-10 w-24 h-24 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full animate-bounce shadow-lg transition-transform duration-1000 ease-out hover:scale-110"
                  style={{
                    animationDelay: "1s",
                    transform: `translateX(${mousePosition.x * -8}px) translateY(${mousePosition.y * -8}px)`,
                    boxShadow: "0 15px 30px rgba(245, 158, 11, 0.3)",
                  }}
                />
                <div
                  className="absolute top-1/2 -right-20 w-16 h-16 bg-gradient-to-r from-cyan-600 to-amber-500 rounded-2xl shadow-lg transition-transform duration-1000 ease-out hover:scale-110"
                  style={{
                    transform: `rotate(${-45 + scrollY * -0.1 + mousePosition.y * 15}deg) translateX(${mousePosition.x * 10}px) translateY(${mousePosition.y * 10}px)`,
                    boxShadow: "0 10px 20px rgba(8, 145, 178, 0.2)",
                  }}
                />

                <div className="relative z-10 w-80 h-80 rounded-3xl overflow-hidden bg-gradient-to-br from-cyan-100 to-amber-100 shadow-2xl transform hover:scale-105 transition-all duration-700 ease-out hover:rotate-1 group perspective-1000">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/20 to-amber-600/20 group-hover:from-cyan-600/30 group-hover:to-amber-600/30 transition-all duration-500" />
                  <img
                    src="/digital-marketer-statue.png"
                    alt="Цифровые инновации"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/50 to-transparent group-hover:from-cyan-900/60 transition-all duration-500" />
                  <div className="absolute bottom-6 left-6 right-6 transform group-hover:translate-y-0 translate-y-2 transition-transform duration-500">
                    <div className="text-white font-bold text-lg font-serif group-hover:text-cyan-200 transition-colors duration-300">
                      13+ лет опыта
                    </div>
                    <div className="text-cyan-200 text-sm font-sans group-hover:text-amber-200 transition-colors duration-300">
                      в цифровом маркетинге
                    </div>
                  </div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div
                      className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-ping"
                      style={{ animationDelay: "0s" }}
                    />
                    <div
                      className="absolute top-1/3 right-1/3 w-1 h-1 bg-amber-400 rounded-full animate-ping"
                      style={{ animationDelay: "0.5s" }}
                    />
                    <div
                      className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-cyan-300 rounded-full animate-ping"
                      style={{ animationDelay: "1s" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center space-y-4 mb-16 transform transition-all duration-1000 ${
              isVisible.services ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
            data-animate
            id="services"
          >
            <h2 className="text-4xl lg:text-5xl font-serif font-black text-gray-900">
              Наши{" "}
              <span className="bg-gradient-to-r from-cyan-600 to-amber-500 bg-clip-text text-transparent">услуги</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-sans">
              Полный спектр цифровых решений для роста вашего бизнеса
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Разработка сайтов",
                description: "Современные, быстрые и конверсионные решения с уникальным дизайном",
                icon: "💻",
                gradient: "from-cyan-500 to-cyan-600",
                delay: "0ms",
              },
              {
                title: "Брендинг",
                description: "Фирменный стиль и логотипы, которые выделяют среди конкурентов",
                icon: "🎨",
                gradient: "from-amber-500 to-amber-600",
                delay: "200ms", // increased delay from 100ms to 200ms
              },
              {
                title: "SEO-оптимизация",
                description: "Выводим в топ поисковых систем для органического трафика",
                icon: "📈",
                gradient: "from-green-500 to-emerald-500",
                delay: "400ms", // increased delay from 200ms to 400ms
              },
              {
                title: "Контекстная реклама",
                description: "Эффективные кампании в Яндекс.Директ и Google Ads",
                icon: "🎯",
                gradient: "from-orange-500 to-red-500",
                delay: "600ms", // increased delay from 300ms to 600ms
              },
              {
                title: "SMM и Таргет",
                description: "Управление соцсетями и таргетированная реклама",
                icon: "📱",
                gradient: "from-cyan-500 to-blue-500",
                delay: "800ms", // increased delay from 400ms to 800ms
              },
              {
                title: "Автоматизация",
                description: "Telegram-боты и CRM-системы для оптимизации процессов",
                icon: "🤖",
                gradient: "from-cyan-600 to-amber-500",
                delay: "1000ms", // increased delay from 500ms to 1000ms
              },
            ].map((service, index) => (
              <Card
                key={index}
                className={`group hover:shadow-2xl transition-all duration-700 border-0 bg-white/80 backdrop-blur-sm transform hover:scale-105 hover:-translate-y-2 ${
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
                  <h3 className="text-xl font-serif font-bold text-gray-900 group-hover:text-cyan-600 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors font-sans">
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

      {/* Cases Section */}
      <section id="cases" className="py-20 bg-gradient-to-br from-gray-50 to-cyan-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(45deg, transparent 40%, rgba(8, 145, 178, 0.1) 50%, transparent 60%)`,
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
            <h2 className="text-4xl lg:text-5xl font-serif font-black text-gray-900">
              Истории{" "}
              <span className="bg-gradient-to-r from-cyan-600 to-amber-500 bg-clip-text text-transparent">
                успеха клиентов
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-sans">
              Реальные истории успеха с измеримыми результатами
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Digital Mart",
                category: "Интернет-магазин",
                result: "Увеличили конверсию на 38%",
                image: "/ecommerce-dashboard-growth.png",
                gradient: "from-green-500 to-emerald-500",
                delay: "0ms",
              },
              {
                title: "HR-бот для найма",
                category: "Автоматизация",
                result: "Сократили время подбора на 35%",
                image: "/hr-chatbot-interface.png",
                gradient: "from-cyan-500 to-cyan-600",
                delay: "200ms",
              },
              {
                title: "AI-ассистент",
                category: "FinTech",
                result: "Ускорили отчетность на 44%",
                image: "/ai-financial-dashboard.png",
                gradient: "from-amber-500 to-amber-600",
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
                  <h3 className="text-xl font-serif font-bold text-gray-900 group-hover:text-cyan-600 transition-colors">
                    {caseStudy.title}
                  </h3>
                  <p className="text-lg font-semibold text-green-600 font-sans">{caseStudy.result}</p>
                  <div className="flex items-center text-cyan-600 font-medium group-hover:translate-x-2 transition-transform duration-300 font-sans">
                    <span>Подробнее</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            ))}
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
            <h2 className="text-4xl lg:text-5xl font-serif font-black text-gray-900">
              Почему выбирают{" "}
              <span className="bg-gradient-to-r from-cyan-600 to-amber-500 bg-clip-text text-transparent">
                Zhaksytech
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-sans">
              Более 13 лет в индустрии, Zhaksytech сочетает экспертизу и инновации для создания решений, которые
              приносят результат.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              { number: "13+", label: "Лет опыта", icon: Award },
              { number: "150+", label: "Успешных проектов", icon: CheckCircle },
              { number: "30+", label: "Специалистов в команде", icon: Users },
              { number: "95%", label: "Клиентов остаются с нами", icon: Star },
            ].map((stat, index) => (
              <div
                key={index}
                className={`text-center group transform transition-all duration-700 ${
                  isVisible.about ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-100 to-amber-100 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-8 h-8 text-cyan-600" />
                </div>
                <div className="text-4xl lg:text-5xl font-serif font-black bg-gradient-to-r from-cyan-600 to-amber-500 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium font-sans">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-cyan-600 via-cyan-700 to-amber-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="space-y-8">
            <h2 className="text-4xl lg:text-5xl font-serif font-black text-white">Готовы обсудить ваш проект?</h2>
            <p className="text-xl text-cyan-100 leading-relaxed max-w-2xl mx-auto font-sans">
              Получите персональную консультацию и узнайте, как мы можем помочь вашему бизнесу расти
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => scrollToSection("contact")}
                className="bg-white text-cyan-600 hover:bg-gray-100 rounded-full px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Заполнить бриф
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => window.open("https://t.me/zhaksy_tech", "_blank")}
                className="border-2 border-white text-white hover:bg-white hover:text-cyan-600 bg-transparent rounded-full px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-300"
              >
                Написать в Telegram
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 to-cyan-50">
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
                <h2 className="text-4xl font-serif font-black text-gray-900">
                  Начнем{" "}
                  <span className="bg-gradient-to-r from-cyan-600 to-amber-500 bg-clip-text text-transparent">
                    ваш проект
                  </span>
                </h2>
                <p className="text-xl text-gray-600 font-sans">Обсудим ваш проект и предложим эффективные решения</p>
              </div>
              <div className="space-y-6">
                {[
                  { icon: Phone, text: "+7 707 380 39 48", gradient: "from-green-500 to-emerald-500" },
                  { icon: MessageCircle, text: "@zhaksy_tech", gradient: "from-cyan-500 to-cyan-600" },
                  { icon: Mail, text: "zhaksytech@gmail.com", gradient: "from-amber-500 to-amber-600" },
                ].map((contact, index) => (
                  <div key={index} className="flex items-center space-x-4 group">
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${contact.gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <contact.icon className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-lg text-gray-900 font-medium group-hover:text-cyan-600 transition-colors font-sans">
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
                    <label className="text-sm font-semibold text-gray-700 font-sans">Имя</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Ваше имя"
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 font-sans"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 font-sans">Телефон</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+7 (___) ___-__-__"
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 font-sans"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 font-sans">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 font-sans"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 font-sans">Сообщение</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Расскажите о вашем проекте..."
                      rows={4}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 resize-none font-sans"
                    />
                  </div>

                  {submitMessage && (
                    <div
                      className={`p-4 rounded-xl text-sm font-medium font-sans ${
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
                    className="w-full bg-gradient-to-r from-cyan-600 to-amber-500 hover:from-cyan-700 hover:to-amber-600 text-white rounded-xl py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? "Отправляем..." : "Отправить сообщение"}
                  </Button>
                  <p className="text-sm text-gray-500 text-center font-sans">
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
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-600 to-cyan-700 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-serif font-black">Zhaksytech</span>
              </div>
              <p className="text-gray-400 leading-relaxed font-sans">
                Цифровое агентство полного цикла. Создаем эффективные решения с 2011 года.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-serif font-bold">Навигация</h4>
              <div className="space-y-2">
                {[
                  { name: "Услуги", id: "services" },
                  { name: "Кейсы", id: "cases" },
                  { name: "О нас", id: "about" },
                  { name: "Контакты", id: "contact" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block text-gray-400 hover:text-white transition-colors hover:translate-x-1 transform duration-300 font-sans text-left"
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-serif font-bold">Контакты</h4>
              <div className="space-y-2 text-gray-400 font-sans">
                <p className="hover:text-white transition-colors">+7 707 380 39 48</p>
                <p className="hover:text-white transition-colors">@zhaksy_tech</p>
                <p className="hover:text-white transition-colors">zhaksytech@gmail.com</p>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-serif font-bold">Социальные сети</h4>
              <div className="flex space-x-4">
                <a
                  href="https://t.me/zhaksy_tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gradient-to-r from-cyan-600 to-cyan-700 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
                <a
                  href="mailto:zhaksytech@gmail.com"
                  className="w-10 h-10 bg-gradient-to-r from-amber-600 to-amber-700 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p className="font-sans">© 2025 Zhaksytech. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
