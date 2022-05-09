import { combineReducers } from 'redux';
import select_fetch_reducer from './reducers/select_fetch_reducer';
import reducer3_SELECT_USER_INFO_ACTION_TYPE from './reducers/reducer3_SELECT_USER_INFO_ACTION_TYPE';
import reducer7_SELECT_WORK_DATA from './reducers/reducer7_SELECT_WORK_DATA';

function f_RedusersAll() {

  console.log("=== FILE RedusersAll "+Date.now())


  const AllRedusersObject = {
    // cool
    ['cat1']:   select_fetch_reducer,
    ['user1']:  reducer3_SELECT_USER_INFO_ACTION_TYPE,
    ['work_data1']:  reducer7_SELECT_WORK_DATA,

  }

  const debug1 = 0;
  if (debug1===1) {
    console.log("=== f_RedusersAll")
    console.log(AllRedusersObject)
  }

  return combineReducers( AllRedusersObject );

}
export default f_RedusersAll;