import { select, all, put, fork, takeEvery, takeLatest, call } from 'redux-saga/effects';

import dbApi_Object from '../api/select_fetch_api';
import {fetchProductsFailure} from "../actions";

export function* watchF_CALL_SAGA1_saga(action) {
  // SAGA #22_SAGA1 RUN REAL WORS

  console.log("=== watchF_CALL_SAGA1_saga + action")
  console.log(action)
  console.log("=== FINAL action.saga1_params")
  console.log(action.saga1_params)

  try {

    //Update IN SQL
    const retApi = yield call(dbApi_Object.Update_fetch,
      {
              action_to_api:action,
              p_params_to_api: action.p_saga.p_to_saga
          });

            console.log("=== Update_fetch retApi")
            console.log(retApi)

            // redux read data from state
            // react how to access store from saga module

             const actionToPut              = action
             actionToPut.type               = 'UPDATE_ON_DISPLAY'
             actionToPut.functional_name    =  actionToPut.functional_name + '_ON_DISPLAY'
             actionToPut.status             = 'SUCCESS'

               yield put(

                 actionToPut

               );



  } catch(error) {

    console.log("=== catch(error)")
    console.log(error)
    // TODO
    // yield put(fetchProductsFailure(error));
  }

}

export function* watchF_CALL_SAGA1(params) {

  console.log("=== watchF_CALL_SAGA1 + params ")
  console.log(params)

  // SAGA CALL #21_SAGA1 - RUN PERFORMANCE
  yield  (takeLatest('CALL_SAGA1', watchF_CALL_SAGA1_saga));

}

export default function* () {

  console.log( "=== _SAGA1 export default function* ")

  // SAGA CALL #20_SAGA1 - RUN WATCHER
  // yield fork(watchF_CALL_SAGA1, {p_params:'here params_of_watchF_CALL_SAGA1'})
  yield call(watchF_CALL_SAGA1, {p_params:'here params_of_watchF_CALL_SAGA1'})

}