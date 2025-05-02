import {store} from '@/redux';
import {logout} from '../../redux/slices';

class TokenService {
  getLocalRefreshToken() {
    return store.getState().authReducer.accessInfo.refresh_token;
  }

  getLocalAccessToken() {
    return store.getState().authReducer.accessInfo.access_token;
  }

  // async refreshToken(token: string) {
  //   try {
  //     const refreshToken = token || this.getLocalRefreshToken();
  //     if (refreshToken) {
  //       // nếu có refresh tokenn thì gọi api refresh token
  //       const response = await authApi.refreshTokenApi({refreshToken});
  //       if (response && response.status === 200) {
  //         const {data} = response.data;
  //         return data.accessToken;
  //       } else {
  //       }
  //     }
  //   } catch (e: any) {
  //     // this.logout();
  //     showToastMessageDev('Lỗi refresh token: ' + e.message);
  //   }
  // }

  // updateToken(token: object) {
  //   store.dispatch(setAccessInfo(token));
  // }
  logout() {
    store.dispatch(logout());
    // store.dispatch(resetProfile());
    // navigate('UserLoginScreen', {isExpired: true});
    // store.dispatch(setNumOfNotificationUnread(0));
  }
}

export default new TokenService();
