import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { CartContext } from '../App';
import { useNavigate } from 'react-router-dom';

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

const CheckoutForm = styled.form`
  display: grid;
  gap: 1.5rem;
`;

const FormSection = styled.div`
  background: ${({ theme }) => theme.cardBg};
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.shadow};
`;

const SectionTitle = styled.h3`
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.primary};
`;

const InputGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.secondary};
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const SubmitButton = styled.button`
  background: ${({ theme }) => theme.primary};
  color: white;
  padding: 1rem;
  border-radius: 8px;
  font-weight: 500;
  font-size: 1.1rem;
  margin-top: 1rem;
  &:hover {
    opacity: 0.9;
  }
`;

const OrderSummary = styled(FormSection)`
  margin-top: 2rem;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const Total = styled(SummaryItem)`
  font-weight: 700;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.secondary};
`;

const Checkout = () => {
  const { cart, clearCart } = useContext(CartContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });
  const navigate = useNavigate();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 5.99 : 0;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Order placed successfully!');
    clearCart();
    navigate('/');
  };

  return (
    <Container>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Title>Checkout</Title>
        <CheckoutForm onSubmit={handleSubmit}>
          <FormSection>
            <SectionTitle>Shipping Information</SectionTitle>
            <InputGroup>
              <Label>Full Name</Label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </InputGroup>
            <InputGroup>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </InputGroup>
            <InputGroup>
              <Label>Address</Label>
              <Input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </InputGroup>
            <Row>
              <InputGroup>
                <Label>City</Label>
                <Input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </InputGroup>
              <InputGroup>
                <Label>ZIP Code</Label>
                <Input
                  type="text"
                  name="zip"
                  value={formData.zip}
                  onChange={handleChange}
                  required
                />
              </InputGroup>
            </Row>
          </FormSection>

          <FormSection>
            <SectionTitle>Payment Details</SectionTitle>
            <InputGroup>
              <Label>Card Number</Label>
              <Input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                placeholder="1234 5678 9012 3456"
                required
              />
            </InputGroup>
            <Row>
              <InputGroup>
                <Label>Expiry Date</Label>
                <Input
                  type="text"
                  name="expiry"
                  value={formData.expiry}
                  onChange={handleChange}
                  placeholder="MM/YY"
                  required
                />
              </InputGroup>
              <InputGroup>
                <Label>CVV</Label>
                <Input
                  type="text"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  placeholder="123"
                  required
                />
              </InputGroup>
            </Row>
          </FormSection>

          <OrderSummary>
            <SectionTitle>Order Summary</SectionTitle>
            {cart.map((item) => (
              <SummaryItem key={item.id}>
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </SummaryItem>
            ))}
            <SummaryItem>
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </SummaryItem>
            <SummaryItem>
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </SummaryItem>
            <SummaryItem>
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </SummaryItem>
            <Total>
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </Total>
          </OrderSummary>

          <SubmitButton type="submit">Place Order</SubmitButton>
        </CheckoutForm>
      </motion.div>
    </Container>
  );
};

export default Checkout;