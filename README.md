# AUTOFORÇA — Oficina Mecânica

Landing page responsiva criada a partir das referências `1de3.png`, `2de3.png` e `3de3.png`, nessa ordem. HTML, CSS e JavaScript nativos, sem dependências, etapa de build ou serviços externos necessários para renderizar a página.

## Executar

Abra `index.html` no navegador ou use um servidor estático na raiz do projeto:

```sh
python -m http.server 8080
```

Acesse `http://localhost:8080`. O projeto também pode ser publicado diretamente em GitHub Pages, Netlify, Vercel ou outra hospedagem estática. Todos os caminhos de arquivos são relativos, inclusive para publicação em uma subpasta.

## Contatos e agendamento

Edite `config.js` com os dados reais da oficina:

- `whatsapp`: código do país, DDD e número, apenas dígitos;
- `phoneDisplay`: telefone no formato que deve aparecer no rodapé;
- `email`: e-mail oficial;
- `address`: endereço completo;
- `mapsUrl`: link HTTPS do endereço no Google Maps.

O WhatsApp informado pelo responsável, **(16) 97402-5140**, já está configurado. Endereço e e-mail permanecem vazios até serem fornecidos. O site nunca direciona visitantes a um telefone fictício. Se o WhatsApp for removido da configuração, os botões explicam que o canal está indisponível, e o formulário permite copiar uma solicitação sem simular envio ou confirmação.

Com WhatsApp configurado, o formulário prepara uma mensagem para envio voluntário pelo visitante. O horário só é confirmado pela equipe. Não há backend, e-mail automático ou sistema de reservas. Os dados do formulário não são armazenados em cookies, localStorage ou banco de dados.

Horários: segunda a sexta, 8h–18h; sábado, 8h–12h. O formulário usa o fuso `America/Sao_Paulo`, bloqueia datas passadas e domingos, remove horários já passados no dia atual e horários de sábado após o expediente. Feriados e disponibilidade real precisam ser confirmados pela equipe.

## Conteúdo

- Navegação com menu mobile, indicadores de seção e link de acessibilidade.
- Seis serviços com detalhes e seleção direta no formulário.
- História da oficina em modal.
- FAQ expansível acessível por teclado.
- Formulário validado, resumo para revisão, cópia e envio por WhatsApp quando configurado.
- Modais nativos com foco contido, fechamento por Escape e retorno de foco.
- Privacidade e termos que refletem o funcionamento do site.
- Suporte a movimento reduzido e adaptação para desktop, tablet e celular.

Os números, nomes de clientes, depoimentos, garantia e experiência seguem o briefing visual. Avaliações e depoimentos estão sinalizados como ilustrativos; substitua por conteúdo autêntico e autorizado antes de usá-los como prova social. Confirme as alegações de experiência e garantia com a oficina.

## Imagens

As fotografias em `assets/workshop-hero.png` e `assets/workshop-team.png` foram criadas com a ferramenta nativa Imagegen e estão incluídas no repositório. Não são fotografias documentais da oficina. Prompts em `assets/IMAGE-PROMPTS.md`. O logotipo e os ícones são SVGs locais. Não há carregamento de imagens ou fontes de terceiros.

## Publicar no GitHub Pages

Em **Settings → Pages**, selecione **Deploy from a branch**, branch `main`, pasta `/ (root)` e salve. A URL padrão será `https://vit0r-maker.github.io/OFICINACODEX/` após a publicação ser concluída pelo GitHub. O commit do código não habilita automaticamente esse serviço. O domínio `www.autoforca.com.br` mostrado na referência não foi configurado, pois sua propriedade e DNS não foram fornecidos.

## Segurança

Não inclua tokens, senhas ou arquivos `.env` no repositório. `config.js` é público e deve conter apenas dados de contato públicos.
