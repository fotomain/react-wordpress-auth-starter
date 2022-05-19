

// yarn start

//react-wordpress-woocommerce-rest-api-jwt-oauth-starter
//WORDPRESS JWT SERVER = JWT Authentication for WP REST API
//                       By Enrique Chavez
//cool DOC from: https://www.youtube.com/watch?v=fFNXWinbgro
//===================================================
//=============== HOW TO RUN THIS PROJECT ===========
//===================================================
// make the file with your keys './api_keys' near App.js
// export const process_JWT_PATH_TO_TOKEN  = 'https://ddddddddddddddddddd';
// export const process_JWT_USERNAME       = 'ddddddd';
// export const process_JWT_PASSWORD       = 'dddddddddd';
// export const process_JWT_USERNAME_ADMIN
// export const process_JWT_PASSWORD_ADMIN

// yarn  install
// ionic build prod; ionic cap sync; ionic serve

import React, {Component} from 'react'

import axios from 'axios';

import WooCommerceAPI from "./WooCommerceRESTAPI"; // NOT WORK PARALLEL JWT IN hostinger.com

// import fs from 'fs'

import {
    process_JWT_PATH_TO_TOKEN,
    process_JWT_USERNAME,
    process_JWT_PASSWORD,
    process_URL_ROOT_API_WP,
    process_JWT_USERNAME_ADMIN,
    process_JWT_PASSWORD_ADMIN
} from './api_keys';

import Book2Display from './Book2Display'
// yarn  install; yarn start
// ionic build prod; ionic cap sync; ionic serve

// ionic build --prod; ionic cap sync --prod; ionic serve
// ionic build --prod; ionic cap sync --prod;
// cd react-wordpress-auth-starter
// ionic serve


import Books from './Books'

import {Button} from '@mui/material';

// const { ClientCredentials, ResourceOwnerPassword, AuthorizationCode } = require('simple-oauth2');

class App extends React.Component {
    constructor(props) {
        super();
        this.state = {
            mode_book_is_ready:false,
            mode_degug_log:false,
        }
    }

    headers1_base = {
        'Content-Type': 'application/json',
    }

    async componentDidMount() {
        console.log('=== componentDidMount'+Date.now())

        const data1 = {
            //=== https://github.com/woocommerce/woocommerce/wiki/Getting-started-with-the-REST-API
            _method: "POST",
            "username":process_JWT_USERNAME,
            "password":process_JWT_PASSWORD,
        }

        const url_root = process_JWT_PATH_TO_TOKEN

        const ret1 = await this.postData1(this.fetch_main, this.headers1_base, url_root, data1)
            .then(data => {
                console.log("=== data " + url_root);
                console.log(data);

                this.setState({
                    jwt_bearer:data.token,
                    done_TOKEN:true,
                },()=>{})

                const t_headers1_with_bearer = {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + data.token
                }
                return t_headers1_with_bearer;

            }).catch(err=>{
                console.log("=== err  " + url_root)
                console.log(err.message)
            });

        this.headers1_with_bearer = ret1;
        console.log("=== this.headers1_with_bearer")
        console.log(this.headers1_with_bearer)

        const data1admin = {
            _method: "POST",
            "username":process_JWT_USERNAME_ADMIN,
            "password":process_JWT_PASSWORD_ADMIN,
        }

        const ret2 = await  this.postData1(this.fetch_main, this.headers1_with_bearer, url_root, data1admin)
            .then(data => {
                    console.log("=== data admin " + url_root);
                    console.log(data);
                    console.log("=== TOKEN ADMIN");
                    console.log(data.token);
                this.setState({
                    jwt_bearer_admin:data.token,
                    done_TOKEN_ADMIN:true
                },()=>{})

                const t_headers1_with_bearer_admin = {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + data.token
                }
                return t_headers1_with_bearer_admin;

            });

        this.headers1_with_bearer_admin = ret2;
        console.log("=== this.headers1_with_bearer_admin")
        console.log(this.headers1_with_bearer_admin)

        // period set
        // this.interval = setInterval(() => this.setState({ time: Date.now() }), 1000);

    }
    componentDidUpdate(prevProps, prevState, snapshot, timer) {
        // console.log('=== componentDidUpdate Home' + Date.now())
        // console.log(this.props)
    }
    componentWillUnmount() {
        // console.log('=== componentWillUnmount Home'+Date.now())
        // period clear
        // clearInterval(this.interval);

    }



