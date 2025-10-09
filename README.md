# Dot Movies Store 🎬🛒

Uma loja de filmes online completa com carrinho de compras, sistema de checkout e integração com a API TMDb. Explore, adicione aos favoritos e compre seus filmes favoritos!

## 💻 Aplicação

Abra a aplicação para teste [aqui](https://dot-movie-store.vercel.app).

## ✨ Funcionalidades

### Funcionalidades Principais
- 🎬 **Catálogo de Filmes**: Navegue por uma vasta coleção de filmes integrados com TMDb API
- 🔍 **Busca Avançada**: Encontre filmes rapidamente com busca em tempo real
- 🛒 **Carrinho de Compras**: Carrinho lateral deslizante com gerenciamento completo
- 🔢 **Contador de Itens**: Badge no botão do carrinho mostrando quantidade de itens
- 💳 **Checkout Completo**: Sistema de checkout com validação de formulário
- ✅ **Validação de Dados**: Máscaras e validação para email, celular, CEP e CPF
- 🎉 **Confirmação Visual**: Modal de sucesso após finalização da compra
- ⭐ **Sistema de Favoritos**: Adicione e gerencie seus filmes favoritos
- 📱 **Design Responsivo**: Experiência otimizada para mobile, tablet e desktop

### Funcionalidades Técnicas
- ⚡ **Performance**: Carregamento otimizado com React Query
- 💾 **Persistência**: Carrinho e favoritos salvos no localStorage
- 🎨 **Animações Suaves**: Transições e animações para melhor UX
- ♿ **Acessibilidade**: Componentes acessíveis e semânticos
- 🧪 **Testado**: Cobertura de testes para funcionalidades críticas

## 🚀 Stack Tecnológico

- **React** 19.1.1 - Biblioteca de interface
- **TypeScript** 5.9.3 - Segurança de tipos
- **Vite** 7.1.7 - Ferramenta de build e servidor de desenvolvimento
- **Yarn** - Gerenciador de pacotes

## 🛠️ Ferramentas de Desenvolvimento

- **ESLint** - Qualidade de código e linting
- **Prettier** - Formatação de código
- **Commitlint** - Linting de mensagens de commit
- **Husky** - Gerenciamento de hooks do Git

## 📋 Pré-requisitos

- Node.js (v18 ou superior recomendado)
- Gerenciador de pacotes Yarn on NPM
- Chave da API TMDb (obtenha gratuitamente em https://www.themoviedb.org/settings/api)

## 🔧 Instalação

```bash
# Clone o repositório
git clone https://github.com/saulokirchmaier/dot-movie-store

# Navegue para o diretório do projeto
cd dot-movies

# Instale as dependências
yarn install
#or
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env e adicione sua chave da API TMDb
```

### Variáveis de Ambiente

Após copiar o arquivo `.env.example` para `.env`, edite o arquivo `.env` e configure as seguintes variáveis:

```env
VITE_TMDB_API_KEY=sua_chave_api_aqui
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
```

**Como obter a chave da API TMDb:**
1. Acesse [https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)
2. Faça login ou crie uma conta gratuita
3. Solicite uma API Key (chave de API)
4. Copie a chave gerada e substitua `sua_chave_api_aqui` no arquivo `.env`

## 🏃 Executando o Projeto

```bash
# Inicie o servidor de desenvolvimento
yarn dev

# Faça o build para produção
yarn build

# Visualize o build de produção
yarn preview
```

## 🧹 Qualidade de Código

```bash
# Execute o ESLint
yarn lint

# Execute o ESLint com correção automática
yarn lint:fix

# Formate o código com Prettier
yarn format

# Verifique a formatação do código
yarn format:check
```

## 🧪 Testes

```bash
# Execute todos os testes
yarn test

# Execute testes em modo watch
yarn test:watch

# Execute testes com interface visual
yarn test:ui

# Execute testes com cobertura
yarn test:coverage
```

## 📁 Estrutura do Projeto

```
src/
├── components/         # Componentes reutilizáveis
│   ├── Header/         # Cabeçalho da aplicação
│   ├── MovieCard/      # Card de filme
│   ├── MovieList/      # Lista de filmes
│   ├── Modal/          # Modais (favoritos e carrinho)
│   └── Checkout/       # Componentes de checkout
├── contexts/           # Contextos React (estado global)
├── hooks/              # Hooks customizados
├── services/           # Serviços e integrações com APIs
├── utils/              # Funções utilitárias
├── types/              # Definições de tipos TypeScript
└── tests/              # Testes unitários e de integração
```

## 🎯 Funcionalidades Implementadas

### Sistema de Favoritos
- Adicionar/remover filmes dos favoritos
- Persistência no localStorage
- Contador de favoritos no header
- Modal lateral para visualizar favoritos

### Carrinho de Compras
- Adicionar filmes ao carrinho
- Remover itens do carrinho
- Cálculo automático do total
- Persistência no localStorage
- Modal lateral para gerenciar carrinho

### Sistema de Checkout
- Formulário completo de dados pessoais
- Validação com React Hook Form e Zod
- Máscaras para CPF, celular e CEP
- Resumo do pedido
- Modal de confirmação de compra

### Animações e UX
- Transições suaves nos modais
- Animações de entrada e saída de itens
- Efeito de explosão ao adicionar favoritos
- Design responsivo e acessível

## 🙏 Agradecimentos

- [TMDb](https://www.themoviedb.org/) pela API de filmes
- [Lucide React](https://lucide.dev/) pelos ícones
- [Tailwind CSS](https://tailwindcss.com/) pelo framework de CSS
- [Framer Motion](https://www.framer.com/motion/) pelas animações