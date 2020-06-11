import * as ACTION_TYPES from "../constants/action-types";
import { AsyncStorage } from "react-native";
import {
  api,
  authApi,
  formData
} from '../utils'


export const getSelfUser = () => {
  return (dispatch) => {
    let data = {
      method: 'get',
      url: `/self`
    }

    return authApi(data).then(res => {
      if (!res.error) {
        dispatch({
          type: ACTION_TYPES.USER_PROFILE,
          payload: res.data.shop
        })
      } else {
        throw res
      }
    }).catch(err => {
      throw err
    })
  }
}



export const getSelfSettings = () => {
  return (dispatch) => {
    let data = {
      method: 'get',
      url: `/self/settings`
    }

    return authApi(data).then(res => {
      if (!res.error) {
        dispatch({
          type: ACTION_TYPES.USER_SETTINGS,
          payload: res.data.settings
        })
        return res
      } else {
        throw res
      }
    }).catch(err => {
      throw err
    })
  }
}

export const login = (obj) => {
  return (dispatch) => {
    let data = {
      method: 'post',
      url: '/login',
      data: formData(obj)
    }

    dispatch({ type: ACTION_TYPES.USER_AUTH_REQUESTED })
    return api(data).then(async res => {
      if(res && res.status == 200) {
        dispatch({ type: ACTION_TYPES.USER_LOGIN_SUCCESS, payload:res })
        await AsyncStorage.setItem('token', res.data.token)
      }
      else throw res
    }).catch(err => {
      dispatch({ 
        type: ACTION_TYPES.USER_AUTH_FAILED, 
        error: err.status === 403 ? 'reCAPTCHA verification failed, please try again.': 
        (err && err.error) || 'Invalid Email or Password.' })
    })
  }
}


export const signup = (obj) => {
  return (dispatch) => {
    let data = {
      method: 'post',
      url: '/register',
      data: formData(obj)
    }

    dispatch({ type: ACTION_TYPES.USER_AUTH_REQUESTED })
    return api(data).then(res => {  
      if(res && res.status == 202) {
        dispatch({ type: ACTION_TYPES.USER_SIGNUP_SUCCESS, payload:res })
        return res
      }
      else throw res
    }).catch(err => {
      dispatch({ 
        type: ACTION_TYPES.USER_AUTH_FAILED, 
        error: err.status === 403 ? 'reCAPTCHA verification failed, please try again.': 
        (err && err.error) || 'Invalid Email or Password.' })
    })
  }
}

export function userRequestLogout() {
  return {
    type: ACTION_TYPES.USER_LOGOUT_REQUESTED,
    payload: {},
  };
}
