import {setBiometricPublicKey} from '@/features/auth/redux/slices';
import {showToastMessage} from '@/functions';
import {store} from '@/redux';
import ReactNativeBiometrics from 'react-native-biometrics';

export async function generateBiometricKeyForSignup() {
  const rnBiometrics = new ReactNativeBiometrics();
  const currentUser = store.getState().authReducer.currentUser;
  try {
    const {available, biometryType} = await rnBiometrics.isSensorAvailable();
    if (!available) {
      showToastMessage('Thiết bị không hỗ trợ sinh trắc học');
      return false;
    }
    const {keysExist} = await rnBiometrics.biometricKeysExist();
    if (!keysExist) {
      const {publicKey} = await rnBiometrics.createKeys();
      // Bắt buộc quét vân tay luôn khi tạo xong khóa
      const payload = `verify-biometric-${currentUser.user_id}`;
      const {success, signature} = await rnBiometrics.createSignature({
        promptMessage: 'Xác nhận vân tay để đăng ký',
        payload,
      });

      if (!success || !signature) {
        showToastMessage('Không thể xác nhận vân tay');
        return false;
      }
      await store.dispatch(setBiometricPublicKey(publicKey));
      return true;
    }
    return true;
  } catch (error) {
    showToastMessage('Lỗi khi xác thực vân tay');
    return false;
  }
}
export async function resetBiometricKeys() {
  const rnBiometrics = new ReactNativeBiometrics();
  const result = await rnBiometrics.deleteKeys();
  if (result.keysDeleted) {
    showToastMessage('Đã xóa khóa sinh trắc học');
  } else {
    showToastMessage('Không có khóa để xóa');
  }
}
