import OpenAI from "openai";

export default async function handler(req, res) {
    const client = new OpenAI({ apiKey: process.env.OPENAI_KEY });

    const response = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "Você é um assistente amigável e detalhado." },
            { role: "user", content: req.body.message }
        ]
    });

    res.status(200).json({ reply: response.choices[0].message.content });
}
