import React from "react";


// https://www.w3schools.com/Jsref/tryit.asp?filename=tryjsref_ondrag


import './main_color_picker.css';
import Draggable from './Draggable';

import {Input} from '@mui/material'

// ionic build --prod; ionic cap sync --prod;
// ionic build --prod; ionic cap sync --prod; ionic serve
// ionic serve


import {
    Container,
    TextField,

    Grid,
    RadioGroup,
    Radio,
    Box,
    Button,
    LinearProgress,
    MenuItem,
    FormControl,
    FormLabel,
    InputLabel,
    FormControlLabel,
    Typography,
    AutocompleteRenderInputParams,
    ToggleButton,

} from '@mui/material';



import {
    makeStyles
} from '@mui/styles';



class App extends React.Component {

    constructor(props) {
        super();
        // this.handleChange = this.handleChange.bind(this);


        this.state = {
            showColor1:false,

            ['dragging']:false,
            hex:'',
            red:10,
            green:10,
            blue:10,
            Cursor1_x:150,
            Cursor1_y:150,
            // color2:createColor("#000"),
        }

        this.startGetSpectrumColor  = this.startGetSpectrumColor.bind(this)
        this.endGetSpectrumColor    = this.endGetSpectrumColor.bind(this)

        this.ondrop1 = this.ondrop1.bind(this)

        this.onChange_rgb = this.onChange_rgb.bind(this)
        // this.inputRef = React.createRef();
        // this.canvasRef = React.createRef();
        // this.inputRef = React.createRef();
         this.canvasID = 'canvasID1'
         this.canvasRef = React.createRef();
         this.canvasRef1 = React.createRef();
         this.spectrumCursorRef = React.createRef();

    }

    // spectrumCursor = document.getElementById('spectrum-cursor');

    componentDidMount() {
        console.log('=== componentDidMount'+Date.now())


        // var spectrumCanvas = this.refs.canvas1;
        // var spectrumCanvas = this.canvasRef1;
        // var spectrumCtx = spectrumCanvas.current.getContext('2d');
        //
        // var canvas = spectrumCanvas.current;
        // var ctx = spectrumCtx;
        //
        // console.log("=== canvas.width, canvas.height", canvas.width, canvas.height)
        //
        // ctx.clearRect(0, 0, canvas.width, canvas.height);
        //
        // var color ='green'
        //
        // if(!color) color = '#ff0000';
        // ctx.fillStyle = color;
        // ctx.fillRect(0, 0, canvas.width, canvas.height);
        //
        // var whiteGradient = spectrumCtx.createLinearGradient(0, 0, canvas.width, 0);
        // whiteGradient.addColorStop(0, "#fff");
        // whiteGradient.addColorStop(1, "transparent");
        // ctx.fillStyle = whiteGradient;
        // ctx.fillRect(0, 0, canvas.width, canvas.height);
        //
        // var blackGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        // blackGradient.addColorStop(0, "transparent");
        // blackGradient.addColorStop(1, "#000");
        // ctx.fillStyle = blackGradient;
        // ctx.fillRect(0, 0, canvas.width, canvas.height);


        // 11111111111111111111

        var spectrumCanvas = this.canvasRef;
        var spectrumCtx = spectrumCanvas.current.getContext('2d');

        var canvas = spectrumCanvas.current;

        // const canvasEl0 = document.getElementsByName("canvas1_name");
        // const canvasEl = canvasEl0[0]
        // console.log("=== canvasEl")
        // console.log(canvasEl)
        // canvasEl.addEventListener('mousedown', function(e) {
        //     // this.startGetSpectrumColor(e);
        //     console.log("=== startGetSpectrumColor")
        //     console.log(e.pageX,' ',e.pageY)
        //
        // });

        var ctx = spectrumCtx;

        console.log("=== canvas.width, canvas.height", canvas.width, canvas.height)

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // var color ='blue'
        // var color ='red'
        var color ='#00FF00'

        if(!color) color = '#ff0000';
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        var whiteGradient = spectrumCtx.createLinearGradient(0, 0, canvas.width, 0);
        whiteGradient.addColorStop(0, "#fff");
        whiteGradient.addColorStop(1, "transparent");
        ctx.fillStyle = whiteGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        var blackGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        blackGradient.addColorStop(0, "transparent");
        blackGradient.addColorStop(1, "#000");
        ctx.fillStyle = blackGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);



