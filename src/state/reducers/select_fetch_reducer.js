import initialState from './initial_state';

import {

    FETCH_PRODUCTS_FAILURE,


} from '../actions_types';



 export default (state = initialState, action) => {
  const debug1 = 0;
  console.log(" ")
  console.log(" ")
  console.log(" ")
  console.log("=== FILE REDUCER select_fetch_reducer.js    "+Date.now())

     console.log("=== select_fetch_reducer + action")
     console.log(action.type)
     console.log(action)
     console.log("=== select_fetch_reducer - action")

  if (debug1==1) {
    console.log(Date.now())
  }

  if(
    "SUCCESS"!=action.status && action.functional_name==='FETCH_FROM_DB'
          ){

            return {
              ...state,
              //_STEP_STATE_isLoading
              isLoading: true,
            };

          }


     // #3_SAGA2 case reducer
   if("SAGA2_ACTION_SUCCESS" == action.type ){

       console.log( "REDUCER FINISH = SAGA2_ACTION_SUCCESS")
       const ret = {
           ...state,
           isLoading: false,
           ['user_guid']: action.user_guid.toString(),
           ['user_description']: action.user_description.toString(),
       }

       return ret
   }


   // #3_SAGA1 case reducer
   if("CALL_SAGA1_UPDATE_ON_DISPLAY" == action.functional_name ){
     console.log("=== CALL_SAGA1_UPDATE reducer")
     console.log(action)
     const tArr = action.p_saga.
                      p_to_saga.
                          p_to_saga_p_dd.
                                    p_dd_old_data['cat_projects_as_prop']
     //p_dd_guid_field_value
     // https://www.digitalocean.com/community/tutorials/js-filter-array-method
     const tfield_name = action.p_saga.
                  p_to_saga.
                    p_to_saga_p_dd.
                        p_dd_guid_field_name

     const tfield_value = action.p_saga.
                 p_to_saga.
                    p_to_saga_p_dd.
                        p_dd_guid_field_value

     // const tArrToChange = tArr.filter(function(item){
     //   console.log(item)
     //   console.log(tfield_name)
     //   console.log(tfield_value)
     //   return item[tfield_name] === tfield_value
     // })
     //
     // console.log(tArrToChange)

     const tfield_nameCgange = action.p_saga.
       p_to_saga.
       p_to_saga_p_dd.
       p_dd_table_field_name

     const tfield_valueCgange = action.p_saga.
       p_to_saga.
       p_to_saga_p_dd.
       p_dd_table_field_value

     console.log(tfield_name)
     console.log(tfield_value)
     console.log(tfield_nameCgange)
     console.log(tfield_valueCgange)

     // tArrToChange[0][tfield_nameCgange] = tfield_valueCgange
     //=== sch js array change elements with condition

     tArr.forEach(function (item) {

       if (item[tfield_name] === tfield_value){
         console.log("=== item ")
         console.log(item)
         item[tfield_nameCgange] = tfield_valueCgange
       }
     })

     console.log("=== tArr")
     console.log(tArr)

     console.log("=== state before")
     console.log(state)

     const ret = {
       ...state,
       isLoading: false,
       // [action.prop_name]: action[action.prop_name],
       ['projects']: tArr,
       // ['cat_projects_as_prop']: tArr,

     }

     console.log("=== state after")
     console.log(ret)

     return ret

   }

   if("SUCCESS"===action.status && "FETCH_FROM_DB" == action.functional_name ){
    console.log("=== reducer SUCCESS action ")
    console.log(action.prop_name)
    console.log(action)
    const ret = {
      ...state,
      // _STEP_STATE_SUCCESS
      // TODO
      isLoading: false,
      // _STEP state FROM action[prop_name]
      [action.prop_name]: action[action.prop_name],
    }

    return ret 

  }

  switch(action.type) {
    
    case FETCH_PRODUCTS_FAILURE:

      return {
        ...state,
        // TODO
        isLoading: false,
        error: action.error,
      };

    default:
      return state;
  }

   return state;

}