import React from "react";
import App from "./App";

// https://www.freecodecamp.org/news/reactjs-implement-drag-and-drop-feature-without-using-external-libraries-ad8994429f1a/

class Draggable extends React.Component {

// class Draggable extends React.createClass({
    constructor(props) {
        super();
        console.log("=== props Draggable ")
        console.log(props)
        console.log(props.canvasRef?.current)
        // this.handleChange = this.handleChange.bind(this);
        this.state = {

            canvasID: props.canvasID,
            pos: {x: 0, y: 0},
            dragging: false,
            rel: null, // position relative to the cursor

            x0:0,
            y0:0,

            currentX: 0,
            currentY: 0,

        }

        // this.x0 = 0
        // this.y0 = 0

        this.divRef = React.createRef();
        this.canvasRef  = props.canvasRef
        this.canvasID   = props.canvasID

        this.f_output   = props.f_output




    }

    componentDidMount() {
        console.log('=== Draggable '+Date.now())

        window.addEventListener('mousemove', (e)=>this.onMouseMove_on_Window(e))
        window.addEventListener('mouseup',   (e)=>this.onMouseUp_on_Window(e))

        if (this.canvasRef){

            console.log("=== this.canvasRef")
            console.log(this.canvasRef)

            var spectrumRect =  this.canvasRef.current.getBoundingClientRect()

            console.log("=== spectrumRect")
            console.log(spectrumRect)

            this.setState (() => ({
                // ...this.state,
                x0: spectrumRect.left,
                y0: spectrumRect.top,
            }))

        }



            // period set
            // this.interval = setInterval(() => this.setState({ time: Date.now() }), 1000);

    }

    componentDidUpdate = (props, state) => {

        console.log("=== componentDidUpdate state")
        console.log( state )

         // if (this.state.dragging  ) {
         //     window.addEventListener('mousemove', (e)=>this.onMouseMove_on_Window(e))
         //     window.addEventListener('mouseup',   (e)=>this.onMouseUp_on_Window(e))
         // }

         // this.setState({...state})

        // if (!this.state.dragging  ) {
        //     document.removeEventListener('mousemove', this.onMouseMove)
        //     document.removeEventListener('mouseup', this.onMouseUp)
        // }

    }

    onMouseMove_on_Window = (event) =>  {

        event.preventDefault();
        // event.stopPropagation()

        if(this.state.dragging) {
            console.log("=== onMouseMove_on_Window")
            // console.log(event.pageX,' ',event.pageY)
            // console.log(event.target.id)

            // var spectrumRect =  this.canvasRef.current.getBoundingClientRect()


            // var el = document.getElementById("canvasID1")
            // var el = document.getElementById(this.state.canvasID)
            // var el = this.canvasRef.current
            // var spectrumRect = el.getBoundingClientRect()
            //
            //  var x0 = spectrumRect.left
            //  var y0 = spectrumRect.top

            var x0 = this.state.x0
            var y0 = this.state.y0

            let x1 = event.pageX - x0 -10
            let y1 = event.pageY - y0 -10

            // ===  this.props.children.ref.current.style.left  = x1 + 'px';
            // ===  this.props.children.ref.current.style.top   = y1 + 'px';

            this.f_output({x:x1 + 'px',y:y1 + 'px'})


        }


    }

    rgbToHex(r, g, b){
        if (r > 255 || g > 255 || b > 255)
            throw "Invalid color component";
        return ((r << 16) | (g << 8) | b).toString(16);
    }

    onMouseUp_on_Window = (event) =>  {

        if(this.state.dragging) {

            console.log("=== onMouseUp_on_Window")
            console.log(event.pageX, ' ', event.pageY)
            console.log(event.pageX - this.state.x0, ' ', event.pageY - this.state.y0)
            const x1 = event.pageX - this.state.x0
            const y1 = event.pageY - this.state.y0

            var p = this.canvasRef.current.getContext('2d').getImageData(x1, y1, 1, 1).data;
            var hex = "#" + ("000000" + this.rgbToHex(p[0], p[1], p[2])).slice(-6);
            console.log(p[0])
            console.log(p[1])
            console.log(p[2])

            this.setState(() => ({
                // ...this.state,
                ['red']: p[0],
                ['green']: p[1],
                ['blue']: p[2],
                ['hex']: hex,
                dragging: false,
                currentX: event.pageX,
                currentY: event.pageY,
                x1: x1,
                y1: y1,
            }))

            console.log("=== onMouseUp_on_Window - state ", this.state)
        }

        event.stopPropagation()
        event.preventDefault()
    }

