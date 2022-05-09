import mockProducts from './products.mock';
import FormData1 from 'form-data';

const dbApi_Object = {


    async Insert_new_user_into_db({action_to_api}) {

        console.log("=== action_to_api Insert_new_user_into_db ")
        console.log(action_to_api)

        const form = new FormData1();
        // SELECT UUID() AS uuid
        // INSERT INTO `cms_wp_cat_users`(`user_guid`, `email`, `user_connection_guid`) VALUES (UUID(),CONCAT('empty',CONVERT(UUID(), CHAR(32) )),UUID())
        form.append('app_token', "165a16f84351861f#@$%&^$%$!@d681fds165189");
        form.append('p_dd_user_email', action_to_api.user_params.user_email);


        const ret_fetch = await fetch('http://site33.komuvsenado.com/myphp/page_insert_user.php?p1=2',

            { method: "POST", body:form }
        ).then(res => res.text())
            .then(text => {
                console.log("=== fetch_command OK!  Insert_new_user_into_db")
                console.log(text)

                var response_arr = JSON.parse(text)
                console.log(response_arr['rows'])
                console.log("=== sql")
                console.log(response_arr['sql'])

                const response0 =  {
                    rows:response_arr['rows'],
                    ret_code:'OK'
                }

                return response0;

            })
            .catch(text => {
                console.log("=== fetch_command error Insert_new_user_into_db")
                console.log(text)
                const response0 =  {
                    rows:null,
                    ret_code:'ERR',
                    error_text:text,
                }
                return response0
            });

        return ret_fetch

    },

    async Select_fetch_user_connection({action_to_api}) {

        const form = new FormData1();
        // UPDATE `cms_wp_cat_users` SET `user_connection_guid`= uuid() WHERE  `email` = 'user01@gmail.com'
        form.append('app_token', "165a16f84351861f#@$%&^$%$!@d681fds165189");
        form.append('p_dd_user_email', action_to_api.user_params.user_email);


        console.log("=== action_to_api Select_fetch_user_connection ")
        console.log(action_to_api)

        const ret_fetch = await fetch('http://site33.komuvsenado.com/myphp/page_select_user_connection.php?p1=2',

            { method: "POST", body:form }
        ).then(res => res.text())
            .then(text => {
                console.log("=== fetch_command OK!  Select_fetch_user_connection")
                console.log(text)

                var response_arr = JSON.parse(text)
                console.log(response_arr['rows'])
                console.log("=== sql")
                console.log(response_arr['sql'])

                const response0 =  {
                    rows:response_arr['rows'],
                    ret_code:'OK'
                }

                return response0


            })
            .catch(text => {
                console.log("=== fetch_command error Select_fetch_user_connection")
                console.log(text)
                const response0 =  {
                    rows:null,
                    ret_code:'ERR',
                    error_text:text,
                }
                return response0
            });

        return ret_fetch

    },
   async Select_fetch_work_data({action_to_api}) {

        const form = new FormData1();
        // UPDATE `cms_wp_cat_users` SET `user_connection_guid`= uuid() WHERE  `email` = 'user01@gmail.com'
        form.append('app_token', "165a16f84351861f#@$%&^$%$!@d681fds165189");
        // form.append('p_dd_user_email', action_to_api.user_params.user_email);


        console.log("=== action_to_api Select_fetch_work_data ")
        console.log(action_to_api)

        const ret_fetch = await fetch('http://site33.komuvsenado.com/myphp/page_select_work_data.php?p1=2',

            { method: "POST", body:form }
        ).then(res => res.text())
            .then(text => {
                console.log("=== fetch_command OK!  Select_fetch_work_data")
                console.log(text)

                var response_arr = JSON.parse(text)
                console.log(response_arr['rows'])
                console.log("=== sql")
                console.log(response_arr['sql'])

                const tData = (response_arr['rows']);


                var data_to_state = []
                for (let i = 0; i < tData.length;  i++) {
                    data_to_state[i]={name_in_state:tData[i].data_name,
                        data_in_state: JSON.parse(tData[i].final_data) }
                }


                const response0 =  {
                    // rows:response_arr['rows'],
                    data_to_state:data_to_state,
                    ret_code:'OK'
                }

                console.log("=== response0")
                console.log(response0)

                return response0


            })
            .catch(text => {
                console.log("=== fetch_command error Select_fetch_user_connection")
                console.log(text)
                const response0 =  {
                    rows:null,
                    ret_code:'ERR',
                    error_text:text,
                }
                return response0
            });

        return ret_fetch

    },


    async Select_fetch_user_info({action_to_api}) {

        const form = new FormData1();
        form.append('app_token', "165a16f84351861f#@$%&^$%$!@d681fds165189");
        form.append('p_dd_user_email', action_to_api.user_params.user_email);
        form.append('p_dd_user_token', action_to_api.user_params.user_token);
        // form.append('p_dd_main_device', action_to_api.user_params.main_device);

        console.log("=== start await REST Select_fetch_user_info " + action_to_api )
        console.log("=== action_to_api")
        console.log(action_to_api)

        const ret_fetch = await fetch('http://site33.komuvsenado.com/myphp/page_select_user_info.php?p1=2',

            { method: "POST", body:form }
        ).then(res => res.text())
            .then(text => {
                console.log("=== fetch_command OK!  Select_fetch_user_info")
                console.log(text)
                //
                // console.log(typeof text)
                var response_arr = JSON.parse(text)
                console.log("=== response_arr")
                console.log(response_arr)
                console.log(response_arr['rows'])
                console.log("=== sql1")
                console.log(response_arr['sql1'])

                const response0 =  {
                    rows:response_arr['rows'],
                    ret_code:(0 == response_arr['rows'].length)?'EMPTY':'OK'
                }

                return response0

                // TODO COMPLEX STORE ???

            })
            .catch(text => {
                console.log("=== fetch_command error Select_fetch_user_info")
                console.log(text)
                const response0 =  {
                    rows:null,
                    ret_code:'ERR',
                    error_text:text,
                }
                return response0
            });

        return ret_fetch

    },

    async Update_fetch({action_to_api,p_params_to_api}) {

      console.log("=== Update_fetch p_params_to_api ")
      console.log(p_params_to_api)

      const p_dd = p_params_to_api.p_to_saga_p_dd

      if(!p_dd?.p_dd_table_name){ return {error: 'Update_fetch 101 - undefined - p_dd_table_name' }}

      const form = new FormData1();
      form.append('app_token', "165a16f84351861f#@$%&^$%$!@d681fds165189");
      form.append("p_dd_table_name", p_dd.p_dd_table_name);
      form.append("p_dd_guid_field_name",   p_dd.p_dd_guid_field_name);
      form.append("p_dd_guid_field_value",  p_dd.p_dd_guid_field_value);
      form.append("p_dd_table_field_name",  p_dd.p_dd_table_field_name);
      form.append("p_dd_table_field_value", p_dd.p_dd_table_field_value);

      await fetch('http://site33.komuvsenado.com/myphp/page_update.php?p1=2',
        { method: "POST", body:form }
      ).then(res => res.text())
        .then(text => {
          console.log("=== UpdsateSelf OK!")
          console.log(text)
          return {
            error:0,
            sql:text
          }
        })
        .catch(text => {
          console.log("=== UpdsateSelf error")
          console.log(text)
        });



    },

    async Select_fetch({action_to_api}) {

    const form = new FormData1();
    form.append('app_token', "165a16f84351861f#@$%&^$%$!@d681fds165189");

    form.append('p_whatToSelect', action_to_api.md_obj_name );
    console.log('p_dd_guidkey_name = ' + action_to_api.guidkey);
    form.append('p_dd_guidkey_name', action_to_api.guidkey);

    console.log("=== start await REST fetch " + action_to_api.md_obj_name )

    const ret_fetch = await fetch('http://site33.komuvsenado.com/myphp/page_select.php?p1=2',
      { method: "POST", body:form }
    ).then(res => res.text())
      .then(text => {
        console.log("=== fetch_command OK!")
        // console.log(text)
        //
        // console.log(typeof text)
        var response_arr = JSON.parse(text)
        console.log(response_arr['rows'])
        console.log("=== sql")
        console.log(response_arr['sql'])
        return response_arr['rows']
        // TODO COMPLEX STORE ???

      })
      .catch(text => {
        console.log("=== fetch_command error")
        console.log(text)
      });

    return ret_fetch

  },


}

export default dbApi_Object