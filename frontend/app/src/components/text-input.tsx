import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { TextInput as PaperTextInput, TextInputProps as PaperTextInputProps } from 'react-native-paper';

// Extend the props from PaperTextInputProps to include your custom props
interface CustomTextInputProps extends PaperTextInputProps {
  label: string;
  required?: boolean;
  error?: boolean;
  errorMessage?: string;
  containerStyle?: ViewStyle; // Add this line
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  label,
  required = false,
  error = false,
  errorMessage = '',
  ...rest
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label} {required && <Text style={styles.required}>*</Text>}
      </Text>
      <PaperTextInput
        mode="outlined"
        error={error}
        {...rest} // This will pass all other props like value, onChangeText, placeholder to PaperTextInput
      />
      {error && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  required: {
    color: 'red',
  },
  errorText: {
    marginTop: 4,
    color: 'red',
    fontSize: 14,
  },
});

export default CustomTextInput;
