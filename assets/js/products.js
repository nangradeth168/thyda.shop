// ========================================
// THYDA SHOP — Products Data
// ========================================

const PRODUCTS = [
  // Electronics
  { id: 1, name: 'Samsung Galaxy S24 Ultra', nameEn: 'Samsung Galaxy S24 Ultra', price: 189.99, oldPrice: 249.99, category: 'electronics', rating: 4.9, reviews: 328, image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&q=80', badge: 'sale', isNew: false, isFeatured: true, stock: 15 },
  { id: 2, name: 'AirPods Pro 2', nameEn: 'AirPods Pro 2', price: 49.99, oldPrice: 69.99, category: 'electronics', rating: 4.8, reviews: 215, image: 'https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=400&q=80', badge: 'hot', isNew: false, isFeatured: true, stock: 30 },
  { id: 3, name: 'iPad Pro 11"', nameEn: 'iPad Pro 11"', price: 299.99, oldPrice: null, category: 'electronics', rating: 4.9, reviews: 142, image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&q=80', badge: 'new', isNew: true, isFeatured: true, stock: 8 },
  { id: 4, name: 'មេ MacBook Air M3', nameEn: 'MacBook Air M3', price: 499.99, oldPrice: 599.99, category: 'electronics', rating: 4.8, reviews: 89, image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80', badge: 'sale', isNew: false, isFeatured: false, stock: 5 },
  { id: 5, name: 'Smart Watch Pro', nameEn: 'Smart Watch Pro', price: 79.99, oldPrice: 99.99, category: 'electronics', rating: 4.6, reviews: 174, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80', badge: null, isNew: true, isFeatured: false, stock: 25 },
  { id: 6, name: 'Wireless Charger', nameEn: 'Wireless Charger', price: 19.99, oldPrice: 29.99, category: 'electronics', rating: 4.4, reviews: 210, image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&q=80', badge: 'sale', isNew: false, isFeatured: false, stock: 50 },

  // Fashion
  { id: 7, name: 'អាវយឺតស្ទាយ Korean', nameEn: 'Korean Style T-Shirt', price: 12.99, oldPrice: 18.99, category: 'fashion', rating: 4.7, reviews: 312, image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&q=80', badge: 'hot', isNew: false, isFeatured: true, stock: 100 },
  { id: 8, name: 'រ៉ូបស្ត្រីទំនើប', nameEn: 'Modern Dress', price: 24.99, oldPrice: 35.99, category: 'fashion', rating: 4.8, reviews: 189, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&q=80', badge: 'new', isNew: true, isFeatured: true, stock: 45 },
  { id: 9, name: 'ខោ Jeans Slim Fit', nameEn: 'Slim Fit Jeans', price: 29.99, oldPrice: null, category: 'fashion', rating: 4.6, reviews: 256, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80', badge: null, isNew: false, isFeatured: false, stock: 60 },
  { id: 10, name: 'ស្បែកជើង Nike Air', nameEn: 'Nike Air Sneakers', price: 59.99, oldPrice: 79.99, category: 'fashion', rating: 4.9, reviews: 423, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80', badge: 'sale', isNew: false, isFeatured: true, stock: 20 },
  { id: 11, name: 'កាបូបស្ត្រី革', nameEn: 'Leather Handbag', price: 34.99, oldPrice: 49.99, category: 'fashion', rating: 4.7, reviews: 145, image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80', badge: 'hot', isNew: false, isFeatured: false, stock: 15 },
  { id: 12, name: 'អាវ Hoodie ពណ៌', nameEn: 'Colorful Hoodie', price: 22.99, oldPrice: null, category: 'fashion', rating: 4.5, reviews: 198, image: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=400&q=80', badge: 'new', isNew: true, isFeatured: false, stock: 80 },

  // Beauty
  { id: 13, name: 'ម្សៅ Foundation SPF50', nameEn: 'Foundation SPF50', price: 18.99, oldPrice: 25.99, category: 'beauty', rating: 4.8, reviews: 567, image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80', badge: 'hot', isNew: false, isFeatured: true, stock: 200 },
  { id: 14, name: 'Skincare Set Vitamin C', nameEn: 'Vitamin C Skincare Set', price: 39.99, oldPrice: 55.99, category: 'beauty', rating: 4.9, reviews: 342, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80', badge: 'sale', isNew: false, isFeatured: true, stock: 75 },
  { id: 15, name: 'ឈើស Perfume 50ml', nameEn: 'Perfume 50ml', price: 29.99, oldPrice: null, category: 'beauty', rating: 4.7, reviews: 231, image: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=400&q=80', badge: 'new', isNew: true, isFeatured: false, stock: 40 },
  { id: 16, name: 'ក្រែមមុខ Moisturizer', nameEn: 'Moisturizer Cream', price: 14.99, oldPrice: 19.99, category: 'beauty', rating: 4.6, reviews: 412, image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&q=80', badge: null, isNew: false, isFeatured: false, stock: 150 },

  // Home
  { id: 17, name: 'ភ្ជាំង LED ទំនើប', nameEn: 'Modern LED Lamp', price: 24.99, oldPrice: 34.99, category: 'home', rating: 4.7, reviews: 156, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80', badge: 'sale', isNew: false, isFeatured: true, stock: 35 },
  { id: 18, name: 'ឆ្នាំង Air Fryer', nameEn: 'Air Fryer', price: 49.99, oldPrice: 69.99, category: 'home', rating: 4.8, reviews: 289, image: 'https://images.unsplash.com/photo-1648754505025-46b42efe3e42?w=400&q=80', badge: 'hot', isNew: false, isFeatured: false, stock: 20 },
  { id: 19, name: 'អ័រ Blender 1000W', nameEn: 'Blender 1000W', price: 35.99, oldPrice: null, category: 'home', rating: 4.6, reviews: 178, image: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400&q=80', badge: 'new', isNew: true, isFeatured: false, stock: 25 },
  { id: 20, name: 'ខ្នើយ Memory Foam', nameEn: 'Memory Foam Pillow', price: 19.99, oldPrice: 27.99, category: 'home', rating: 4.5, reviews: 203, image: 'https://images.unsplash.com/photo-1588776814546-daab30f310ce?w=400&q=80', badge: null, isNew: false, isFeatured: false, stock: 60 },

  // Sport
  { id: 21, name: 'Yoga Mat Premium', nameEn: 'Yoga Mat Premium', price: 22.99, oldPrice: 32.99, category: 'sport', rating: 4.8, reviews: 324, image: 'https://images.unsplash.com/photo-1601925228870-1f28bd4d9734?w=400&q=80', badge: 'sale', isNew: false, isFeatured: true, stock: 45 },
  { id: 22, name: 'ដំបូង Dumbbells Set', nameEn: 'Dumbbells Set', price: 39.99, oldPrice: null, category: 'sport', rating: 4.7, reviews: 145, image: 'https://images.unsplash.com/photo-1517344884509-a0c97ec11bcc?w=400&q=80', badge: 'new', isNew: true, isFeatured: false, stock: 30 },
  { id: 23, name: 'ស្បែកជើងរត់ Running', nameEn: 'Running Shoes', price: 54.99, oldPrice: 74.99, category: 'sport', rating: 4.9, reviews: 278, image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&q=80', badge: 'hot', isNew: false, isFeatured: false, stock: 18 },
  { id: 24, name: 'Water Bottle 1L', nameEn: 'Water Bottle 1L', price: 9.99, oldPrice: 14.99, category: 'sport', rating: 4.5, reviews: 412, image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&q=80', badge: null, isNew: false, isFeatured: false, stock: 100 },
];
