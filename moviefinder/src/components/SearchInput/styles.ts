import styled, { css } from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

interface colorsTheme {
  colors: {
    primary: string;
    secundary: string;
    specialText: string;
    categorySelected: string;
    categoryName: string;
    background: string;
    title: string;
    text: string;
    prayerDescription: string;
    prayerName: string;
    headerText: string;
  };
}

interface ContainerProps {
  isFocused: boolean;
  themeColors: colorsTheme;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: ${props => props.themeColors.colors.secundary};
  border-radius: 10px;
  border-width: 2px;
  border-color: ${props => props.themeColors.colors.secundary};
  flex-direction: row;
  align-items: center;

  ${props =>
    props.isFocused &&
    css`
      border-color: #785f42;
    `}
`;

export const TextInput = styled.TextInput<colorsTheme>`
  flex: 1;
  color: ${props => props.colors.categoryName};
  font-size: 16px;
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`;
