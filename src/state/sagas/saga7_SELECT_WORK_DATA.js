import { select, all, put, fork, takeEvery, takeLatest, call } from 'redux-saga/effects';

import dbApi_Object from '../api/select_fetch_api';


export function* watchF_CALL_level_2_code(action) {

  console.log("=== watchF_CALL_level_2_code + SELECT_WORK_DATA")

  console.log(action)

     const retApi = yield call(dbApi_Object.Select_fetch_work_data,
         {
             action_to_api:action
         });

    console.log("=== retApi  + SELECT_WORK_DATA")
    console.log(retApi)

    if (retApi.data_to_state?.length > 0 ) {
                 console.log("=== actionToPut + ")

                 const actionToPut              = action
                 actionToPut.type               = action.type+"_SUCCESS"
                 actionToPut.data_to_state      = retApi.data_to_state;
                 actionToPut.work_data_ready    = true;
                 actionToPut.status             = 'SUCCESS'

                console.log("=== actionToPut + SELECT_WORK_DATA ")
                console.log(actionToPut)

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

export function* watchF_CALL_level_1(params) {

  console.log("=== watchF_CALL_level_1 " + "SELECT_WORK_DATA")
  console.log(params)

  yield  (takeLatest('SELECT_WORK_DATA', watchF_CALL_level_2_code));

}

export default function* () {

    console.log(" ")
    console.log(" ")
    console.log(" ")

    console.log( "=== FILE watchF_CALL_level_1" + "SELECT_WORK_DATA")

  // console.log( action )

  yield call(watchF_CALL_level_1, {p_params:'here params_of_watchF_CALL_level_1'})

}