import React, { useContext } from 'react';
import styled from 'styled-components';
import { CartContext } from '../App';

const ItemContainer = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.secondary};
`;

const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
`;

const ItemDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ItemName = styled.h4`
  margin: 0;
`;

const ItemPrice = styled.p`
  color: ${({ theme }) => theme.primary};
  font-weight: 600;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const QuantityButton = styled.button`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.text};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;

const Quantity = styled.span`
  min-width: 20px;
  text-align: center;
`;

const RemoveButton = styled.button`
  color: ${({ theme }) => theme.accent};
  font-size: 0.8rem;
  align-self: flex-start;
  &:hover {
    text-decoration: underline;
  }
`;

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useContext(CartContext);

  return (
    <ItemContainer className="fade-in">
      <ItemImage src={item.image} alt={item.name} />
      <ItemDetails>
        <div>
          <ItemName>{item.name}</ItemName>
          <ItemPrice>${item.price.toFixed(2)}</ItemPrice>
        </div>
        <QuantityControls>
          <QuantityButton onClick={() => updateQuantity(item.id, item.quantity - 1)}>
            -
          </QuantityButton>
          <Quantity>{item.quantity}</Quantity>
          <QuantityButton onClick={() => updateQuantity(item.id, item.quantity + 1)}>
            +
          </QuantityButton>
        </QuantityControls>
      </ItemDetails>
      <RemoveButton onClick={() => removeFromCart(item.id)}>Remove</RemoveButton>
    </ItemContainer>
  );
};

export default CartItem;