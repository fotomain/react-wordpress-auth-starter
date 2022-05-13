import React, {Component} from 'react'

// ionic build --prod; ionic cap sync --prod; ionic serve
// ionic build --prod; ionic cap sync --prod;
// ionic serve


class Book2Display extends React.Component {
    constructor(props) {
        super();

        this.state = this.getInitialState(props)

    }

    getInitialState(props){
        var obj = {
            mode_degug_log:false,
            arr_lexemas: props.arr_lexemas
        }

        // props.arr_lexemas.length
        for (let i = 0; i < 2300 ; i++) {
            obj['lexema_name_'+i] = props.arr_lexemas[i].lexema_text
        }

        return obj
    }

    componentDidMount() {
        console.log('=== componentDidMount Books2Display'+Date.now())
        // console.log("=== lexema_name 2 state")

        var arr = this.state.arr_lexemas
        // console.log(arr)
        // arr.length
        for (let i = 0; i <2300 ; i++) {
            this.setState( {
                ['lexema_name_'+i] : arr[i].lexema_text,
            })
            // console.log(i)
        }


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

    onclick_lexema({e}){
        console.log(e.target.id)

        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        const {arr_lexemas} = this.state
        return (
            <div style={{lineHeight:'1px', display:'flex', flexDirection:'row', flexWrap:'wrap'}}>
                <div> class Book2Display </div>

                {(arr_lexemas)?

                    // arr_lexemas.length
                    arr_lexemas.map((el,ii,arr)=> ((ii>2300)?'':
                        (this.state[`lexema_name_`+ii]==' ')?'':
                        <p
                            style={{paddingRight:'1ch'}}
                            type={`text`}
                            key={`lexema_key_`+ii}
                            id={`lexema_id_`+ii}
                            name={`lexema_name_`+ii}
                            onClick={(e)=>this.onclick_lexema({e:e})}
                            value={this.state[`lexema_name_`+ii]}
                            onChange={(e)=>this.onclick_lexema({e:e})}
                        >
                            {this.state[`lexema_name_`+ii]}
                        </p>


                    ))

                :''}

                {/*<div>{JSON.stringify(this.state)}</div>*/}

            </div>
        )
    }
}

export default Book2Display;