        // this.inputRef.current.style.visibility="hidden";
        // this.inputRef.current.classList.add("dragging");

        // period set
        // this.interval = setInterval(() => this.setState({ time: Date.now() }), 1000);

        // this.spectrumCursor.classList.add('dragging');

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
    //

    endGetSpectrumColor  = (event) => {

        console.log("=== endGetSpectrumColor")
        // console.log(event.pageX,' ',event.pageY)

        // this.setState (() => ({
        //     ['dragging']:false,
        // }))

    }

    startGetSpectrumColor  = (event) => {
        console.log("=== startGetSpectrumColor")
        // console.log(event.pageX,' ',event.pageY)

        this.setState (() => ({
            ['dragging']:true,
        }))


    }

    TextField1 = (props) => {
        // onChange={(e)=>this.onChange1(e)}
        return <TextField />;
    }

    classes_edit = makeStyles({
        Container:{
            marginTop:'1rem',
        },
        FlexRow:{
            marginTop:'2rem',
            paddingTop:'2rem',
            display:'flex',
        },
        TextField:{
            marginTop:'1rem',
            width:'120rem',
        },
    })

    ondrag1 = (event) => {
        console.log("=== ondrag1")
        console.log(event.pageX,' ',event.pageY)
    }

    rgbToHex(r, g, b){
        if (r > 255 || g > 255 || b > 255)
            throw "Invalid color component";
        return ((r << 16) | (g << 8) | b).toString(16);
    }

    f_setXYofCursor1 = ({x,y}) => {
        console.log("=== f_setXYofCursor1")
        console.log(x,' ',y)

        this.setState(() => ({
            Cursor1_x:x,
            Cursor1_y:y,
        }))

    }

    getSpectrumColor = (event) => {

        if ( this.state.dragging ) {
            console.log("=== getSpectrumColor event ")
            // console.log(event.pageX,' ',event.pageY)
        }

    }

    onClick_canvas = (event) => {

        return

    console.log(" ")
    console.log(" ")
    console.log(" ")
    console.log(" ")
    console.log("=== onClick_canvas event ")
        console.log(event.pageX,' ',event.pageY)
        console.log(event)

        var spectrumCanvas  = this.canvasRef;
        var spectrumRect    = spectrumCanvas.current.getBoundingClientRect();
        var spectrumCtx     = spectrumCanvas.current.getContext('2d');

        console.log("=== spectrumRect")
        console.log(spectrumRect)

        let dx = spectrumRect.left
        let dy = spectrumRect.top
        let x1 = event.pageX - dx
        let y1 = event.pageY - dy

        console.log("--- x1  ", event.pageX , ' - ' , dx , ' = ', x1)
        console.log("--- y1  ", event.pageY , ' - ' , dy , ' = ', y1)
        console.log(x1)
        console.log(y1)

        let x2 = x1 + 1
        let y2 = y1 + 1

        spectrumCtx.beginPath();
        spectrumCtx.moveTo(x1,y1);
        spectrumCtx.lineTo(x2,y2);
        spectrumCtx.lineWidth = 10;
        // set line color
        spectrumCtx.strokeStyle = 'magenta';
        spectrumCtx.stroke();


        spectrumCtx.beginPath();
        spectrumCtx.moveTo(dx,dy);
        spectrumCtx.lineTo(dx+1,dy+1);
        spectrumCtx.lineWidth = 10;
        // set line color
        spectrumCtx.strokeStyle = 'yellow';
        spectrumCtx.stroke();
    }

