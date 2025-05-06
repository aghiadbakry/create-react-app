import React, { useContext } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { CartContext } from '../App';

const Card = styled(motion.div)`
  background: ${({ theme }) => theme.cardBg};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadow};
  display: flex;
  flex-direction: column;
`;

const ImageContainer = styled.div`
  height: 200px;
  overflow: hidden;
  position: relative;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  &:hover {
    transform: scale(1.1);
  }
`;

const ProductInfo = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ProductTitle = styled.h3`
  font-size: 1.1rem;
  margin: 0;
`;

const ProductPrice = styled.p`
  font-size: 1.2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
  margin: 0.5rem 0;
`;

const AddToCartButton = styled.button`
  background: ${({ theme }) => theme.primary};
  color: white;
  padding: 0.6rem;
  border-radius: 8px;
  font-weight: 500;
  margin-top: 0.5rem;
  &:hover {
    opacity: 0.9;
  }
`;

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <Card
      className="scale-hover"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <ImageContainer>
        <ProductImage src={product.image} alt={product.name} />
      </ImageContainer>
      <ProductInfo>
        <ProductTitle>{product.name}</ProductTitle>
        <ProductPrice>${product.price.toFixed(2)}</ProductPrice>
        <AddToCartButton onClick={() => addToCart(product)}>
          Add to Cart
        </AddToCartButton>
      </ProductInfo>
    </Card>
  );
};

export default ProductCard;