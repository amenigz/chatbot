async function sendMessage(event) {
  event.preventDefault();

  const prompt = document.getElementById("prompt").value;
  if (!prompt.trim()) return;

  addMessageToChat(prompt, 'right');

  const response = await fetch('http://127.0.0.1:5000/chat', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: prompt }),
  });
  
  const data = await response.json();
  document.getElementById("prompt").value = '';
  addMessageToChat(data.response, 'left');
}

function addMessageToChat(message, side) {
  const chat = document.getElementById('chat');
  const msgHTML = `
      <div class="msg ${side}-msg">
          <div class="msg-img" style="background-image: url(${side === 'right' ? 'user.png' : 'bot.png'})"></div>
          <div class="msg-bubble">
              <div class="msg-info">
                  <div class="msg-info-name">${side === 'right' ? 'Coderider' : 'BOT'}</div>
                  <div class="msg-info-time">${new Date().toLocaleTimeString()}</div>
              </div>
              <div class="msg-text">${message}</div>
          </div>
      </div>
  `;

  chat.insertAdjacentHTML('beforeend', msgHTML);
  chat.scrollTop = chat.scrollHeight;
}
