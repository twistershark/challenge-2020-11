import React, {useCallback, useState} from 'react';

import {TextInputProps} from 'react-native';

import {Container, TextInput, Icon} from './styles';

interface InputProps extends TextInputProps {
  name?: string;
}

const SearchInput: React.FC<InputProps> = ({value = '', ...rest}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!value);
  }, [value]);

  return (
    <Container isFocused={isFocused}>
      <Icon name="search" size={20} />

      <TextInput
        placeholderTextColor={theme.colors.searchPlaceHolder}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        value={value}
        colors={theme.colors}
        {...rest}
      />
    </Container>
  );
};

export default SearchInput;
