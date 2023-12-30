import { Container } from './style';
import { Text } from '../Text';
import { ActivityIndicator } from 'react-native';

interface buttonProps{
  children: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export function Button({children,onPress,disabled,loading}:buttonProps){
  return(
    <Container onPress={onPress} disabled={disabled || loading}>
      {!loading &&
        <Text weight='600' color='#fff'>{children}</Text>
      }

      {loading &&
        <ActivityIndicator color="#fff" />
      }

    </Container>
  );
}
