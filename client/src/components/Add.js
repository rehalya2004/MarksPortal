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
  name: '',
  password : '',
  email: '',
  role : "student"
};

const FORM_VALIDATION = Yup.object().shape({
  name: Yup.string()
    .required('Required'),
  password: Yup.string()
    .required('Required'),
  email: Yup.string()
    .email('Invalid email.')
    .required('Required'),
  role: Yup.string().default("student")
});

const Register= () => {

  
  async function handleSubmit(values){
    try{
      const { name ,email,password,role} = values
      async function link (e){

      await axios.post("http://localhost:8000/signup",{
         name ,email,password,role
     })
     .then(res => {

         if(res.data === "exist"){
           alert("User already exist")
           
         }else if(res.data === "not exist"){
           alert("Successfully Registered !! Please Login to Continue")
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
                      Student details
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Textfield
                      name="name"
                      label="name"
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <Textfield
                    type="email"
                      name="email"
                      label="Email"
                    />
                  </Grid>

                  
                  <Grid item xs={12}>
                    <Textfield
                     type="password"
                      name="password"
                      label="Password"
                    />
                  </Grid>


                  <Grid item xs={12}>
                    <Textfield
                      name="role"
                      label="Role"
                      disabled = "true"
                      
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
            backgroundImage: 'url(https://img.freepik.com/free-vector/college-university-students-group-young-happy-people-standing-isolated-white-background_575670-66.jpg?w=900&t=st=1681644754~exp=1681645354~hmac=96d348b3f13b403fbc8243f59574651051e654071ba360fac1f8dc9ffc647d4c)',
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