const dataNamoro = new Date("2025-05-10T18:30:00");

function atualizarTempo() {
  const agora = new Date();

  let totalMeses = (agora.getFullYear() - dataNamoro.getFullYear()) * 12 + (agora.getMonth() - dataNamoro.getMonth());
  let dataBase = new Date(dataNamoro.getFullYear(), dataNamoro.getMonth() + totalMeses, dataNamoro.getDate(), dataNamoro.getHours(), dataNamoro.getMinutes());
  
  if (agora < dataBase) {
    totalMeses--;
    dataBase = new Date(dataNamoro.getFullYear(), dataNamoro.getMonth() + totalMeses, dataNamoro.getDate(), dataNamoro.getHours(), dataNamoro.getMinutes());
  }

  const diffMs = agora - dataBase;
  const dias = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((diffMs / (1000 * 60)) % 60);
  const segundos = Math.floor((diffMs / 1000) % 60);

  document.getElementById("contador").textContent =
    `${totalMeses} meses, ${dias} dias, ${horas} horas, ${minutos} minutos e ${segundos} segundos`;
}

setInterval(atualizarTempo, 1000);
atualizarTempo();


document.getElementById("btnIniciar").addEventListener("click", () => {
  document.getElementById("inicio").style.display = "none";
  document.getElementById("conteudo").classList.remove("oculto");
  audio.play();
  playPauseBtn.textContent = "⏸️";
});

// 🎵 Player
const audio = document.getElementById("audio");
const playPauseBtn = document.getElementById("playPauseBtn");
const barra = document.getElementById("barraProgresso");

playPauseBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playPauseBtn.textContent = "⏸️";
  } else {
    audio.pause();
    playPauseBtn.textContent = "▶️";
  }
});

audio.addEventListener("timeupdate", () => {
  const progresso = (audio.currentTime / audio.duration) * 100;
  barra.style.width = `${progresso}%`;
});

// 💖 Corações
const canvas = document.getElementById("coracoes");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const coracoes = [];

function criarCoracoes() {
  coracoes.length = 0; // limpa os anteriores
  const total = 60; // quantidade total de emojis

  for (let i = 0; i < total; i++) {
    coracoes.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 20 + 10,
      speed: Math.random() * 1 + 0.5,
      drift: (Math.random() - 0.5) * 0.5,
      emoji: i % 2 === 0 ? "❤️" : "🦓"
    });
  }
}

function desenharCoracoes() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let c of coracoes) {
    ctx.font = `${c.size}px serif`;
    ctx.fillStyle = "pink";
    ctx.fillText(c.emoji, c.x, c.y);

    c.y += c.speed;
    c.x += c.drift;

    if (c.y > canvas.height) {
      c.y = -20;
      c.x = Math.random() * canvas.width;
    }
    if (c.x < 0) c.x = 0;
    if (c.x > canvas.width) c.x = canvas.width;
  }
  requestAnimationFrame(desenharCoracoes);
}

criarCoracoes();
desenharCoracoes();

// 💫 Estrelas piscando com shimmer leve
const canvasEstrelas = document.getElementById("estrelas");
const ctxEstrelas = canvasEstrelas.getContext("2d");
canvasEstrelas.width = window.innerWidth;
canvasEstrelas.height = window.innerHeight;

const estrelas = [];
const totalEstrelas = 100;

for(let i = 0; i < totalEstrelas; i++) {
  estrelas.push({
    x: Math.random() * canvasEstrelas.width,
    y: Math.random() * canvasEstrelas.height,
    radius: Math.random() * 1.2 + 0.3,
    alpha: Math.random(),
    delta: (Math.random() * 0.02) + 0.005
  });
}

function desenharEstrelas() {
  ctxEstrelas.clearRect(0, 0, canvasEstrelas.width, canvasEstrelas.height);
  for(let e of estrelas) {
    e.alpha += e.delta;
    if(e.alpha <= 0) {
      e.alpha = 0;
      e.delta = -e.delta;
    } else if(e.alpha >= 1) {
      e.alpha = 1;
      e.delta = -e.delta;
    }
    ctxEstrelas.beginPath();
    ctxEstrelas.arc(e.x, e.y, e.radius, 0, Math.PI * 2);
    ctxEstrelas.fillStyle = `rgba(255, 192, 203, ${e.alpha})`; // rosa claro
    ctxEstrelas.shadowColor = `rgba(255, 192, 203, ${e.alpha})`;
    ctxEstrelas.shadowBlur = 6;
    ctxEstrelas.fill();
  }
  requestAnimationFrame(desenharEstrelas);
}

desenharEstrelas();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvasEstrelas.width = window.innerWidth;
  canvasEstrelas.height = window.innerHeight;
});

const mensagemTextoCompleta = `Desde o dia em que te vi pela primeira vez eu me apaixonei, soube que você era a pessoa certa, naquele nosso encontro no zoológico. Você chegou de surpresa na minha vida, transformando tudo para melhor — foi, sem dúvida, a melhor coisa que me aconteceu. Sou eternamente grato a Deus por ter cruzado nossos caminhos.
Amo cada detalhe seu: seus olhos que brilham, sua boca que encanta, seu sorriso que aquece, a forma delicada como cuida de mim e a sua constante preocupação. Reparo em cada pequeno gesto seu e, a cada dia que passa, minha certeza só cresce: você é a mulher da minha vida.
Desejo que nosso amor floresça em um futuro cheio de prosperidade e bênçãos. Juntos, vamos vencer cada desafio, superar todos os obstáculos. Obrigado por ser exatamente quem você é e por fazer da minha vida um lugar mais feliz.💖`;

const btnMensagem = document.getElementById("btnMensagem");
const mensagemContainer = document.getElementById("mensagem-container");
const mensagemTexto = document.getElementById("mensagem-texto");

btnMensagem.addEventListener("click", () => {
  btnMensagem.style.display = "none";
  mensagemContainer.classList.remove("oculto");

  let i = 0;
  const intervalo = setInterval(() => {
    mensagemTexto.textContent += mensagemTextoCompleta.charAt(i);
    i++;
    if (i >= mensagemTextoCompleta.length) {
      clearInterval(intervalo);
    }
  }, 50); // velocidade da digitação
});
