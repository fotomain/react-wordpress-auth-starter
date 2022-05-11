import React, {Component} from 'react'

// yarn  install; yarn start

// ionic build --prod; ionic cap sync --prod; ionic serve
// ionic build --prod; ionic cap sync --prod;
// ionic serve

// yarn remove '@material'
// yarn remove '@material-ui'

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

    doApi(e) {

        const url_root="https://antinedoebit.com"


        const config1 = {
            client: {
                id: 'eSBIMiKRFzqHPtRryIyzXxMAdV8Mee13zvtndeYa',
                secret: 'wYsUiKr9WWe1LYf2Wv3d78j7HWJS1BIBJabNLDzL'
            },
            auth: {
                tokenHost: 'https://antinedoebit.com'
            }
        };



        const doCall = async () => {

            console.log(111)

            const root1 = 'https://antinedoebit.com'

             try {
                 console.log(222)
                 //=== https://wp-oauth.com/docs/general/grant-types/?utm_source=plugin-admin&utm_medium=settings-page
                 const ret1 = await  fetch(
                     {  input:root1+'/authorize',
                                data:
                                {
                                    client_id:'eSBIMiKRFzqHPtRryIyzXxMAdV8Mee13zvtndeYa',
                                    client_secret:'wYsUiKr9WWe1LYf2Wv3d78j7HWJS1BIBJabNLDzL',
                                }
                         }
                     );
                 console.log(ret1)
             } catch (error) {
                 console.log('ret1 error', error.message);
             }

        }

        doCall()

    }

    onChange_textarea1 = (event) => {}

    render() {

        return (
            <div>
            <div>class App</div>

                <Button onClick={(e)=>this.doApi(e)} variant={`contained`}>DO API</Button>

            </div>

        )
    }
}

export default App;

