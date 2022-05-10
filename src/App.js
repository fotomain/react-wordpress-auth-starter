import React, {Component} from 'react'

import {Button} from '@mui/material';

import api from 'wordpress-rest-api-oauth-1'

// ionic build --prod; ionic cap sync --prod; ionic serve
// ionic build --prod; ionic cap sync --prod;
// ionic serve

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

        const url_root="https://antinedoebit.com/"

        const demoApi = new api({
            url: url_root,
            credentials: {
                client: {
                    public: 'R8tP4BFYJrP7',
                    secret: 'xjHhUAhWqpndzjqDwQB9WdRdplxv9YnVbA98vSMc6pOnsa3n'
                }
            }
        })
        console.log(demoApi)
        demoApi.get( '/wp/v2/posts', { per_page: 10 } ).then( posts => {
            console.log( posts )
        })

        demoApi.post( '/wp/v2/posts', {
            _method: "POST",
            title: '555 Test new post'
        } ).then( post => {
            console.log( post )
        })

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
