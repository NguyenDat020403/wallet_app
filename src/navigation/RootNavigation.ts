import {
  CommonActions,
  StackActions,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {MainStackParamList} from './MainNavigation/types';

type StackParamList = MainStackParamList;
export const navigationRef = createNavigationContainerRef<StackParamList>();

export function navigate<RouteName extends keyof StackParamList>(
  ...args: RouteName extends unknown
    ? undefined extends StackParamList[RouteName]
      ?
          | [screen: RouteName]
          | [screen: RouteName, params: StackParamList[RouteName]]
      : [screen: RouteName, params: StackParamList[RouteName]]
    : never
) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(...args);
  }
}

export function goBack() {
  if (navigationRef.current?.canGoBack()) {
    navigationRef.current?.goBack();
  } else {
    navigateAndReset([{name: 'AppTabScreen'}], 0);
  }
}

export function navigateAndReset(
  routes: {name: string; params?: any}[],
  index: number,
) {
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index,
      routes,
    }),
  );
}

export function replace(name: string, params?: any) {
  navigationRef.current?.dispatch(StackActions.replace(name, params));
}

export function push(name: string, params?: any) {
  navigationRef.current?.dispatch(StackActions.push(name, params));
}

export function pop(num: number) {
  navigationRef.current?.dispatch(StackActions.pop(num));
}

export function getState() {
  return navigationRef.current?.getState();
}

export function getRoutes() {
  return navigationRef.current?.getState().routes;
}

export function getCurrentRoute() {
  const routes = navigationRef.current?.getState().routes;
  return routes && routes[routes.length - 1];
}
