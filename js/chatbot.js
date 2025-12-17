const messagesDiv = document.getElementById("messages");
const input = document.getElementById("user-input");
const button = document.getElementById("send-btn");
 
const API_KEY = "your-api-key-here";
 
function appendMessage(sender, text) {
  const wrapper = document.createElement("div");
  wrapper.style.display = "flex";
  wrapper.style.alignItems = "flex-start";
  wrapper.style.marginBottom = "10px";
 
  if (sender === "You") {
    wrapper.style.justifyContent = "flex-end";
 
    const bubble = document.createElement("div");
    bubble.classList.add("message", "user");
    bubble.textContent = text;
 
    wrapper.appendChild(bubble);
  } else {
    wrapper.style.justifyContent = "flex-start";
 
    const label = document.createElement("div");
    label.textContent = "FRAM";
    label.style.marginRight = "16px";
    label.style.fontFamily = "Frank Ruhl Libre";
    label.style.fontSize = "16px";
 
    const bubble = document.createElement("div");
    bubble.classList.add("message", "bot");
    bubble.textContent = text;
 
    wrapper.appendChild(label);
    wrapper.appendChild(bubble);
  }
 
  messagesDiv.appendChild(wrapper);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}
 
function appendErrorMessage() {
  const wrapper = document.createElement("div");
  const errorBox = document.createElement("div");
  errorBox.textContent = "Failed to connect. Try again later.";
  errorBox.classList.add("error-message");
 
  wrapper.appendChild(errorBox);
  messagesDiv.appendChild(wrapper);
}
 
async function chatWithAI(userMessage) {
  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + API_KEY
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a helpful assistant for a sustainable food delivery webshop." },
          { role: "user", content: userMessage }
        ],
        max_tokens: 150
      })
    });
 
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
 
    const data = await res.json();
    return data.choices?.[0]?.message?.content ?? null;
 
  } catch (err) {
    console.error(err);
    appendErrorMessage();
    return null;
  }
}
 
button.addEventListener("click", async () => {
  const message = input.value.trim();
  if (!message) return;
 
  appendMessage("You", message);
  input.value = "";
 
  const typingWrapper = document.createElement("div");
  typingWrapper.classList.add("typing-wrapper");
  typingWrapper.textContent = "FRAM is typing...";
  messagesDiv.appendChild(typingWrapper);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
 
  const reply = await chatWithAI(message);
 
  messagesDiv.removeChild(typingWrapper);
  if (reply) appendMessage("Bot", reply);
});
 
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") button.click();
});