    crud_create_WooCommerce_Product_AUTH1() {

        const url_root = process_URL_ROOT_API_WP + "/"

        var api_WooCommerceAPI = new WooCommerceAPI({
            url: url_root,
            // consumerKey:    "8hBZ83mWd9pC",
            // consumerSecret: "RsDc0CMLDwnb2Qct59StQcO4N9cEEKBLbkC0FXo5NzsunzMP",
            consumerKey: "ck_3b027d8d4737ef55b5ecdff4f6421116c117120c",
            consumerSecret: "cs_eed62fa1661ab15d570cdbb2f0cf07bd9b85e129",
            wp_api: true,
            // version: 'v2',
            version: 'wc/v2',
            queryStringAuth: true
        });


        const data = {
            //=== https://github.com/woocommerce/woocommerce/wiki/Getting-started-with-the-REST-API
            _method: "POST",
            //Strong!
            sku: Date.now().toString(),
            // ,
            name: "555 Premium Quality " + Date.now().toString(),
            type: "simple",
            slug: "prod555",
            regular_price: "21.99",
            description: "Pellentesque habitant morbi tristique senectus",
            short_description: "Pellentesque habitant morbi ",
        }

        const ret1 = api_WooCommerceAPI.post("products", data)

        console.log("=== products ret1 ")
        console.log(ret1)
        return ret1;

    }


    crud_create_WordPress_User() {

        const url_root = process_URL_ROOT_API_WP + "/wp-json/wp/v2/users"

        const data1 = {
            //=== https://developer.wordpress.org/rest-api/reference/users/#create-a-user
            username:'username111 ' + Date.now().toString(),
            password:'password111 ' + Date.now().toString(),
            name:'name111' + Date.now().toString(),
            nickname:'name111' + Date.now().toString(),
            slug:'name111' + Date.now().toString(),
            "first_name":   "John " + Date.now().toString(),
            "last_name":    "Doe",
            "email":        "john11.doe@example.com",
            roles:['customer','subscriber','author'],
        }


        this.postData1(this.fetch_main, this.headers1_with_bearer_admin, url_root, data1 )
            .then(data => {
                console.log("=== data " + url_root);
                console.log(data);
            })
            .then(data => {
                console.log("=== data " + url_root);
                console.log(data);
            });


    }

    onClick_crud_create_WordPress_User(e) {
        this.crud_create_WordPress_User()
    }

    doApi_WooCommerce_Order(e) {
        this.crud_create_WooCommerce_Order()
    }

