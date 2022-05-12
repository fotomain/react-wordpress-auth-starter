

//react-wordpress-woocommerce-rest-api-jwt-starter
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

import {
    process_JWT_PATH_TO_TOKEN,
    process_JWT_USERNAME,
    process_JWT_PASSWORD,
    process_URL_ROOT_APP,
    process_JWT_USERNAME_ADMIN,
    process_JWT_PASSWORD_ADMIN
} from './api_keys';

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
    }

    componentDidMount() {
        console.log('=== componentDidMount'+Date.now())

        //TODO PREFLY TO GET TOKEN !!!!!!!!!!!!!

        async function postData(url = '', data = {}) {

            let headers1 = {
                'Content-Type': 'application/json',

            }

            const response = await fetch(url, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: headers1,
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify(data) // body data type must match "Content-Type" header
            }).then(response => {
                console.log("=== response.json() books")
                console.log(response)
                return response
            }).catch(err=>{
                console.log("=== err books")
                console.log(err.message)
            });
            return response.json(); // parses JSON response into native JavaScript objects
        }


        const url_root = process_JWT_PATH_TO_TOKEN

        const data1 = {
            "username":process_JWT_USERNAME,
            "password":process_JWT_PASSWORD,
        }

        postData(url_root, data1)
            .then(data => {
                console.log("=== data " + url_root);
                console.log(data);
                console.log("=== TOKEN");
                console.log(data.token);

                this.headers1_with_bearer = {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + data.token
                }

                this.setState({
                    jwt_bearer:data.token,
                    done_TOKEN:true
                },()=>{})
            });


        const data1admin = {
            "username":process_JWT_USERNAME_ADMIN,
            "password":process_JWT_PASSWORD_ADMIN,
        }

        postData(url_root, data1admin)
            .then(data => {
                console.log("=== data admin " + url_root);
                console.log(data);
                console.log("=== TOKEN ADMIN");
                console.log(data.token);
                this.setState({jwt_bearer_admin:data.token})
            });

        this.setState ({done_TOKEN_ADMIN:true},()=>{})


        // process_JWT_USERNAME_ADMIN process_JWT_PASSWORD_ADMIN


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

        const url_root = process_URL_ROOT_APP+"/"

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


    crud_create_WooCommerce_User() {

        async function postData(url = '', data = {}, jwt_bearer) {

            let headers1 = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + jwt_bearer

            }

            const response = await fetch(url, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: headers1,
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify(data) // body data type must match "Content-Type" header
            });
            return response.json(); // parses JSON response into native JavaScript objects
        }

        const url_root = process_URL_ROOT_APP + "/wp-json/wp/v2/users"
        const data = {
            //=== https://developer.wordpress.org/rest-api/reference/users/#create-a-user
            username:'username111 ' + Date.now().toString(),
            password:'password111 ' + Date.now().toString(),
            name:'name111' + Date.now().toString(),
            nickname:'name111' + Date.now().toString(),
            slug:'name111' + Date.now().toString(),
            "first_name":   "John " + Date.now().toString(),
            "last_name":    "Doe",
            "email":        "john.doe@example.com",
            roles:['customer','subscriber','author'],
        }
        console.log("=== data user to insert")
        console.log(data)
        postData(url_root, data,

            this.state.jwt_bearer_admin
        )
            .then(data => {
                console.log("=== data " + url_root);
                console.log(data);
            });


    }

    doApi_WooCommerce_User(e) {
        this.crud_create_WooCommerce_User()
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

        const url_root = process_URL_ROOT_APP + "/wp-json/wc/v2/orders"

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
        },

            this.state.jwt_bearer
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


        const url_root = process_URL_ROOT_APP+"/wp-json/wc/v2/products"

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

        postData(url_root, data1, this.state.jwt_bearer)
            .then(data => {
                console.log("=== data " + url_root);
                console.log(data);
            });

        this.setState ({done_doApi_crud_create_PRODUCT_JWT_fetch_WooCommerce:true})

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

        const url_root = process_URL_ROOT_APP+"/wp-json/wp/v2/books"
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

        const url_root = process_URL_ROOT_APP+"/wp-json/wp/v2/books"

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
                <Button onClick={(e)=>this.doApi_WooCommerce_User(e)} variant={`contained`}>DO API</Button>

                <h5>{JSON.stringify(this.state)}</h5>

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
