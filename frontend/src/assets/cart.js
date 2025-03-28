const cartData = [
  {
    cartId: "cart_001",
    customerName: "Emily Johnson",
    products: [
      { productId: "123e4567-e89b-12d3-a456-426614174000", amount: 3 }, // Organic Apples
      { productId: "5567a1b2-c3d4-4e5f-8g9h-726614174002", amount: 2 }, // Skim Milk
      { productId: "4f5e6d7h-8i9j-0k1l-2m3n-926614174004", amount: 1 }, // Free-Range Eggs
    ],
    amount: 24.84, // Total: (2.99 * 3) + (4.29 * 2) + (5.99 * 1)
  },
  {
    cartId: "cart_002",
    customerName: "Michael Brown",
    products: [
      { productId: "987fcdeb-51a2-43d7-b9f4-826174174001", amount: 2 }, // Whole Wheat Bread
      { productId: "aabbccdd-eeff-1234-5678-826614174003", amount: 1 }, // Organic Spinach
      { productId: "3d4e5f6g-7h8i-9j0k-1l2m-326614174008", amount: 1 }, // Almond Butter
    ],
    amount: 16.76, // Total: (3.49 * 2) + (2.79 * 1) + (6.99 * 1)
  },
  {
    cartId: "cart_003",
    customerName: "Sarah Davis",
    products: [
      { productId: "2c3d4e5f-6g7h-8i9j-0k1l-226614174007", amount: 4 }, // Fresh Bananas
      { productId: "7890abcd-efgh-ijkl-5m6n-026614174005", amount: 1 }, // Greek Yogurt
      { productId: "4e5f6g7h-8i9j-0k1l-2m3n-426614174009", amount: 2 }, // Cherry Tomatoes
    ],
    amount: 16.05, // Total: (1.99 * 4) + (4.49 * 1) + (3.79 * 2)
  },
  {
    cartId: "cart_004",
    customerName: "David Wilson",
    products: [
      { productId: "1a2b3c4d-5e6f-7g8h-9i0j-126614174006", amount: 3 }, // Brown Rice
      { productId: "5f6g7h8i-9j0k-1l2m-3n4o-526614174010", amount: 2 }, // Organic Carrots
      { productId: "6g7h8i9j-0k1l-2m3n-4o5p-626614174011", amount: 1 }, // Chicken Breasts
    ],
    amount: 23.13, // Total: (3.29 * 3) + (2.49 * 2) + (7.99 * 1)
  },
  {
    cartId: "cart_005",
    customerName: "Laura Martinez",
    products: [
      { productId: "7h8i9j0k-1l2m-3n4o-5p6q-726614174012", amount: 1 }, // Cheddar Cheese
      { productId: "8i9j0k1l-2m3n-4o5p-6q7r-826614174013", amount: 2 }, // Croissants
      { productId: "9j0k1l2m-3n4o-5p6q-7r8s-926614174014", amount: 1 }, // Frozen Pizza
    ],
    amount: 16.27, // Total: (5.29 * 1) + (3.99 * 2) + (6.49 * 1)
  },
];

export default cartData;
