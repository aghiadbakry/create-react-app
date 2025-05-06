import React, { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../App';

const ToggleContainer = styled.div`
  position: relative;
  width: 60px;
  height: 30px;
  border-radius: 15px;
  background: ${({ theme }) => theme.secondary};
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0 5px;
  justify-content: ${({ isDark }) => (isDark ? 'flex-end' : 'flex-start')};
  transition: all 0.3s ease;
`;

const ToggleCircle = styled.div`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: ${({ theme }) => theme.body};
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
`;

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  return (
    <ToggleContainer isDark={isDark} onClick={toggleTheme}>
      <ToggleCircle />
    </ToggleContainer>
  );
};

export default ThemeToggle;