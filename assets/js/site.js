const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const moeda = new Intl.NumberFormat('pt-BR', {style:'currency', currency:'BRL'});
const reais = centavos => moeda.format(centavos / 100);
const whatsapp = mensagem => LOJA.whatsapp + '?text=' + encodeURIComponent(mensagem);
const icone = id => `<svg aria-hidden="true" class="icon"><use href="#${id}"></use></svg>`;

const menu = $('[data-menu]');
const nav = $('#navegacao');
function toggleMenu(open) {
  menu.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('is-open', open);
  menu.lastElementChild.textContent = open ? 'Fechar' : 'Menu';
}
menu.addEventListener('click', () => toggleMenu(menu.getAttribute('aria-expanded') === 'false'));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
    toggleMenu(false);
    menu.focus();
  }
});
matchMedia('(min-width: 66rem)').addEventListener('change', () => toggleMenu(false));

function horarioLoja(agora = new Date()) {
  const parts = Object.fromEntries(new Intl.DateTimeFormat('en-US', {
    timeZone:'America/Sao_Paulo', weekday:'short', hour:'2-digit', minute:'2-digit', hourCycle:'h23'
  }).formatToParts(agora).map(({type,value}) => [type,value]));
  const dias = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const diasPT = ['domingo','segunda','terça','quarta','quinta','sexta','sábado'];
  const dia = dias.indexOf(parts.weekday);
  const minutos = Number(parts.hour) * 60 + Number(parts.minute);
  const periodo = LOJA.horarios[dia];
  const hora = m => Math.floor(m / 60) + 'h' + (m % 60 ? String(m % 60).padStart(2,'0') : '');
  if (periodo && minutos >= periodo[0] && minutos < periodo[1]) return {aberto:true, texto:'Aberto agora · até ' + hora(periodo[1])};
  if (periodo && minutos < periodo[0]) return {aberto:false, texto:'Fechado agora · abre às ' + hora(periodo[0])};
  for (let offset = 1; offset <= 7; offset += 1) {
    const proximo = (dia + offset) % 7;
    if (LOJA.horarios[proximo]) {
      return {aberto:false, texto:`Fechado agora · abre às ${hora(LOJA.horarios[proximo][0])} de ${diasPT[proximo]}`};
    }
  }
}

function atualizarHorario() {
  const status = horarioLoja();
  $$('[data-horario]').forEach(el => {
    el.textContent = status.texto;
    el.dataset.aberto = String(status.aberto);
  });
}
if ($('[data-horario]')) {
  atualizarHorario();
  setInterval(atualizarHorario, 20000);
}

function renderCards(el) {
  const ids = el.dataset.cards === 'home' ? ['limpeza','clareamento','pintura'] : Object.keys(CATALOGO.categorias);
  const home = el.dataset.cards === 'home';
  el.innerHTML = ids.map(id => {
    const [titulo,descricao,simbolo] = CATALOGO.categorias[id];
    const valores = CATALOGO.calcados.filter(item => item[1] === id && item[4]).map(item => item[4][0]);
    const preco = valores.length ? 'A partir de ' + reais(Math.min(...valores)) : 'Consulte';
    const link = home ? 'servicos.html#' + id : whatsapp('Olá, Wash Brothers! Quero saber mais sobre ' + titulo + ' e pedir um orçamento.');
    return `<article class="service-card" id="${id}"><span class="service-icon">${icone(simbolo)}</span><h3>${titulo}</h3><p>${descricao}</p><div class="card-bottom"><strong>${preco}</strong><a class="${home ? 'text-link' : 'button small outline'}" href="${link}">${home ? 'Ver serviço' : 'Quero esse serviço'}<span class="sr-only"> — ${titulo}</span></a></div></article>`;
  }).join('');
}
$$('[data-cards]').forEach(renderCards);

