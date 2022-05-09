import initialState from './initial_state';
import {

    // TODO REFACTOR SELECT_WORK_DATA - SELECT_WORK_DATA_ACTION_TYPE
    SELECT_WORK_DATA,
    SELECT_WORK_DATA_SUCCESS,
    SELECT_WORK_DATA_NODATA,
    IS_LOADING,


} from '../actions_types';



 export default (state = initialState, action) => {
  const debug1 = 0;
  console.log(" ")
  console.log(" ")
  console.log(" ")
  console.log("=== FILE REDUCER reducer7_SELECT_WORK_DATA.js    "+Date.now())

     console.log("=== action + ")
     console.log(action.type)
     console.log(action)
     console.log("=== action - ")

  if (debug1==1) {
    console.log(Date.now())

  }


     //==================================
     //================================== SELECT_WORK_DATA
     //==================================


     if(SELECT_WORK_DATA_NODATA == action.type ) {

         const ret = {
             ...state,
             ['work_projects']: false,
             ['work_project_tasks']: false,
             ['work_project_task_actions']: false,
             ['work_task_action_analytics_texts']: false,
             ['work_data_ready']: false,
         }

         return ret;

     }

     if(SELECT_WORK_DATA == action.type) {

         const ret = {
             ...state,
             ['work_projects']: IS_LOADING,
             ['work_project_tasks']: IS_LOADING,
             ['work_project_task_actions']: IS_LOADING,
             ['work_task_action_analytics_texts']: IS_LOADING,
             ['work_data_ready']: false,
         }

         return ret;

     }

     if(SELECT_WORK_DATA_SUCCESS == action.type){

         console.log( "=== REDUCER SELECT_WORK_DATA_SUCCESS")
         console.log(action)
         console.log(action.data_to_state)


         var ret = {
             ...state,
             ['work_data_ready']:true,
         }
         for ( let i = 0; i < action.data_to_state.length; i++) {

             ret[action.data_to_state[i].name_in_state] = action.data_to_state[i].data_in_state

         }

         console.log("=== SELECT_WORK_DATA_SUCCESS ret")
         console.log(ret)

         return ret
     }

   return state;

}