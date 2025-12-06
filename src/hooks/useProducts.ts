import { useQuery } from "@tanstack/react-query";

import type { Category, Product } from "../types/product";
const fetchProducts = async ({
  title,
  categoryId,
}: {
  title: string;
  categoryId: number;
}): Promise<Product[]> => {
  const url = new URL("https://api.escuelajs.co/api/v1/products");
  if (title) {
    url.searchParams.append("title", title);
  }
  if (categoryId) {
    url.searchParams.append("categoryId", categoryId.toString());
  }

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const fetchCategoryProducts = async (): Promise<Category[]> => {
  const response = await fetch("https://api.escuelajs.co/api/v1/categories");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const useProducts = ({
  title,
  categoryId,
}: {
  title: string;
  categoryId: number;
}) => {
  return useQuery({
    queryKey: ["products", title, categoryId],
    queryFn: () => fetchProducts({ title, categoryId }),
  });
};

export const useCategoryProducts = () => {
  return useQuery({
    queryKey: ["category-products"],
    queryFn: fetchCategoryProducts,
  });
};