function setupTabs(tablist, onSelect) {
  const tabs = $$('[role="tab"]', tablist);
  const select = tab => {
    tabs.forEach(item => {
      const selected = item === tab;
      item.setAttribute('aria-selected', String(selected));
      item.tabIndex = selected ? 0 : -1;
      document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
    });
    onSelect?.(tab);
  };
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => select(tab));
    tab.addEventListener('keydown', event => {
      const next = {ArrowRight:(index+1)%tabs.length, ArrowLeft:(index+tabs.length-1)%tabs.length, Home:0, End:tabs.length-1}[event.key];
      if (next === undefined) return;
      event.preventDefault();
      select(tabs[next]);
      tabs[next].focus();
    });
  });
  select(tabs[0]);
}

const tabela = $('[data-tabela]');
if (tabela) {
  $('[data-linhas="calcados"]').innerHTML = CATALOGO.calcados.map(([, ,nome,descricao,precos]) => `<tr><th scope="row">${nome}${descricao ? '<small>' + descricao + '</small>' : ''}</th>${precos ? precos.map((val,i) => `<td><span class="price-pill p${i+1}">${reais(val)}</span></td>`).join('') : '<td colspan="3"><span class="price-pill consult">Consulte</span></td>'}</tr>`).join('');
  for (const tipo of ['bones','bolsas']) {
    $(`[data-linhas="${tipo}"]`).innerHTML = CATALOGO.acessorios.map(nome => `<tr><th scope="row">${nome}</th><td><span class="price-pill consult">Consulte</span></td></tr>`).join('');
  }
  setupTabs(tabela);
}

function calcularOrcamento(itens, quantidade, indicePrazo) {
  const porId = new Map(CATALOGO.calcados.map(item => [item[0], item]));
  const pacote = quantidade >= PROMOCAO.minimoPacote && itens.includes('geral');
  const selecionados = [...itens];
  if (pacote && !itens.includes('impermeabilizacao')) selecionados.push('impermeabilizacao');
  const precos = selecionados.map(id => porId.get(id)[4][indicePrazo]);
  const base = precos.reduce((soma, preco) => soma + preco, 0) * quantidade;
  let economia = 0;
  if (pacote) {
    const valorSeparado = porId.get('geral')[4][indicePrazo] + porId.get('impermeabilizacao')[4][indicePrazo];
    economia = (valorSeparado - PROMOCAO.valorPacote) * quantidade;
  } else if (itens.includes('geral')) {
    const percentual = PROMOCAO.percentual[quantidade] || 0;
    economia = Math.round(porId.get('geral')[4][indicePrazo] * quantidade * percentual / 100);
  }
  return {total:base-economia, economia, pacote, selecionados};
}

const simulador = $('#simulador-form');
if (simulador) {
  const listaServicos = $('[data-sim-servicos]', simulador);
  const quantidade = $('#quantidade');
  const prazo = $('#prazo');
  const botao = $('button[type=submit]', simulador);
  const aviso = $('[data-sim-aviso]');
  const precificados = CATALOGO.calcados.filter(item => item[4]);
  listaServicos.innerHTML = precificados.map(([id, ,nome], index) => `<label class="check-item"><input type="checkbox" name="servico" value="${id}" ${index === 0 ? 'checked' : ''}><span>${nome}</span><span data-valor="${id}"></span></label>`).join('');

  function atualizarSimulador() {
    const itens = $$('input[name=servico]:checked', simulador).map(el => el.value);
    const quant = quantidade.valueAsNumber;
    const indicePrazo = Number(prazo.value);
    const valido = quantidade.validity.valid && itens.length > 0;
    const resultado = valido ? calcularOrcamento(itens, quant, indicePrazo) : {total:0,economia:0,pacote:false};
    precificados.forEach(([id, , , ,precos]) => $(`[data-valor="${id}"]`).textContent = reais(precos[indicePrazo]));
    $('[data-total]').textContent = valido ? reais(resultado.total) : '—';
    $('[data-economia]').textContent = valido ? reais(resultado.economia) : '—';
    aviso.textContent = resultado.pacote ? 'Pacote aplicado com impermeabilização em cada par. Valores sujeitos a avaliação do estado do calçado.' : 'Valores sujeitos a avaliação do estado do calçado.';
    botao.disabled = !valido;
    return valido ? { ...resultado, quant } : null;
  }
  simulador.addEventListener('input', atualizarSimulador);
  simulador.addEventListener('submit', event => {
    event.preventDefault();
    const resumo = atualizarSimulador();
    if (!resumo) return;
    const nomes = resumo.selecionados.map(id => precificados.find(item => item[0] === id)[2]);
    const pacote = resumo.pacote ? '\nPacote de higienização + impermeabilização aplicado.' : '';
    location.href = whatsapp(`Olá, Wash Brothers! Quero confirmar um orçamento para ${resumo.quant} par(es).\nPrazo de entrega: ${prazo.selectedOptions[0].textContent}.\nServiços: ${nomes.join(', ')}.${pacote}\nTotal estimado: ${reais(resumo.total)}.\nEconomia: ${reais(resumo.economia)}.`);
  });
  atualizarSimulador();
}

