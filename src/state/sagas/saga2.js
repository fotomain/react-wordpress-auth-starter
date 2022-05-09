import { select, all, put, fork, takeEvery, takeLatest, call } from 'redux-saga/effects';

import dbApi_Object from '../api/select_fetch_api';
import {fetchProductsFailure} from "../actions";

export function* watchF_CALL_SAGA2_code(action) {
  // SAGA #22_SAGA2 RUN REAL WORS

  console.log("=== watchF_CALL_SAGA2_code + action")
  console.log(action)
  console.log("=== FINAL action.SAGA2_params")

    console.log("=== actionToPut + ")
             const actionToPut              = action
             actionToPut.type               = action.type+"_SUCCESS"
             actionToPut.user_email         = '1user01@gmail.com'
             actionToPut.user_guid          = 'user_guid '+Date.now();
             actionToPut.user_description   = 'user_description '+Date.now();
             actionToPut.status             = 'SUCCESS'

    console.log("=== actionToPut - watchF_CALL_SAGA2_code ")
    console.log(actionToPut)

    const tUSER_INFO_test = {
        user_email:'user01@gmail.com',
    }

    localStorage.setItem("appGo888_USER_DATA", JSON.stringify(tUSER_INFO_test))

    yield put(
                 actionToPut
               );


}

export function* watchF_CALL_SAGA2(params) {

  console.log("=== watchF_CALL_SAGA2 + params ")
  console.log(params)

  // SAGA CALL #21_SAGA2 - RUN PERFORMANCE
  yield  (takeLatest('SAGA2_ACTION', watchF_CALL_SAGA2_code));

}

export default function* () {

  console.log( "=== _SAGA2 export default function* ")
  // console.log( action )

  // SAGA CALL #20_SAGA2 - RUN WATCHER
  yield call(watchF_CALL_SAGA2, {p_params:'here params_of_watchF_CALL_SAGA2'})

}