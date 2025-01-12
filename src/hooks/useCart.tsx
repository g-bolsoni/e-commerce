"use client"

import { createContext, ReactNode, useContext, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { Product } from '@/types';
import { api } from '@/services/api';

interface CartProviderProps {
  children: ReactNode;
}

interface UpdateProductAmount {
  productId: number;
  amount: number;
}

interface CartContextData {
  cart: Product[];
  addProduct: (productId: number) => Promise<void>;
  removeProduct: (productId: number) => void;
  updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {

  const [cart, setCart] = useState<Product[]>(() => {
    // const storagedCart = localStorage.getItem('@RocketShoes:cart');
    const storagedCart = '';

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }

    return [];
  });

  const prevCartRef = useRef<Product[]>();

  useEffect(() => {
    prevCartRef.current = cart;
  });

  const cartPreviosValue =  prevCartRef.current ?? cart; //Caso o primeiro seja null, irá pegar o cart, se não irá pegar o prevCartRef

  useEffect(()=>{
    if(cartPreviosValue !== cart){
      // localStorage.setItem('@RocketShoes:cart',JSON.stringify(cart));
    }
  }, [cart, cartPreviosValue]);

  const addProduct = async (productId: number) => {

    try {
      const updatedCart = [...cart];
      //Verify if products exists
      const productExists = updatedCart.find(product => product.id === productId);

      const currentAmount = productExists ? productExists.amount : 0;
      const amount = currentAmount + 1;

      if(productExists){

        productExists.amount = amount;

      }else{
        const product = await api.get(`products/${productId}`);

        const newProduct = {
          ...product.data,
          amount: 1
        }

        updatedCart.push(newProduct);
      }

      toast.success('Produto adicionado com sucesso!');
      setCart(updatedCart);

    } catch {
      toast.error('Erro na adição do produto');
    }
  };

  const removeProduct = (productId: number) => {
    try {
      const updatedCart = [...cart];
      const productIndex = updatedCart.findIndex(product => product.id === productId);

      if(productIndex >= 0){
        updatedCart.splice(productIndex, 1);
        toast.success('Produto removido com sucesso!');
        setCart(updatedCart);
      }else{
        throw new Error();
      }

    } catch {
      toast.error('Erro na remoção do produto');
    }
  };

  const updateProductAmount = async ({ productId, amount }: UpdateProductAmount) => {

    try {

      if(amount <= 0) return;

      const stock = await api.get(`stock/${productId}`);
      const stockAmount = stock?.data.amount;

      if(amount > stockAmount){
        toast.error('Quantidade solicitada fora de estoque');
        return;
      }

      const updatedCart = [...cart];
      const productExists = updatedCart.find(product => product.id === productId);

      if(productExists){
        productExists.amount = amount;
        toast.success('Quantidade alterada com sucesso!');
        setCart(updatedCart);
      }else{
        throw new Error();
      }

    } catch {
      toast.error('Erro na alteração de quantidade do produto');
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, updateProductAmount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}
