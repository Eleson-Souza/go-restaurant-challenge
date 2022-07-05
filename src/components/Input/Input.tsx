import { useEffect, useRef, useState, useCallback } from "react";
import { Container } from "./styles";

import { useField } from "@unform/core";

interface InputProps {
  name: string;
  placeholder: string;
}

export function Input({ name, placeholder }: InputProps) {
  const inputRef = useRef(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { fieldName, defaultValue, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
    });
  }, [fieldName, registerField]);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled((!!inputRef.current as any)?.value);
  }, []);

  return (
    <Container isFilled={isFilled} isFocused={isFocused}>
      {/* {Icon && <Icon size={20} />} */}

      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        placeholder={placeholder}
      />
    </Container>
  );
}
