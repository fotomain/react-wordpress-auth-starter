import React, {Component} from 'react'

import { Device } from '@capacitor/device';

class Draggable extends React.Component {


    constructor(props) {
        super();

        this.divMainRef = React.createRef();

        this.canvasRef  = props.canvasRef
        this.canvasID   = props.canvasID

        this.state={
            MouseMove_pageX:0,
            MouseMove_pageY:0,
        }

        this.f_output   = props.f_output

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
                 Window_width:window.width,
                 // DeviceInfo_platform:'notweb',
            }))
        })


        console.log("=== this.canvasRef")
        console.log(this.canvasRef)

        var spectrumRect =  this.canvasRef.current.getBoundingClientRect()

        console.log("=== spectrumRect")
        console.log(spectrumRect)

        this.setState (() => ({
            // ...this.state,
            x0: spectrumRect.left,
            y0: spectrumRect.top,
            xMax: spectrumRect.left + spectrumRect.width,
            yMax: spectrumRect.top + spectrumRect.height,
        }))


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
        const parentWindow = this.canvasRef.current.ownerDocument.defaultView
        parentWindow.removeEventListener("touchmove", this.onToucheMove_div
            ,{ capture: true , passive:false}
        )

        this.setState(() => ({
            dragging: false,
        }))

        this.f_output({x:this.state.MouseMove_pageX + 'px',y:this.state.MouseMove_pageY + 'px', dragging: false})


    }

    calc_x1y1( px2, py2 ){

        var x0 = this.state.x0
        var y0 = this.state.y0

        var x2 = (px2<this.state.xMax)?px2:this.state.xMax - 20;
        var y2 = (py2<this.state.yMax)?py2:this.state.yMax - 20;

        var x1 = x2 - x0 - 10;
        x1 = (x1>0)?x1:0;
        var y1 = y2 - y0 - 10;
        y1 = (y1>0)?y1:0;

        console.log("=== x0,y0",x0,y0)
        console.log("=== x_,y_",x2,y2)
        console.log("=== xm,ym",this.state.xMax,this.state.yMax)
        console.log("=== x1,y1",x1,y1)

        return [x1 , y1]

    }

    onToucheMove_div = (event) => {

        if("web" == this.state.DeviceInfo_platform) {
            event.preventDefault()
        }

        console.log("=== onToucheMove_div ")
        // console.log(event)

        // var x0 = this.state.x0
        // var y0 = this.state.y0

        // let x1 = event.targetTouches[0].pageX - x0 -10;
        // let y1 = event.targetTouches[0].pageY - y0 -10;

        var  x1=0;
        var  y1=0;

        [ x1, y1 ] = this.calc_x1y1( event.targetTouches[0].pageX, event.targetTouches[0].pageY )

        this.f_output({x:x1 + 'px',y:y1 + 'px', dragging: this.state.dragging})

        this.setState(() => ({
            MouseMove_pageX: x1,
            MouseMove_pageY: y1 ,
        }))

    }

    onMouseMove_div = (event) => {
        if(!this.state.dragging) {
            return
        }
        console.log(" ")
        console.log(" ")
        console.log(" ")
        console.log("=== onMouseMove_div ")

        if("web" == this.state.DeviceInfo_platform) {
            event.preventDefault()
        }

        // var x0 = this.state.x0
        // var y0 = this.state.y0

        // let x1 = event.pageX - x0 -10
        // let y1 = event.pageY - y0 -10

        var  x1=0;
        var  y1=0;

        [ x1, y1 ] = this.calc_x1y1( event.pageX, event.pageY )


        this.f_output({x:x1 + 'px',y:y1 + 'px', dragging: this.state.dragging})

        this.setState(() => ({
            MouseMove_pageX: x1,
            MouseMove_pageY: y1,
        }))

    }



    handleMoveFinish = (event) => {

        event.preventDefault()

        console.log("=== handleMoveFinish ")
        const parentWindow = this.canvasRef.current.ownerDocument.defaultView
        parentWindow.removeEventListener("mousemove", this.onMouseMove_div
            ,{ capture: true , passive:false}
        )

        this.setState(() => ({
            dragging: false,
        }))

        this.f_output({x:this.state.MouseMove_pageX + 'px',y:this.state.MouseMove_pageY + 'px', dragging: false})

    }

    handleMoveStart = (event) => {

        console.log("=== handleMoveStart ")


        if("web" == this.state.DeviceInfo_platform) {
            event.preventDefault()
        }

        this.setState(() => ({
            dragging: true,
        }))


        const parentWindow = this.canvasRef.current.ownerDocument.defaultView
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

    onChange_textarea1 = (event) => {}

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
                        // left:   this.state.MouseMove_pageX,
                        // top:    this.state.MouseMove_pageY,
                        // position:'absolute',

                        // position:'relative',

                        // backgroundColor:'green'
                        // ,width:'100px', height:'100px'
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
                    {/*<p>MOVE ME</p>*/}
                    {this.props.children}
                </div>

                <br/>


                {/*<textarea*/}
                {/*    style={{*/}
                {/*        position:'relative',*/}
                {/*        left:   '20px',*/}
                {/*        top:    '300px',*/}
                {/*    }}*/}
                {/*    rows={10} cols={35}*/}
                {/*    value={JSON.stringify(this.state)}*/}
                {/*    onChange={(e)=>{this.onChange_textarea1(e)}}*/}
                {/*>*/}
                {/*</textarea>*/}

            </div>


        )
    }
}

export default Draggable;
