(() => {
  'use strict';
  const config = window.AUTOFORCA_CONFIG || {};
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const infoDialog = $('#info-dialog');
  const bookingDialog = $('#booking-dialog');
  const form = $('#booking-form');
  const result = $('#booking-result');
  const phone = String(config.whatsapp || '').replace(/\D/g, '');
  const whatsappReady = /^\d{12,15}$/.test(phone);
  const arrow = '<svg class="icon" aria-hidden="true"><use href="#i-arrow"/></svg>';
  const services = {
    'Mecânica Geral': ['Seu carro em boas mãos, em cada detalhe.', 'Inspeção de freios e suspensão', 'Avaliação de motor e transmissão', 'Manutenção de embreagem e componentes mecânicos'],
    'Diagnóstico Computadorizado': ['Tecnologia para encontrar a causa do problema.', 'Leitura dos módulos eletrônicos com scanner', 'Análise dos códigos de falha e parâmetros', 'Diagnóstico explicado antes de qualquer reparo'],
    'Revisão Preventiva': ['Mais tranquilidade no dia a dia e na próxima viagem.', 'Conferência de fluidos, filtros e lubrificação', 'Inspeção dos principais itens de segurança', 'Plano de manutenção conforme o veículo e sua utilização'],
    'Injeção Eletrônica': ['Desempenho e consumo em equilíbrio.', 'Avaliação de sensores e atuadores', 'Verificação e limpeza dos bicos injetores', 'Investigação de falhas, consumo elevado e perda de potência'],
    'Alinhamento e Balanceamento': ['Estabilidade para seguir o melhor caminho.', 'Verificação da geometria das rodas', 'Balanceamento do conjunto roda e pneu', 'Avaliação de desgaste dos pneus e componentes da suspensão'],
    'Elétrica e Climatização': ['Conforto e confiança em todos os trajetos.', 'Teste de bateria, alternador e sistema de partida', 'Diagnóstico de componentes elétricos', 'Avaliação, manutenção e recarga do ar-condicionado'],
  };

  function openDialog(dialog) {
    $$('dialog[open]').forEach(item => item.close());
    dialog.showModal();
    document.body.classList.add('modal-open');
  }
  $$('dialog').forEach(dialog => {
    $('[data-close]', dialog).addEventListener('click', () => dialog.close());
    dialog.addEventListener('close', () => {
      if (!$('dialog[open]')) document.body.classList.remove('modal-open');
    });
    dialog.addEventListener('click', event => {
      const bounds = dialog.getBoundingClientRect();
      if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
    });
  });
  function info(title, html) {
    $('#info-title').textContent = title;
    $('#info-body').innerHTML = html;
    openDialog(infoDialog);
  }
  function showService(name) {
    const [description, ...items] = services[name];
    info(name, `<p>${description}</p><ul>${items.map(item => `<li>${item}</li>`).join('')}</ul><p>O serviço é definido após avaliação do veículo. Você recebe o orçamento e aprova os trabalhos antes da execução.</p><button class="button button-primary" id="book-service">Solicitar este serviço ${arrow}</button>`);
    $('#book-service').addEventListener('click', () => openBooking(name));
  }
  $$('[data-service]').forEach(button => button.addEventListener('click', () => showService(button.dataset.service)));
  $('#all-services').addEventListener('click', () => {
    info('Um cuidado completo para o seu carro.', `<p>Conheça os serviços e escolha o que você precisa. Se estiver em dúvida, solicite uma avaliação.</p><div class="modal-service-list">${Object.keys(services).map(name => `<button data-select-service="${name}">${name}${arrow}</button>`).join('')}</div><button class="button button-primary" id="book-evaluation">Solicitar uma avaliação ${arrow}</button>`);
    $$('[data-select-service]', infoDialog).forEach(button => button.addEventListener('click', () => showService(button.dataset.selectService)));
    $('#book-evaluation').addEventListener('click', () => openBooking('Preciso de uma avaliação'));
  });
  $('#our-story').addEventListener('click', () => {
    info('Confiança construída a cada serviço.', '<p>A AUTOFORÇA nasce de uma ideia simples: cuidar de cada carro com a atenção que ele merece e tratar cada cliente com respeito.</p><p>Com mais de 15 anos de experiência, nossa proposta une conhecimento técnico, equipamentos de diagnóstico e um atendimento próximo. Explicamos o que precisa ser feito, apresentamos o orçamento e mantemos você informado durante o serviço.</p><p>Da manutenção preventiva ao diagnóstico mais complexo, nosso compromisso é ajudar você a seguir com segurança e tranquilidade.</p><button class="button button-primary" id="story-book">Vamos cuidar do seu carro ' + arrow + '</button>');
    $('#story-book').addEventListener('click', () => openBooking());
  });

  const menu = $('.main-nav');
  const menuToggle = $('.menu-toggle');
  function closeMenu() {
    menu.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menu');
  }
  menuToggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  });
  $$('a', menu).forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
  const sectionObserver = new IntersectionObserver(entries => {
    const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible) $$('a', menu).forEach(link => {
      const active = link.getAttribute('href') === `#${visible.target.id}`;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }, { rootMargin: '-18% 0px -50% 0px', threshold: [0, .1, .5] });
  $$('main section[id]').forEach(section => sectionObserver.observe(section));

  if (config.address) $$('[data-address]').forEach(element => { element.textContent = config.address; });
  if (config.phoneDisplay) $$('[data-phone]').forEach(element => { element.textContent = config.phoneDisplay; });
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.email || '')) {
    const emailLink = $('[data-email]');
    emailLink.href = `mailto:${config.email}`;
    $('span', emailLink).textContent = config.email;
    emailLink.hidden = false;
  }
  try {
    const mapsUrl = new URL(config.mapsUrl);
    if (mapsUrl.protocol === 'https:') {
      $('[data-map]').href = mapsUrl.href;
      $('[data-map]').hidden = false;
    }
  } catch { /* O endereço é opcional até a oficina fornecer seus dados. */ }

  function whatsappUrl(message) { return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`; }
  $$('[data-whatsapp]').forEach(button => button.addEventListener('click', () => {
    if (whatsappReady) {
      window.open(whatsappUrl('Olá, AUTOFORÇA! Gostaria de saber mais sobre os serviços e agendar um horário.'), '_blank', 'noopener,noreferrer');
    } else {
      info('Vamos conversar?', '<p>Nosso canal de WhatsApp ainda não está disponível neste site.</p><p><strong>Horário de atendimento</strong><br>Segunda a sexta, das 8h às 18h.<br>Sábado, das 8h às 12h.</p><p>Você pode preparar os detalhes da sua solicitação para compartilhar com a oficina. Isso não confirma nem envia um agendamento.</p><button class="button button-primary" id="contact-book">Preparar solicitação ' + arrow + '</button>');
      $('#contact-book').addEventListener('click', () => openBooking());
    }
  }));

  function workshopNow() {
    const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date());
    const values = Object.fromEntries(parts.map(part => [part.type, part.value]));
    return { date: `${values.year}-${values.month}-${values.day}`, time: `${values.hour}:${values.minute}` };
  }
  const dateField = form.elements.date;
  const timeField = form.elements.time;
  const phoneField = form.elements.phone;
  phoneField.addEventListener('input', () => phoneField.setCustomValidity(''));
  function validateSchedule() {
    const now = workshopNow();
    dateField.min = now.date;
    const date = dateField.value;
    const day = date ? new Date(`${date}T12:00:00`).getDay() : null;
    dateField.setCustomValidity(date && date < now.date ? 'Escolha uma data de hoje em diante.' : day === 0 ? 'A oficina não atende aos domingos. Escolha outro dia.' : '');
    [...timeField.options].forEach(option => {
      option.disabled = Boolean(option.value && ((day === 6 && option.value >= '12:00') || (date === now.date && option.value <= now.time)));
    });
    if (timeField.selectedOptions[0]?.disabled) timeField.value = '';
    return dateField.validity.valid;
  }
  dateField.addEventListener('change', validateSchedule);
  dateField.addEventListener('input', () => dateField.setCustomValidity(''));
  function openBooking(service = '') {
    closeMenu();
    form.hidden = false;
    result.hidden = true;
    form.elements.service.value = service;
    validateSchedule();
    openDialog(bookingDialog);
  }
  $$('[data-book]').forEach(button => button.addEventListener('click', () => openBooking()));
  let toastTimer;
  function toast(message) {
    const element = $('#toast');
    element.textContent = message;
    element.classList.add('visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => element.classList.remove('visible'), 3500);
  }
  form.addEventListener('submit', event => {
    event.preventDefault();
    validateSchedule();
    const contactDigits = phoneField.value.replace(/\D/g, '');
    phoneField.setCustomValidity(/^(?:55)?\d{10,11}$/.test(contactDigits) ? '' : 'Informe um telefone com DDD válido.');
    if (!form.reportValidity()) return;
    const data = Object.fromEntries(new FormData(form));
    const dateLabel = data.date.split('-').reverse().join('/');
    const message = `Olá, AUTOFORÇA! Gostaria de solicitar um horário.\n\nNome: ${data.name.trim()}\nWhatsApp: ${data.phone.trim()}\nVeículo: ${data.vehicle.trim()}\nServiço: ${data.service}\nPreferência: ${dateLabel} às ${data.time}${data.notes.trim() ? `\nObservações: ${data.notes.trim()}` : ''}\n\nAguardo a confirmação da disponibilidade. Obrigado!`;
    result.replaceChildren();
    const status = document.createElement('p');
    status.textContent = whatsappReady ? 'Sua solicitação está pronta. Toque em “Enviar pelo WhatsApp” e envie a mensagem para a equipe. Aguarde a confirmação do horário.' : 'Sua solicitação está pronta, mas o canal de envio ainda não está disponível. Nenhum agendamento foi enviado ou reservado. Você pode copiar os detalhes abaixo.';
    const summary = document.createElement('pre');
    summary.className = 'result-summary';
    summary.textContent = message;
    const actions = document.createElement('div');
    actions.className = 'button-row';
    if (whatsappReady) {
      const send = document.createElement('a');
      send.className = 'button button-primary';
      send.textContent = 'Enviar pelo WhatsApp';
      send.href = whatsappUrl(message);
      send.target = '_blank';
      send.rel = 'noopener noreferrer';
      actions.append(send);
    }
    const copy = document.createElement('button');
    copy.className = 'button button-outline';
    copy.textContent = 'Copiar solicitação';
    copy.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(message);
        toast('Solicitação copiada.');
      } catch {
        const range = document.createRange();
        range.selectNodeContents(summary);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        toast('Selecione e copie o texto da solicitação.');
      }
    });
    const edit = document.createElement('button');
    edit.className = 'button button-outline';
    edit.textContent = 'Editar';
    edit.addEventListener('click', () => { result.hidden = true; form.hidden = false; form.elements.name.focus(); });
    actions.append(copy, edit);
    result.append(status, summary, actions);
    form.hidden = true;
    result.hidden = false;
    bookingDialog.scrollTop = 0;
    actions.querySelector('a,button').focus();
  });

  const policies = {
    privacy: ['Política de Privacidade', '<p>Este site não cria contas, não utiliza cookies de publicidade e não salva os dados do formulário em um banco de dados. As informações digitadas ficam apenas na página enquanto ela está aberta.</p><p>Ao escolher enviar uma solicitação pelo WhatsApp, os dados de contato, veículo, serviço e horário informados são compartilhados com o canal da oficina. O WhatsApp aplica sua própria política de privacidade. Você pode conferir e editar a mensagem antes de enviá-la.</p><p>Os dados devem ser utilizados pela oficina para responder ao pedido e organizar o atendimento. Para dúvidas ou solicitações relacionadas aos seus dados, utilize os canais oficiais disponibilizados pela oficina.</p><p>O provedor de hospedagem pode processar registros técnicos de acesso necessários à entrega e à segurança do site. Não há ferramentas de rastreamento ou análise de visitantes incluídas nesta página.</p>'],
    terms: ['Termos de Uso', '<p>O site apresenta os serviços da AUTOFORÇA e permite preparar uma solicitação de atendimento. O envio de uma solicitação não constitui reserva: datas, horários, preços e escopo dos serviços dependem de confirmação da oficina.</p><p>Qualquer reparo deve ser realizado após avaliação do veículo e aprovação do orçamento. As condições de garantia aplicáveis são informadas pela equipe na ordem de serviço.</p><p>As fotografias são ilustrações geradas por inteligência artificial. As avaliações e os depoimentos identificados como ilustrativos integram a apresentação do layout e não representam avaliações verificadas.</p>'],
  };
  $$('[data-policy]').forEach(button => button.addEventListener('click', () => info(...policies[button.dataset.policy])));
})();
