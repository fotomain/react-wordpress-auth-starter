import React from "react";


// https://www.w3schools.com/Jsref/tryit.asp?filename=tryjsref_ondrag


import './main_color_picker.css';
import Draggable from './Draggable';

import {Input} from '@mui/material'

// ionic build --prod; ionic cap sync --prod;
// ionic build --prod; ionic cap sync --prod; ionic serve
// ionic serve

import { HexColorPicker } from "react-colorful";

//yarn add material-ui-color
// import { ColorPicker, createColor } from "material-ui-color";

//yarn add @mui/styles @mui/material formik
import { Formik } from "formik";

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
        this.showColor1m = false;
        this.state = {
            showColor1:false,
            showColor1m:false,
            // color2:createColor("#000"),
        }

        this.inputRef = React.createRef();
        this.canvasRef = React.createRef();
        this.spectrumCursorRef = React.createRef();

    }

    // spectrumCursor = document.getElementById('spectrum-cursor');

    componentDidMount() {
        console.log('=== componentDidMount'+Date.now())

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

    ondrop1 = (event) => {
        console.log(" ")
        console.log(" ")
        console.log(" ")
        console.log(" ")
        console.log("=== ondrop1")
        console.log(event.pageX,' ',event.pageY)
        console.log(event)
        var spectrumCanvas = this.refs.canvas1;
        var spectrumCtx = spectrumCanvas.getContext('2d');

        var canvas = spectrumCanvas;
        var ctx = spectrumCtx;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        var color ='green'

        if(!color) color = '#f00';
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        var whiteGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        whiteGradient.addColorStop(0, "#fff");
        whiteGradient.addColorStop(1, "transparent");
        ctx.fillStyle = whiteGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        var blackGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        blackGradient.addColorStop(0, "transparent");
        blackGradient.addColorStop(1, "#000");
        ctx.fillStyle = blackGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);


        // var x = e.pageX - event.target.offsetleftX;
        // var y = e.pageY - position.y;

        var p = spectrumCtx.getImageData(event.pageX, event.pageX, 1, 1).data;
        var hex = "#" + ("000000" + this.rgbToHex(p[0], p[1], p[2])).slice(-6);
        // alert("HEX: " + hex);
        console.log(p)
        console.log(hex)


        spectrumCtx.beginPath();
        spectrumCtx.moveTo(100, 150);
        spectrumCtx.lineTo(450, 50);
        spectrumCtx.lineWidth = 10;

        // set line color
        spectrumCtx.strokeStyle = '#ff0000';
        spectrumCtx.stroke();


    }

    onDragOver1 = (event) => {
        console.log("=== onDragOver1")
        console.log(event.pageX,' ',event.pageY)
        console.log(event.target.id)
        event.preventDefault();
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
                            <canvas
                                ref={'canvas1'}
                                dropable={true.toString()}
                                onDrop={this.ondrop1}
                                onDragOver={this.onDragOver1}  style={{zindex:30}} id="spectrum-canvas"></canvas>

                            {/*className='draggable'*/}
                                <Draggable>
                                    <button  draggable={true} style={{color: 'red', zindex:20, }}
                                               id="spectrum-cursor" className="color-cursor"
                                             ref={this.spectrumCursorRef}
                                    >

                                    </button>
                                </Draggable>

                            <div  >
                            {/*<button draggable={true}  style={{color: 'red', zindex:20, }}*/}
                            {/*        onDrag={this.ondrag1}*/}
                            {/*           id="spectrum-cursor" className="color-cursor"*/}

                            {/*>*/}
                            {/*aaaaaaaaaa*/}
                            {/*</button>*/}
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

                            <div className="field-group">
                                <label htmlFor="" className="field-label">R:</label>
                                <input type="number" max="255" min="0" id="red" className="field-input rgb-input"></input>
                            </div>

                            <div className="field-group">
                                <label htmlFor="" className="field-label">G:</label>
                                <input type="number" max="255" min="0" id="green" className="field-input rgb-input"></input>
                            </div>
                            <div className="field-group">
                                <label htmlFor="" className="field-label">B:</label>
                                <input type="number" max="255" min="0" id="blue" className="field-input rgb-input"></input>
                            </div>

                        </div>

                        <div id="hex-field" className="field-group value-fields hex-field">
                            <label htmlFor="" className="field-label">Hex:</label>
                            <input type="text" id="hex" className="field-input"></input>
                        </div>
                        <button id="mode-toggle" className="button mode-toggle">Mode</button>



                    </div>

                    <Draggable>
                        <div className="panel-row draggable">
                            <h2 className="panel-header">User Colors</h2>
                            <div id="user-swatches" className="swatches custom-swatches"></div>
                            <button id="add-swatch" className="button add-swatch">
                                <span id="color-indicator" className="color-indicator"></span>
                                <span>Add to Swatches</span>
                            </button>

                        </div>
                    </Draggable>

                </div>



            </Container>

        )

    }
}

export default App;
