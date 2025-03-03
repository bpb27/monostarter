import { Flex, Text, TextField } from "@radix-ui/themes";
import { useState } from "react";

interface InputProps extends TextField.RootProps {
  name: string;
  value: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | undefined;
}

export const Input = ({ error, label, name, size = "3", ...rest }: InputProps) => {
  const [showError, setShowError] = useState(false);
  return (
    <Flex direction="column" gap="4px">
      <Text as="label" weight="bold" size="2" htmlFor={name}>
        {label}
      </Text>
      <TextField.Root
        size={size}
        id={name}
        name={name}
        onFocus={() => setShowError(false)}
        onBlur={() => setShowError(true)}
        {...rest}
      />
      {showError && !!error && (
        <Text as="label" size="2" color="crimson">
          {error}
        </Text>
      )}
    </Flex>
  );
};
