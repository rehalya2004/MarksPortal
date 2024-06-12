
import React from 'react';
import Header from '../FormsUI/Header';
import { Formik, Form } from 'formik';
import axios from "axios"
import { useNavigate} from "react-router-dom";
import * as Yup from 'yup';
import {
  Container,Box,
  Grid,Link,
  Typography,
  Paper
} from '@mui/material';
import Textfield from '../FormsUI/Textfield';
import Button from '../FormsUI/Button';


const INITIAL_FORM_STATE = {

  email: '',
  S1: "",
  S2:"",
  S3:""

};

const FORM_VALIDATION = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email.')
    .required('Required'),
  S1: Yup.string()
    .required('Required'),
  S2: Yup.string()
    .required('Required'),
  S3: Yup.string()
    .required('Required'),

});

const Register= () => {
  const history = useNavigate();
  
  async function handleSubmit(values){
    try{
      const { email,S1,S2,S3} = values
      async function link (e){

      await axios.post("http://localhost:8000/addMark",{
         email,S1,S2,S3
     })
     .then(res => {

         if(res.data === "exist"){
           alert("User already exist")
           
         }else if(res.data === "not exist"){
           alert("Successfully Registered !! Please Login to Continue")
           history("/login",{state:{id:email}})
         }
     })
     .catch(e=>{
         alert("Wrong Details");
         console.log(e)
     })

    }
    link()   
   }
    catch(e){
      console.log(e)
   }

  }

  return (
    <div>
      <Grid item xs={12}>
        <Header />
      </Grid>

      <Grid container component="main" sx={{ height: '100vh' }}>

      <Grid item xs={12}sm={8} md={5} component={Paper} elevation={6} square>

        <Container maxWidth="md" > 
          <div>
          <Box
          sx={{
            my: 6,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            
          }}
          >
            <Formik
              initialValues={{
                ...INITIAL_FORM_STATE
              }}
              validationSchema={FORM_VALIDATION}
              onSubmit={handleSubmit}
            >
              <Form>

                <Grid container spacing={1.5} >

                  <Grid item xs={12} >
                    <Typography variant="h2" color="primary">
                      Award Marks
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <Textfield
                    type="email"
                      name="email"
                      label="Email"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Textfield
                      name="S1"
                      label="Math"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Textfield
                      name="S2"
                      label="Physics"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Textfield
                      name="S3"
                      label="Chemistry"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button type="submit">
                      Submit Form
                    </Button>
                  </Grid>
                  
                </Grid>

              </Form>
            </Formik>
          </Box>
          </div>
           
          </Container>
      </Grid>
      <Grid
          item
          xs={12}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?w=740&t=st=1680455065~exp=1680455665~hmac=fc5a95cafbac9ad928ac6b0989c7e18b0a5396269d081cd05ebac5ba99d590e2)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
      />
    </Grid>
    </div>
  );
};

export default Register;