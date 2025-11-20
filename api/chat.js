import OpenAI from "openai";

export default async function handler(req, res) {
  const client = new OpenAI({
    apiKey: process.env.AI_GATEWAY_API_KEY
  });

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Você é um assistente amigável e detalhado." },
        { role: "user", content: req.body.message }
      ]
    });

    res.status(200).json({ reply: completion.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: "Erro no servidor", details: err.message });
  }
}
