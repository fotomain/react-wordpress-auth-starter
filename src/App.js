
import React, {Component} from 'react'

import axios from 'axios';

import WooCommerceAPI from "./WooCommerceRESTAPI";


//=== SNIPETS
// rcjc
// Ctrl+J and choose the relevant snippet
//=== DOC 12min https://www.youtube.com/watch?v=fFNXWinbgro
// yarn  install; yarn start
// it's it's aim aim aim

// ionic build --prod; ionic cap sync --prod; ionic serve
// ionic build --prod; ionic cap sync --prod;
// cd react-wordpress-auth-starter
// ionic build prod; ionic cap sync; ionic serve
// ionic serve

// yarn remove '@material'
// yarn remove '@material-ui'

import Books from './Books'

import {Button} from '@mui/material';

// const { ClientCredentials, ResourceOwnerPassword, AuthorizationCode } = require('simple-oauth2');

class App extends React.Component {
    constructor(props) {
        super();
    }

    componentDidMount() {
        console.log('=== componentDidMount'+Date.now())
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


    crud_create_WooCommerce_Product() {

        const url_root = "https://antinedoebit.com/"

        var api_WooCommerceAPI = new WooCommerceAPI({
            url: url_root,
            // consumerKey:    "8hBZ83mWd9pC",
            // consumerSecret: "RsDc0CMLDwnb2Qct59StQcO4N9cEEKBLbkC0FXo5NzsunzMP",
            consumerKey: "ck_3b027d8d4737ef55b5ecdff4f6421116c117120c",
            consumerSecret: "cs_eed62fa1661ab15d570cdbb2f0cf07bd9b85e129",
            wp_api: true,
            // version: 'v2',
            version: 'wc/v3',
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



    doApi_WooCommerce_Order(e) {
        this.crud_create_WooCommerce_Order()
    }

    crud_create_WooCommerce_Order() {

        async function postData(url = '', data = {}) {

            let headers1 = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvYW50aW5lZG9lYml0LmNvbSIsImlhdCI6MTY1MjE5MzY5NywibmJmIjoxNjUyMTkzNjk3LCJleHAiOjE2NTI3OTg0OTcsImRhdGEiOnsidXNlciI6eyJpZCI6IjIifX19.9HKUgbCaEdCpzJia6-FKHSaFA1-yBUlcGPKMWdZDrFY'
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

        const url_root="https://antinedoebit.com/wp-json/wc/v2/orders"
        postData(url_root, {
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
        })
            .then(data => {
                console.log("=== data orders");
                console.log(data);
            });


    }

    doApi_WooCommerce_Product(e) {

        console.log("=== data_json START")

        const data_json = this.crud_create_WooCommerce_Product();

        console.log(data_json)

        console.log("=== data_json FINISH")

    }

    doApi(e) {

        async function postData(url = '', data = {}) {

            let headers1 = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvYW50aW5lZG9lYml0LmNvbSIsImlhdCI6MTY1MjE5MzY5NywibmJmIjoxNjUyMTkzNjk3LCJleHAiOjE2NTI3OTg0OTcsImRhdGEiOnsidXNlciI6eyJpZCI6IjIifX19.9HKUgbCaEdCpzJia6-FKHSaFA1-yBUlcGPKMWdZDrFY'
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

        const url_root="https://antinedoebit.com/wp-json/wp/v2/books"
        postData(url_root, {
            "title":"book 333 " + Date.now().toString(),
            "content":"content 333",
            "status":"publish"
        })
            .then(data => {
                console.log("=== data");
                console.log(data);
            });



    }

    doApi_axios(e) {

        const url_root="https://antinedoebit.com/wp-json/wp/v2/books"

        let headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvYW50aW5lZG9lYml0LmNvbSIsImlhdCI6MTY1MjE5MzY5NywibmJmIjoxNjUyMTkzNjk3LCJleHAiOjE2NTI3OTg0OTcsImRhdGEiOnsidXNlciI6eyJpZCI6IjIifX19.9HKUgbCaEdCpzJia6-FKHSaFA1-yBUlcGPKMWdZDrFY'
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

                <Books/>

                <h3>Add Book</h3>
                <Button onClick={(e)=>this.doApi(e)} variant={`contained`}>DO API</Button>
                <h3>Add Product</h3>
                <Button onClick={(e)=>this.doApi_WooCommerce_Product(e)} variant={`contained`}>DO API</Button>
                <h3>Add Order</h3>
                <Button onClick={(e)=>this.doApi_WooCommerce_Order(e)} variant={`contained`}>DO API</Button>

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
