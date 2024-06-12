import { Grid,Paper, Typography,Box} from '@mui/material';
import Header from '../FormsUI/Header';
import { useEffect , useState} from 'react';
import axios from "axios"
const store = localStorage.getItem("token")

const auth = {
  method: "GET",
  headers: { 'Authorization': `Bearer ${store}` }
}

const Mark = () => {
  const [mark,setMark] = useState({})
   useEffect(()=>{
      showMark()
   },[])

  const showMark = async() => {
    await axios.get("http://localhost:8000/viewMark", auth)
  .then(
    res => {
      console.log(res)
      setMark(res.data)
    }
  )
  .catch(
    (e)=>{
      console.log(e)
    }
    
  )
  }


  const  paper = {padding : 20 ,height :"50vh", width:300 , justifyContent:"center"}

  return (
    <div>
      <Header/>

      <Grid container component="main" sx={{ height: '100vh' , justifyContent:"center", alignItems: "center"}}> <Grid>

      <Paper elevation = {10} style = {paper}>

      <Typography variant="h2" color="primary">RESULT</Typography>
      
      <Box
        component="img"
        sx={{
          height: 200,
          width: 300,
          maxHeight: { xs: 233, md: 167 },
          maxWidth: { xs: 350, md: 250 },
        }}
        alt="The house from the offer."
        src="https://www.pngmart.com/files/17/Student-PNG-HD.png"
      />
<br></br>
<br></br>
      <Typography variant='h6'>
       MATH : {mark.S1}
      </Typography>
      <Typography variant='h6'>
       PHYSICS : {mark.S2}
      </Typography>
      <Typography variant='h6'>
       CHEMISTRY : {mark.S3}
      </Typography>
       
       
      
      
      </Paper>

      </Grid>

      </Grid>
    
    </div>

  )
}

export default Mark
