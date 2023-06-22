import { Box, Button, CssBaseline, TextField, Link, Paper, Grid, Typography } from "@mui/material"
import { useForm } from 'react-hook-form'
import { Container } from "@mui/material";
import { SYSTEM_NAME } from '../config/constants'
import AssignmentIcon from '@mui/icons-material/Assignment';
import api from '../../services/signupUserAPI'
import Swal from 'sweetalert2'

const Signin = () => {
  
  //Set title
  document.title = SYSTEM_NAME

  // useForm hook
  const { register, handleSubmit, formState: { errors } } = useForm()

    // onSubmit function
    const onSubmit = (data: any) => {
    console.log(data)

    // Call API
    const authData = {
        "username": data.username,  
        "email": data.email,  
        "password": data.password
    }

    api.SignUp(authData).then((res: any) => {
      console.log(res)
      if(res.status === 200){
        // console.log("Login success")

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'เพิ่มผู้ใช้งานใหม่เรียบร้อย',
          showConfirmButton: false,
          timer: 1500
        }).then(()=>{
          
          // redirect to Login Page
          window.location.href = "/"

        })
      }
    }).catch((error) => {
      console.log(error)
      // alert("Login failed")

      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'เพิ่มผู้ใช้งานใหม่ไม่สำเร็จ! \n กรุณาตรวจสอบข้อมูลอีกครั้ง',
        // showConfirmButton: false,
        // timer: 1500
      })
    })

  }


  return (
    <Container component="main" maxWidth="xl">
      <Box sx={{mt:5, mb:5}}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={styles.bgSignup}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box 
              component={'img'}
              sx={styles.appLogo}
              src="/assets/logo-demo.png"
            />
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }} >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    id="username"
                    label="Username"
                    autoComplete="given-name"
                    required
                    fullWidth
                    autoFocus
                    {...register("username", { required: true, minLength: 5 })}
                    error={errors.username ? true : false}
                    helperText={errors.username ? "Username is required | minLength 5 character" : ""}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="email"
                    label="Email"
                    autoComplete="email"
                    required
                    fullWidth
                    {...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i})}
                    error={errors.email ? true : false}
                    helperText={errors.email ? "Email is required" : ""}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="password"
                    label="Password"
                    type="password"
                    autoComplete="new-password"
                    required
                    fullWidth
                    {...register("password", { required: true})}
                    error={errors.password ? true : false}
                    helperText={errors.password ? "Password is required" : ""}
                  />
                </Grid>
                {/* <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid> */}
              </Grid>
              <Button
                color="info"
                type="submit"
                startIcon={<AssignmentIcon />}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/" variant="body2">
                    Already have an account? Sign In
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
      </Box>
    </Container>
  );
}

const styles = {
  appLogo: {
      borderRadius: 2,
      width: 100,
      mb: 2,
      cursor: 'pointer',

  },
  bgSignup: {
    backgroundImage: "url(/assets/bg-signup.jpg)",
    backgroundRepeat: "no-repeat",
    // backgroundColor: (t) =>
    //   t.palette.mode === "light"
    //     ? t.palette.grey[50]
    //     : t.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center"
  }
}

export default Signin