const chatButton = document.getElementById("chatButton");
const chatWindow = document.getElementById("chatWindow");
const sendBtn = document.getElementById("sendBtn");
const input = document.getElementById("userInput");
const messages = document.getElementById("messages");

chatButton.onclick = () => {
    chatWindow.style.display = chatWindow.style.display === "none" ? "block" : "none";
};

function addMessage(text, sender) {
    const div = document.createElement("div");
    div.className = `message ${sender}`;
    div.innerText = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
}

sendBtn.onclick = async () => {
    const text = input.value;
    if (!text) return;
    addMessage(text, "user");
    input.value = "";

    const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text })
    });

    const data = await res.json();
    addMessage(data.reply, "bot");
};
