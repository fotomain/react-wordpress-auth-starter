import {

  put, fork, takeLatest, call } from 'redux-saga/effects';

import { fetchProductsFailure } from '../actions';
import dbApi_Object   from '../../state/api/select_fetch_api';

import {arrMD}        from "../../Md";


export function* watchF1_saga(action) {
  const debug1 = 1;
  console.log("=== FILE sagas.js"+Date.now())
  if (debug1===1){
    console.log("=== action " + action.prop_name)
    console.log(action)

    //// === async test !!! localStorage.clear()
    // for (let index = 0; index <1000; index++) {
      // console.log("=== action " + action.prop_name + index.toString())
      // localStorage.setItem("=== action " + action.prop_name + index.toString(), Date.now())
    // }
  }

  try {

    // _STEP_SAGA_PERFORM
    // FETCH DATA FROM WITHIN SAGA
    const retApi = yield call(dbApi_Object.Select_fetch, {action_to_api:action});
    //works !!! const products = (mockProducts);
    console.log("=== const retApi = ")
    console.log(retApi)
    const actionToPut             = action
    actionToPut.type              = action.type+'_SUCCESS'
    actionToPut.status            = 'SUCCESS'
    // actionToPut.prop_name         = action.prop_name
    //_STEP action.prop_name FROM API DB
    actionToPut[action.prop_name] = retApi

    console.log('=== actionToPut')
    console.log(actionToPut)
    console.log(action.type+'_SUCCESS')
    yield put(

      actionToPut

    );
  } catch(error) {
    console.log("=== catch(error)")
    console.log(error)
    // TODO
    yield put(fetchProductsFailure(error));
  }
}


export function* watchF1(params) {

  console.log("=== watchF1")
  console.log(params)

  yield  (takeLatest(params.action_name, watchF1_saga));

}

export default function* () {

  console.log( "=== SAGA export default function* ")
  // console.log(action)

  for (const el1 of arrMD) {
    // _STEP_b REGISTER REACTION AFTER "REGISTER ACTION FOR CAGA"
    let tType =  el1.v2+"_"+el1.v3
    console.log("=== tType")
    console.log(tType)

    yield fork(watchF1, {action_name:tType} )

    // yield fork(()=>takeLatest(tType, watchF1_saga))
    // takeLatest
  }

  // yield call(takeLatest('FETCH_FROM_DB_cat_projects', watchF1_saga))

  // TODO
  //// ===works aSync
  // yield fork(()=>(takeLatest('FETCH_FROM_DB_cat_products', watchF1_saga)))
  // yield fork(()=>(takeLatest('FETCH_FROM_DB_cat_projects', watchF1_saga)))
  // yield fork(()=>(takeLatest('FETCH_FROM_DB_cat_project_tasks', watchF1_saga)))

  //// ===works aSync
  // yield fork(watchF1, {action_name:'FETCH_FROM_DB_cat_products'} )
  // yield fork(watchF1, {action_name:'FETCH_FROM_DB_cat_projects'} )
  // yield fork(watchF1, {action_name:'FETCH_FROM_DB_cat_project_tasks'} )
  // yield fork(watchF1, {action_name:'FETCH_FROM_DB_cat_project_task_actions'} )
  // // yield fork(watchF2)
  // yield fork(watchF3)

  //// ===works Sync
  // yield all([
  //   fork ( watchF1 ),
  //   fork ( watchF2 ),
  //   fork ( watchF3 ),
  // ]);

  // yield all([
  //   call ( watchF1 ),
  //   call ( watchF2 ),
  //   call ( watchF3 ),
  // ]);


}