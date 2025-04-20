import React from 'react';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';

interface ProductDetailProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    images: string[];
    reference: string;
    category: {
      id: string;
      name: string;
    };
    inStock: boolean;
    quantity: number;
  };
  onAddToCart: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onAddToCart }) => {
  const { t } = useTranslation('common');
  const [selectedImage, setSelectedImage] = React.useState(0);
  const [quantity, setQuantity] = React.useState(1);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0 && newQuantity <= product.quantity) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
        {/* Imagens do produto */}
        <div>
          <div className="relative h-80 md:h-96 w-full mb-4">
            {product.images && product.images.length > 0 ? (
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">Sem imagem</span>
              </div>
            )}
          </div>
          
          {product.images && product.images.length > 1 && (
            <div className="flex space-x-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative h-20 w-20 border-2 ${
                    selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} - imagem ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Detalhes do produto */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
          
          <div className="flex items-center mb-4">
            <span className="text-2xl font-bold text-gray-900 mr-4">{product.price.toFixed(2)}€</span>
            {product.inStock ? (
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Em stock</span>
            ) : (
              <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm">{t('products.outOfStock')}</span>
            )}
          </div>
          
          <div className="mb-6">
            <p className="text-gray-600">{product.description}</p>
          </div>
          
          <div className="mb-4">
            <p className="text-sm text-gray-500">Referência: {product.reference}</p>
            <p className="text-sm text-gray-500">
              Categoria: <Link href={`/categories/${product.category.id}`} className="text-blue-600 hover:underline">{product.category.name}</Link>
            </p>
          </div>
          
          {product.inStock && (
            <div className="mb-6">
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                Quantidade
              </label>
              <div className="flex items-center">
                <button
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-l"
                  onClick={() => handleQuantityChange(quantity - 1)}
                >
                  -
                </button>
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                  min="1"
                  max={product.quantity}
                  className="w-16 text-center py-1 border-t border-b border-gray-300"
                />
                <button
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-r"
                  onClick={() => handleQuantityChange(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
          )}
          
          <button
            onClick={onAddToCart}
            disabled={!product.inStock}
            className={`w-full py-3 px-6 rounded-md font-medium text-white ${
              product.inStock
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {t('products.addToCart')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
