
// REACT MAKE SEPARATE FILE FOR #10_SAGA1
import Saga1 from './sagas/saga1';
import Saga2 from './sagas/saga2';

import saga3_SELECT_USER_INFO_ACTION_TYPE from './sagas/saga3_SELECT_USER_INFO_ACTION_TYPE'
import saga5_SELECT_USER_CONNECTION_TYPE from './sagas/saga5_SELECT_USER_CONNECTION_TYPE'
import saga6_INSERT_NEW_USER_IN_DB_TYPE from './sagas/saga6_INSERT_NEW_USER_IN_DB_TYPE'
import saga7_SELECT_WORK_DATA from './sagas/saga7_SELECT_WORK_DATA'

import Saga_select_fetch from './sagas/select_fetch_saga';
import {SELECT_USER_CONNECTION_TYPE} from "./actions_types";

export default [

  Saga_select_fetch,
  // #10_SAGA1
  Saga1,
  // #10_SAGA2
  Saga2,
  saga3_SELECT_USER_INFO_ACTION_TYPE,
  saga5_SELECT_USER_CONNECTION_TYPE,
  saga6_INSERT_NEW_USER_IN_DB_TYPE,
  saga7_SELECT_WORK_DATA,

];