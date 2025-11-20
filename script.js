async function sendMessage() {
    const text = document.getElementById("userInput").value;
    addMessage(text, "user");

    const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text })
    });

    const data = await res.json();
    addMessage(data.reply, "bot");
}
