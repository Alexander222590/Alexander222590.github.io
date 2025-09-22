const messages = document.getElementById("messages");
const input = document.getElementById("input");
const sendBtn = document.getElementById("send");
const clearChat = document.getElementById("clearChat");

function saveChat() {
  localStorage.setItem("chatHistory", messages.innerHTML);
}
function loadChat() {
  const saved = localStorage.getItem("chatHistory");
  if (saved) messages.innerHTML = saved;
}
function addMessage(text, cls) {
  const div = document.createElement("div");
  div.className = "message " + cls;
  div.textContent = text;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
  saveChat();
}
function showTyping() {
  const typing = document.createElement("div");
  typing.className = "message bot typing";
  typing.textContent = "AI is typing...";
  messages.appendChild(typing);
  messages.scrollTop = messages.scrollHeight;
  return typing;
}
async function sendMessage() {
  const text = input.value.trim();
  if (!text) return;
  addMessage(text, "user");
  input.value = "";
  const typingEl = showTyping();

  // Call your backend AI server
  try {
    const response = await fetch("https://your-ai-server-url/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text })
    });
    const data = await response.json();
    messages.removeChild(typingEl);
    addMessage(data.reply, "bot");
  } catch (err) {
    messages.removeChild(typingEl);
    addMessage("Error: Could not reach AI server.", "bot");
  }
}
sendBtn.onclick = sendMessage;
input.addEventListener("keydown", e => {
  if (e.key === "Enter") sendMessage();
});
clearChat.onclick = () => {
  messages.innerHTML = "";
  localStorage.removeItem("chatHistory");
  addMessage("Chat cleared. 👌", "bot");
};
window.onload = () => {
  loadChat();
  addMessage("Welcome to My AI Chat! 🚀", "bot");
};
