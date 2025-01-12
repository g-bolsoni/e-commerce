"use client";

import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";


interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
}


const loadProducts = async () => {
    const response = await api.get<Product[]>('/products/category/jewelery');
    console.log(response.data);
    console.log('bdoib oib ');
    return response.data;
}


export function ProductListByCategory() {

    // const { data, isLoading } = useQuery({
    //     queryKey: ['products'],
    //     queryFn: loadProducts,
    // });

    return(
        <>
         <p>Carregando...</p>

        </>
    )
}