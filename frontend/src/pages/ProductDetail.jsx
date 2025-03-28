import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Container from "../components/container";
import Cart from "../components/cart/cart"; // Assuming this is meant to be a product card
import Button from "../components/common/Button";
import { useGetProductQuery } from "../store/slice/productSlice";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch product data using RTK Query
  const { data, isLoading, error } = useGetProductQuery(id);
  const product = data?.data && data.data.length ? data.data[0] : null;

  if (isLoading) {
    return (
      <Container>
        <div>Loading product details...</div>
      </Container>
    );
  }

  if (error || !product) {
    return (
      <Container>
        <div>
          Error loading product: {error?.message || "Product not found"}
        </div>
        <Button
          variant="secondary"
          label="Back"
          className="w-1/12 mt-4"
          onClick={() => navigate(-1)}
        />
      </Container>
    );
  }

  return (
    <Container>
      <Button
        variant="secondary"
        label="Back"
        className="w-1/12 mb-4"
        onClick={() => {
          navigate(-1);
        }}
      />
      <main className="flex justify-between items-center h-full">
        <aside className="h-full w-1/4 flex-col flex justify-center items-center">
          <Cart
            productImage={product.productImage}
            productPrice={product.productPrice}
            productName={product.productName}
            productId={id}
          />
        </aside>
        <section className="w-3/4 h-full flex flex-col items-center justify-center shadow-lg border py-4 gap-2">
          <h1 className="text-3xl border-b w-full text-center">
            Product Details
          </h1>
          <article className="border border-black rounded-xl min-h-56 max-w-2xl px-2 text-justify">
            <p className="text-lg opacity-75">{product.productDescription}</p>
          </article>
          <p className="text-lg w-full text-center border-t">
            Product Type: {product.productType}
          </p>
        </section>
      </main>
    </Container>
  );
};

export default ProductDetail;
