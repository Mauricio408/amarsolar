
// ==============================
// CONFIGURAÇÕES
// ==============================
const WHATSAPP_NUMBER = '5575999842449';
const EMAIL_RECEIVER = 'mauriciosantana408@gmail.com';
const GOOGLE_FORM_ACTION = ''; // Coloque a URL do Google Form aqui
const GOOGLE_FORM_FIELD_MAPPING = {
  'name': 'entry.123456789',
  'phone': 'entry.987654321',
  'projectType': 'entry.1122334455',
  'consumption': 'entry.5544332211',
  'message': 'entry.9988776655'
};

// ==============================
// FUNÇÕES DE HELPER
// ==============================
function on(el, evt, handler){
  if(!el) return;
  if(el.addEventListener) return el.addEventListener(evt, handler);
  if(el.attachEvent) return el.attachEvent('on' + evt, handler);
  el['on' + evt] = handler;
}

function isValidPhone(p){
  const regex = /^\(?[1-9]{2}\)?\s?9?\d{4}-?\d{4}$/;
  return regex.test(p);
}

// ==============================
// WHATSAPP BUTTONS
// ==============================
document.addEventListener('DOMContentLoaded', function(){
  const waBtn = document.getElementById('whatsapp-btn');
  const quickWa = document.getElementById('quick-wa');
  const DEFAULT_WA_MESSAGE = 'Olá! Gostaria de um orçamento de energia solar para minha residência.';

  if(WHATSAPP_NUMBER && WHATSAPP_NUMBER.trim() !== ''){
    const waBase = `https://wa.me/${WHATSAPP_NUMBER}`;
    const waUrl = `${waBase}?text=${encodeURIComponent(DEFAULT_WA_MESSAGE)}`;
    if(waBtn) waBtn.href = waUrl;
    if(quickWa) quickWa.href = waUrl;
  } else {
    if(waBtn) waBtn.style.display = 'none';
    if(quickWa) quickWa.style.display = 'none';
  }
});

// ==============================
// SIMULADOR DE ECONOMIA
// ==============================
function calcSim(){
  const kwh = Number(document.getElementById('sim-kwh').value) || 0;
  const price = Number(document.getElementById('sim-price').value) || 0.8;
  const out = document.getElementById('sim-result');

  if(kwh <= 0){
    if(out) out.textContent = 'Informe kWh/mês';
    return;
  }

  const monthlyCost = kwh * price;
  const estimatedReduction = monthlyCost * 0.8;
  const monthlySaving = estimatedReduction;
  const yearlySaving = monthlySaving * 12;

  if(out) out.textContent = `Economia aprox.: R$ ${monthlySaving.toFixed(2)}/mês — R$ ${yearlySaving.toFixed(2)}/ano`;
}

const simBtn = document.getElementById('sim-btn');
if(simBtn) on(simBtn, 'click', calcSim);

// ==============================
// MODAIS DE EDUCAÇÃO
// ==============================
const topicModal = document.getElementById('topic-modal');
const topicContent = document.getElementById('topic-content');
const closeBtns = document.querySelectorAll('.close-modal');

const topics = {
  'o-que-e': '<h3>O que é energia solar?</h3><p>A energia solar fotovoltaica converte luz do sol em eletricidade através de painéis solares. É limpa, renovável e reduz a dependência de combustíveis fósseis.</p>',
  'como-funciona': '<h3>Como funciona a instalação?</h3><p>Primeiro fazemos um estudo de viabilidade, depois projetamos o sistema, instalamos os painéis e o inversor, e comissionamos para conectar à rede elétrica.</p>',
  'economia': '<h3>Economia na conta de luz</h3><p>Sistemas bem projetados podem reduzir significativamente a conta. O ROI depende do consumo, tarifa e do investimento inicial.</p>',
  'aneel': '<h3>Regulamentações (ANEEL)</h3><p>A ANEEL regulamenta o sistema de compensação de energia (net metering). É importante seguir normas para conexão à rede.</p>',
  'taxacao': '<h3>Taxação</h3><p>Tributos e tarifas variam; consideramos impostos locais e custos de instalação no orçamento.</p>',
  'falta-luz': '<h3>Falta de luz</h3><p>Sem baterias, sistemas conectados à rede não funcionam em queda da rede por segurança. Oferecemos soluções com armazenamento para continuidade.</p>'
};

function openTopic(key){
  if(topicContent) topicContent.innerHTML = topics[key] || '<p>Conteúdo em desenvolvimento.</p>';
  if(topicModal) topicModal.classList.add('active');
}

function closeModals(){
  const modals = document.querySelectorAll('.modal-backdrop.active');
  modals.forEach(m => m.classList.remove('active'));
}

closeBtns.forEach(btn => on(btn, 'click', closeModals));

// ==============================
// PORTFÓLIO LIGHTBOX
// ==============================
const portfolioModal = document.getElementById('lightbox');
const portfolioImg = document.getElementById('lightbox-img');
const portfolioTitle = document.getElementById('lightbox-title');
const portfolioDesc = document.getElementById('lightbox-desc');

