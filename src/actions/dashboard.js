import * as ACTION_TYPES from "../constants/action-types";
import {
  api,
  authApi,
  formData
} from '../utils'


export const getDashboardTotalData = (start, end) => {
  return (dispatch) => {
    let data = {
      method: 'get',
      url: `/self/analytics?from=${start}&to=${end}&year=true`
    }

    dispatch({ type: ACTION_TYPES.FETCH_DATA_START })
    return authApi(data).then(res => {
      if(res && res.status == 200) {
        dispatch({ type: ACTION_TYPES.DASHBOARD_TOTAL_DATA, payload: res })
        dispatch({ type: ACTION_TYPES.FETCH_DATA_SUCCESS, payload: res})
      } else throw res
    }).catch(err => {
      dispatch({ type: ACTION_TYPES.FETCH_DATA_FAILED, payload: err.response && err.response.error })
    })
  }
}


export const getDashboardGraphData = (start, end) => {
  return (dispatch) => {
    let data = {
      method: 'get',
      url: `/self/analytics?from=${start}&to=${end}&year=true`
    }

    dispatch({ type: ACTION_TYPES.UPDATE_DATA_START })
    return authApi(data).then(res => {
      if(res && res.status == 200) {
        dispatch({ type: ACTION_TYPES.DASHBOARD_GRAPH_DATA, payload: res })
        dispatch({ type: ACTION_TYPES.UPDATE_DATA_SUCCESS, payload: res})
      } else throw res
    }).catch(err => {
      dispatch({ type: ACTION_TYPES.UPDATE_DATA_FAILED, payload: err.response && err.response.error })
    })
  }
}