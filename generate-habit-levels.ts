'use server'

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateHabitLevels(habitTitle: string) {
  if (!habitTitle) throw new Error("Tytuł nawyku jest wymagany.");

  const prompt = `
    Jesteś ekspertem od ADHD i budowania nawyków. 
    Użytkownik chce zbudować nawyk: "${habitTitle}".
    Zdekomponuj ten cel na 3 poziomy trudności, aby zapobiec paraliżowi decyzyjnemu:
    
    1. Full (Cel optymalny - 100% energii)
    2. Adjusted (Wersja pośrednia - 50% energii)
    3. Emergency (Absolutne minimum - 1% energii, zajmuje max 2 minuty).

    Zwróć odpowiedź WYŁĄCZNIE w formacie JSON:
    {
      "full": "opis...",
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

    return JSON.parse(content) as {
      full: string;
      adjusted: string;
      emergency: string;
    };
  } catch (error) {
    console.error("OpenAI Error:", error);
    throw new Error("Nie udało się wygenerować poziomów nawyku.");
  }
}