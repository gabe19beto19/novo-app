"use client";

import { useState, useMemo } from "react";
import { SearchBar } from "@/components/custom/search-bar";
import { ProductCard } from "@/components/custom/product-card";
import { AddProductDialog } from "@/components/custom/add-product-dialog";
import { ProductDetailDialog } from "@/components/custom/product-detail-dialog";
import { Product } from "@/lib/types";
import { Store, TrendingUp, Shield, Zap } from "lucide-react";

const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    title: "iPhone 13 Pro Max 256GB",
    description: "Seminovo em perfeito estado, com caixa e todos acessórios originais. Bateria 95%. Sem arranhões.",
    price: 4500,
    category: "Eletrônicos",
    image: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=400&h=300&fit=crop",
    seller: "João Silva",
    location: "São Paulo, SP",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: "2",
    title: "Honda Civic 2020 Automático",
    description: "Carro impecável, único dono, revisões em dia na concessionária. IPVA 2024 pago.",
    price: 95000,
    category: "Veículos",
    image: "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=400&h=300&fit=crop",
    seller: "Maria Santos",
    location: "Rio de Janeiro, RJ",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },
  {
    id: "3",
    title: "Apartamento 2 Quartos - Centro",
    description: "Apartamento mobiliado, 2 quartos, 1 banheiro, sala, cozinha. Próximo ao metrô.",
    price: 350000,
    category: "Imóveis",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
    seller: "Imobiliária Prime",
    location: "Belo Horizonte, MG",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
  {
    id: "4",
    title: "Tênis Nike Air Max 2023",
    description: "Novo na caixa, tamanho 42, cor preto/branco. Modelo lançamento 2023.",
    price: 450,
    category: "Moda",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
    seller: "Loja Sneakers",
    location: "Curitiba, PR",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    id: "5",
    title: "Sofá 3 Lugares Retrátil",
    description: "Sofá em tecido suede, cor cinza, retrátil e reclinável. Muito confortável.",
    price: 1200,
    category: "Casa e Jardim",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop",
    seller: "Carlos Móveis",
    location: "Porto Alegre, RS",
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
  },
  {
    id: "6",
    title: "Bicicleta Mountain Bike Aro 29",
    description: "Bike profissional, quadro alumínio, 21 marchas Shimano, freio a disco.",
    price: 1800,
    category: "Esportes",
    image: "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=400&h=300&fit=crop",
    seller: "Pedro Bikes",
    location: "Brasília, DF",
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
  },
];

export default function Home() {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  const handleAddProduct = (newProduct: Omit<Product, "id" | "createdAt">) => {
    const product: Product = {
      ...newProduct,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setProducts([product, ...products]);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setDetailOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-3 rounded-xl shadow-lg">
                <Store className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  MarketPlace
                </h1>
                <p className="text-sm text-gray-600">Compre e venda com facilidade</p>
              </div>
            </div>
            <AddProductDialog onAddProduct={handleAddProduct} />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-5xl font-bold mb-4">
              Encontre o que você procura
            </h2>
            <p className="text-lg sm:text-xl text-emerald-50 max-w-2xl mx-auto">
              Milhares de produtos novos e usados esperando por você
            </p>
          </div>
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>
      </section>

      {/* Features */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex items-center gap-3 justify-center">
              <div className="bg-emerald-100 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Venda Rápido</h3>
                <p className="text-sm text-gray-600">Anuncie grátis</p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <div className="bg-teal-100 p-3 rounded-lg">
                <Shield className="w-6 h-6 text-teal-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Seguro</h3>
                <p className="text-sm text-gray-600">Compre com confiança</p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <div className="bg-cyan-100 p-3 rounded-lg">
                <Zap className="w-6 h-6 text-cyan-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Fácil e Rápido</h3>
                <p className="text-sm text-gray-600">Interface simples</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {selectedCategory === "all" ? "Todos os Produtos" : selectedCategory}
            </h2>
            <span className="text-gray-600">
              {filteredProducts.length} {filteredProducts.length === 1 ? "anúncio" : "anúncios"}
            </span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
                <Store className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Nenhum produto encontrado
              </h3>
              <p className="text-gray-600">
                Tente buscar por outros termos ou categorias
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() => handleProductClick(product)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Store className="w-6 h-6" />
            <span className="text-xl font-bold">MarketPlace</span>
          </div>
          <p className="text-gray-400">
            © 2024 MarketPlace. Compre e venda com segurança.
          </p>
        </div>
      </footer>

      {/* Product Detail Dialog */}
      <ProductDetailDialog
        product={selectedProduct}
        open={detailOpen}
        onOpenChange={setDetailOpen}
      />
    </div>
  );
}
