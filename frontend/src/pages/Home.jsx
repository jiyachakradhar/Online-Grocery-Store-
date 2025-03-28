"use client";
import React, { useState } from "react";
import Container from "../components/container";
import Product from "../components/common/Product";
import Filter from "../components/common/Filter";
import {
  useGetProductsQuery,
  useGetProductsWithFilterQuery,
} from "../store/slice/productSlice";

const Home = () => {
  // State to track the active filter from the Filter component
  const [activeFilter, setActiveFilter] = useState(null);

  // Fetch all products when no filter is active
  const {
    data: allProductsData,
    isLoading: isLoadingAll,
    error: errorAll,
  } = useGetProductsQuery();

  // Fetch filtered products when a filter is active
  const {
    data: filteredProductsData,
    isLoading: isLoadingFiltered,
    error: errorFiltered,
  } = useGetProductsWithFilterQuery(activeFilter, {
    skip: !activeFilter, // Skip this query if no filter is active
  });

  // Determine which data to use based on filter state
  const isLoading = activeFilter ? isLoadingFiltered : isLoadingAll;
  const error = activeFilter ? errorFiltered : errorAll;
  const data = activeFilter ? filteredProductsData : allProductsData;

  // Handle loading state
  if (isLoading) {
    return (
      <Container>
        <p>Loading products...</p>
      </Container>
    );
  }

  // Handle error state
  if (error) {
    return (
      <Container>
        <p>
          Error fetching products: {error.message || "Something went wrong"}
        </p>
      </Container>
    );
  }

  // Extract products from the API response
  // Assuming the response is either an array or an object like { data: [products] }
  const products = Array.isArray(data) ? data : data?.data[0] || [];

  return (
    <Container>
      {/* Pass setActiveFilter to Filter component */}
      <Filter setActiveFilter={setActiveFilter} activeFilter={activeFilter} />
      <div className="w-full h-px bg-gray-950"></div>
      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
        {products.length > 0 ? (
          products.map((product) => (
            <Product
              key={product._id || product.uuid} // Use _id if MongoDB, uuid if custom
              {...product} // Spread product props to the Product component
            />
          ))
        ) : (
          <p>No products available</p>
        )}
      </main>
    </Container>
  );
};

export default Home;
