# iCanada Reparos

Site institucional da **iCanada Reparos**, assistência técnica independente especializada em dispositivos Apple, localizada em Recife — PE.

O projeto apresenta os principais serviços da empresa, diferenciais técnicos, etapas do atendimento, empresas atendidas, avaliações de clientes e canais de contato.

## Status do projeto

Site oficial: https://icanadareparos.com.br/. O repositório de produção é `Riclacper/web-site-icanada-reparos`, com deploy contínuo pela Vercel a partir da branch `main`.

Publicação imediata autorizada pelo responsável em **24/10/2026**, incluindo endereço, horários e rota. O início do atendimento na nova unidade permanece em **26/10/2026, segunda-feira**, informado no site. O agendamento anterior para publicar em 26/10 foi desativado.

## Principais recursos

- layout responsivo para desktop, tablet e celular;
- atendimento para MacBook, iMac, iPhone e iPad;
- apresentação dos principais serviços e especialidades;
- seção explicando o processo de diagnóstico e reparo;
- carrossel automático com empresas atendidas;
- carrossel automático com avaliações de clientes;
- imagens armazenadas localmente no projeto;
- botões de contato direto pelo WhatsApp;
- endereço completo, ponto de referência em destaque e rota pelo Google Maps;
- menu responsivo com navegação por âncoras;
- destaque automático da seção ativa no menu;
- estrutura compatível com hospedagem estática e Vercel.

### Banner temporário da mudança

Aviso amarelo no topo, com referência ao Banco do Brasil na Avenida Beberibe e botão **Confira a localização** para a seção `#contato`. O banner acompanha a identidade visual e se adapta a celulares.

| Período no horário de Recife (UTC−03:00) | Mensagem |
| --- | --- |
| 24 e 25/10/2026 | Segunda-feira, 26/10: começamos no novo endereço! |
| 26/10, de 00h até antes das 09h | É hoje! Atendimento no novo endereço a partir das 09h. |
| 26/10 às 09h até o fim de 01/11 | Já estamos atendendo no novo endereço. Confira! |
| A partir de 02/11 às 00h | Banner oculto automaticamente. |

A lógica está em `assets/js/relocation-banner.js`, com instantes definidos em UTC−03:00. A mensagem muda sem novo deploy, inclusive em uma aba que permaneça aberta ou seja retomada. O relógio do dispositivo determina o instante atual. O aviso começa oculto e só é exibido após calcular o período; sem JavaScript, as informações permanentes de contato e a data de início continuam disponíveis na página. O banner não representa o status “aberto agora” nem altera os horários, endereço ou dados estruturados do site.

## Tecnologias

- HTML5;
- CSS3;
- JavaScript;
- Git e GitHub;
- Vercel para deploy.

Não há dependências, framework ou etapa de compilação.

## Estrutura do projeto

```text
web-site-icanada-reparos/
├── index.html
├── README.md
├── .gitignore
└── assets/
    ├── css/
    │   └── styles.css
    ├── js/
    │   └── main.js
    └── img/
        ├── logos da empresa
        ├── imagens dos serviços
        ├── logos de clientes corporativos
        └── fotos das avaliações
```

## Executar localmente

Clone o repositório:

```bash
git clone https://github.com/Riclacper/web-site-icanada-reparos.git
```

Entre na pasta:

```bash
cd web-site-icanada-reparos
```

Abra o arquivo `index.html` diretamente no navegador ou utilize a extensão **Live Server** no VS Code.

## Deploy na Vercel

Configuração recomendada:

```text
Framework Preset: Other
Root Directory: ./
Build Command: vazio
Output Directory: vazio
Production Branch: main
```

Cada novo `push` ou merge na branch `main` gera uma nova publicação pela integração com a Vercel. Uma prévia de branch não substitui a publicação no domínio oficial.

### Publicação da mudança de endereço

