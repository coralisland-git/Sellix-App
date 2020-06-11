import * as ACTION_TYPES from "../constants/action-types";
import {
  api,
  authApi,
  formData
} from '../utils'

export const getInvoices = () => {
  return (dispatch) => {
    let data = {
      method: 'GET',
      url: `/self/invoices`
    }

    dispatch({ type: ACTION_TYPES.FETCH_DATA_START })
    return authApi(data).then(res => {
      if (res.status === 200) {
        console.log(res.data.invoices)
        dispatch({
          type: ACTION_TYPES.INVOICES,
          payload: res.data.invoices
        })
        dispatch({ type: ACTION_TYPES.FETCH_DATA_SUCCESS, payload: res})
        return res
      } else {
        throw res
      }     
    }).catch(err => {
      dispatch({ type: ACTION_TYPES.FETCH_DATA_FAILED, payload: err.response && err.response.error })
    })
  }
}