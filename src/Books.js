import React, {Component} from "react";
import axios from 'axios';


class Books extends Component {
    state = {
        books:[],
        isLoaded:false,
    }
    componentDidMount(){
        console.log('=== componentDidMount books '+Date.now())
        const url_root="https://antinedoebit.com/wp-json/wp/v2/books"
        axios.get(url_root).then((res)=>this.setState({
            books:res.data,
            isLoaded:true,
        })).catch(err=>{
            console.log(err)
        }
        )

    }

    render() {
        // console.log(this.state)
        const {books, isLoaded} = this.state;

        if (isLoaded && books )
            {

                return (
                    <div>
                        <div>======= isLoaded</div>
                        {
                            books.map( (book,ii,aa) => (
                                <div id={'id_'+ii.toString()} key={'k1_'+ii.toString()} >
                                    <h4>{book.title.rendered}</h4>
                                </div>
                            ))
                        }
                    </div>
                )

            }

        return (
                <div>
                    <div>======= Books</div>
                </div>
        )
        // if (isLoaded && books )
        // {
        //     return (
        //         <div>
        //             <div>======= Books</div>
        //
        //             <div>
        //                 {
        //                     books.map( book => (
        //                         <h4>{book.title.rendered}</h4>
        //                     ))
        //                 }
        //             </div>
        //
        //         </div>
        //     );
        //
        //     return "Loading..."
        // }
    }
}

export default Books;
