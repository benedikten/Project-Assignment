const messagesDiv = document.getElementById("messages"); //chat container //
const input = document.getElementById("user-input"); //text input field //
const button = document.getElementById("send-btn"); //send button //

const API_KEY = "your-api-key-here";  //API key for OpenAI, replace 'your-api-key-here' with your own key //

// a function that add a message to the chat //
function appendMessage(sender, text) {
  const wrapper = document.createElement("div");
  wrapper.style.display = "flex";
  wrapper.style.alignItems = "flex-start";
  wrapper.style.marginBottom = "10px";

  if (sender === "You") {
    wrapper.style.justifyContent = "flex-end"; //making sure the messages from the user are aligned to the right //

    const bubble = document.createElement("div");
    bubble.classList.add("message", "user"); //css for styling of the message and user bubbles //
    bubble.textContent = text;

    wrapper.appendChild(bubble);
  } else {
    wrapper.style.justifyContent = "flex-start"; //making sure the messages from the bot are aligned to the left //

    const label = document.createElement("div");
    label.textContent = "FRAM"; //adding label to the bot //
    label.style.marginRight = "16px";
    label.style.fontFamily = "Frank Ruhl Libre";
    label.style.fontSize = "16px";

    const bubble = document.createElement("div"); //bot text bubble //
    bubble.classList.add("message", "bot");
    bubble.textContent = text;

    wrapper.appendChild(label);
    wrapper.appendChild(bubble);
  }

  messagesDiv.appendChild(wrapper);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

//error message that show up if they dont add API key //
function appendErrorMessage() {
  const wrapper = document.createElement("div");
  const errorBox = document.createElement("div");
  errorBox.textContent = "Failed to connect. Add API key."; //error text that show up on screen if they dont add API key //
  errorBox.classList.add("error-message"); //css for the error message //

  wrapper.appendChild(errorBox);
  messagesDiv.appendChild(wrapper);
}

//function that send a message to OpenAI and return a message //
async function chatWithAI(userMessage) {
  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + API_KEY //your API key //
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", //telling which AI model to use //
        messages: [
          { role: "system", content: "You are a helpful assistant for a sustainable food delivery webshop." }, //defines how the bot will behave //
          { role: "user", content: userMessage }
        ],
        max_tokens: 150 //limit the length of the bots response //
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

//message is sendt when clikcing the "Send" button //
button.addEventListener("click", async () => {
  const message = input.value.trim();
  if (!message) return;

  appendMessage("You", message);
  input.value = "";

  const typingWrapper = document.createElement("div"); //showing the bot is typing //
  typingWrapper.classList.add("typing-wrapper");
  typingWrapper.textContent = "FRAM is typing...";
  messagesDiv.appendChild(typingWrapper);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;

  const reply = await chatWithAI(message);

  messagesDiv.removeChild(typingWrapper);
  if (reply) appendMessage("Bot", reply);
});

//message is sendt when pressing "Enter" on keyboard //
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") button.click();
});