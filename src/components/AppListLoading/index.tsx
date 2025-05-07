import {useSafeAreaInsetsWindowDimension} from '@/hooks';
import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import useStyles from './styles';

type AppListLoadingProps = {
  isLoading: boolean;
};

const AppListLoading: React.FC<AppListLoadingProps> = React.memo(
  ({isLoading}) => {
    const safeAreaInsets = useSafeAreaInsetsWindowDimension();
    const styles = useStyles(safeAreaInsets);
    return (
      <View style={[{width: '100%'}]}>
        <View style={styles.loadingContainer}>
          {isLoading && (
            <View
              style={{
                justifyContent: 'center',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <ActivityIndicator color={styles.loadingIndicator.color} />
              <Text style={styles.loadingText}>loading...</Text>
            </View>
          )}
        </View>
      </View>
    );
  },
);
export default AppListLoading;
