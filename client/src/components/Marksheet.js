
import React from 'react';
import Header from '../FormsUI/Header';
import { Formik, Form } from 'formik';
import axios from "axios"
import * as Yup from 'yup';
import {
  Container,Box,
  Grid,Link,
  Typography,
  Paper
} from '@mui/material';
import Textfield from '../FormsUI/Textfield';
import Button from '../FormsUI/Button';
import { useNavigate } from 'react-router-dom';



const INITIAL_FORM_STATE = {

  email: '',
  S1:"",
  S2:"",
  S3:""

};

const FORM_VALIDATION = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  S1: Yup.number().integer()
    .required('Required'),
  S2: Yup.number().integer()
    .required('Required'),
  S3: Yup.number().integer()
    .required('Required'),

});

const Register= () => {
  
  async function handleSubmit(values)
  {
    try{
      const { email,S1,S2,S3} = values

      async function link (e){

      await axios.post("http://localhost:8000/addMark",{
         email,S1,S2,S3

     })
     .then(res => {
         console.log(res.data)
         if(res.data === "exist"){
           alert("Student marks added")
           
         }else if(res.data === "not exist"){
           alert("Student doesnot exist")
         }
     })
    }

     link()   

   }
    catch(e){
      console.log(e)
   }

  }
  const navigate = useNavigate();

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
                      type="text"
                      name="S1"
                      label="Math"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Textfield
                      type="text"
                      name="S2"
                      label="Physics"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Textfield
                      type="text"
                      name="S3"
                      label="Chemistry"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button type="submit">
                      Submit Form
                    </Button>
                  </Grid>

                  
                  <Grid  item xs={12}>
                   <Link component="button"
                    variant="body2"
                    onClick={()=>{
                      navigate("/home")
                    }}>Back</Link>
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
            backgroundImage: 'url(https://img.freepik.com/premium-vector/positive-business-woman_441769-262.jpg?size=626&ext=jpg)',
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
