// Find the chat elements on the page.
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const chatWindow = document.getElementById("chatWindow");
const sendButton = document.getElementById("sendBtn");

// Send chat requests to the project Cloudflare Worker.
const workerUrl = "https://08-prj-loreal-chatbot.jasminv206.workers.dev/";

// Keep the conversation so the assistant can use earlier messages as context.
const messages = [
  {
    role: "system",
    content:
      "You are a helpful L’Oréal beauty assistant. Answer questions about L’Oréal products and recommendations, beauty routines, skincare, makeup, haircare, fragrance, and other beauty-related topics. For questions outside these topics, politely decline and invite the user to ask about L’Oréal or beauty. Do not invent product details; ask a clarifying question when needed.",
  },
];

// Add a message to the chat without treating its text as HTML.
function showMessage(role, text) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("msg", role === "user" ? "user" : "ai");
  messageElement.textContent = text;
  chatWindow.appendChild(messageElement);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Show a welcome message when the page loads.
showMessage("assistant", "Hello! Ask me about L’Oréal products or beauty routines.");

// Send each submitted message to the Cloudflare Worker.
chatForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const text = userInput.value.trim();
  if (!text) {
    return;
  }

  showMessage("user", text);
  messages.push({ role: "user", content: text });
  userInput.value = "";
  sendButton.disabled = true;

  try {
    const response = await fetch(workerUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages }),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "The request could not be completed.");
    }

    const reply = data.choices?.[0]?.message?.content;
    if (typeof reply !== "string" || !reply.trim()) {
      throw new Error("The assistant returned an empty response.");
    }

    messages.push({ role: "assistant", content: reply });
    showMessage("assistant", reply);
  } catch (error) {
    showMessage("assistant", `Sorry, I couldn't get a response. ${error.message}`);
  } finally {
    sendButton.disabled = false;
    userInput.focus();
  }
});
