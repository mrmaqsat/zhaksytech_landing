import { type NextRequest, NextResponse } from "next/server"

const TELEGRAM_BOT_TOKEN = "8413306710:AAGl7ujR2c-vKtox7MZucHGCkXcppb8aDmg"
const TELEGRAM_CHAT_ID = "7461640890"

export async function POST(request: NextRequest) {
  try {
    const { name, phone, email, message } = await request.json()

    const telegramMessage = `
🔥 Новая заявка с сайта Zhaksytech!

👤 Имя: ${name}
📞 Телефон: ${phone}
📧 Email: ${email}
💬 Сообщение: ${message}

⏰ Время: ${new Date().toLocaleString("ru-RU", { timeZone: "Asia/Almaty" })}
    `.trim()

    // Send message to Telegram
    const telegramResponse = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: telegramMessage,
      }),
    })

    if (!telegramResponse.ok) {
      const errorData = await telegramResponse.text()
      console.error("Telegram API error:", errorData)
      throw new Error(`Telegram API error: ${telegramResponse.status} - ${errorData}`)
    }

    const result = await telegramResponse.json()
    console.log("Telegram message sent successfully:", result)

    return NextResponse.json({ success: true, message: "Заявка успешно отправлена!" })
  } catch (error) {
    console.error("Error sending to Telegram:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Ошибка при отправке заявки",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
