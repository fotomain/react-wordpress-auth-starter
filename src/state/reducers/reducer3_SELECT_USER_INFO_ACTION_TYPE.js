import initialState from './initial_state';
import {


    SELECT_USER_INFO_ACTION_TYPE,
    IS_LOADING,
    SELECT_USER_CONNECTION_TYPE,
    INSERT_NEW_USER_IN_DB_TYPE,
    REDUCER_SET_USER_DATA,
    REDUCER_SET_USER_CONNECTION,

} from '../actions_types';



 export default (state = initialState, action) => {
  const debug1 = 0;
  console.log(" ")
  console.log(" ")
  console.log(" ")
  console.log("=== FILE REDUCER reducer3_SELECT_USER_INFO_ACTION_TYPE    "+Date.now())

     console.log("=== action + ")
     console.log(action.type)
     console.log(action)
     console.log("=== action - ")

  if (debug1==1) {
    console.log(Date.now())

  }


     //==================================
     //================================== REDUCER_SET_USER_CONNECTION
     //==================================

     if( REDUCER_SET_USER_CONNECTION  == action.type ){

         console.log( "=== REDUCER REDUCER_SET_USER_CONNECTION")
         console.log(action)
         console.log(action.user_params)
         const tFrom = action.user_params


         const ret = {
             ...state,
             ['user_connection_guid']: tFrom.user_connection_guid,
             ['user_connection_guid_actual_from_server']: tFrom.user_connection_guid,
         }

         // console.log("=== user_connection_guid")
         // console.log(tFrom.user_connection_guid)
         // var tArr = JSON.parse(localStorage.getItem("App888_USER_INFO"))
         // tArr.user_connection_guid = tFrom.user_connection_guid;
         // localStorage.setItem("App888_USER_INFO", JSON.stringify(tArr))

         return ret
     }

     //==================================
     //================================== REDUCER_SET_USER_DATA
     //==================================

     if( REDUCER_SET_USER_DATA == action.type ){

         console.log( "=== REDUCER REDUCER_SET_USER_DATA")
         console.log(action)
         console.log(action.user_params)
         const tFrom = action.user_params

         const ret = {
             ...state,
             ['user_guid']: tFrom.user_guid,
             ['user_email']: tFrom.user_email,
             ['user_description']: tFrom.user_description,
             ['user_was_found_in_db']: true,
             ['user_connection_guid']: tFrom.user_connection_guid,
             ['user_connection_guid_actual_from_server']: tFrom.user_connection_guid,
         }

         localStorage.setItem("App888_USER_INFO",JSON.stringify( tFrom ));

         return ret
     }


     //==================================
     //================================== INSERT_NEW_USER_IN_DB_TYPE
     //==================================

     if(INSERT_NEW_USER_IN_DB_TYPE+"_NODATA" == action.type ) {

         const ret = {
             ...state,
             ['user_guid']: "no data of guid " + Date.now(),

         }

         return ret;

     }

     if(INSERT_NEW_USER_IN_DB_TYPE == action.type && "STARTED" == action.status) {

         const ret = {
             ...state,
             ['user_guid']: IS_LOADING,
         }

         return ret;

     }

     if(INSERT_NEW_USER_IN_DB_TYPE+"_SUCCESS" == action.type ){

         console.log( "=== REDUCER INSERT_NEW_USER_IN_DB_TYPE")
         console.log(action)
         console.log(action.user_params)

         const ret = {
             ...state,
             ['user_guid']: action.user_guid,
             ['user_email']: action.user_email,
             ['user_description']: action.user_description,
             // ['user_main_device']: action.user_main_device,
             ['user_was_found_in_db']: true,
             ['user_connection_guid']: action.user_connection_guid,
             ['user_connection_guid_actual_from_server']: action.user_connection_guid,
         }

         localStorage.setItem("App888_USER_INFO",JSON.stringify( action ));

         console.log("=== user_connection_guid")
         console.log(action.user_connection_guid)

         return ret
     }



     //==================================
     //================================== SELECT_USER_CONNECTION_TYPE
     //==================================

     if(SELECT_USER_CONNECTION_TYPE+"_NODATA" == action.type ) {

         const ret = {
             ...state,
             ['user_connection_guid']: "no data of guid " + Date.now(),

         }

         return ret;

     }

     if(SELECT_USER_CONNECTION_TYPE == action.type && "STARTED" == action.status) {

         const ret = {
             ...state,
             ['user_connection_guid']: IS_LOADING,
         }

         return ret;

     }

     if(SELECT_USER_CONNECTION_TYPE+"_SUCCESS" == action.type ){

         console.log( "=== REDUCER SELECT_USER_CONNECTION_TYPE_SUCCESS")
         console.log(action)
         console.log(action.user_params)


         const ret = {
             ...state,
             ['user_connection_guid']: action.user_connection_guid,
             ['user_connection_guid_actual_from_server']: action.user_connection_guid,
         }

         console.log("=== user_connection_guid")
         console.log(action.user_connection_guid)
         var tArr = JSON.parse(localStorage.getItem("App888_USER_INFO"))
         tArr.user_connection_guid = action.user_connection_guid;
         localStorage.setItem("App888_USER_INFO", JSON.stringify(tArr))

         return ret
     }

     //==================================
     //================================== SELECT_USER_INFO_ACTION_TYPE
     //==================================


     if(SELECT_USER_INFO_ACTION_TYPE+"_NODATA" == action.type ) {

         const ret = {
             ...state,
             ['user_guid']: "no data of guid " + Date.now(),
             ['user_description']: "no data of description "  + Date.now(),
             ['user_was_found_in_db']: false,
         }

         return ret;

     }

     if(SELECT_USER_INFO_ACTION_TYPE == action.type && "STARTED" == action.status) {

         const ret = {
             ...state,
             ['user_guid']: IS_LOADING,
             ['user_description']: IS_LOADING,
             ['user_was_found_in_db']: false,
         }

         return ret;

     }

     if(SELECT_USER_INFO_ACTION_TYPE+"_SUCCESS" == action.type ){

         console.log( "=== REDUCER SELECT_USER_INFO_ACTION_TYPE_SUCCESS")
         console.log(action)
         console.log(action.user_params)


         const ret = {
             ...state,
             ['user_guid']: action.user_guid,
             ['user_email']: action.user_email,
             ['user_description']: action.user_description,
             // ['user_main_device']: action.user_main_device,
             ['user_was_found_in_db']: action.user_was_found_in_db,
         }

         console.log("=== user_was_found_in_db")
         console.log(action.user_was_found_in_db)

         return ret
     }

   return state;

}