    onClick_canvas1 = (event) => {

    console.log(" ")
    console.log(" ")
    console.log(" ")
    console.log(" ")
    console.log("=== onClick_canvas event ")
        console.log(event.pageX,' ',event.pageY)
        console.log(event)

        var spectrumCanvas  = this.canvasRef1;
        var spectrumRect    = spectrumCanvas.current.getBoundingClientRect();
        var spectrumCtx     = spectrumCanvas.current.getContext('2d');

        console.log("=== spectrumRect")
        console.log(spectrumRect)

        let dx = spectrumRect.left
        let dy = spectrumRect.top
        let x1 = event.pageX - dx
        let y1 = event.pageY - dy

        console.log("--- x1  ", event.pageX , ' - ' , dx , ' = ', x1)
        console.log("--- y1  ", event.pageY , ' - ' , dy , ' = ', y1)
        console.log(x1)
        console.log(y1)

        let x2 = x1 + 1
        let y2 = y1 + 1

        spectrumCtx.beginPath();
        // spectrumCtx.moveTo(x1,y1);
        // spectrumCtx.lineTo(x2,y2);
        spectrumCtx.fillStyle = 'magenta'
        spectrumCtx.fill()

        spectrumCtx.lineWidth = 10;
        spectrumCtx.strokeStyle = 'magenta';

        spectrumCtx.arc(x1,y1,5,0,2 * Math.PI);
        // set line color
        spectrumCtx.stroke();


        spectrumCtx.beginPath();
        spectrumCtx.moveTo(dx,dy);
        spectrumCtx.lineTo(dx+1,dy+1);
        spectrumCtx.lineWidth = 10;
        // set line color
        spectrumCtx.strokeStyle = 'yellow';
        spectrumCtx.stroke();
    }



    ondrop1 = (event) => {
        console.log(" ")
        console.log(" ")
        console.log(" ")
        console.log(" ")
        console.log("=== ondrop1 event ")
        console.log(event.pageX,' ',event.pageY)
        console.log(event)
        var spectrumCanvas = this.canvasRef;
        var spectrumRect = spectrumCanvas.current.getBoundingClientRect();
        var spectrumCtx = spectrumCanvas.current.getContext('2d');

        console.log("=== spectrumCanvas")
        console.log(spectrumCanvas)
        console.log("---")
        console.log("target.offsetWidth  X= ",event.target.offsetWidth)
        console.log("target.offsetHeight Y= ",event.target.offsetHeight)
        console.log("---")
        console.log("event.pageX = ",event.pageX)
        console.log("event.pageY = ",event.pageY)
        console.log("---")
        console.log(" spectrumRect.left     = ",spectrumRect.left)
        console.log(" spectrumRect.top      = ",spectrumRect.top)
        console.log("---")
        console.log(" .screenX = ",event.screenX)
        console.log(" .screenY = ",event.screenY)
        console.log("---")


        let x1 = event.pageX - spectrumRect.left
        let y1 = event.pageY - spectrumRect.top

        console.log(x1)
        console.log(y1)
        console.log("---")


        let x2 = x1 + 10
        let y2 = y1 + 10

        var canvas = spectrumCanvas;
        var ctx = spectrumCtx;

        var p = spectrumCtx.getImageData(x1, y1, 1, 1).data;
        var hex = "#" + ("000000" + this.rgbToHex(p[0], p[1], p[2])).slice(-6);
        console.log(p[0])
        console.log(p[1])
        console.log(p[2])

        this.setState (() => ({
            ['red']:    p[0],
            ['green']:  p[1],
            ['blue']:   p[2],
        }))

        console.log(this.state)
        // alert("HEX: " + hex);
        // console.log(p)
        console.log("HEX: ", hex)

        var spectrumCursor = this.spectrumCursorRef;
        console.log("=== spectrumCursor")
        console.log(spectrumCursor)
        spectrumCursor.current.style.left  = (x1-10) + 'px';
        spectrumCursor.current.style.top   = (y1-10) + 'px';
        spectrumCursor.current.style.backgroundColor = hex;



    }

    onDragOver1 = (event) => {
        console.log("=== onDragOver1")
        console.log(event.pageX,' ',event.pageY)
        console.log(event.target.id)
        event.preventDefault();
    }

    onChange_rgb = (event,p_name) => {
        console.log("=== onChange_rgb ")
        console.log(event.target.value)
         this.setState (() => ({
             [p_name]:event.target.value,
         }))



        //     green:event.target.value.parseInt,
        //     blue:event.target.value.parseInt,


    }


