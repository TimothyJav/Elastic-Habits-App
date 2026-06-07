'use server'

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateHabitLevels(habitTitle: string) {
  if (!habitTitle) throw new Error("Tytuł nawyku jest wymagany.");

  const prompt = `
    Jesteś ekspertem od ADHD i budowania nawyków.
    Cel użytkownika (poziom Full, 100% energii) to: "${habitTitle}".
    NIE zmieniaj ani nie przeskalowuj tego celu — jest on ustalony i niezmienny.

    Twoim zadaniem jest zaproponować WYŁĄCZNIE dwa łatwiejsze warianty tego SAMEGO celu:
    1. Adjusted (Wersja pośrednia - ok. 50% energii). Zachowaj tę samą aktywność, zmniejsz tylko skalę/czas/intensywność.
    2. Emergency (Absolutne minimum - 1% energii, zajmuje max 2 minuty). Najmniejszy możliwy krok w tym samym kierunku.

    Zwróć odpowiedź WYŁĄCZNIE w formacie JSON:
    {
      "adjusted": "opis...",
      "emergency": "opis..."
    }
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
    });

    const content = response.choices[0].message.content;
    if (!content) throw new Error("Błąd generowania treści przez AI.");

    const parsed = JSON.parse(content) as {
      adjusted: string;
      emergency: string;
    };

    return {
      full: habitTitle,
      adjusted: parsed.adjusted,
      emergency: parsed.emergency,
    };
  } catch (error) {
    console.error("OpenAI Error:", error);
    throw new Error("Nie udało się wygenerować poziomów nawyku.");
  }
}