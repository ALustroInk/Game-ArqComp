const perguntas = [
  { p: "Qual componente processa dados e coordena o funcionamento de todo o sistema?", certa: "CPU", opcoes: ["CPU", "GPU", "RAM", "HD"] },
  { p: "Qual componente do processador realiza cálculos matemáticos e decisões lógicas?", certa: "ULA", opcoes: ["ULA", "Cache L1", "Registrador PC", "Barramento"] },
  { p: "Quais são as memórias minúsculas de alta velocidade dentro da CPU?", dica: "Armazenam temporariamente dados no exato momento da execução.", certa: "Registradores", opcoes: ["Registradores", "Cache L2", "RAM DDR5", "ROM"] },
  { p: "Qual memória armazena dados ativos temporariamente e perde tudo ao desligar?", certa: "RAM", opcoes: ["RAM", "ROM", "EPROM", "Flash"] },
  { p: "Sigla da funcionalidade que transfere dados direto para a RAM sem usar o processador?", dica: "Avisa o processador só quando termina.", certa: "DMA", opcoes: ["DMA", "IRQ", "PCI", "BIOS"] },
  { p: "Sinal de controle que seleciona qual dispositivo no barramento vai responder ao processador?", dica: "Permite conversar com vários dispositivos separadamente.", certa: "CS", opcoes: ["CS", "CLK", "RST", "INT"] },
  { p: "Quais dois barramentos conectam CPU à RAM? O primeiro indica o endereço, o segundo carrega os dados.", certa: "Address Bus e Data Bus", opcoes: ["Address Bus e Data Bus", "Control Bus e I/O Bus", "PCI Bus e USB Bus", "ISA Bus e AGP Bus"] },
  { p: "Linhas Intel que equilibram custo/desempenho e oferecem maior potência, respectivamente?", certa: "i5 e i7", opcoes: ["i5 e i7", "i3 e i5", "Celeron e Pentium", "Xeon e i9"] },
  { p: "Qual processador é para navegação básica e qual é para jogos e edição, respectivamente?", certa: "Dual Core e Quad Core", opcoes: ["Dual Core e Quad Core", "Single Core e Dual Core", "Quad Core e Octa Core", "Atom e i3"] }
]

let atual = 0, acertos = 0, respondeu = false, els = {}

window.onload = () => {
  els = {
    progresso:    document.getElementById('label-progresso'),
    acertos:      document.getElementById('label-acertos'),
    barra:        document.getElementById('barra'),
    pergunta:     document.getElementById('texto-pergunta'),
    dica:         document.getElementById('texto-dica'),
    alternativas: document.getElementById('alternativas'),
    btnNext:      document.getElementById('btn-next'),
    placar:       document.getElementById('placar-final'),
    mensagem:     document.getElementById('mensagem-final'),
    detalhes:     document.getElementById('detalhes-final'),
  }
}

function mostrarTela(id) {
  document.querySelectorAll('.tela').forEach(t => t.classList.remove('ativa'))
  document.getElementById('tela-' + id).classList.add('ativa')
}

function iniciarQuiz() {
  atual = 0; acertos = 0
  mostrarTela('quiz')
  carregarPergunta()
}

function carregarPergunta() {
  respondeu = false
  const q = perguntas[atual]
  const total = perguntas.length

  els.progresso.textContent  = `Pergunta ${atual + 1} de ${total}`
  els.acertos.textContent    = `✔ ${acertos} acertos`
  els.barra.style.width      = `${(atual / total) * 100}%`
  els.pergunta.textContent   = q.p
  els.btnNext.style.display  = 'none'
  els.dica.style.display     = q.dica ? 'block' : 'none'
  els.dica.textContent       = q.dica || ''

  els.alternativas.innerHTML = ''
  ;[...q.opcoes].sort(() => Math.random() - 0.5).forEach(opcao => {
    const btn = document.createElement('button')
    btn.className   = 'button'
    btn.textContent = opcao
    btn.onclick     = () => responder(btn, opcao, q.certa)
    els.alternativas.appendChild(btn)
  })
}

function responder(btnClicado, escolha, certa) {
  if (respondeu) return
  respondeu = true
  if (escolha === certa) acertos++

  document.querySelectorAll('#alternativas .button').forEach(b => {
    b.disabled = true
    if (b.textContent === certa) b.classList.add('certa')
    else if (b === btnClicado)   b.classList.add('errada')
  })

  els.acertos.textContent   = `✔ ${acertos} acertos`
  els.btnNext.style.display = 'inline-block'
  els.btnNext.textContent   = atual === perguntas.length - 1 ? 'Ver resultado >' : 'Próxima >'
}

function proximaPergunta() {
  atual++
  atual < perguntas.length ? carregarPergunta() : mostrarResultado()
}

function mostrarResultado() {
  mostrarTela('resultado')
  const pct = acertos / perguntas.length

  els.placar.textContent   = `${acertos} / ${perguntas.length}`
  els.detalhes.textContent = `${perguntas.length - acertos} erro(s) · ${Math.round(pct * 100)}% de aproveitamento`
  els.mensagem.textContent =
    pct === 1  ? 'PERFEITO! Você é mestre em ArqComp!' :
    pct >= 0.8 ? 'Muito bem! Quase lá!'                :
    pct >= 0.6 ? 'Bom trabalho! Continue estudando.'   :
    pct >= 0.4 ? 'Ainda tem muito a aprender...'       :
                 'GAME OVER. Revise o conteúdo!'
}

function reiniciar() { mostrarTela('start') }