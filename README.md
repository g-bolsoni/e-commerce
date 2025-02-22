# Ecommerce Project

Este é um projeto de ecommerce desenvolvido com Next.js, TypeScript, MongoDB e NextAuth para autenticação. O projeto inclui funcionalidades como login, pesquisa de produtos e exibição de detalhes do produto.

## Tecnologias Utilizadas

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [MongoDB](https://www.mongodb.com/)
- [NextAuth](https://next-auth.js.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Flowbite](https://flowbite.com/)

## Estrutura do Projeto

A estrutura do projeto é organizada da seguinte forma:

```
/home/vane/Documents/Ecommerces/ecommerce
├── src
│   ├── app
│   │   ├── api
│   │   │   └── auth
│   │   │       └── [...nextauth]
│   │   │           └── route.ts
│   │   ├── login
│   │   │   └── page.tsx
│   │   ├── produto
│   │   │   └── [slug]
│   │   │       └── page.tsx
│   ├── components
│   │   └── Search
│   │       └── index.tsx
│   ├── database
│   │   ├── models
│   │   │   └── ProductModel.ts
│   │   └── search
│   │       └── index.ts
│   ├── hooks
│   │   └── TokenProvider.ts
│   ├── services
│   │   └── api.ts
│   ├── types
│   │   ├── product.ts
│   │   └── user.ts
├── .env
├── .gitignore
├── next.config.js
├── package.json
└── README.md
```

## Configuração do Ambiente

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/ecommerce.git
cd ecommerce
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente no arquivo `.env`:

```properties
NEXTAUTH_URL=http://localhost:3000/login
NEXTAUTH_SECRET=sua_chave_secreta
MONGODB_URI=sua_uri_mongodb
```

4. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

## Funcionalidades

### Login

A página de login permite que os usuários façam login usando suas credenciais. Se o login for bem-sucedido, o usuário será redirecionado para a página "minha-conta". Se o usuário já estiver logado, ele será redirecionado automaticamente para a página "minha-conta".

### Pesquisa de Produtos

O componente de pesquisa permite que os usuários pesquisem produtos pelo nome. Os resultados da pesquisa são buscados no MongoDB e exibidos em tempo real conforme o usuário digita.

### Detalhes do Produto

A página de detalhes do produto exibe informações detalhadas sobre um produto específico, incluindo imagens, preço, avaliações e descrição.

## Contribuição

Se você quiser contribuir para este projeto, siga estas etapas:

1. Fork o repositório.
2. Crie uma nova branch (`git checkout -b feature/nova-funcionalidade`).
3. Faça suas alterações e commit (`git commit -m 'Adiciona nova funcionalidade'`).
4. Envie para a branch (`git push origin feature/nova-funcionalidade`).
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
