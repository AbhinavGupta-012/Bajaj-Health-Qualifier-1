async function askGemini(question) {
    const response = await fetch(
        "https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=" +
        process.env.GEMINI_API_KEY,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [{ text: question }]
                    }
                ]
            })
        }
    );
    if (response.status === 429) {
        return "Rate limit exceeded";
    }

    const data = await response.json();

    if (!data.candidates || data.candidates.length === 0) {
        return "No response";
    }

    const parts = data.candidates[0].content?.parts;
    if (!parts || parts.length === 0) {
        return "No response";
    }
    return parts.map(p => p.text).filter(Boolean).join(" ");
}

module.exports = askGemini;