    render() {

        // var
        // this.spectrumCursor.className += " otherclass";

        return(

            <Container className={this.classes_edit.Container}>
                <Typography variant="h4">
                    Colors !
                </Typography>

                <div className="color-picker-panel">

                    <div className="panel-row">
                        <div className="swatches default-swatches"></div>
                        <button className="button eyedropper">Get Color</button>
                    </div>

                    <div   className="panel-row">
                        {/*ref={this.inputRef}*/}
                        {/*draggable={true}*/}
                        <div  className="spectrum-map">
                            {/*  onDrop not work over canvas   */}
                            {/*=== strong W & H + media quer */}
                            <canvas width={'300px'} height={'200px'}
                                // ref={'canvas1'}
                                id={this.canvasID}
                                name={'canvas1_name'}
                                ref={this.canvasRef}
                                dropable={true.toString()}
                                onDrop={this.ondrop1}
                                onClick={this.onClick_canvas}
                                onMouseDown={this.startGetSpectrumColor}
                                onMouseMove={this.getSpectrumColor}
                                onMouseUp={this.endGetSpectrumColor}
                                // onDragOver={this.onDragOver1}
                                // style={{zindex:30}} id="spectrum-canvas"
                            >
                            </canvas>

                            {/*className='draggable'*/}
                            {/*1111111111*/}
                                <Draggable
                                    style={{

                                    }}

                                    canvasRef   = {this.canvasRef}
                                    canvasID    = {this.canvasID}
                                    f_output    = {this.f_setXYofCursor1}
                                >
                                    <button

                                        draggable={true}

                                        style={{
                                            left: this.state.Cursor1_x,
                                            top: this.state.Cursor1_y,
                                            color: 'red', zindex:20, }}
                                                id="spectrum-cursor" className="color-cursor"
                                                ref={this.spectrumCursorRef}
                                    >

                                    </button>
                                </Draggable>

                            <div  >

                            </div>
                        </div>
                        <div  className="hue-map">
                            <button onDrag={this.ondrag1} draggable={true}      id="hue-cursor" className="color-cursor"></button

                            >
                            <canvas id="hue-canvas"></canvas>
                        </div>
                    </div>


                    <div className="panel-row">
                        <div id="rgb-fields" className="field-group value-fields rgb-fields active">

                            <div  className="field-group" >
                                <label  htmlFor="" className="field-label">R:</label>
                                {/*inputProps={{className:'digitsOnly'}}*/}
                                <input type="number" max="255" min="0" id="red" className="field-input rgb-input"
                                       value={this.state.red}
                                       onChange={(e)=>this.onChange_rgb(e,'red')}
                                >
                                </input>
                            </div>

                            <div className="field-group">
                                <label htmlFor="" className="field-label">G:</label>
                                <input type="number" max="255" min="0" id="green" className="field-input rgb-input"
                                       value={this.state.green}
                                       onChange={(e)=>this.onChange_rgb(e,'green')}
                                >
                                </input>
                            </div>
                            <div className="field-group">
                                <label htmlFor="" className="field-label">B:</label>
                                <input type="number" max="255" min="0" id="blue" className="field-input rgb-input"
                                       value={this.state.blue}
                                       onChange={(e)=>this.onChange_rgb(e,'blue')}
                                >
                                </input>
                            </div>

                        </div>

                        <div id="hex-field" className="field-group value-fields hex-field">
                            <label htmlFor="" className="field-label">Hex:</label>
                            <input type="text" id="hex" className="field-input"></input>
                        </div>

                        <button id="mode-toggle" className="button mode-toggle">Mode</button>



                    </div>

                        <div className="panel-row draggable">
                            <h2 className="panel-header">User Colors</h2>
                            <div id="user-swatches" className="swatches custom-swatches"></div>
                            <button id="add-swatch" className="button add-swatch">
                                <span id="color-indicator" className="color-indicator"></span>
                                <span>Add to Swatches</span>
                            </button>

                        </div>

                    <div style={{display:'none'}}>
                    <canvas width={'150px'} height={'150px'}
                        // ref={'canvas1'}
                        ref={this.canvasRef1}
                        dropable={true.toString()}
                        onDrop={this.ondrop1}
                        onClick={this.onClick_canvas1}
                        onDragOver={this.onDragOver1}  style={{zindex:30}} id="canvas1">
                    </canvas>
                    </div>

                    <textarea value={JSON.stringify(this.state)}  rows={5} cols={30} style={{color:'red'}}>
                        State
                    </textarea>

                </div>



            </Container>

        )

    }
}

export default App;
