import React, {Component} from 'react'

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

    onChange_textarea1 = (event) => {}



    render() {
        return (
            <div>class Book2Display</div>
        )
    }
}

export default App;
