import React, {Component} from 'react'
//cd C:\W_RE-MODELS
import './main_dnd.css'

class App extends React.Component {
    constructor(props) {
        super();
        this.canvasRef5 = React.createRef()
        this.canvasRef9 = React.createRef()
        this.overlay5Ref = React.createRef()
        this.overlay9Ref = React.createRef()
        //

        this.state = {
            ['dragging']:false,
            hex:'',
            red:10,
            green:10,
            blue:10,
            Cursor1_x:150,
            Cursor1_y:150,
            backgroundColor_overlay9:'black',
        }

    }

    componentDidMount() {
        console.log('=== componentDidMount'+Date.now())
        // period set
        // this.interval = setInterval(() => this.setState({ time: Date.now() }), 1000);

        this.fillCanvas5()
        this.fillCanvas9()

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

    fillCanvas5 = (event) => {

        var spectrumCanvas = this.canvasRef5;
        var spectrumCtx = spectrumCanvas.current.getContext('2d');
        var canvas = spectrumCanvas.current;
        var ctx = spectrumCtx;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

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



    }

    fillCanvas9 = (event) => {

        var spectrumCanvas = this.canvasRef9;
        var spectrumCtx = spectrumCanvas.current.getContext('2d');
        var canvas = spectrumCanvas.current;
        var ctx = spectrumCtx;

        var hueGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        hueGradient.addColorStop(0.00, "hsl(0, 100%, 50%)");
        hueGradient.addColorStop(0.17, "hsl(298.8, 100%, 50%)");
        hueGradient.addColorStop(0.33, "hsl(241.2, 100%, 50%)");
        hueGradient.addColorStop(0.50, "hsl(180, 100%, 50%)");
        hueGradient.addColorStop(0.67, "hsl(118.8, 100%, 50%)");
        hueGradient.addColorStop(0.83, "hsl(61.2, 100%, 50%)");
        hueGradient.addColorStop(1.00, "hsl(360, 100%, 50%)");
        ctx.fillStyle = hueGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

    }



    // 555555555555
    // 555555555555
    // 555555555555

    onDragOver5 = (event) => {

        console.log("=== onDragOver5")

        event.preventDefault();

        console.log(event.target.id)
        // ev.target.appendChild(document.getElementById(data));
    }

    onDrop5 = (event) => {
        console.log("=== onDrop5")

        event.preventDefault();
        console.log(event.target.id)
        // ev.target.appendChild(document.getElementById(data));
    }

    // 9999999999
    // 9999999999
    // 9999999999

    onDragOver9 = (event) => {

        console.log("=== onDragOver9")

        event.preventDefault();

        console.log(event.target.id)
        // ev.target.appendChild(document.getElementById(data));

        event.dataTransfer.setDragImage(event.target, '10px', '10px');

        // this.overlay9Ref.current.='black'
        // this.setState (() => ({
        //      backgroundColor_overlay9 : 'black'
        // }))


    }

    onDrop9 = (event) => {
        console.log("=== onDrop9")

        event.preventDefault();
        console.log(event.target.id)
        // ev.target.appendChild(document.getElementById(data));
    }

    render() {



        return (
            <>

            <div>class App</div>



                <br/>

                <div>
                    <div id="container5">
                        <canvas id="canvas5"
                            ref={this.canvasRef5}
                            dropable="true"
                            onDrop={this.onDrop5}
                            onDragOver={this.onDragOver5}
                        >
                        </canvas>


                        <div id="overlay5"
                             draggable="true"
                        >

                        </div>


                    </div>


                </div>

                <div id="container9">

                    <canvas id="canvas9"
                            ref={this.canvasRef9}
                            dropable="true"
                            onDrop={this.onDrop9}
                            onDragOver={this.onDragOver9}
                    >

                    </canvas>


                    <div id="overlay9"
                         className="overlay9class"
                         draggable="true"
                        // style={{color:this.state.backgroundColor_overlay9}}
                    >
                    </div>



                </div>


            </>
        )
    }
}

export default App;
