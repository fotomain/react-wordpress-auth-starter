import React, {Component} from 'react'

import './main_canvas_color_picker.css'

import { Device } from '@capacitor/device';

class App extends React.Component {
    constructor(props) {
        super();

        this.canvasRef1 = React.createRef()
        this.canvasRef2 = React.createRef()

        var state1 = {
            mouse_x:0,
            mouse_y:0,
            mouse_down: false,
            mouse_target:'color-block',
            x1:0,
            x2:0,
            y1:0,
            y2:0,
        }


        Device.getInfo().then((DeviceInfo) => {
            console.log("=== DeviceInfo")
            console.log(DeviceInfo)

            this.state = {
                ...state1,
                DeviceInfo_platform:'notweb',
                // DeviceInfo_platform:'web',
                // DeviceInfo_platform:DeviceInfo.platform,
                Window_width:window.width,
            }

        })
    }

    requestForAnimation = (function(){
        return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            function( callback ){
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    rgbaColor = 'rgba(255,0,0,1)';


    fillGradient() {
        this.ctx1.fillStyle = this.rgbaColor;
        this.ctx1.fillRect(0, 0, this.width1, this.height1);

        this.grdWhite.addColorStop(0, 'rgba(255,255,255,1)');
        this.grdWhite.addColorStop(1, 'rgba(255,255,255,0)');
        this.ctx1.fillStyle = this.grdWhite;
        this.ctx1.fillRect(0, 0, this.width1, this.height1);

        this.grdBlack.addColorStop(0, 'rgba(0,0,0,0)');
        this.grdBlack.addColorStop(1, 'rgba(0,0,0,1)');
        this.ctx1.fillStyle = this.grdBlack;
        this.ctx1.fillRect(0, 0, this.width1, this.height1);
    }

    Circle_draw = ({p_xc,p_yc,p_radius,p_color, p_target}) => {

            // console.log("=== Circle_draw")
            // console.log(this.tElementUnderMouseName)

            if ("color-block"==p_target) {
                var ctxToDraw = this.ctx1;
            }
            else {
                var ctxToDraw = this.ctx2;
            }

            // console.log(ctxToDraw)

            ctxToDraw.globalCompositeOperation = "lighter";
            ctxToDraw.beginPath();
            // ctxToDraw.fillStyle = this.color;
            ctxToDraw.arc(p_xc, p_yc, p_radius, 0, Math.PI*2, false);
            // ctxToDraw.fill();
            ctxToDraw.strokeStyle = p_color; //"yellow";
            ctxToDraw.stroke();
            ctxToDraw.closePath();
        }

    // mouseDown({e, fchange, fset, upperState}) {
    //     this.mouseIsDown = 1;
    //     fchange(e,fset, upperState);
    // }
    //
    // mouseUp({e, fchange, fset, upperState}) {
    //     this.mouseIsDown = 0;
    //     fchange(e,fset, upperState);
    // }
    //
    // touchDown({e, fchange, fset, upperState}) {
    //     this.mouseIsDown = 1;
    //     fchange(e,fset, upperState);
    //
    // }
    //
    // touchUp({e, fchange, fset, upperState}) {
    //     this.mouseIsDown = 0;
    // }
    //

change_mouseXY_values({e, setFunction, upperState} ) {


    console.log("=== change_mouseXY_values")
    console.log( e.target.id )



    var el = e.target
    var rect = el.getBoundingClientRect()
    console.log(rect)


    if( e.targetTouches ) {

        console.log("=== targetTouches")
        console.log(e.targetTouches)

        setFunction({


            x: e.targetTouches[0].pageX - rect.left,
            y: e.targetTouches[0].pageY - rect.top,

            x1: e.targetTouches[0].pageX ,
            y1: e.targetTouches[0].pageY ,

            x2: rect.left,
            y2: rect.top,

        })

    }
    else {

        setFunction({

            x:e.pageX - rect.left,
            y:e.pageY - rect.top,
            x1:e.pageX,
            y1:e.pageY,
            x2:rect.left,
            y2:rect.top,
        })


    }



}

change_touchXY_values({e, fchange, fset, upperState}) {

    console.log("=== upperState")
    console.log(upperState)

    if("web" == upperState?.DeviceInfo_platform) {
        e.preventDefault()
    }

    console.log(e)

    var el = e.target
    console.log(el)
    var rect = el.getBoundingClientRect()
    console.log(rect)


    fset({
        x: e.targetTouches[0].pageX - rect.Left,
        y: e.targetTouches[0].pageY - rect.Top
    })


}




    animate = p_TimeStamp => {
        // The 'state' will always be the initial value here

        this.render_paint();

        this.requestRef.current = requestAnimationFrame(this.animate);
    }

    componentDidMount() {
        console.log('=== componentDidMount'+Date.now())
        // period set
        // this.interval = setInterval(() => this.setState({ time: Date.now() }), 1000);




        this.ref1 = this.canvasRef1;
        this.ctx1 = this.ref1.current.getContext('2d');

        this.ref2 = this.canvasRef2;
        this.ctx2 = this.ref2.current.getContext('2d');


        // console.log("=== ref2")
        // console.log(ref2)
        //
        // console.log("=== this.ctx2")
        // console.log(this.ctx2)

        this.width1     = this.ctx1.canvas.width;
        this.height1    = this.ctx1.canvas.height;

        this.width2     = this.ctx2.canvas.width;
        this.height2    = this.ctx2.canvas.height;

        console.log(this.width1)
        console.log(this.height1)

        this.grdWhite = this.ctx2.createLinearGradient(0, 0, this.width1, 0);
        this.grdBlack = this.ctx2.createLinearGradient(0, 0, 0, this.height1);

        this.requestRef = React.createRef()

            // document.getElementById('color-block');

            // document.getElementById('color-strip');

        this.W = window.innerWidth
        this.H = window.innerHeight

        this.mouse = {}
        this.mouseIsDown = 0

        this.tElementUnderMouseName = 'color-block';

        this.colorLabel = document.getElementById('color-label');

        console.log("=== 1 this.state")
        console.log(this.state)

        document.querySelectorAll('.class_canvas_eventors').forEach(item => {

            // item.addEventListener("mousedown",  (e)=>this.mouseDown({
            //     e:e,
            //     fchange: this.change_mouseXY_values,
            //     fset:this.setFunction,
            //     upperState:this.state}), false);

            // item.addEventListener("mousemove",  (e)=>this.change_mouseXY_values({
            //     e,
            //     setFunction: this.setFunction,
            //     upperState: this.state,
            // }), false);

            // item.addEventListener("touchstart",  (e)=>this.touchDown(
            // {
            //     e:e,
            //     fchange: ()=>this.change_touchXY_values,
            //     fset: this.setFunction,
            //     upperState:this.state,
            // }), false);
            //
            // item.addEventListener("touchmove",  (e)=>this.change_touchXY_values({
            //     e:e,
            //     fchange: ()=> this.change_touchXY_values,
            //     fset: this.setFunction,
            //     upperState:this.state,
            // }), true);
            //
            // item.addEventListener("touchup",  (e)=>this.touchUp(
            //     {
            //         e:e,
            //         fchange: ()=> this.change_touchXY_values,
            //         fset: this.setFunction,
            //         upperState:this.state,
            //
            // }), false);

        })

        this.requestRef.current = requestAnimationFrame(this.animate);

    }

    setFunction = ({x,y, x1,y1, x2,y2,

    }) =>{
            this.setState (() => ({

                ['mouse_x']:  x,
                ['mouse_y']:  y,
                ['x1']:  x1,
                ['y1']:  y1,
                ['x2']:  x2,
                ['y2']:  y2,

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

    onChange_textarea1 = (event) => {}

    onChange_ColorInput = (event) => {}


    paintBackground() {

        // Default fillStyle is also black but specifying it
        // won't hurt anyone and we can change it back later.
        // If you want more controle over colors, then declare
        // them in a variable.
        this.ctx1.globalCompositeOperation = "source-over";
        this.ctx1.fillStyle = "yellow";
        this.ctx1.fillStyle = "black";
        this.ctx1.fillRect(0, 0, this.W, this.H);

        this.ctx2.globalCompositeOperation = "source-over";
        this.ctx2.fillStyle = "yellow";
        this.ctx2.fillStyle = "black";
        this.ctx2.fillRect(0, 0, this.W, this.H);


        this.ctx1.rect(0, 0, this.width1, this.height1);
        this.fillGradient();

        this.ctx2.rect(0, 0, this.width2, this.height2);
        var grd1 = this.ctx2.createLinearGradient(0, 0, 0, this.height1);
        grd1.addColorStop(0, 'rgba(255, 0, 0, 1)');
        grd1.addColorStop(0.17, 'rgba(255, 255, 0, 1)');
        grd1.addColorStop(0.34, 'rgba(0, 255, 0, 1)');
        grd1.addColorStop(0.51, 'rgba(0, 255, 255, 1)');
        grd1.addColorStop(0.68, 'rgba(0, 0, 255, 1)');
        grd1.addColorStop(0.85, 'rgba(255, 0, 255, 1)');
        grd1.addColorStop(1, 'rgba(255, 0, 0, 1)');
        this.ctx2.fillStyle = grd1;
        this.ctx2.fill();
    }

    render_paint() {

        this.paintBackground();


        if(this.state?.mouse_x && this.state?.mouse_y) {
            this.Circle_draw ({
                p_target:this.state.mouse_target,
                p_xc: this.state.mouse_x,
                p_yc: this.state.mouse_y,
                p_radius:20,
                p_color: 'yellow'})
        }

    }

    onMouseMove_block  = ({e}) => {

        if("web" == this.state.DeviceInfo_platform) {
            e.preventDefault()
            e.stopImmediatePropagation()
            e.stopPropagation()
        }

        //=== on Touches only !!!
        // if(e.targetTouches?.){
        //     this.setState (() => ({
        //         mouse_target:e.target.id,
        //     }))
        // }

        this.change_mouseXY_values({
            e,
            setFunction: this.setFunction,
            upperState: this.state,
        });
    }

    onMouseDown_block  = ({e}) => {

        if("web" == this.state.DeviceInfo_platform) {
            e.preventDefault()
            e.stopImmediatePropagation()
            e.stopPropagation()

        }

        this.setState (() => ({
            mouse_down: true,
        }))
    }

    onMouseUp_block     = ({e}) => {

        if("web" == this.state.DeviceInfo_platform) {
            e.preventDefault()
        }

        this.setState (() => ({
            mouse_down: false,
        }))
    }

    onMouseEnter_block = ({e}) => {
        console.log("=== onMouseEnter")
        console.log({e})

        this.setState (() => ({
            mouse_target:e.target.id,
        }))


    }
    onMouseLeave = (event) => {}

    render() {
        return (
            <>
                <div style={{position:'relative',}}>

                <h2>Canvas Color Picker</h2>

                <label htmlFor="color-input" id="color-label" style={{backgroundColor: 'red'}}></label>
                <input type="checkbox" id="color-input" checked onChange={this.onChange_ColorInput}></input>

                <div id="color-picker">
                    <canvas

                        onTouchStart ={(e)=>this.onMouseMove_block({e:e})}
                        onTouchMove  ={(e)=>this.onMouseMove_block({e:e})}
                        onMouseEnter ={(e)=>this.onMouseEnter_block({e:e})}


                        onMouseMove ={(e)=>this.onMouseMove_block({e:e})}
                        onMouseDown ={(e)=>this.onMouseDown_block({e:e})}
                        onMouseUp   ={(e)=>this.onMouseUp_block({e:e})}

                        style={{passive: false}}

                        ref={this.canvasRef1} id="color-block" className="class_canvas_eventors" height="150" width="150"></canvas>


                    <canvas

                        onTouchStart ={(e)=>this.onMouseMove_block({e:e})}
                        onTouchMove  ={(e)=>this.onMouseMove_block({e:e})}
                        onMouseEnter ={(e)=>this.onMouseEnter_block({e:e})}

                        onMouseMove ={(e)=>this.onMouseMove_block({e:e})}
                        onMouseDown ={(e)=>this.onMouseDown_block({e:e})}
                        onMouseUp   ={(e)=>this.onMouseUp_block({e:e})}

                        style={{passive: false}}

                        ref={this.canvasRef2} id="color-strip" className="class_canvas_eventors" height="150" width="30"></canvas>
                </div>


            </div>
                <div style={{color:'red', position:'relative', marginTop:'200px'}}>
                    Target
                    {JSON.stringify(this.state?.mouse_target)}

                </div>
                <textarea
                    columns="70"
                    rows={7}
                          style={{color:'red', position:'relative', marginTop:'20px'}}
                    value={JSON.stringify(this.state)}
                    onChange={()=>{}}
                >
                    State


                </textarea>
            </>
    )
    }
}

export default App;
