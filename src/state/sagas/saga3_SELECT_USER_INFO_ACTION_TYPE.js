    import { select, all, put, fork, takeEvery, takeLatest, call } from 'redux-saga/effects';

import dbApi_Object from '../api/select_fetch_api';
import {fetchProductsFailure, selectUserDataActionFunction} from "../actions";


export function* watchF_CALL_SAGA2_code(action) {
  // SAGA #22_SAGA2 RUN REAL WORS

  console.log("=== watchF_CALL_SAGA3_code + action")
  console.log(action)
  console.log("=== FINAL action.SAGA3_params")

    //=== page_select_user_info.php
     const retApi = yield call(dbApi_Object.Select_fetch_user_info,
         {
             action_to_api:action
         });

    console.log("=== retApi SAGA3 Select_fetch_user_info ")
    console.log(retApi)

    if (retApi?.length > 0 && retApi[0].user_guid ) {
                console.log("=== actionToPut + ")
                         const actionToPut              = action
                         actionToPut.type               = action.type+"_SUCCESS"
                         actionToPut.user_email         = retApi[0].user_email;
                         actionToPut.user_guid          = retApi[0].user_guid;
                         actionToPut.user_token         = retApi[0].user_token;
                         actionToPut.user_description   = retApi[0].description;
                         actionToPut.user_was_found_in_db = true;
                         actionToPut.status             = 'SUCCESS'

                // console.log("=== retApi[0].main_device")
                // console.log(retApi[0].main_device)
                // console.log("=== action.this_device_guid ")
                // console.log(action.user_params.this_device_guid)
                console.log("=== actionToPut - watchF_CALL_SAGA3_code ")
                console.log(actionToPut)

                    const tUSER_INFO = {
                        user_email:                     actionToPut.user_email,
                        user_guid:                      actionToPut.user_guid,
                        // user_main_device:               actionToPut.user_main_device,
                        // this_device_guid:               action.this_device_guid,
                        user_description:               actionToPut.user_description,
                            // 'ddd-user_main_device-111',
                    }
                    console.log("=== saga3 tUSER_INFO")
                    console.log(tUSER_INFO)
                    //=== js object to json
                    // localStorage.setItem("appGo888_USER_DATA",JSON. stringify(tUSER_INFO))

                    // for (let i = 0; i < 10000 ; i++) {
                    //     console.log('FAKE FOR')
                    // }

                        yield put(
                           actionToPut
                         );
    }
    else {

        console.log("=== actionToPut - NODATA ")
        const actionToPut              = action
        actionToPut.type               = action.type+"_NODATA"
        actionToPut.status             = 'NODATA'
                yield put(
                    actionToPut
                );

    }

}

export function* watchF_CALL_SAGA2(params) {

  console.log("=== watchF_CALL_SAGA2 + params ")
  console.log(params)

  // SAGA CALL #21_SAGA2 - RUN PERFORMANCE
  yield  (takeLatest('SELECT_USER_INFO_ACTION_TYPE', watchF_CALL_SAGA2_code));

}

export default function* () {

    console.log(" ")
    console.log(" ")
    console.log(" ")

    console.log( "=== FILE saga3_SELECT_USER_INFO_ACTION_TYPE.js ")

  // console.log( action )

  // SAGA CALL #20_SAGA2 - RUN WATCHER
  yield call(watchF_CALL_SAGA2, {p_params:'here params_of_watchF_CALL_SAGA3'})

}