$$('[data-comparador]').forEach(frame => {
  const slider = $('input[type="range"]', frame);
  const update = () => {
    frame.style.setProperty('--position', slider.value + '%');
    slider.setAttribute('aria-valuetext', slider.value + '% da imagem de antes visível');
  };
  slider.addEventListener('input', update);
  update();
});
const filtros = $('[data-filtros]');
if (filtros) {
  filtros.addEventListener('click', event => {
    const botao = event.target.closest('button[data-filtro]');
    if (!botao) return;
    $$('button', filtros).forEach(el => el.setAttribute('aria-pressed', String(el === botao)));
    const cards = $$('[data-galeria] [data-categoria]');
    cards.forEach(el => el.hidden = botao.dataset.filtro !== 'todos' && el.dataset.categoria !== botao.dataset.filtro);
    const n = cards.filter(el => !el.hidden).length;
    $('[data-galeria-status]').textContent = n === 1 ? '1 comparação' : n + ' comparações';
  });
}

const consulta = $('#consulta-form');
if (consulta) {
  consulta.addEventListener('submit', event => {
    event.preventDefault();
    const dados = new FormData(consulta);
    location.href = whatsapp(`Olá, Wash Brothers! Meu nome é ${dados.get('nome').trim()}. Quero pedir um orçamento para ${dados.get('item')}.\nDetalhes: ${dados.get('detalhes').trim()}\nVou anexar as fotos aqui na conversa.`);
  });
}

const rastreio = $('#pedido-form');
if (rastreio) {
  // Dados fictícios. A demonstração não consulta o sistema da loja.
  const pedidos = {'WB-1024':1,'WB-1025':0,'WB-1026':2};
  const etapas = ['Recebido','Em tratamento','Pronto para retirada'];
  const status = $('[data-pedido-status]');
  const timeline = $('[data-pedido-etapas]');
  const codigo = $('#codigo');
  $$('[data-exemplo-pedido]').forEach(botao => botao.addEventListener('click', () => {
    codigo.value = botao.dataset.exemploPedido;
    rastreio.requestSubmit();
  }));
  rastreio.addEventListener('submit', event => {
    event.preventDefault();
    const chave = codigo.value.trim().toUpperCase();
    const atual = pedidos[chave];
    if (!Object.hasOwn(pedidos, chave)) {
      status.textContent = 'Código de exemplo não encontrado. Experimente WB-1024, WB-1025 ou WB-1026.';
      timeline.hidden = true;
      timeline.replaceChildren();
      return;
    }
    status.textContent = `Pedido ${chave} · ${etapas[atual]}`;
    timeline.innerHTML = etapas.map((etapa, index) => {
      const classe = index < atual ? 'feito' : index === atual ? 'atual' : '';
      const estado = index < atual ? 'Concluído' : index === atual ? 'Etapa atual' : 'Pendente';
      return `<li class="${classe}" ${index === atual ? 'aria-current="step"' : ''}><span class="step-marker">${index + 1}</span><div><strong>${etapa}</strong><small>${estado}</small></div></li>`;
    }).join('');
    timeline.hidden = false;
  });
}

if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('arrived');
    observer.unobserve(entry.target);
  }), {threshold:0.1});
  $$('[data-reveal]').forEach(el => observer.observe(el));
}