    fetch_main({url, data, headers}){
        return fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: headers,
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        })
    }


    async postData1(f_fetch, headers1, url = '', data = {}) {
        const response = await f_fetch({url:url,data:data,headers:headers1});
        return response.json(); // parses JSON response into native JavaScript objects
    }

    crud_create_WooCommerce_Order() {

        const url_root = process_URL_ROOT_API_WP + "/wp-json/wc/v2/orders"

        this.postData1(this.fetch_main, this.headers1_with_bearer, url_root, {
                "billing": {
                    "first_name": "John " + Date.now().toString(),
                    "last_name": "Doe",
                    "email": "john.doe@example.com",
                    "phone": "(555) 555-5555"
                },
                "line_items": [
                    {
                        "product_id": 11303,
                        "quantity": 2
                    }
                ]
            }
        )
            .then(data => {
                console.log("=== data " + url_root);
                console.log(data);
            });


    }

    doApi_WooCommerce_Product_JWT(e) {

    }

    doApi_WooCommerce_Product_AUTH1(e) {

        console.log("=== data_json START _AUTH1")

        const data_json = this.crud_create_WooCommerce_Product_AUTH1();

        console.log(data_json)

        console.log("=== data_json FINISH _AUTH1")

    }

    doApi_crud_create_PRODUCT_JWT_fetch_WooCommerce(e) {

        const data1 = {
            //=== https://github.com/woocommerce/woocommerce/wiki/Getting-started-with-the-REST-API
            _method: "POST",
            //Strong!
            sku: Date.now().toString(),
            // ,
            name: "555 Premium Quality " + Date.now().toString(),
            type: "simple",
            slug: "prod555",
            regular_price: "21.99",
            description: "Pellentesque habitant morbi tristique senectus",
            short_description: "Pellentesque habitant morbi ",
        }

        const url_root = process_URL_ROOT_API_WP + "/wp-json/wc/v2/products"

        this.postData1(this.fetch_main, this.headers1_with_bearer, url_root, data1)
            .then(data => {
                console.log("=== data " + url_root);
                console.log(data);
                this.setState ({done_doApi_crud_create_PRODUCT_JWT_fetch_WooCommerce:true})
            });

    }


    doApi_crud_create_book_JWT_fetch(e) {

        async function postData(url = '', data = {}, jwt_bearer) {

            let headers1 = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + jwt_bearer
            }

            const response = await this.fetch_main({url:url,data:data,headers:headers1})
                .then(response => {
                    console.log("=== response.json() books")
                    console.log(response)
                    return response
                }).catch(err=>{
                    console.log("=== err books")
                    console.log(err.message)
                });
            return response.json(); // parses JSON response into native JavaScript objects
        }

        const url_root = process_URL_ROOT_API_WP + "/wp-json/wp/v2/books"
        postData(url_root, {
                "title":"book 333 " + Date.now().toString(),
                "content":"content 333",
                "status":"publish"
            },
            this.state.jwt_bearer
        )
            .then(data => {
                console.log("=== data " + url_root);
                console.log(data);
            });

        this.setState ({done_doApi_crud_create_book_JWT_fetch:true})

    }

    doApi_books_axios(e) {

        const url_root = process_URL_ROOT_API_WP + "/wp-json/wp/v2/books"

        let headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.state.jwt_bearer
        }

        axios.post(url_root, {
                "title":"book 333 " + Date.now().toString(),
                "content":"content 333",
                "status":"publish"
            }
            , {headers: headers}).then(res=>{
            console.log("=== post axios")
            console.log(res)
        }).catch(err=>{
                console.log('=== post error', err.message);
                console.log(err)
            }
        )

    }

    uploadFilesMedia = async ({files, f_callback}) => {
        console.log("uploadFilesMedia file...");

        var responce=[]

        // const url_root = process_URL_ROOT_API_WP + "/wp-json/wp/v2/media/39"
        const url_root = process_URL_ROOT_API_WP + "/wp-json/wp/v2/media/"

             console.log("=== files")
             console.log(files)

              for (let i = 0; i < files.length; i++) {

                var image = files[i]
                // wp how to upload media with title'

                const fname1 = image.name

                // wp-config.php - define('ALLOW_UNFILTERED_UPLOADS', true);
                let headers_media = {
                  // 'Content-Type':'application/octet-stream',
                   'Content-Type':'image/png',

                  'Authorization': 'Bearer ' + this.state.jwt_bearer_admin,
                  'Content-Disposition' : "attachment; caption='cccc'; filename='media_"+Date.now().toString()+fname1+"'",
                }

                  let requestOptions = {

                    method: 'POST',
                    headers: headers_media,
                    body: image,
                    redirect: 'follow',

                  };

                  const res_media = await fetch(url_root, requestOptions)
                  .then(response => response.text())
                  .then(result => {
                    console.log("=== result OK")
                    // console.log(result)
                    return result;
                  })
                  .catch(error => {
                    console.log("=== result ERROR")
                    return error;
                  });

                  console.log("========= res_media ")
                  const media_data = JSON.parse(res_media)
                  console.log( media_data.id )
                  console.log( media_data.title )
                  responce.push(media_data)
              }
          return responce
    }


        uploadFiles = ({files, f_callback}) => {
        console.log("Uploading file...");
        for (let i = 0; i < files.length; i++) {

            // formData.append(files[i].name, files[i])

            var fileReader = new FileReader();

            var file1 = files[i]
            fileReader.onload = (function(f) {
                return function(e) {
                    // Here you can use `e.target.result` or `this.result`
                    // and `f.name`.

                    var text = e.target.result;
                    //do something with text
                    // !!! document.body.innerHTML = text;
                    console.log("============ f.name")
                    console.log(f.name)
                    // console.log(text)

                    // var arrfile_Lines = text.split('\n');
                    var arrfile_Lines = text.split(/(?<=[\n])/g);
                    // var arrfile_Lines = text.split(/(\r\n|\n|\r)/gm);

                    var file_Text = arrfile_Lines.join(' ');

                    console.log("========== replace start ")

                    file_Text = file_Text.replace(/(\r)/gm, "");
                    // file_Text = file_Text.replace(/(\r\n|\n|\r)/gm, "");
                    file_Text = file_Text.replace(" т. e. ", " т.e. ")
                    file_Text = file_Text.replace("--", "-")
                    file_Text = file_Text.replace("--", "-")
                    file_Text = file_Text.replace("  ", " ")
                    file_Text = file_Text.replace("   ", " ")
                    file_Text = file_Text.replace("    ", " ")
                    file_Text = file_Text.replace("     ", " ")
                    console.log("========== replace finish ")

                    //
                    // console.log(file_NoLineBreaks)


                    // var arrfile_NoLineBreaks = file_NoLineBreaks.split(/[.!?]+/);
                    var arrfile_Sentences = file_Text.split(/(?<=[.!?])/g);

                    var init1=0;
                    var init2=0;
                    var lexema_n=1;
                    var arr_lexemas=[]
                    arrfile_Sentences.reduce((tt,el,ii,aa)=>{

                            // console.log("==========")
                            // console.log(el)
                            // console.log("========== split" + ii)

                        var e1 = el.split(/(?=[\n .,:;!?])|(?<=[\n .,:;!?])/g);

                        e1.reduce((tt,ee,ii,aa)=>{

                            const tL = 'lexema_'+lexema_n++

                            if(-1!=ee.indexOf("\n")){
                                // console.log("\\n --- " + tL)
                            }

                            arr_lexemas.push({lexema_n:tL, lexema_text:ee});

                        },init2)

                        // e1 = e1.map(el2=>{return el2.replace(' ','')})

                        //split492
                        // e1 = e1.filter(el2=> {
                        //     if (el2 == '\r') {
                        //         return false
                        //     }
                        //     else
                        //         return true
                        // })

                        // if(this.state.mode_degug_log) {
                        //     console.log(e1)
                        // }

                    },init1)
                    // if(this.state.mode_degug_log) {
                        console.log("=== arr_lexemas")
                        console.log(arr_lexemas)
                    // }

                    // var res_text=''
                    // arr_lexemas.reduce((tt,ee,ii,aa)=>{
                    //     if(-1!=ee.lexema_text.indexOf("\n")){
                    //         // console.log()
                    //     }
                    // },init2)
                    // console.log("=== res_text")
                    // console.log(res_text)

                    f_callback({p_arr_lexemas:arr_lexemas})
                    // console.log(arrfile_NoLineBreaks)

                //    TODO CHECK -> (!) (?) IN TEXT

                };
            })(file1);

            fileReader.readAsText(file1);

        }
    }

    Filer2Media = async (e) => {
        console.log("=== Filer2Media")

        const loaded_media_array = await this.uploadFilesMedia({
            files: e.target.files,
        })

        console.log("=== loaded_media_array")
        console.log(loaded_media_array)

    }


    Filer1(e) {
        console.log("=== Filer1")

        this.uploadFiles(
            {
                files:e.target.files,
                f_callback:({p_arr_lexemas})=>{
                    this.setState( {
                    arr_lexemas:p_arr_lexemas,
                    mode_book_is_ready:true,
                    }
                )}
            }
        )



    }

    onChange_textarea1 = (event) => {}


        render() {

        return (

            <div>
                <div>class App</div>

                <Books stateParent = {this.state}/>

                <h3>Add Book</h3>
                <Button onClick={(e)=>this.doApi_crud_create_book_JWT_fetch(e)} variant={`contained`}>DO API</Button>
                <h3>Add Product</h3>
                <Button onClick={(e)=>this.doApi_crud_create_PRODUCT_JWT_fetch_WooCommerce(e)} variant={`contained`}>DO API</Button>
                <h3>Add Order</h3>
                <Button onClick={(e)=>this.doApi_WooCommerce_Order(e)} variant={`contained`}>DO API</Button>
                <br></br>
                <br></br>
                <h3>Add User</h3>
                <Button onClick={(e)=>this.onClick_crud_create_WordPress_User(e)} variant={`contained`}>DO API</Button>

                <br></br>
                <br></br>
                <Button
                    // style={{width: '30ch', height: '10ch'}}
                    variant="contained"
                    component="label"
                    onChange={(e)=>this.Filer1(e)}
                >
                    Upload File
                    <input

                        type="file"
                        accept=".doc,.docx,.txt"
                        multiple={true}
                        hidden

                    />
                </Button>

                <br></br>
                <br></br>
                <Button
                  style={{width: '30ch', height: '10ch'}}
                  variant="contained"
                  component="label"
                  onChange={(e)=>this.Filer2Media(e)}
                >
                    MEDIA
                    <input

                      type="file"
                      // accept=".doc,.docx,.txt"
                      multiple={true}
                      hidden

                    />
                </Button>


                {/*<h5>{JSON.stringify(this.state)}</h5>*/}

                {/*react dom add input programmatically from text*/}
                <div>
                    {(this.state.mode_book_is_ready)?<Book2Display arr_lexemas={this.state.arr_lexemas}/>:'Book is not Loaded!'}
                </div>


            </div>

        )
    }
}

export default App;

//     , () => {
//         console.log("=== call1")
//     }).then(res1=>{
//     console.log("=== return res1")
//     return res1;
// });

