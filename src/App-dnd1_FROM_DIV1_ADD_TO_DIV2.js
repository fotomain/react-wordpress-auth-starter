import React, {Component} from 'react'

import './main_dnd.css'

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

    allowDrop = (ev) => {
        ev.preventDefault();
    }
    drag = (ev) => {
        ev.dataTransfer.setData("text", ev.target.id);
    }

    drop = (ev) => {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        ev.target.appendChild(document.getElementById(data));
    }

    render() {



        return (
            <div>class App

                <div className="dropbox" onDrop={this.drop} onDragOver={this.allowDrop}>
                    dddddd
                    dddddd
                    dddddd
                    dddddd
                </div>

                <div id="box1" className="drag" draggable="true" onDragStart={this.drag}>box 1</div>

                <br/>



            </div>
        )
    }
}

export default App;
