# iCanada Reparos

Site institucional da **iCanada Reparos**, assistência técnica independente especializada em dispositivos Apple, localizada em Recife — PE.

O projeto apresenta os principais serviços da empresa, diferenciais técnicos, etapas do atendimento, empresas atendidas, avaliações de clientes e canais de contato.

## Status do projeto

Site oficial: https://icanadareparos.com.br/. O repositório de produção é `Riclacper/web-site-icanada-reparos`, com deploy contínuo pela Vercel a partir da branch `main`.

Esta atualização de endereço deve entrar em produção somente em **26/10/2026, segunda-feira**, data de início do atendimento na nova unidade. Até essa data, manter a alteração em uma branch separada e o pull request em rascunho, sem auto-merge.

## Principais recursos

- layout responsivo para desktop, tablet e celular;
- atendimento para MacBook, iMac, iPhone e iPad;
- apresentação dos principais serviços e especialidades;
- seção explicando o processo de diagnóstico e reparo;
- carrossel automático com empresas atendidas;
- carrossel automático com avaliações de clientes;
- imagens armazenadas localmente no projeto;
- botões de contato direto pelo WhatsApp;
- endereço completo, ponto de referência e orientações de chegada pelo WhatsApp;
- menu responsivo com navegação por âncoras;
- destaque automático da seção ativa no menu;
- estrutura compatível com hospedagem estática e Vercel.

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

1. Manter a atualização na branch `update/endereco-encruzilhada-2026-10-26`, sem merge antecipado.
2. Em 26/10/2026 pela manhã, no horário de Recife (UTC−03:00), conferir o diff do pull request e o resultado da prévia da Vercel. O horário de abertura já informado pelo site é 10h; os horários comerciais não foram alterados nesta atualização.
3. Retirar o pull request do rascunho e fazer merge em `main` somente nessa data, após as verificações. Não habilitar auto-merge antes dela.
4. Aguardar o deploy de produção e verificar https://icanadareparos.com.br/ e o redirecionamento de https://www.icanadareparos.com.br/.
5. Conferir o resumo de localização, a seção de contato, o ponto de referência, o JSON-LD `LocalBusiness` e os botões de chegada. Não considerar a publicação concluída apenas porque o merge terminou.

O agendamento operacional é externo ao HTML. Não há troca de endereço pelo relógio do navegador: o merge publica os textos visíveis e os dados estruturados juntos, inclusive para visitantes sem JavaScript e mecanismos de busca.

### Identificação do projeto de produção

Verificação em 24/10/2026, antes desta alteração:

- `main` estava no commit `6556c5b9f385b6f52bb6f5adbf87e0823e4bf516`, com status de deploy da Vercel concluído.
- O HTML de https://web-site-icanada-reparos.vercel.app/ era idêntico ao `index.html` desse commit (SHA-256 `1b4d54ebb0a431f35f022f7db0fd239c6cfecb1970326a229f6f5bdb73b24ecb`).
- O HTML do domínio oficial correspondia ao mesmo arquivo, com apenas a proteção de e-mail injetada pelo Cloudflare; a resposta também apresentava cabeçalhos da Vercel.
- `Riclacper/site-icanada-reparos` contém uma implementação anterior em Bootstrap/PWA, diferente da versão servida pelo domínio. Não utilizar esse repositório para publicar esta mudança.

## Atualizar o projeto

Prepare alterações em uma branch e abra um pull request para `main`. Para esta mudança, respeite a data de publicação acima.

```bash
git switch -c atualizacao-site
git add index.html README.md
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
- Orientações de chegada: https://wa.me/5581981263655
- Instagram: https://www.instagram.com/icanadareparos
- Facebook: https://www.facebook.com/icanadareparosapple/

## Contato

- WhatsApp: +55 81 98126-3655
- E-mail: icanadareparos@gmail.com
- Endereço a partir de 26/10/2026: Rua Frederico, nº 15, sala 03, Encruzilhada, Recife — PE
- Ponto de referência: Avenida Beberibe, em frente ao Banco do Brasil

### Google Maps e CEP

O atalho anterior do Google Maps foi consultado em 24/10/2026 e redirecionava para um cadastro existente da empresa, sem confirmação da nova unidade. Nenhuma URL do Maps, coordenada ou CEP para o novo endereço foi inventada.

Enquanto o novo destino não for validado, os atalhos antigos e a propriedade `hasMap` foram removidos. O botão de chegada usa o WhatsApp já existente, e o botão após as avaliações leva à seção de contato. O CEP anterior também foi removido do texto e do JSON-LD.

Quando houver um link compartilhado e confirmado da nova unidade, verificar o nome da empresa, rua, número, bairro e posição do marcador antes de incluí-lo nos botões, no `hasMap` e nesta documentação. A alteração deste site não atualiza automaticamente o Perfil da Empresa no Google.

## Observação legal

A iCanada Reparos é uma assistência técnica independente especializada em dispositivos Apple. Não possui vínculo, autorização ou representação oficial da Apple Inc. Apple, MacBook, iMac, iPhone e iPad são marcas registradas de seus respectivos proprietários.

## Licença

Conteúdo, identidade visual, imagens e materiais institucionais pertencem à iCanada Reparos. O uso ou reprodução depende de autorização prévia.