1. Conferir o diff do pull request da branch `update/endereco-encruzilhada-2026-10-26` e o resultado da prévia da Vercel.
2. Fazer merge em `main` após as verificações, conforme a autorização de publicação imediata de 24/10/2026.
3. Aguardar o deploy de produção e verificar https://icanadareparos.com.br/ e o redirecionamento de https://www.icanadareparos.com.br/.
4. Conferir os horários no topo, contato e JSON-LD `LocalBusiness`, a data de início, o destaque do ponto de referência e o destino do botão “Como chegar”. Não considerar a publicação concluída apenas porque o merge terminou.

Não há troca de endereço pelo relógio do navegador: o merge publica os textos visíveis e os dados estruturados juntos, inclusive para visitantes sem JavaScript e mecanismos de busca.

### Identificação do projeto de produção

Verificação em 24/10/2026, antes desta alteração:

- `main` estava no commit `6556c5b9f385b6f52bb6f5adbf87e0823e4bf516`, com status de deploy da Vercel concluído.
- O HTML de https://web-site-icanada-reparos.vercel.app/ era idêntico ao `index.html` desse commit (SHA-256 `1b4d54ebb0a431f35f022f7db0fd239c6cfecb1970326a229f6f5bdb73b24ecb`).
- O HTML do domínio oficial correspondia ao mesmo arquivo, com apenas a proteção de e-mail injetada pelo Cloudflare; a resposta também apresentava cabeçalhos da Vercel.
- `Riclacper/site-icanada-reparos` contém uma implementação anterior em Bootstrap/PWA, diferente da versão servida pelo domínio. Não utilizar esse repositório para publicar esta mudança.

## Atualizar o projeto

Prepare alterações em uma branch e abra um pull request para `main`.

```bash
git switch -c atualizacao-site
git add index.html README.md assets/css/revision.css
git commit -m "Descreva a alteração realizada"
git push -u origin atualizacao-site
```

## Seções do site

- apresentação principal;
- serviços;
- especialidade técnica;
- empresas atendidas;
- processo de atendimento;
- avaliações;
- contato e localização.

## Links

- Site oficial: https://icanadareparos.com.br/
- Como chegar: https://www.google.com/maps/dir/?api=1&destination=Rua+Frederico%2C+15+-+Encruzilhada%2C+Recife+-+PE%2C+Brasil
- Instagram: https://www.instagram.com/icanadareparos
- Facebook: https://www.facebook.com/icanadareparosapple/

## Contato

- WhatsApp: +55 81 98126-3655
- E-mail: icanadareparos@gmail.com
- Endereço a partir de 26/10/2026: Rua Frederico, nº 15, sala 03, Encruzilhada, Recife — PE
- Ponto de referência: Avenida Beberibe, em frente ao Banco do Brasil
- Horário de segunda a sexta: 09h–12h / 14h–17:30
- Horário de sábado: 09h–13h

### Google Maps e CEP

O botão “Como chegar” e o `hasMap` usam o formato oficial [Maps URLs — Directions](https://developers.google.com/maps/documentation/urls/get-started#directions-action), com o novo endereço como destino. O link foi aberto no Google Maps em 24/10/2026 e o destino foi reconhecido como **R. Frederico, 15 — Encruzilhada, Recife — PE**. A origem é definida pelo visitante; nenhum identificador de estabelecimento ou coordenada foi inventado. A sala 03 permanece indicada no endereço do site.

O atalho antigo do Maps foi removido. O botão após as avaliações leva à seção de contato, que destaca **Em frente ao Banco do Brasil — Avenida Beberibe** acima do endereço. O CEP anterior também foi removido do texto e do JSON-LD; um novo CEP não foi incluído.

A rota utiliza o endereço do imóvel e não depende da atualização do cadastro comercial. A alteração deste site não atualiza automaticamente o Perfil da Empresa no Google.

## Observação legal

A iCanada Reparos é uma assistência técnica independente especializada em dispositivos Apple. Não possui vínculo, autorização ou representação oficial da Apple Inc. Apple, MacBook, iMac, iPhone e iPad são marcas registradas de seus respectivos proprietários.

## Licença

Conteúdo, identidade visual, imagens e materiais institucionais pertencem à iCanada Reparos. O uso ou reprodução depende de autorização prévia.
