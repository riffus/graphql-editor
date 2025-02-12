import { ChevronLeftDouble } from "@aexol-studio/styling-system";
import styled from "@emotion/styled";
import React from "react";

const Container = styled.div<{ isCollapsed: boolean; isRight?: true }>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  height: 24px;
  width: 20px;
  border-radius: ${(p) => p.theme.radius}px;
  background-color: ${({ theme }) => theme.neutral[600]};
  position: absolute;
  z-index: 1;
  top: 50%;
  right: ${({ isRight }) => (isRight ? "unset" : 0)};
  left: ${({ isRight }) => (isRight ? 0 : "unset")};
  translate: ${({ isRight }) => (isRight ? "-50% -50%" : "50% -50%")};
  color: ${({ theme }) => theme.text.default};
  transition: color 0.25s ease;
  background-color: ${(p) => p.theme.neutral[400]};

  &:hover {
    color: ${({ theme }) => theme.accents[200]};
  }

  svg {
    transform: ${({ isCollapsed, isRight }) => {
      if (isRight) return isCollapsed ? "rotate(0deg)" : "rotate(180deg)";
      return isCollapsed ? "rotate(180deg)" : "rotate(0deg)";
    }};
  }
`;

interface CollapseArrowProps {
  isCollapsed: boolean;
  toggle: () => void;
  isRight?: true;
}

export const CollapseArrow: React.FC<CollapseArrowProps> = ({
  isCollapsed,
  toggle,
  isRight,
}) => {
  return (
    <Container
      isRight={isRight}
      isCollapsed={isCollapsed}
      onClick={() => toggle()}
    >
      <ChevronLeftDouble height={16} />
    </Container>
  );
};
