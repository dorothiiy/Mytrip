// Reusable Components script
const Components = {
  renderNavbar: () => {
    return `
      <nav class="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200 shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16 items-center">
            <a href="index.html" class="flex items-center text-2xl font-bold text-brand-600 tracking-tight">
              <svg class="w-8 h-8 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"></path><circle cx="12" cy="12" r="10" stroke-width="2"></circle></svg>
              AI Travel
            </a>
            <div id="navRight" class="flex items-center space-x-4">
              <!-- Dynamically populated based on auth -->
            </div>
          </div>
        </div>
      </nav>
    `;
  },

  renderChatbot: () => {
    return `
      <div id="chatWidget" class="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        <div id="chatWindow" class="bg-white w-80 sm:w-96 rounded-2xl shadow-2xl border border-slate-100 mb-4 overflow-hidden transform transition-all duration-300 scale-0 origin-bottom-right flex flex-col h-96">
          <div class="bg-brand-600 text-white px-4 py-3 flex justify-between items-center">
            <div class="flex items-center">
               <div class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-2 text-xl">🤖</div>
               <div>
                 <h3 class="font-bold text-sm">Travel Assistant</h3>
                 <p class="text-xs text-brand-100">Always online</p>
               </div>
            </div>
            <button onclick="toggleChat()" class="text-white hover:text-brand-100 transition">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>
          
          <div id="chatMessages" class="flex-grow p-4 overflow-y-auto bg-slate-50 space-y-3">
            <div class="flex">
              <div class="bg-white border border-slate-100 p-3 rounded-2xl rounded-tl-sm shadow-sm text-sm text-slate-700 max-w-[80%]">
                Hello! 👋 I'm your AI Travel Assistant. Ask me about best places to visit, hidden spots, trekking, or budget travel tips!
              </div>
            </div>
          </div>
          
          <div class="p-3 bg-white border-t border-slate-100">
            <form id="chatForm" class="flex gap-2" onsubmit="handleChatSubmit(event)">
              <input type="text" id="chatInput" placeholder="Ask something..." class="flex-grow px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500" required autocomplete="off">
              <button type="submit" class="bg-brand-600 hover:bg-brand-700 text-white p-2 rounded-xl transition flex items-center justify-center">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
              </button>
            </form>
          </div>
        </div>
        
        <button onclick="toggleChat()" class="bg-brand-600 hover:bg-brand-700 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition hover:scale-110 active:scale-95">
          <svg id="chatIconOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
          <svg id="chatIconClose" class="w-6 h-6 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>
    `;
  },

  initNavbar: (user) => {
    const navRight = document.getElementById('navRight');
    if (navRight) {
      if (user) {
        navRight.innerHTML = `
          <span class="text-slate-600 font-medium hidden sm:inline-block">Hello, ${user.fullName}</span>
          <a href="dashboard.html" class="px-4 py-2 text-brand-600 hover:text-brand-700 font-medium transition cursor-pointer">Dashboard</a>
          <button onclick="Auth.logout()" class="px-4 py-2 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-full font-medium transition cursor-pointer">Logout</button>
        `;
      } else {
        navRight.innerHTML = `
          <a href="login.html" class="px-4 py-2 text-slate-600 hover:text-brand-600 font-medium transition">Login</a>
          <a href="register.html" class="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-full font-medium shadow transition">Sign Up</a>
        `;
      }
    }
  }
};

// Chatbot UI logic
let isChatOpen = false;
function toggleChat() {
  isChatOpen = !isChatOpen;
  const window = document.getElementById('chatWindow');
  const iconOpen = document.getElementById('chatIconOpen');
  const iconClose = document.getElementById('chatIconClose');
  
  if (isChatOpen) {
    window.classList.remove('scale-0');
    window.classList.add('scale-100');
    iconOpen.classList.add('hidden');
    iconClose.classList.remove('hidden');
    document.getElementById('chatInput').focus();
  } else {
    window.classList.remove('scale-100');
    window.classList.add('scale-0');
    iconOpen.classList.remove('hidden');
    iconClose.classList.add('hidden');
  }
}

async function handleChatSubmit(e) {
  e.preventDefault();
  const input = document.getElementById('chatInput');
  const message = input.value.trim();
  if (!message) return;
  
  input.value = '';
  addMessage(message, 'user');
  
  const loadingId = addMessage('...', 'bot', true);
  
  try {
    const response = await fetchAPI('/chat', {
      method: 'POST',
      body: JSON.stringify({ message })
    });
    removeMessage(loadingId);
    addMessage(response.reply, 'bot');
  } catch (err) {
    console.error(err);
    removeMessage(loadingId);
    addMessage('Sorry, I encountered an error. Please try again.', 'bot');
  }
}

function addMessage(text, sender, isLoading = false) {
  const msgsContainer = document.getElementById('chatMessages');
  if (!msgsContainer) return;

  const msgDiv = document.createElement('div');
  const id = 'msg-' + Date.now();
  msgDiv.id = id;
  
  if (sender === 'user') {
    msgDiv.className = 'flex justify-end';
    msgDiv.innerHTML = `
      <div class="bg-brand-600 text-white p-3 rounded-2xl rounded-tr-sm shadow-sm text-sm max-w-[80%]">
        ${text}
      </div>
    `;
  } else {
    msgDiv.className = 'flex';
    msgDiv.innerHTML = `
      <div class="bg-white border border-slate-100 p-3 rounded-2xl rounded-tl-sm shadow-sm text-sm text-slate-700 max-w-[80%] ${isLoading ? 'animate-pulse text-xl' : ''}">
        ${text}
      </div>
    `;
  }
  
  msgsContainer.appendChild(msgDiv);
  msgsContainer.scrollTop = msgsContainer.scrollHeight;
  return id;
}

function removeMessage(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}
