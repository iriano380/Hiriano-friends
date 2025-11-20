import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const client = new OpenAI({
      apiKey: process.env.AI_GATEWAY_API_KEY
    });

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Tu és um assistente amigável." },
        { role: "user", content: req.body.message }
      ]
    });

    res.status(200).json({
      reply: completion.choices[0].message.content
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