    // calculate relative position to the mouse and set dragging=true

    onMouseDown_on_div = (event) =>  {

        event.stopPropagation()
        event.preventDefault()

        console.log("=== onMouseDown_on_div - Draggable")
        this.setState (() => ({
            // ...this.state,
            dragging: true
        }))

        // // only left mouse button
        // if (e.button !== 0) return
        // // var pos = $(this.getDOMNode()).offset()
        // var pos = e.target
        // console.log(pos)
        // this.setState({
        //     dragging: true,
        //     rel: {
        //         x: e.pageX - pos.offsetLeft,
        //         y: e.pageY - pos.offsetTop
        //     }
        // })
        //
        // console.log("=== onMouseDown_on_div this.state")
        // console.log(this.state.pos)
        // console.log(this.state.rel)
        //

    }

    onMouseUp_on_div = (event) => {
        // not needed
        return
        console.log("=== onMouseUp_on_div - Draggable")
        this.setState (() => ({
            // ...this.state,
            dragging: false
        }))
        // console.log(this.state.pos)
        // console.log(this.state.rel)

        event.stopPropagation()
        event.preventDefault()
    }

    onTouchEnd_on_div = (event) => {

        this.setState (() => ({
            // ...this.state,
            dragging: false
        }))

        console.log("=== onTouchEnd_on_div - Draggable")
        console.log(this.state.pos)
        console.log(this.state.rel)

        event.stopPropagation()
        event.preventDefault()

    }

    onMouseMove_on_div = (event) =>  {
        // not needed
        return
        console.log("=== onMouseMove_on_div - Draggable")
        // if (!this.state.dragging) return
        // this.setState({
        //     pos: {
        //         x: e.pageX - this.state.rel.x,
        //         y: e.pageY - this.state.rel.y
        //     }
        // })
        event.stopPropagation()
        event.preventDefault()

    }

    onDragStart = (e,id) =>  {
        console.log("=== onDragStart")
        console.log("=== id")
        console.log(id)
        console.log(e)
    }

    render () {


        // transferPropsTo will merge style & other props passed into our
        // component to also be on the child DIV.


        return (

            <div>
                <div
                    ref={this.divRef}
                    // className='draggable'
                    // draggable={true}

                    // onDragStart={this.onDragStart}
                    id={this.props.children.id+'_drag'}

                    // onMouseDown ={this.onMouseDown_on_div}
                    // onMouseMove ={this.onMouseMove_on_div}
                    // onMouseUp   ={this.onMouseUp_on_div}

                        onTouchStart ={this.onMouseDown_on_div}
                        onTouchMove  ={this.onMouseMove_on_div}
                        onTouchEnd   ={this.onMouseUp_on_div}

                    // passive      ={false}

                >
                    {/*{this.props.children.id}*/}

                    {this.props.children}


                </div>

                {/*<div style={{ position: 'absolute', color: 'green'}}>*/}
                {/*    <br/>*/}
                {/*    {JSON.stringify(this.state)}*/}
                {/*    <br/>*/}
                {/*</div>*/}

            </div>


            //
            // React.cloneElement(React.Children.only(this.props.children), {
            //     // Note: mouseMove handler is attached to document so it will still function
            //     // when the user drags quickly and leaves the bounds of the element.
            //     onMouseDown_on_div: this.onMouseDown_on_div,
            //     onMouseUp: this.onMouseUp,
            //     // onTouchStart is added on `componentDidMount` so they can be added with
            //     // {passive: false}, which allows it to cancel. See
            //     // https://developers.google.com/web/updates/2017/01/scrolling-intervention
            //     onTouchEnd: this.onTouchEnd
            // })

        )
    }
}

export default Draggable;
