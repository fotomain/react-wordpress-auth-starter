import { select, all, put, fork, takeEvery, takeLatest, call } from 'redux-saga/effects';

import dbApi_Object from '../api/select_fetch_api';

export function* watchF_CALL_code(action) {


  console.log("=== watchF_CALL_code SAGA5 ")
  console.log(action)

    //=== page_select_user_info.php
     const retApi = yield call(dbApi_Object.Select_fetch_user_connection,
         {
             action_to_api:action
         });

    console.log("=== retApi SAGA5 Select_fetch_user_connection ")
    console.log(retApi)

    if (retApi?.length > 0 && retApi[0].user_guid ) {

                console.log("=== actionToPut + ")

                         const actionToPut              = action
                         actionToPut.type               = action.type+"_SUCCESS"
                         actionToPut.status             = 'SUCCESS'
                         actionToPut.user_connection_guid = retApi[0].user_connection_guid

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

export function* watchF_CALL(params) {

  console.log("=== watchF_CALL SAGA5 + params ")
  console.log(params)
    //                           TODO FROM VAR!!!
    yield  (takeLatest('SELECT_USER_CONNECTION_TYPE', watchF_CALL_code));

}

export default function* () {

    console.log(" ")
    console.log(" ")
    console.log(" ")

    console.log( "=== FILE saga5_SELECT_USER_CONNECTION_TYPE.js ")

  // console.log( action )

  // SAGA CALL #20_SAGA2 - RUN WATCHER
  yield call(watchF_CALL, {p_params:'here params_of_watchF_CALL_SAGA5'})

}