function openPortfolio(data){
  if(portfolioImg) portfolioImg.src = data.src;
  if(portfolioTitle) portfolioTitle.textContent = data.title;
  if(portfolioDesc) portfolioDesc.textContent = data.desc;
  if(portfolioModal) portfolioModal.classList.add('active');
}

// ==============================
// TESTIMONIAL SLIDER
// ==============================
const testimonials = document.getElementById('testimonials');
if(testimonials){
  setInterval(() => {
    const maxScroll = testimonials.scrollWidth - testimonials.clientWidth;
    if(maxScroll <= 0) return;

    if(testimonials.scrollLeft + testimonials.clientWidth >= testimonials.scrollWidth)
      testimonials.scrollLeft = 0;
    else {
      try {
        testimonials.scrollBy({ left: 310, behavior: 'smooth' });
      } catch(e){
        testimonials.scrollLeft += 310;
      }
    }
  }, 3500);
}

// ==============================
// FORMULÁRIO DE CONTATO
// ==============================
const form = document.getElementById('contact-form');
const statusDiv = document.getElementById('form-status');

function handleForm(e){
  e && e.preventDefault();
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const type = document.getElementById('projectType').value;
  const consumption = document.getElementById('consumption').value;

  if(!name || !phone || !type || !consumption){
    statusDiv.textContent = 'Por favor, preencha todos os campos obrigatórios.';
    statusDiv.style.color = 'red';
    return;
  }

  if(!isValidPhone(phone)){
    statusDiv.textContent = 'Telefone inválido.';
    statusDiv.style.color = 'red';
    return;
  }

  statusDiv.textContent = 'Enviando...';
  statusDiv.style.color = '#6b6f76';

  const formData = new FormData();
  formData.append(GOOGLE_FORM_FIELD_MAPPING.name, name);
  formData.append(GOOGLE_FORM_FIELD_MAPPING.phone, phone);
  formData.append(GOOGLE_FORM_FIELD_MAPPING.projectType, type);
  formData.append(GOOGLE_FORM_FIELD_MAPPING.consumption, consumption);

  if(GOOGLE_FORM_ACTION && GOOGLE_FORM_ACTION.trim() !== ''){
    fetch(GOOGLE_FORM_ACTION, { method: 'POST', mode: 'no-cors', body: formData })
      .then(() => {
        statusDiv.textContent = 'Enviado! Entraremos em contato em breve.';
        statusDiv.style.color = '#6b6f76';
        form.reset();
      })
      .catch(err => {
        statusDiv.textContent = 'Erro ao enviar. Tente novamente ou use o WhatsApp.';
        statusDiv.style.color = 'red';
      });
  } else {
    const waMessage = `Olá! Gostaria de um orçamento de energia solar.\nNome: ${name}\nTelefone: ${phone}\nTipo: ${type}\nConsumo(kWh/mês): ${consumption}`;
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMessage)}`;
    window.open(waUrl, '_blank');
    statusDiv.textContent = 'Redirecionando para o WhatsApp...';
  }
}

// ==============================
// ANIMAÇÃO DE ÂNCORAS
// ==============================
const anchors = document.querySelectorAll('a[href^="#"]');
anchors.forEach(a => on(a, 'click', function(e){
  if(a.getAttribute('href') === '#') return;
  e && e.preventDefault();
  const id = a.getAttribute('href').slice(1);
  const el = document.getElementById(id);
  if(el) el.scrollIntoView({ behavior: 'smooth' });
}));

// ==============================
// CHATBOT
// ==============================
const chatbotBtn = document.getElementById('chatbot-btn');
const chatbotModal = document.getElementById('chatbot-modal');
const chatBody = document.getElementById('chat-body');
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');

let chatState = 'initial';

function addMessage(text, sender){
  const msg = document.createElement('div');
  msg.classList.add('chat-message', `chat-${sender}`);
  msg.textContent = text;
  chatBody.appendChild(msg);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function processChat(message){
  switch(chatState){
    case 'initial':
      addMessage('Olá! Sou o assistente virtual da Amarsolar. Qual o seu nome?', 'bot');
      chatState = 'askName';
      break;
    case 'askName':
      addMessage('Olá, '+message+'. Prazer! Qual é o seu consumo médio mensal de energia (em kWh)?', 'bot');
      chatState = 'askConsumption';
      break;
    case 'askConsumption':
      addMessage('Perfeito! Para finalizarmos, digite seu telefone para contato.', 'bot');
      chatState = 'askPhone';
      break;
    case 'askPhone':
      addMessage('Obrigado! Entraremos em contato em breve. Você pode agora preencher o formulário completo.', 'bot');
      chatState = 'final';
      break;
    default:
      addMessage('Desculpe, não entendi.', 'bot');
      break;
  }
}

on(chatbotBtn, 'click', () => chatbotModal.classList.toggle('active'));
on(chatSend, 'click', handleChatInput);
on(chatInput, 'keydown', e => { if(e.key === 'Enter') handleChatInput(); });

function handleChatInput(){
  const input = chatInput.value.trim();
  if(input === '') return;
  addMessage(input, 'user');
  chatInput.value = '';
  processChat(input);
}

processChat(''); // inicia conversa
