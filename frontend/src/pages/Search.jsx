import React from "react";
import Container from "../components/container";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/common/Button";
import Product from "../components/common/Product";
import { useSearchProductsQuery } from "../store/slice/productSlice";

const Search = () => {
  const { name } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, error } = useSearchProductsQuery(name, {
    skip: !name,
  });

  const filteredProducts = data?.data[0] || [];

  return (
    <Container>
      <div className="mb-4">
        <Button
          variant="secondary"
          label="Back"
          className="w-1/12"
          onClick={() => navigate(-1)}
        />
      </div>

      <header className="mb-6">
        <h1 className="text-2xl font-bold">Search Results for "{name}"</h1>
        {filteredProducts.length === 0 && (
          <p className="text-gray-500 mt-2">No products found.</p>
        )}
      </header>

      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <Product key={product._id} {...product} />
        ))}
      </main>
    </Container>
  );
};

export default Search;
