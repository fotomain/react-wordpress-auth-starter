import React, {Component} from 'react'

import { Device } from '@capacitor/device';

class App extends React.Component {



    constructor(props) {
        super();

        this.divMainRef = React.createRef();

            this.state={
                MouseMove_pageX:0,
                MouseMove_pageY:0,
            }

    }



    componentDidMount() {
        console.log('=== componentDidMount'+Date.now())
        // period set
        // this.interval = setInterval(() => this.setState({ time: Date.now() }), 1000);
        Device.getInfo().then((DeviceInfo) => {
            console.log("=== DeviceInfo")
            console.log(DeviceInfo)
            this.setState(() => ({
                DeviceInfo_platform:DeviceInfo.platform,
                // DeviceInfo_platform:'notweb',
            }))
        })


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

    onTouchEnd_on_div = (event) => {

        if("web" == this.state.DeviceInfo_platform) {
            event.preventDefault()
        }

        console.log("=== onTouchEnd_on_div ")
        const parentWindow = this.divMainRef.current.ownerDocument.defaultView
        parentWindow.removeEventListener("touchmove", this.onToucheMove_div
            ,{ capture: true , passive:false}
        )

        this.setState(() => ({
            dragging: false,
        }))

    }
    onToucheMove_div = (event) => {

        if("web" == this.state.DeviceInfo_platform) {
            event.preventDefault()
        }

        console.log("=== onToucheMove_div ")
        // console.log(event)

        this.setState(() => ({
            MouseMove_pageX: event.targetTouches[0].pageX,
            MouseMove_pageY: event.targetTouches[0].pageY,
        }))

    }

    onMouseMove_div = (event) => {

        if("web" == this.state.DeviceInfo_platform) {
            event.preventDefault()
        }

        console.log("=== onMouseMove_div ")

        this.setState(() => ({
            MouseMove_pageX: event.pageX,
            MouseMove_pageY: event.pageY,
        }))

    }

    handleMoveFinish = (event) => {

        event.preventDefault()

        console.log("=== handleMoveFinish ")
        const parentWindow = this.divMainRef.current.ownerDocument.defaultView
        parentWindow.removeEventListener("mousemove", this.onMouseMove_div
            ,{ capture: true , passive:false}
        )

        this.setState(() => ({
            dragging: false,
        }))
    }

    handleMoveStart = (event) => {


        if("web" == this.state.DeviceInfo_platform) {
            event.preventDefault()
        }

        this.setState(() => ({
            dragging: true,
        }))

        console.log("=== handleMoveStart ")

        const parentWindow = this.divMainRef.current.ownerDocument.defaultView
        if("web" == this.state.DeviceInfo_platform) {
            parentWindow.addEventListener("mousemove", this.onMouseMove_div
                ,{ capture: true , passive:false}
            )

        }
        else {
            // parentWindow.addEventListener("mousemove", this.onMouseMove_div
            //     ,{ capture: true , passive:false}
            // )
            //
            parentWindow.addEventListener("touchmove", this.onToucheMove_div
                ,{ capture: true , passive:false}
            )
        }



    }

    // handleKeyDown = (event) => {
    //
    //     event.preventDefault()
    //
    //     this.setState(() => ({
    //         dragging: false
    //     }))
    //
    //     console.log("=== handleKeyDown ")
    // }

    render() {
        return (
            <div
                style={{
                    // touchAction: 'none',
                    // pointerEvents: 'none',
                }}

        >class App

                <div
                    ref={this.divMainRef}

                    style={{
                        // pointerEvents: 'none',
                        left:   this.state.MouseMove_pageX,
                        top:    this.state.MouseMove_pageY,
                        position:'absolute',
                        backgroundColor:'green'
                        ,width:'100px', height:'100px'
                        // ,touchAction: 'none'
                    }}


                    onTouchStart={this.handleMoveStart}

                    onTouchEnd={this.onTouchEnd_on_div}

                    onMouseDown    ={this.handleMoveStart}
                    onMouseUp      ={this.handleMoveFinish}
                    // onMouseDown    ={("web"==this.state.DeviceInfo_platform)?this.handleMoveStart:()=>{}}
                    // onMouseUp      ={("web"==this.state.DeviceInfo_platform)?this.handleMoveFinish:()=>{}}


                    // className="react-colorful__interactive"
                    // ref={container}
                    // onKeyDown={this.handleKeyDown}
                    tabIndex={0}
                    role="slider"
                >
                    <p>MOVE ME</p>
                </div>

                <br/>


                    <textarea
                        style={{
                            position:'relative',
                            left:   '20px',
                            top:    '300px',
                        }}
                        rows={10} cols={35}
                      value={JSON.stringify(this.state)}
                      onChange={()=>{}}
                    >

                    </textarea>

            </div>


        )
    }
}

export default App;
