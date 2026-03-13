import {
  DummyProduct,
  DummyProductsResponse,
  DummyCategory,
  DummyCart,
  DummyUser,
} from "@/types/dummyjson";

const BASE_URL = "https://dummyjson.com";

// ==================== PRODUTOS ====================

export async function getProducts(
  limit: number = 30,
  skip: number = 0,
): Promise<DummyProductsResponse> {
  const res = await fetch(`${BASE_URL}/products?limit=${limit}&skip=${skip}`, {
    next: { revalidate: 3600 }, // Cache por 1 hora
  });

  if (!res.ok) {
    throw new Error("Erro ao buscar produtos");
  }

  return res.json();
}

export async function getProductById(id: number): Promise<DummyProduct> {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Produto não encontrado");
  }

  return res.json();
}

export async function searchProducts(
  query: string,
  limit: number = 20,
): Promise<DummyProductsResponse> {
  const res = await fetch(
    `${BASE_URL}/products/search?q=${encodeURIComponent(query)}&limit=${limit}`,
    {
      next: { revalidate: 60 }, // Cache por 1 minuto para buscas
    },
  );

  if (!res.ok) {
    throw new Error("Erro ao buscar produtos");
  }

  return res.json();
}

export async function getProductsByCategory(
  category: string,
  limit: number = 30,
): Promise<DummyProductsResponse> {
  const res = await fetch(
    `${BASE_URL}/products/category/${encodeURIComponent(category)}?limit=${limit}`,
    {
      next: { revalidate: 3600 },
    },
  );

  if (!res.ok) {
    throw new Error("Erro ao buscar produtos da categoria");
  }

  return res.json();
}

// ==================== CATEGORIAS ====================

export async function getCategories(): Promise<DummyCategory[]> {
  const res = await fetch(`${BASE_URL}/products/categories`, {
    next: { revalidate: 86400 }, // Cache por 24 horas
  });

  if (!res.ok) {
    throw new Error("Erro ao buscar categorias");
  }

  return res.json();
}

export async function getCategoryList(): Promise<string[]> {
  const res = await fetch(`${BASE_URL}/products/category-list`, {
    next: { revalidate: 86400 },
  });

  if (!res.ok) {
    throw new Error("Erro ao buscar lista de categorias");
  }

  return res.json();
}

// ==================== AUTENTICAÇÃO ====================

export async function loginUser(
  username: string,
  password: string,
): Promise<DummyUser> {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      password,
      expiresInMins: 60,
    }),
  });

  if (!res.ok) {
    throw new Error("Credenciais inválidas");
  }

  return res.json();
}

export async function getCurrentUser(token: string): Promise<DummyUser> {
  const res = await fetch(`${BASE_URL}/auth/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Token inválido");
  }

  return res.json();
}

// ==================== CARRINHO ====================

export async function getCartByUserId(userId: number): Promise<DummyCart[]> {
  const res = await fetch(`${BASE_URL}/carts/user/${userId}`);

  if (!res.ok) {
    throw new Error("Erro ao buscar carrinho");
  }

  const data = await res.json();
  return data.carts;
}

export async function addToCart(
  userId: number,
  products: { id: number; quantity: number }[],
): Promise<DummyCart> {
  const res = await fetch(`${BASE_URL}/carts/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId,
      products,
    }),
  });

  if (!res.ok) {
    throw new Error("Erro ao adicionar ao carrinho");
  }

  return res.json();
}

export async function updateCart(
  cartId: number,
  products: { id: number; quantity: number }[],
): Promise<DummyCart> {
  const res = await fetch(`${BASE_URL}/carts/${cartId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      products,
    }),
  });

  if (!res.ok) {
    throw new Error("Erro ao atualizar carrinho");
  }

  return res.json();
}

export async function deleteCart(cartId: number): Promise<DummyCart> {
  const res = await fetch(`${BASE_URL}/carts/${cartId}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Erro ao deletar carrinho");
  }

  return res.json();
}

// ==================== HELPERS ====================

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price * 5); // Converte USD para BRL (aproximado)
}

export function calculateDiscountedPrice(
  price: number,
  discountPercentage: number,
): number {
  return price - (price * discountPercentage) / 100;
}

export function getAverageRating(reviews: { rating: number }[]): number {
  if (!reviews.length) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return sum / reviews.length;
}
