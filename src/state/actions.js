import {

  FETCH_PRODUCTS_FAILURE,
  SELECT_USER_INFO_ACTION_TYPE,
  SELECT_USER_CONNECTION_TYPE,
  INSERT_NEW_USER_IN_DB_TYPE,

  REDUCER_SET_USER_DATA,
  REDUCER_SET_USER_CONNECTION,

  SELECT_WORK_DATA,

} from './actions_types';



// TODO
export const fetchProductsFailure = (error) => ({
  type: FETCH_PRODUCTS_FAILURE,
  error,
});

export const selectUserInfo_ActionFunction = ({p_user_params}) => ({
  type: SELECT_USER_INFO_ACTION_TYPE,
  status: 'STARTED',
  user_params:p_user_params
});


export const selectUserConnection_ActionFunction = ({p_user_params}) => ({
  type: SELECT_USER_CONNECTION_TYPE,
  status: 'STARTED',
  user_params:p_user_params
});

export const insertNewUserInDB_ActionFunction = ({p_user_params}) => ({
  type: INSERT_NEW_USER_IN_DB_TYPE,
  status: 'STARTED',
  user_params:p_user_params
});

export const reducerSetUserData_ActionFunction = ({p_user_params}) => ({
  type: REDUCER_SET_USER_DATA,
  status: 'STARTED',
  user_params:p_user_params
});

export const reducerSetUserConnection_ActionFunction = ({p_user_params}) => ({
  type: REDUCER_SET_USER_CONNECTION,
  status: 'STARTED',
  user_params:p_user_params
});

export const select_Work_Data_ActionFunction = ({p_user_params}) => ({
  type: SELECT_WORK_DATA,
  status: 'STARTED',
  user_params:p_user_params
});


