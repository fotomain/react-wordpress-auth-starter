import { select, all, put, fork, takeEvery, takeLatest, call } from 'redux-saga/effects';

import dbApi_Object from '../api/select_fetch_api';

export function* watchF_CALL_code(action) {


  console.log("=== watchF_CALL_code SAGA6 ")
  console.log(action)

    //=== page_isert_user.php
     const retApi = yield call(dbApi_Object.Insert_new_user_into_db,
         {
             action_to_api:action
         });

    console.log("=== retApi SAGA5 Insert_new_user_into_db ")
    console.log(retApi)

    if (retApi?.length > 0 && retApi[0].user_guid ) {

                console.log("=== actionToPut + ")

                         const actionToPut              = action
                         actionToPut.type               = action.type+"_SUCCESS"
                         actionToPut.status             = 'SUCCESS'
                            actionToPut.user_email         = retApi[0].user_email;
                            actionToPut.user_guid          = retApi[0].user_guid;
                            actionToPut.user_description   = retApi[0].description;
                            actionToPut.user_connection_guid   = retApi[0].user_connection_guid;
                         actionToPut.user_was_found_in_db = true;

                        yield put(
                           actionToPut
                         );
    }
    else {

        console.log("=== actionToPut - NODATA SAGA5")
        const actionToPut              = action
        actionToPut.type               = action.type+"_NODATA"
        actionToPut.status             = 'NODATA'
                yield put(
                    actionToPut
                );

    }

}

export function* watchF_CALL(params) {

  console.log("=== watchF_CALL SAGA6 ")
  console.log(params)
    //                           TODO FROM VAR!!!
    yield  (takeLatest('INSERT_NEW_USER_IN_DB_TYPE', watchF_CALL_code));

}

export default function* () {

    console.log(" ")
    console.log(" ")
    console.log(" ")

    console.log( "=== FILE saga6 ")


  yield call(watchF_CALL, {p_params:'here params_of_watchF_CALL_SAGA6'})

}