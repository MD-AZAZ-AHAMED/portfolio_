const chatbotToggle = document.getElementById("chatbotToggle");
const chatbotPanel = document.getElementById("chatbotPanel");
const closeChatbot = document.getElementById("closeChatbot");
const chatbotBody = document.getElementById("chatbotBody");
const userInput = document.getElementById("userInput");
const sendMessage = document.getElementById("sendMessage");

// Ensure GSAP is loaded
if (typeof gsap === "undefined") {
  console.error("GSAP library is missing. Make sure it is included in your HTML.");
}

// Toggle Chatbot Open
chatbotToggle?.addEventListener("click", () => {
  gsap?.to(chatbotPanel, {
    scale: 1,
    opacity: 1,
    duration: 0.4,
    ease: "back.out(1.7)"
  });
});

// Close Chatbot
closeChatbot?.addEventListener("click", () => {
  gsap?.to(chatbotPanel, {
    scale: 0,
    opacity: 0,
    duration: 0.3
  });
});

// Send Message (Button)
sendMessage?.addEventListener("click", sendUserMessage);

// Send Message (Enter Key)
userInput?.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    sendUserMessage();
  }
});

function sendUserMessage() {
  const msg = userInput.value.trim();
  if (!msg) return;

  appendMessage(msg, "user");
  userInput.value = "";

  // Show typing dots
  const typingDots = document.createElement("div");
  typingDots.className = "bot-message typing";
  typingDots.innerHTML = "<span></span><span></span><span></span>";
  chatbotBody.appendChild(typingDots);
  chatbotBody.scrollTop = chatbotBody.scrollHeight;

  // Call OpenAI API
  fetchOpenAI(msg).then((reply) => {
    chatbotBody.removeChild(typingDots);
    appendMessage(reply, "bot");

    // Trigger scrolling to sections
    const lowerReply = reply.toLowerCase();
    if (lowerReply.includes("project")) scrollToSection("#projects");
    if (lowerReply.includes("skills")) scrollToSection("#skills");
    if (lowerReply.includes("contact")) scrollToSection("#contact");
  }).catch(err => {
    chatbotBody.removeChild(typingDots);
    appendMessage("Oops, something went wrong with the AI.", "bot");
    console.error(err);
  });
}

function appendMessage(text, type) {
  const msgEl = document.createElement("div");
  msgEl.className = `${type}-message`;
  msgEl.textContent = text;
  chatbotBody.appendChild(msgEl);
  chatbotBody.scrollTop = chatbotBody.scrollHeight;
}

// Scroll to section smoothly
function scrollToSection(selector) {
  const section = document.querySelector(selector);
  section?.scrollIntoView({ behavior: "smooth" });
}

// ------------------ OpenAI GPT Integration ------------------
async function fetchOpenAI(userInput) {
  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer YOUR_OPENAI_API_KEY" // Replace this!
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a helpful AI guide for Azaz's portfolio website. Respond in a friendly tone. If user asks to see projects, skills, or contact, suggest scrolling there."
          },
          {
            role: "user",
            content: userInput
          }
        ],
        temperature: 0.6
      })
    });

    if (!res.ok) throw new Error("API response was not OK");

    const data = await res.json();
    return data.choices?.[0]?.message?.content || "Sorry, no reply was received.";
  } catch (err) {
    console.error("OpenAI Error:", err);
    return "Sorry, I couldn’t connect to the AI core.";
  }
}
