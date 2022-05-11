import React, {Component} from 'react'

import './main_canvas_color_picker.css'

class App extends React.Component {
    constructor(props) {
        super();

        this.canvasRef1 = React.createRef()
        this.canvasRef2 = React.createRef()

        this.state = {
            mouse_x:0,
            mouse_y:0,
        }

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

    Circle_draw = ({p_xc,p_yc,p_radius,p_color}) => {

            console.log("=== Circle_draw")
            console.log(this.tElementUnderMouseName)

            if ("color-block"==this.tElementUnderMouseName) {
                var ctxToDraw = this.ctx1;
            }
            else {
                var ctxToDraw = this.ctx2;
            }

            ctxToDraw.globalCompositeOperation = "lighter";
            ctxToDraw.beginPath();
            // ctxToDraw.fillStyle = this.color;
            ctxToDraw.arc(p_xc, p_yc, p_radius, 0, Math.PI*2, false);
            // ctxToDraw.fill();
            ctxToDraw.strokeStyle = p_color; //"yellow";
            ctxToDraw.stroke();
            ctxToDraw.closePath();
        }


mouseUp() {
    this.mouseIsDown = 0;
    this.change_mouseXY_values();
}

touchUp() {
    this.mouseIsDown = 0;
}

mouseDown() {
    this.mouseIsDown = 1;
    this.change_mouseXY_values();
}

touchDown() {
    this.mouseIsDown = 1;
    this.change_touchXY_values();
}

change_mouseXY_values(e, setFunction ) {
    e.preventDefault();
    console.log("=== change_mouseXY_values")
    console.log( e )
    this.tElementUnderMouseName = e.target.id.toString()
    console.log(this.tElementUnderMouseName)

    if ("color-block"==this.tElementUnderMouseName) {
        // var rect = document.getElementById('color-block');
        var el = e.target
        console.log(el)
        rect = el.getBoundingClientRect()
        console.log(rect)
    }
    else {
        var rect = this.canvasRef2.getBoundingClientRect()
    }

    // console.log("=== canvas")
    // console.log(canvas)

    if( e.targetTouches ) {


        console.log(e.targetTouches)
        this.mouse.x = e.targetTouches[0].pageX - rect.left;
        this.mouse.y = e.targetTouches[0].pageY - rect.top;

    }
    else {

        setFunction({x:e.pageX - rect.left, y:e.pageY - rect.top})


        // this.mouse.x = e.pageX - rect.left;
        // this.mouse.y = e.pageY - rect.top;
    }

    // console.log(canvas.offsetLeft);
    // console.log(canvas.offsetTop);
    console.log( "================");
    console.log(this.state.mouse_x);
    console.log(this.state.mouse_y);



}

change_touchXY_values(e) {

    e.preventDefault();

    this.tElementUnderMouseName = e.target.id

    if ("color-block"==this.tElementUnderMouseName) {
        var canvas = this.canvas1;
    }
    else {
        var canvas = this.canvas2;
    }

    this.mouse.x = e.targetTouches[0].pageX - canvas.offsetLeft;
    this.mouse.y = e.targetTouches[0].pageY - canvas.offsetTop;

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

        document.querySelectorAll('.class_canvas_eventors').forEach(item => {

            item.addEventListener("mousedown",  this.mouseDown, false);
            item.addEventListener("mousemove",  (e)=>this.change_mouseXY_values(e,this.setFunction), false);
            item.addEventListener("touchstart", this.touchDown, false);
            item.addEventListener("touchmove",  this.change_touchXY_values, true);
            item.addEventListener("touchend",   this.touchUp, false);

        })

        this.requestRef.current = requestAnimationFrame(this.animate);

    }

    setFunction = ({x,y}) =>{
            this.setState (() => ({
                ['mouse_x']:  x,
                ['mouse_y']:  y,
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


        if(this.state.mouse_x && this.state.mouse_y) {
            this.Circle_draw ({
                p_xc: this.state.mouse_x,
                p_yc: this.state.mouse_y,
                p_radius:20,
                p_color: 'yellow'})
        }

    }

    render_content() {
    }

    render() {
        return (
            <>
                <div style={{position:'relative',}}>

                <h2>Canvas Color Picker</h2>

                <label htmlFor="color-input" id="color-label" style={{backgroundColor: 'red'}}></label>
                <input type="checkbox" id="color-input" checked onChange={this.onChange_ColorInput}></input>

                <div id="color-picker">
                    <canvas ref={this.canvasRef1} id="color-block" className="class_canvas_eventors" height="150" width="150"></canvas>
                    <canvas ref={this.canvasRef2} id="color-strip" className="class_canvas_eventors" height="150" width="30"></canvas>
                </div>


            </div>
                <div style={{color:'red', position:'relative', marginTop:'200px'}}>
                    State
                    {JSON.stringify(this.state)}
                </div>
            </>
    )
    }
}

export default App;
