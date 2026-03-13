# 🛒 E-commerce

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC?style=for-the-badge&logo=tailwind-css)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)

Uma loja virtual moderna e responsiva construída com Next.js 14, TypeScript e Tailwind CSS.

[🌐 Demo](https://ecommerce.devbolsoni.com.br) · [📝 Reportar Bug](https://github.com/devbolsoni/e-commerce/issues)

</div>

---

## ✨ Features

- 🎨 **Design Responsivo** - Mobile-first, adaptado para todos os dispositivos
- 🔍 **Busca Inteligente** - Pesquisa de produtos com debounce e sugestões
- 🛍️ **Catálogo de Produtos** - Listagem com filtros por categoria
- 📱 **Menu Mobile** - Navegação otimizada para dispositivos móveis
- 🛒 **Carrinho de Compras** - Drawer lateral com resumo do pedido
- ⭐ **Avaliações** - Sistema de reviews com estrelas
- 🏷️ **Descontos** - Exibição de preços promocionais
- 🔐 **Autenticação** - Login com NextAuth.js
- ⚡ **Performance** - Otimizado com cache e lazy loading

## 🚀 Tecnologias

| Categoria         | Tecnologia                                                                |
| ----------------- | ------------------------------------------------------------------------- |
| **Framework**     | [Next.js 14](https://nextjs.org/) (App Router)                            |
| **Linguagem**     | [TypeScript](https://www.typescriptlang.org/)                             |
| **Estilização**   | [Tailwind CSS](https://tailwindcss.com/)                                  |
| **UI Components** | [Headless UI](https://headlessui.com/), [Flowbite](https://flowbite.com/) |
| **Autenticação**  | [NextAuth.js](https://next-auth.js.org/)                                  |
| **Forms**         | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) |
| **Data Fetching** | [TanStack Query](https://tanstack.com/query)                              |
| **Carrossel**     | [Swiper](https://swiperjs.com/)                                           |
| **API**           | [DummyJSON](https://dummyjson.com/)                                       |

## 📁 Estrutura do Projeto

```
src/
├── app/                    # App Router (páginas)
│   ├── [slug]/            # Página dinâmica de categoria
│   ├── api/               # API Routes
│   ├── categoria/         # Listagem por categoria
│   ├── login/             # Página de login
│   ├── minha-conta/       # Área do usuário
│   ├── produto/           # Página de produto
│   ├── registro/          # Página de cadastro
│   └── search/            # Página de busca
├── components/            # Componentes reutilizáveis
│   ├── Footer/           # Rodapé
│   ├── Header/           # Cabeçalho e navegação
│   ├── Newsletter/       # Formulário de newsletter
│   ├── ProductCard/      # Cards de produto
│   └── Search/           # Modal de busca
├── services/             # Serviços e API calls
│   └── dummyjson.ts      # Integração com DummyJSON
└── types/                # Definições TypeScript
    └── dummyjson.ts      # Types da API
```

## 🛠️ Instalação

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Passos

```bash
# Clone o repositório
git clone https://github.com/devbolsoni/e-commerce.git

# Entre na pasta
cd e-commerce

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

## 📦 Scripts

| Comando         | Descrição                          |
| --------------- | ---------------------------------- |
| `npm run dev`   | Inicia servidor de desenvolvimento |
| `npm run build` | Gera build de produção             |
| `npm run start` | Inicia servidor de produção        |
| `npm run lint`  | Executa linter                     |

## 🌐 Deploy

O projeto está configurado para deploy na Vercel:

```bash
# Deploy via CLI
npx vercel

# Deploy de produção
npx vercel --prod
```

### Variáveis de Ambiente

Crie um arquivo `.env.local`:

```env
NEXTAUTH_SECRET=sua-chave-secreta
NEXTAUTH_URL=http://localhost:3000
```

## 🎨 Customização

### Cores

As cores são configuradas em `tailwind.config.ts`:

```typescript
colors: {
  primary: { ... },    // Cor principal (laranja)
  secondary: { ... },  // Cor secundária (cinza)
  success: { ... },    // Verde
  info: { ... },       // Azul
}
```

### Fontes

O projeto usa a fonte **Poppins** do Google Fonts.

## 📱 Responsividade

| Breakpoint | Tamanho | Descrição        |
| ---------- | ------- | ---------------- |
| `sm`       | 640px   | Mobile landscape |
| `md`       | 768px   | Tablets          |
| `lg`       | 1024px  | Desktop          |
| `xl`       | 1280px  | Desktop grande   |

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'feat: adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

<div align="center">

**Dev Bolsoni**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/devbolsoni)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/devbolsoni)
[![Portfolio](https://img.shields.io/badge/Portfolio-FF5722?style=for-the-badge&logo=google-chrome&logoColor=white)](https://devbolsoni.com.br)

</div>

---

<div align="center">

⭐ Se este projeto te ajudou, considere dar uma estrela!

</div>
