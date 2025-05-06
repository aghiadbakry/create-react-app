import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CartContext } from '../App';
import CartItem from '../components/CartItem';

const Container = styled.div`
  padding: 6rem 2rem 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.primary};
`;

const CartItems = styled.div`
  margin-bottom: 2rem;
`;

const Summary = styled.div`
  background: ${({ theme }) => theme.cardBg};
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.shadow};
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const Total = styled(SummaryRow)`
  font-size: 1.2rem;
  font-weight: 700;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.secondary};
`;

const CheckoutButton = styled(Link)`
  display: block;
  background: ${({ theme }) => theme.primary};
  color: white;
  text-align: center;
  padding: 1rem;
  border-radius: 8px;
  font-weight: 500;
  margin-top: 1.5rem;
  text-decoration: none;
  &:hover {
    opacity: 0.9;
  }
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 3rem 0;
`;

const ContinueShopping = styled(Link)`
  color: ${({ theme }) => theme.primary};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Cart = () => {
  const { cart } = useContext(CartContext);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 5.99 : 0; 
  const tax = subtotal * 0.15;
  const total = subtotal + shipping + tax;

  return (
    <Container>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Title>Your Cart</Title>
        {cart.length === 0 ? (
          <EmptyCart>
            <h3>Your cart is empty</h3>
            <p>
              <ContinueShopping to="/">Continue shopping</ContinueShopping>
            </p>
          </EmptyCart>
        ) : (
          <>
            <CartItems>
              {cart.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </CartItems>
            <Summary>
              <SummaryRow>
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </SummaryRow>
              <SummaryRow>
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </SummaryRow>
              <SummaryRow>
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </SummaryRow>
              <Total>
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </Total>
              <CheckoutButton to="/checkout">Proceed to Checkout</CheckoutButton>
            </Summary>
          </>
        )}
      </motion.div>
    </Container>
  );
};

export default Cart;