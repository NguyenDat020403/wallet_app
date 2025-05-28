import {showToastMessage} from '@/functions';
import {store} from '@/redux';
import ReactNativeBiometrics from 'react-native-biometrics';
import {loginUser} from '../../redux/slices';

export async function handleSignIn() {
  const rnBiometrics = new ReactNativeBiometrics();
  const currentUser = store.getState().authReducer.currentUser;

  try {
    const {available} = await rnBiometrics.isSensorAvailable();
    if (!available) {
      showToastMessage('Thiết bị không hỗ trợ sinh trắc học');
      return false;
    }

    const {keysExist} = await rnBiometrics.biometricKeysExist();
    if (!keysExist) {
      showToastMessage('Chưa thiết lập đăng nhập vân tay cho tài khoản này');
      return false;
    }

    const payload = `biometric-login-${currentUser.user_id}`;

    const {success: signSuccess, signature} =
      await rnBiometrics.createSignature({
        promptMessage: 'Xác thực bằng vân tay',
        payload,
      });

    if (!signSuccess || !signature) {
      showToastMessage('Xác thực thất bại');
      return false;
    }
    store.dispatch(
      loginUser({
        user_id: currentUser.user_id,
        payload: payload,
        signature: signature,
      }),
    );
    return {
      payload: payload,
      signature: signature,
    };
  } catch (error) {
    showToastMessage('Lỗi trong quá trình xác thực');
    return false;
  }
}
