import React, {Component} from 'react'

// #5d3434
// #5d9999

import './main_canvas_color_picker.css'

// yarn add tinycolor2
import tinycolor from 'tinycolor2'

class App extends React.Component {
    constructor(props) {
        super();

        this.canvasRef1 = React.createRef()
        this.canvasRef2 = React.createRef()
        this.onChange_rgb = this.onChange_rgb.bind(this)

        var device_is_mobile=false
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            var device_is_mobile=true
        }

        const tStartColor = tinycolor('rgba(150,0,0,1)')
        const tStartColor_rgb = (tStartColor).toRgb()
        const tStartColor_hex = (tStartColor).toHexString()

        this.state = {
            device_is_mobile:device_is_mobile,
            box_point_selected_x:0,
            box_point_selected_y:0,
            strip_point_selected_x:0,
            strip_point_selected_y:0,
            mouse_x:0,
            mouse_y:0,
            mouse_down: false,
            // touch_down: false,
            mouse_target:'color-block',
            x1:0,
            x2:0,
            y1:0,
            y2:0,
            color_main:     tStartColor_hex,
            color_new:      tStartColor_hex,
            color_current:  tStartColor_hex,
            color_сovered:  tStartColor_hex,
            put_cursor_from_color_on_box:false,
            put_cursor_from_color_on_strip:true,

            ['red']:    tStartColor_rgb.r,
            ['green']:  tStartColor_rgb.g,
            ['blue']:   tStartColor_rgb.b,
            ['alpha']:  tStartColor_rgb.a,
            ['hex']:    tStartColor_hex,
        }

    }




    rgbToHex(r, g, b, alpha){

        if (r > 255 || g > 255 || b > 255)
            throw "Invalid color component";

        var hex = tinycolor({r:r,g:g,b:b, a:alpha}).toHexString()
        // var hex = ((r << 16) | (g << 8) | b).toString(16)

        return hex;
    }


    onChange_rgb = ({e, p_name}) => {


        console.log("=== onChange_rgb ")
        console.log(e.target.value)
        console.log(p_name)

        const tStateToChange = {
            box_point_selected_x:0,
            box_point_selected_y:0,
            put_cursor_from_color_on_box:false,
            put_cursor_from_color_on_strip:true,
        }

        if("hex" == p_name){

            var rgb =  tinycolor(e.target.value).toRgb()
            var hex =  tinycolor(e.target.value).toHexString()
            this.setState (() => ({
                [p_name]:(e.target.value),
                red:rgb.r,
                green:rgb.g,
                blue:rgb.b,
                color_new:hex,
                put_cursor_from_color_on_box:true,
                })
            )
        }else {

            var hex =  tinycolor(
                {r:this.state.red, g:this.state.green, b:this.state.blue, a:this.state.alpha}
            ).toHexString()

            this.setState (() => ({
                [p_name]:(e.target.value),
                hex:hex,
                color_new:hex,
                put_cursor_from_color_on_box:true,
                })
            )
        }
    }

    putCursorFromColor({p_color}){
        console.log("=== putCursorFromColor")
        console.log(this.state)

    }

    fillGradient() {
        if(this.state.color_new != this.state.color_current){
            this.setState (() => ({
                color_current:this.state.color_new,
                // mouse_x:0,
                // mouse_y:0,
                // box_point_selected_x:0,
                // box_point_selected_y:0,
                // strip_point_selected_x:0,
                // strip_point_selected_y:0,
                // put_cursor_from_color:true,
            }),
                ()=>{return 'finish stste'}
            )
        }

        this.ctx1.fillStyle = this.state.color_main;
        this.ctx1.fillRect(0, 0, this.width1, this.height1);


        this.grdWhite.addColorStop(0, 'rgba(255,255,255,1)');
        this.grdWhite.addColorStop(1, 'rgba(255,255,255,0)');
        this.ctx1.fillStyle = this.grdWhite;
        this.ctx1.fillRect(0, 0, this.width1, this.height1);

        this.grdBlack.addColorStop(0, 'rgba(0,0,0,0)');
        this.grdBlack.addColorStop(1, 'rgba(0,0,0,1)');
        this.ctx1.fillStyle = this.grdBlack;
        this.ctx1.fillRect(0, 0, this.width1, this.height1);


        //=== clculate XY from color
        if(this.state.put_cursor_from_color_on_box){
            console.log("=== put_cursor_from_color_on_box")

            const currentRGB = tinycolor(this.state.color_current).toRgb()
            console.log("=== currentRGB")
            console.log(currentRGB)

            const maxX = this.width1
            const maxY = this.height1
            console.log(maxX)
            console.log(maxY)
            var imageData = this.ctx1.getImageData(0,0, maxX , maxY);
            var data = imageData.data;
            // console.log("=== data")
            // console.log(data)

            // iterate over all pixels based on x and y coordinates
            var minArr = []
            find1:
                for(var yi = 0; yi < maxY; yi++) {
                    // loop through each column
                    for(var xi = 0; xi < maxX; xi++) {
                        var dd = this.ctx1.getImageData(xi,yi, 1 , 1).data;
                        const red1     = dd[0];
                        const green1   = dd[1];
                        const blue1    = dd[2];
                        const alpha1   = dd[3];
   //                      const red1     = data[((maxX * yi) + xi) * 4];
   //                      const green1   = data[((maxX * yi) + xi) * 4 + 1];
   //                      const blue1    = data[((maxX * yi) + xi) * 4 + 2];
   //                      const alpha1   = data[((maxX * yi) + xi) * 4 + 3];

                        var minPoint =
                            Math.abs(currentRGB.r - red1) +
                            Math.abs(currentRGB.g - green1) +
                            Math.abs(currentRGB.b - blue1)
                            +Math.abs(currentRGB.a*255 - alpha1)

                         if( 10>minPoint ){
                            minArr.push({min:minPoint,x:xi,y:yi, red:red1, green:green1, blue:blue1})
                            //  console.log(xi)
                            //  console.log(yi)
                            // // break find1;
                         }
                    } //x
                } //y

            if (0==minArr.length){
                this.setState (() => ({
                        color_main:tinycolor(currentRGB).toHexString(),
                        put_cursor_from_color_on_box:true
                    }),
                    ()=>{return 'finish stste'}
                )
                console.log('=== finish2 - new color_main ')
            }
            else{

                var minArrSorted = minArr.sort((a,b)=>{
                    return a.min - b.min
                })

                //114 127 67
                console.log("=== minArrSorted")
                console.log(minArrSorted)

                console.log("=== found x, y", minArrSorted[0].x, minArrSorted[0].y)
                console.log("=== red1   ",minArrSorted[0].red)
                console.log("=== green1 ",minArrSorted[0].green)
                console.log("=== blue1  ",minArrSorted[0].blue)

                var p00 = this.ctx1.getImageData(minArrSorted[0].x, minArrSorted[0].y, 1, 1).data;
                console.log("=== p00 color ", p00)

                this.setState (() => ({

                        ['box_point_selected_x']:  minArrSorted[0].x?minArrSorted[0].x:minArrSorted[0].x+1,
                        ['box_point_selected_y']:  minArrSorted[0].y?minArrSorted[0].y:minArrSorted[0].y+1,
                        put_cursor_from_color_on_box:false

                    }),
                    ()=>{return 'finish stste'}
                )

                console.log('=== finish1 ')
            }
        }



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

change_mouseXY_values({e} ) {


    // console.log("=== change_mouseXY_values")
    // console.log( e )

    if( e.targetTouches?.length ) {

        // console.log("=== targetTouches")
        // console.log(e.targetTouches)

        var el = e.targetTouches[0].target
        var rect = el.getBoundingClientRect()
        // console.log(rect)

        this.setFunction({

            x: e.targetTouches[0].pageX - rect.left,
            y: e.targetTouches[0].pageY - rect.top,

            x1: e.targetTouches[0].pageX ,
            y1: e.targetTouches[0].pageY ,

            x2: rect.left,
            y2: rect.top,

        })

    }
    else {

        var el = e.target
        var rect = el.getBoundingClientRect()

        var x_new = e.pageX - rect.left
        var y_new = e.pageY - rect.top

        x_new = (x_new>0)?x_new:1
        y_new = (y_new>0)?y_new:1

        this.setFunction({

            x:x_new,
            y:y_new,

            x1:e.pageX,
            y1:e.pageY,
            x2:rect.left,
            y2:rect.top,
        })

    }

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

        this.W = window.innerWidth
        this.H = window.innerHeight

        this.mouse = {}
        this.mouseIsDown = 0

        this.tElementUnderMouseName = 'color-block';

        this.colorLabel = document.getElementById('color-label');

        console.log("=== 1 this.state")
        console.log(this.state)

        this.requestRef = React.createRef()
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
        // this.ctx1.fillStyle = "yellow";
        // this.ctx1.fillStyle = "black";
        // this.ctx1.fillRect(0, 0, this.W, this.H);

        this.ctx1.rect(0, 0, this.width1, this.height1);
        this.fillGradient();

        this.ctx2.globalCompositeOperation = "source-over";
        this.ctx2.fillStyle = "yellow";
        this.ctx2.fillStyle = "black";
        this.ctx2.fillRect(0, 0, this.W, this.H);

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

        //================
        //================ STEP MOUSE XY AND COLOR
        //================

        var x_center = 0
        var y_center = 0

        if(this.state?.mouse_down) {

            console.log("=== this.state?.mouse_down")

             x_center = this.state.mouse_x
             y_center = this.state.mouse_y


            if("color-strip"==this.state.mouse_target){
                var p = this.ctx2.getImageData(x_center, y_center, 1, 1).data;
                var hex = tinycolor({r: p[0], g: p[1], b: p[2], a: p[3]}).toHexString()
                var tInState = {
                    strip_point_selected_x: x_center,
                    strip_point_selected_y: y_center,
                    color_main:     hex,
                    // color_current:  hex,
                    color_new:      hex,

                    box_point_selected_x: 0,
                    box_point_selected_y: 0,

                }
            }else {
                var p = this.ctx1.getImageData(x_center, y_center, 1, 1).data;
                var hex = tinycolor({r: p[0], g: p[1], b: p[2], a: p[3]}).toHexString()
                var tInState = {
                    box_point_selected_x: x_center,
                    box_point_selected_y: y_center,
                    color_new:      hex,
                }
            }

            this.setState (() => ({
                ...tInState,
                ['red']:    p[0],
                ['green']:  p[1],
                ['blue']:   p[2],
                ['alpha']:  p[3],
                ['hex']:    hex,
            }),
                ()=>{
                console.log(this.state)
                return 'finish stste 111'}
            )

        }

        //================
        //================ STEP DRAW
        //================
        this.paintBackground();

        //=========== CURSOR
        if(this.state?.mouse_x && this.state?.mouse_y) {
            this.Circle_draw ({
                p_target:this.state.mouse_target,
                p_xc: this.state.mouse_x,
                p_yc: this.state.mouse_y,
                p_radius:20,
                p_color: 'yellow'})
        }

        //=========== SELECTED ON STRIP
        if((this.state?.strip_point_selected_x && this.state?.strip_point_selected_y)) {

             x_center = this.state.strip_point_selected_x
             y_center = this.state.strip_point_selected_y

            this.Circle_draw ({
                p_target: "strip-block",
                p_xc: x_center,
                p_yc: y_center,
                p_radius:10,
                p_color: 'white'})
        }

        //=========== SELECTED ON BOX
        if((this.state?.box_point_selected_x && this.state?.box_point_selected_y)) {

            x_center = this.state.box_point_selected_x
            y_center = this.state.box_point_selected_y

            this.Circle_draw ({
                p_target: "color-block",
                p_xc: x_center,
                p_yc: y_center,
                p_radius:10,
                p_color: 'white'})
        }


    }


    onTouchStart_block  = ({e}) => {

        console.log("=== onTouchStart_block")

        console.log(e)


        this.setState (() => ({
            mouse_down: true,
            mouse_target:e.target.id,
        }), this.onMouseMove_block({e:e}))


    }

    onTouchEnd_block  = ({e}) => {
        this.setState (() => ({
            mouse_down: false,
            mouse_target:'',
        }), ()=>{})
    }

    onTouchMove_block  = ({e}) => {

        console.log("=== onTouchMove_block")


        console.log(e)

        this.setState (() => ({
            mouse_down: true,
            mouse_target:e.target.id,
        }), this.onMouseMove_block({e:e}))

        console.log(this.state)



    }

    onMouseMove_block  = ({e}) => {

        if(!this.state.device_is_mobile) {
            e.preventDefault()
            // e.stopImmediatePropagation()
            e.stopPropagation()
        }

        var el      = e.target
        var rect    = el.getBoundingClientRect()

        var x_new = e.pageX - rect.left
        var y_new = e.pageY - rect.top

        var c = el.getContext('2d');
        var p = c.getImageData(x_new, y_new, 1, 1).data;

        this.setState (() => ({
            // mouse_down: true,
            color_сovered:tinycolor({r: p[0], g: p[1], b: p[2], a: p[3]}).toHexString()
        }))

        this.change_mouseXY_values({e:e});
    }

    onMouseDown_block  = ({e}) => {

        if(!this.state.device_is_mobile) {
            e.preventDefault()
            // e.stopImmediatePropagation()
            e.stopPropagation()
        }

        console.log("=== onMouseDown_block")
        console.log(e)

        this.setState (() => ({
            mouse_down: true,
            mouse_target:e.target.id,
        }))

    }

    onMouseUp_block     = ({e}) => {

        if(!this.state.device_is_mobile) {
            e.preventDefault()
        }

        this.setState (() => ({
            mouse_down: false,
        }))
    }

    onMouseOver_block = ({e}) => {
        // console.log("=== onMouseOver_block")
        // console.log({e})

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

                <h4>Selected</h4>
                <label htmlFor="color-input" id="color-label" style={{backgroundColor: this.state.hex}}></label>
                <input type="checkbox" id="color-input" checked onChange={this.onChange_ColorInput}></input>

                    <br></br>
                <h4>Covered</h4>
                <label htmlFor="color-color_сovered" id="color-label" style={{backgroundColor: this.state.color_сovered}}></label>
                <input hidden type="checkbox" id="color-сovered" checked onChange={this.onChange_ColorInput}></input>

                <div id="color-picker">
                    <canvas

                        onTouchStart ={(e)=>this.onTouchStart_block({e:e})}
                        onTouchMove  ={(e)=>this.onTouchMove_block({e:e})}
                        onTouchEnd   ={(e)=>this.onTouchEnd_block({e:e})}

                        onMouseOver  ={(e)=>this.onMouseOver_block({e:e})}


                        onMouseMove ={(e)=>this.onMouseMove_block({e:e})}
                        onMouseDown ={(e)=>this.onMouseDown_block({e:e})}
                        onMouseUp   ={(e)=>this.onMouseUp_block({e:e})}

                        style={{passive: false}}

                        ref={this.canvasRef1} id="color-block" className="class_canvas_eventors" height="150" width="150"></canvas>


                    <canvas

                        onTouchStart ={(e)=>this.onMouseMove_block({e:e})}
                        onTouchMove  ={(e)=>this.onTouchMove_block({e:e})}

                        onMouseOver  ={(e)=>this.onMouseOver_block({e:e})}

                        onMouseMove ={(e)=>this.onMouseMove_block({e:e})}
                        onMouseDown ={(e)=>this.onMouseDown_block({e:e})}
                        onMouseUp   ={(e)=>this.onMouseUp_block({e:e})}

                        style={{passive: false}}

                        ref={this.canvasRef2} id="color-strip" className="class_canvas_eventors" height="150" width="30"></canvas>
                </div>


            </div>

                <div className="panel-row">
                    <div id="rgb-fields" className="field-group value-fields rgb-fields active">

                        <div  className="field-group" >
                            <label  htmlFor="" className="field-label">R:</label>
                            {/*inputProps={{className:'digitsOnly'}}*/}
                            <input type="number" max="255" min="0" id="red" className="field-input rgb-input"
                                   value={this.state.red}
                                   onChange={(e)=>this.onChange_rgb({e:e, p_name:'red'})}
                            >
                            </input>
                        </div>

                        <div className="field-group">
                            <label htmlFor="" className="field-label">G:</label>
                            <input type="number" max="255" min="0" id="green" className="field-input rgb-input"
                                   value={this.state.green}
                                   onChange={(e)=>this.onChange_rgb({e:e, p_name:'green'})}
                            >
                            </input>
                        </div>
                        <div className="field-group">
                            <label htmlFor="" className="field-label">B:</label>
                            <input type="number" max="255" min="0" id="blue" className="field-input rgb-input"
                                   value={this.state.blue}
                                   onChange={(e)=>this.onChange_rgb({e:e, p_name:'blue'})}
                            >
                            </input>
                        </div>

                        <div className="field-group">
                            <label htmlFor="" className="field-label">A:</label>
                            <input type="text" max="255" min="0" id="alpha" className="field-input rgb-input"
                                   value={this.state.alpha}
                                   onChange={(e)=>this.onChange_rgb({e:e, p_name:'alpha'})}
                            >
                            </input>
                        </div>

                    </div>

                    <div id="hex-field" className="field-group value-fields hex-field">
                        <label htmlFor="" className="field-label">Hex:</label>
                        <input type="text" id="hex" className="field-input"
                               value={this.state.hex}
                               onChange={(e)=>this.onChange_rgb({e:e, p_name:'hex'})}
                        ></input>
                    </div>

                </div>


                {/*<div style={{color:'red', position:'relative', marginTop:'200px'}}>*/}
                {/*    Target*/}
                {/*    {JSON.stringify(this.state?.mouse_target)}*/}
                {/*</div>*/}
                {/*<p>Selected in Strip</p>*/}
                {/*<div style={{color:'red', position:'relative', marginTop:'5px'}}>*/}

                {/*    {this.state?.strip_point_selected_x}*/}
                {/*    <br>*/}
                {/*    </br>*/}
                {/*    {this.state?.strip_point_selected_y}*/}

                {/*</div>*/}
                {/*<p>Selected in Box</p>*/}
                {/*<div style={{color:'red', position:'relative', marginTop:'5px'}}>*/}

                {/*    {this.state?.box_point_selected_x}*/}
                {/*    <br>*/}
                {/*    </br>*/}
                {/*    {this.state?.box_point_selected_y}*/}

                {/*</div>*/}

                <p>State</p>
                <textarea
                    columns={60}
                    rows={7}
                          style={{color:'red', position:'relative', marginTop:'5px'}}
                    value={JSON.stringify(this.state)}
                    onChange={()=>{}}
                >
                </textarea>

                {/*<p>Agemt  {this.state.device_is_mobile}</p>*/}
                {/*<textarea*/}
                {/*    columns="70"*/}
                {/*    rows={7}*/}
                {/*    style={{color:'red', position:'relative', marginTop:'5px'}}*/}
                {/*    value={JSON.stringify(window.navigator.userAgent)}*/}
                {/*    onChange={()=>{}}*/}
                {/*>*/}
                {/*</textarea>*/}

                {/*===========================*/}
                {/*===========================*/}
                {/*===========================*/}


                {/*<input*/}
                {/*    // type="number" max="255" min="0" id="red" className="field-input rgb-input"*/}
                {/*       value={this.state.red}*/}
                {/*       onChange={(e)=>this.onChange_rgb({e:e, p_name:'red'})}*/}
                {/*>*/}
                {/*</input>*/}


            </>
    )
    }
}

export default App;
