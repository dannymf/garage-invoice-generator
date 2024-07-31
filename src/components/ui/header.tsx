"use client";
import React, { useEffect, useState } from "react";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const HeaderContainer = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #f5f5f5;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 1.5s ease-in-out;
  height: 100px; /* Adjust height as needed */
  box-sizing: border-box;
  margin-top: 10px; /* Adjust top margin as needed */
`;

const IconContainer = styled.div`
  margin-right: 20px;
`;

const Icon = styled.img`
  width: 50px;
  height: 50px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin: 0;
  color: #333;
  background: orange;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Header: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <HeaderContainer style={{ opacity: isVisible ? 1 : 0 }}>
      <IconContainer>
        <Icon src="/garageLogo.svg" alt="Icon" />
      </IconContainer>
      <Title>Garage Invoice Generator</Title>
    </HeaderContainer>
  );
};

export default Header;
