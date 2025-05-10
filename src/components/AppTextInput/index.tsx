import React, {useState} from 'react';
import {
  StyleProp,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import {Icon, Text} from '@rneui/themed';
import useStyles from './styles';
import {
  Control,
  Controller,
  FieldPath,
  FieldPathValue,
  RegisterOptions,
} from 'react-hook-form';
import {TouchableOpacity} from 'react-native';

type AppTextInputProps<T extends {[x: string]: string}> = {
  control: Control<T>;
  name: FieldPath<T>;
  required?: boolean;
  rules?: RegisterOptions<T>;
  title?: string;
  placeholder?: string;
  textCount?: string;
  type?: 'INPUT' | 'PASSWORD';
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  placeholderTextColor?: string;
  hitSlop?: number;
} & Omit<
  TextInputProps,
  'value' | 'placeholder' | 'style' | 'placeholderTextColor' | 'secureTextEntry'
>;
const AppTextInput = <T extends {}>({
  control,
  name,
  required,
  rules,
  title,
  placeholder,
  type = 'INPUT',
  style,
  containerStyle,
  textCount,
  hitSlop,
  placeholderTextColor,
  ...props
}: AppTextInputProps<T>) => {
  const styles = useStyles();
  return (
    <Controller
      control={control}
      rules={{
        required: required
          ? {value: true, message: 'Trường này là bắt buộc'}
          : false,
        ...rules,
      }}
      render={({field: {onChange, value}, fieldState: {error}}) => {
        return (
          <View style={[styles.container, containerStyle]}>
            <View style={styles.titleWrap}>
              {title && <Text style={styles.title}>{title}</Text>}
              {required && <Text style={styles.required}>*</Text>}
              {textCount && (
                <Text style={styles.title}>
                  ({String(value).length}/{textCount})
                </Text>
              )}
            </View>
            <View style={[styles.input, style, error && styles.inputError]}>
              <InputType
                {...props}
                type={type}
                {...{error, onChange, value, placeholder}}
              />
            </View>
            {error?.message && (
              <Text style={styles.error}>{error?.message}</Text>
            )}
          </View>
        );
      }}
      name={name}
    />
  );
};

export default AppTextInput;
type InputTypeProps<T extends {}> = {
  onChange: (...event: any[]) => void;
  value: FieldPathValue<T, FieldPath<T>>;
} & Omit<AppTextInputProps<T>, 'rules' | 'control' | 'name'>;
const InputType = <T extends {}>({
  type,
  onChange,
  value,
  placeholder,
  hitSlop,
  placeholderTextColor,
  ...props
}: InputTypeProps<T>) => {
  const styles = useStyles();
  const [isShowPassword, setIsShowPassword] = useState(false);

  switch (type) {
    case 'INPUT': {
      return (
        <TextInput
          hitSlop={
            hitSlop && {
              top: hitSlop,
              left: hitSlop,
              right: hitSlop,
              bottom: hitSlop,
            }
          }
          {...props}
          placeholder={placeholder}
          placeholderTextColor={
            placeholderTextColor ? placeholderTextColor : '#B0B0B0'
          }
          style={styles.inputText}
          onChangeText={onChange}
          value={value}
        />
      );
    }
    case 'PASSWORD': {
      return (
        <View style={styles.inputWrap}>
          <TextInput
            {...props}
            placeholder={placeholder}
            placeholderTextColor={styles.eye.color}
            style={styles.inputText}
            onChangeText={onChange}
            value={value}
            secureTextEntry={!isShowPassword}
          />
          <TouchableOpacity
            hitSlop={20}
            onPress={() => {
              setIsShowPassword(!isShowPassword);
            }}>
            <Icon
              type="feather"
              name={isShowPassword ? 'eye-off' : 'eye'}
              iconStyle={styles.eye}
            />
          </TouchableOpacity>
        </View>
      );
    }
    default: {
      return <View />;
    }
  }
};
