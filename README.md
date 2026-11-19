# Wash Brothers

Site demonstrativo em português do Brasil, com dez páginas estáticas. Usa HTML, CSS e JavaScript puro, sem etapa de build.

## Abrir e publicar

- Abra `index.html` no navegador para navegar pela demonstração. Para servir localmente, execute `python -m http.server 8000` nesta pasta e abra `http://localhost:8000/`.
- Para publicar no GitHub Pages, copie o **conteúdo** desta pasta para a raiz do repositório, incluindo `.nojekyll`. Em **Settings → Pages**, selecione **Deploy from a branch**, a branch desejada e **/ (root)**. Os links internos são relativos e funcionam em URLs de projeto.
- Após definir o endereço público, adicione `og:url` com o endereço de cada página e substitua `og:image` e a imagem do JSON-LD pela URL absoluta da imagem de capa. Os metadados individuais ficam no `<head>` das dez páginas. Google Fonts e o mapa incorporado precisam de internet.

## Arquivos e edição

- **HTML:** `index.html`, `servicos.html`, `precos.html`, `antes-e-depois.html`, `como-funciona.html`, `sobre.html`, `faq.html`, `contato.html`, `avaliacoes.html` e `dicas.html`. Os textos ficam em cada página. O cabeçalho, o rodapé e os dados estruturados se repetem nos dez arquivos. Ao mudar endereço, links ou horários, procure também pelos valores antigos nos arquivos HTML e pela configuração de horário em `assets/js/servicos.js`.
- **Catálogo:** edite `assets/js/servicos.js`. Cada linha de calçados contém identificador, categoria, nome, descrição e preços em centavos na ordem de 8 dias úteis, 3 dias úteis e mesmo dia. Use `null` para “Consulte”. Esse catálogo alimenta os cards, as tabelas e as opções do simulador. A regra promocional fica em `PROMOCAO`. Se ela mudar, atualize também os cartazes HTML e a resposta do FAQ.
- **Interações:** `assets/js/site.js` contém o horário no fuso de São Paulo, os controles de navegação, as abas, o simulador, os filtros, os sliders e os formulários. Na consulta por foto, as imagens são anexadas pelo visitante dentro do WhatsApp.
- **Identidade visual:** as variáveis de cor e tipografia ficam no início de `assets/css/site.css`. Substitua `assets/img/logo.svg` pelo logotipo oficial e ajuste dimensões e texto alternativo se necessário. Substitua `assets/img/capa.jpg` pela imagem de capa escolhida.
- **Galeria e personagens:** procure os comentários `TODO` em `index.html`, `antes-e-depois.html` e `sobre.html`. Na galeria, use duas fotos com o mesmo enquadramento e atualize os textos alternativos. As fotos podem preencher o quadro com `object-fit:cover`; retire o filtro de cor aplicado a `.before img` quando inserir as fotos reais.

## Interpretação do simulador

A quantidade e o prazo de entrega valem para todos os serviços selecionados. Para dois a quatro pares, o percentual incide sobre a Higienização Geral. Quando ela está selecionada e a quantidade chega a cinco pares, o pacote substitui o preço da higienização e da impermeabilização por R$ 49,99 por par. A economia compara o pacote com o valor dos dois itens cobrados separadamente no prazo escolhido. Serviços adicionais são cobrados à parte. Os preços estão sujeitos a avaliação.

## Material demonstrativo e itens a confirmar

- Logotipo provisório, foto conceitual da capa e quadros reservados para as ilustrações oficiais de Tico e Bruno.
- Comparações ilustradas para substituir por fotos reais de antes e depois.
- Depoimentos e números institucionais fictícios. Substitua os exemplos em `avaliacoes.html` por avaliações reais autorizadas. Texto de apresentação da marca a validar com os proprietários.
- Preços dos reparos, de bonés e de bolsas, prazos de bonés e bolsas e nome completo do serviço “Troca de …”.
- Condições da oferta entre prazos e cálculo da economia do pacote, conforme a interpretação descrita acima.
- Endereço público para completar os metadados de compartilhamento.

## Imagem conceitual

Arquivo `assets/img/capa.jpg`, gerado com a ferramenta integrada de imagem.

> Use case: product-mockup. Hero photo for a Brazilian sneaker laundry website. Square studio editorial product photograph, low angle side view of one immaculate cream-white retro basketball low-top sneaker with layered leather and chunky sole, toe pointing right, hovering diagonally above a vivid pink block with water droplets spraying in an arc. Saturated royal indigo backdrop, sharp blue and magenta rim lighting, clean commercial image, punchy saturation and restrained composition. The full sneaker fits comfortably inside the frame. Premium authentic material details. No people, text, global brand marks, logos, watermarks, or mockup of a website.

