// ======= Simulador de economia =======
document.getElementById('sim-btn').addEventListener('click', () => {
  const kwh = parseFloat(document.getElementById('sim-kwh').value);
  const price = parseFloat(document.getElementById('sim-price').value);
  if(!isNaN(kwh) && !isNaN(price)){
    const result = kwh * price * 0.85; // economia estimada
    document.getElementById('sim-result').textContent = `Economia: R$ ${result.toFixed(2)}/mês`;
  } else {
    document.getElementById('sim-result').textContent = 'Preencha os campos corretamente.';
  }
});

// ======= Modal Educativo =======
function openTopic(topic){
  const modal = document.getElementById('topic-modal');
  const content = document.getElementById('topic-content');
  const topics = {
    'o-que-e':'Energia solar é a conversão da luz solar em energia elétrica...',
    'como-funciona':'O processo de instalação envolve avaliação, projeto, instalação e comissionamento...',
    'economia':'Redução média na conta de luz pode variar de 60 a 95%...',
    'aneel':'A ANEEL regulamenta e autoriza conexão à rede...',
    'taxacao':'Alguns impostos podem impactar o custo final...',
    'falta-luz':'Soluções com baterias permitem uso mesmo sem energia da rede...'
  };
  content.textContent = topics[topic] || 'Conteúdo não disponível.';
  modal.style.display = 'flex';
}
document.querySelectorAll('.close-modal').forEach(btn=>{
  btn.addEventListener('click',()=>document.querySelectorAll('.modal-backdrop').forEach(m=>m.style.display='none'));
});

// ======= Lightbox Portfólio =======
function openPortfolio({src,title,desc}){
  document.getElementById('lightbox-img').src = src;
  document.getElementById('lightbox-title').textContent = title;
  document.getElementById('lightbox-desc').textContent = desc;
  document.getElementById('lightbox').style.display='flex';
}

// ======= WhatsApp Orçamento =======
const waBtn = document.getElementById('quick-wa');
waBtn.href = `https://wa.me/5575999842449?text=Ol%C3%A1%2C+gostaria+de+um+or%C3%A7amento+de+energia+solar.`;

// ======= Formulário =======
function handleForm(e){
  e.preventDefault();
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const project = document.getElementById('projectType').value;
  const consumption = document.getElementById('consumption').value;
  const message = document.getElementById('message').value;
  const text = `Olá, meu nome é ${name}, telefone ${phone}, projeto: ${project}, consumo: ${consumption} kWh/mês. ${message}`;
  window.open(`https://wa.me/5575999842449?text=${encodeURIComponent(text)}`,'_blank');
  document.getElementById('form-status').textContent = 'Redirecionando para WhatsApp...';
}

// ======= Chatbot simples =======
const chatbotBtn = document.getElementById('chatbot-btn');
const chatbotModal = document.getElementById('chatbot-modal');
chatbotBtn.addEventListener('click',()=>chatbotModal.style.display='flex');
chatbotModal.querySelector('.close-modal').addEventListener('click',()=>chatbotModal.style.display='none');

const chatSend = document.getElementById('chat-send');
const chatInput = document.getElementById('chat-input');
const chatBody = document.getElementById('chat-body');

chatSend.addEventListener('click',sendMessage);
chatInput.addEventListener('keypress',e=>{if(e.key==='Enter') sendMessage();});

function sendMessage(){
  const msg = chatInput.value.trim();
  if(!msg) return;
  const userMsg = document.createElement('div');
  userMsg.textContent = 'Você: '+msg;
  userMsg.style.margin='4px 0';
  chatBody.appendChild(userMsg);
  chatInput.value='';
  chatBody.scrollTop = chatBody.scrollHeight;

  const botMsg = document.createElement('div');
  botMsg.textContent = 'Amarsolar: Obrigado pelo contato! Entraremos em breve.';
  botMsg.style.margin='4px 0';
  chatBody.appendChild(botMsg);
  chatBody.scrollTop = chatBody.scrollHeight;
}


processChat(''); // inicia conversa
