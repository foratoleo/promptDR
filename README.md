# DR_ - Digital Republic Assistant

[![DR_: Assistente de IA para Desenvolvimento Web Full-Stack](./public/social_preview_index.jpg)](https://dr-assistant.com)

**DR_** é uma assistente de IA avançada para desenvolvimento web full-stack que roda diretamente no seu navegador. Desenvolvida pela **Digital Republic**, a DR_ permite que você escolha entre múltiplos provedores de IA (OpenAI, Anthropic, Ollama, Google Gemini, Groq, e muitos outros) para criar aplicações web completas de forma intuitiva e eficiente.

## 🎯 Visão Geral

A DR_ foi criada para revolucionar o desenvolvimento web, oferecendo uma experiência de programação assistida por IA onde você pode:

- 💻 **Desenvolver aplicações completas** diretamente no navegador
- 🤖 **Alternar entre diferentes modelos de IA** para cada tarefa
- 🔧 **Executar comandos no terminal integrado** em tempo real
- 📁 **Fazer deploy direto** para Netlify, Vercel e outras plataformas
- 🎨 **Anexar imagens** para melhor contexto visual
- 📦 **Baixar projetos como ZIP** ou sincronizar com pasta local

## 📋 Índice

- [🚀 Instalação Rápida](#-instalação-rápida)
- [⚙️ Configuração](#️-configuração)
- [🎮 Como Usar](#-como-usar)
- [🔧 Funcionalidades](#-funcionalidades)
- [🐳 Docker](#-docker)
- [📚 Scripts Disponíveis](#-scripts-disponíveis)
- [🤝 Contribuindo](#-contribuindo)
- [📝 Licença](#-licença)

## 🚀 Instalação Rápida

### Pré-requisitos

- **Node.js** (versão 18.18.0 ou superior)
- **pnpm** (recomendado) ou npm

### Instalação

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/digitalrepublic/dr-assistant.git
   cd dr-assistant
   ```

2. **Instale as dependências**:
   ```bash
   npm install -g pnpm
   pnpm install
   ```

3. **Inicie o servidor de desenvolvimento**:
   ```bash
   pnpm run dev
   ```

4. **Abra no navegador**: `http://localhost:5173`

## ⚙️ Configuração

### Configurando Chaves de API

1. Acesse a interface principal da DR_
2. Selecione seu provedor de IA preferido no dropdown
3. Clique no ícone de edição (lápis)
4. Insira sua chave de API no campo seguro

### Provedores Suportados

- **OpenAI** (GPT-4, GPT-3.5-turbo)
- **Anthropic** (Claude 3.5 Sonnet, Claude 3 Opus)
- **Google** (Gemini Pro, Gemini Flash)
- **Ollama** (modelos locais)
- **Groq** (Llama, Mixtral)
- **DeepSeek** (DeepSeek Coder)
- **xAI** (Grok)
- **Mistral** (Mistral Large, Codestral)
- **HuggingFace** (modelos open-source)
- **LM Studio** (modelos locais)

### Configuração de URLs Personalizadas

Para provedores que suportam URLs personalizadas (Ollama, LM Studio):

1. Clique no ícone de configurações na barra lateral
2. Navegue até a aba "Provedores"
3. Procure pelo seu provedor
4. Insira sua URL personalizada no campo designado

## 🎮 Como Usar

### Desenvolvimento Básico

1. **Inicie uma conversa** descrevendo o que deseja criar
2. **Selecione o modelo de IA** mais adequado para sua tarefa
3. **Acompanhe o código** sendo gerado em tempo real
4. **Teste no terminal integrado** para ver os resultados
5. **Faça ajustes** solicitando modificações à DR_

### Funcionalidades Avançadas

- **Anexar imagens**: Envie prints ou designs para melhor contexto
- **Importar projetos**: Carregue projetos existentes do GitHub
- **Controle de versão**: Reverta alterações para versões anteriores
- **Deploy automático**: Publique diretamente para suas plataformas favoritas

## 🔧 Funcionalidades

### ✨ Principais Recursos

- **🤖 IA Multi-Provedor**: Suporte para 15+ provedores de IA
- **💻 Terminal Integrado**: Execute comandos e veja resultados em tempo real
- **📁 Gerenciamento de Arquivos**: Interface completa para navegar e editar arquivos
- **🎨 Suporte a Imagens**: Anexe capturas de tela e designs para melhor contexto
- **📦 Export/Import**: Baixe projetos como ZIP ou sincronize com pasta local
- **🔄 Controle de Versão**: Reverta alterações e mantenha histórico
- **🚀 Deploy Direto**: Publique para Netlify, Vercel e outras plataformas

### 🛠️ Tecnologias Utilizadas

- **Frontend**: React, Remix, TypeScript
- **Build**: Vite, UnoCSS
- **Container**: WebContainer API
- **Deploy**: Cloudflare Pages, Netlify, Vercel

## 🐳 Docker

### Desenvolvimento

```bash
# Construir a imagem
pnpm run dockerbuild

# Executar o container
docker compose --profile development up
```

### Produção

```bash
# Construir para produção
pnpm run dockerbuild:prod

# Executar em produção
docker compose --profile production up
```

## 📚 Scripts Disponíveis

```bash
# Desenvolvimento
pnpm run dev          # Inicia servidor de desenvolvimento
pnpm run build        # Constrói o projeto para produção
pnpm run preview      # Visualiza build de produção localmente

# Testes e Qualidade
pnpm run test         # Executa testes com Vitest
pnpm run typecheck    # Verifica tipos TypeScript
pnpm run lint         # Executa linting
pnpm run lint:fix     # Corrige problemas de linting automaticamente

# Deploy
pnpm run deploy       # Deploy para Cloudflare Pages
pnpm run start        # Executa aplicação construída localmente

# Docker
pnpm run dockerbuild  # Constrói imagem Docker de desenvolvimento
pnpm run dockerbuild:prod # Constrói imagem Docker de produção
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. **Fork** o repositório
2. **Crie** uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. **Commit** suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. **Push** para a branch (`git push origin feature/nova-funcionalidade`)
5. **Abra** um Pull Request

### Diretrizes de Contribuição

- Siga os padrões de código existentes
- Adicione testes para novas funcionalidades
- Atualize a documentação quando necessário
- Mantenha commits claros e descritivos

## 🚀 Roadmap

### Próximas Funcionalidades

- **📱 Aplicativo Mobile**: Versão nativa para iOS e Android
- **🔌 Sistema de Plugins**: Extensões personalizadas
- **👥 Colaboração**: Desenvolvimento em equipe
- **☁️ Sincronização**: Backup automático na nuvem
- **📊 Analytics**: Métricas de desenvolvimento
- **🎯 Templates**: Modelos prontos para diferentes tipos de projeto

## 📞 Suporte

- **Documentação**: [docs.dr-assistant.com](https://docs.dr-assistant.com)
- **Issues**: [GitHub Issues](https://github.com/digitalrepublic/dr-assistant/issues)
- **Comunidade**: [Discord](https://discord.gg/dr-assistant)
- **Email**: suporte@dr-assistant.com

## 📝 Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

**Desenvolvido com ❤️ pela Digital Republic**

*A DR_ é uma assistente de IA que visa democratizar o desenvolvimento web, tornando-o acessível e eficiente para todos.*