import { getProductList } from "@/database/prodcutList";
import { Products } from "../Product";

export async function ProductList() {
  const product_list = await getProductList();

  if (product_list.length === 0) return;

  return (
    <>
      {product_list.map((list, index) => {
        if (list.products.length <= 0) return;
        console.log(list.products);
        return (
          <div className="list-products" key={index}>
            <span className="list_title flex w-full flex-col items-center my-4 font-bold text-lg lg:text-xl">{list.name}</span>
            <div className="products w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-items-center lg:justify-items-center gap-16 md:gap-16 px-4 py-4 md:px-0">
              <Products products={list.products} />
            </div>
          </div>
        );
      })}
    </>
  );
}
