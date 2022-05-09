import React from "react";

// ionic build --prod; ionic cap sync --prod;
// ionic build --prod; ionic cap sync --prod; ionic serve
// ionic serve

import { HexColorPicker } from "react-colorful";

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
    }

    componentDidMount() {
        console.log('=== componentDidMount'+Date.now())
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

    render() {
        return(

            <Container className={this.classes_edit.Container}>
                <Typography variant="h4">
                    Your best pies !
                </Typography>

                <Formik
                    initialValues={
                        {
                            color1:'',
                            TextField1:'111',
                            TextField2:'222'
                        }
                    }
                    onSubmit={(values)=>{
                        console.log("=== onSubmit");
                        console.log(values);

                    }}

                    validate={(values)=>{
                        console.log("=== validate");
                        console.log(values);

                    }}
                >
                    {({
                          values,
                          errors,
                          handleChange,
                          handleBlur,
                          touched,
                          setFieldValue,
                          handleSubmit
                      })=>
                        (<form onSubmit={handleSubmit}>
                            {/*this.classes_edit.FlexRow*/}
                            <Box sx={{

                                display: 'inline-flex',
                                flexWrap:'wrap',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                width:'100%',

                                marginTop:'1rem',



                            }}>


                                {/*//content_font_family*/}
                                {/*//name__row__111__col__content_text*/}
                                {/*//name__row__111__col__content_font_family*/}
                                {/*//name__row__111__col__content_font_size*/}
                                {/*//  id__row__111__col__content_font_family*/}

                                {/*<Box*/}
                                {/*    sx={{flex: 2, minWidth:'250em'}}*/}
                                {/*>*/}

                                <TextField

                                    // sx={{ flex:1, minWidth:'100rem' }}
                                    sx={{
                                        flex:2,
                                        minWidth:'15rem'
                                    }}

                                    name="TextField1"
                                    value={values.TextField1}
                                    error={errors.TextField1 && touched.TextField1}
                                    onChange={handleChange}
                                    onBlur={handleBlur}

                                    variant={'outlined'}
                                    label="Text 1"
                                    type="name"
                                    className={this.classes_edit.textField}

                                ></TextField>
                                {/*</Box>*/}

                                <Box sx={{
                                    display: 'flex' ,
                                    flex:1,
                                    // minWidth:'10rem',
                                    flexDirection:'row',
                                    justifyContent:'space-between',
                                    // width:(1==2)?'100%':'30%'
                                    // width:'100%'
                                    flexGrow: 1

                                }}
                                >
                                    {/*<Box ></Box>*/}

                                    <HexColorPicker
                                        color={values.color1}
                                        onChange={ (event) => {
                                            // console.log(event)
                                            setFieldValue('color1',event)
                                            setFieldValue('TextField4',event)
                                                }
                                        }
                                    />


                                    <TextField

                                        sx={{flex: 1 , minWidth:'8rem' }}

                                        name="TextField2"
                                        value={values.TextField2}
                                        error={errors.TextField2 && touched.TextField2}
                                        onChange={handleChange}
                                        onFocus={(event)=>{
                                            console.log("=== TextField2 onFocus ")

                                        }}
                                        onKeyUp={(event)=>{
                                            console.log("=== TextField2 onKeyUp ")
                                            setFieldValue('TextField1','xxxxxxxxx')
                                            // setFieldValue('TextField3','xxxxxxxxx')
                                        }

                                        }
                                        onBlur=
                                            {(event)=> {
                                                console.log("=== TextField2 onBlur ")
                                            }
                                            }

                                        variant={'outlined'}
                                        label="Text 2"
                                        type="name"
                                        className={this.classes_edit.textField}

                                    >



                                    </TextField>

                                    <TextField

                                        sx={{flex: 0.5, minWidth:'5rem', maxWidth:'10em'}}

                                        name="TextField3"
                                        label="TextField3"
                                        value={values.TextField3}

                                    >
                                    </TextField>


                                    <TextField

                                        sx={{flex: 0.5, minWidth:'5rem', maxWidth:'10em'}}

                                        name="TextField4"
                                        label="TextField4"
                                        value={values.TextField4 || ''}

                                    >
                                    </TextField>

                                    <TextField

                                        sx={{flex: 0.5, minWidth:'5rem', maxWidth:'10em'}}

                                        name="TextField5"
                                        label="TextField5"
                                        value={values.TextField5}

                                    >
                                    </TextField>

                                </Box>


                                <Box sx={{
                                    display: 'flex' ,
                                    flex:1,
                                    // minWidth:'10rem',
                                    flexDirection:'row',
                                    justifyContent:'space-between',
                                    // width:(1==2)?'100%':'30%'
                                    // width:'100%'
                                    flexGrow: 1

                                }}
                                >
                                    {/*<Box ></Box>*/}
                                    <TextField

                                        sx={{flex: 1 , minWidth:'8rem' }}

                                        name="TextField2"
                                        value={values.TextField2}
                                        error={errors.TextField2 && touched.TextField2}
                                        onChange={handleChange}
                                        onFocus={(event)=>{
                                            console.log("=== TextField2 onFocus ")

                                        }}
                                        onKeyUp={(event)=>{
                                            console.log("=== TextField2 onKeyUp ")
                                            setFieldValue('TextField1','xxxxxxxxx')
                                            // setFieldValue('TextField3','xxxxxxxxx')
                                        }

                                        }
                                        onBlur=
                                            {(event)=> {
                                                console.log("=== TextField2 onBlur ")
                                            }
                                            }

                                        variant={'outlined'}
                                        label="Text 2"
                                        type="name"
                                        className={this.classes_edit.textField}

                                    >



                                    </TextField>

                                    <TextField

                                        sx={{flex: 0.5, minWidth:'5rem', maxWidth:'10em'}}

                                        name="TextField3"
                                        label="TextField3"

                                    >
                                    </TextField>


                                    <TextField

                                        sx={{flex: 0.5, minWidth:'5rem', maxWidth:'10em'}}

                                        name="TextField4"
                                        label="TextField4"

                                    >
                                    </TextField>

                                    <TextField

                                        sx={{flex: 0.5, minWidth:'5rem', maxWidth:'10em'}}

                                        name="TextField5"
                                        label="TextField5"

                                    >
                                    </TextField>

                                </Box>

                            </Box>
                        </form>) //</form>
                    }

                </Formik>

            </Container>

        )

    }
}

export default App;
