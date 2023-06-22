import { Box, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Paper, Grid } from "@mui/material"
import { useForm } from 'react-hook-form'
import { Container } from "@mui/material";
import { SYSTEM_NAME, DASHBOARD_PATH} from '../config/constants'
import LoginIcon from '@mui/icons-material/Login';
import api from '../../services/authUserAPI'
import Swal from 'sweetalert2'

const Signin = () => {
  
  //Set title
  document.title = SYSTEM_NAME

    // useForm hook
    const { register, handleSubmit, formState: { errors } } = useForm()

    // onSubmit function
    const onSubmit = (data: any) => {
    // console.log(data)

    // Call API
    const authData = {
      "identifier": data.username,
      "password": data.password
    }

    api.authLogin(authData).then((res: any) => {
      console.log(res)
      if(res.status === 200){
        // console.log("Login success")
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'กำลังเข้าสู่ระบบ...',
          showConfirmButton: false,
          timer: 1500
        }).then(()=>{

          // save token to local storage
          localStorage.setItem("token", res.data.jwt)
          
          // redirect to dashboard
          window.location.href = DASHBOARD_PATH

        })
      }
    }).catch((error) => {
      console.log(error)
      // alert("Login failed")

      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'ชื่อผู้ใช้ หรือ รหัสผ่านไม่ถูกต้อง!',
        // showConfirmButton: false,
        // timer: 1500
      })
    })
  }

  return (
    <Container component="main" maxWidth="lg">
      <Box sx={{ marginTop: 15,}}>
        <Grid container>
          <CssBaseline />
          <Grid item xs={false} sm={4} md={7}
            sx={styles.bgSignin}
          />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }} >
              <Box 
                component={'img'}
                sx={styles.appLogo}
                src="/assets/logo-demo.png" />

              <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }} >
                <TextField
                  margin="normal"
                  fullWidth
                  autoFocus
                  label="ชื่อผู้ใช้"
                  type="text"
                  variant="outlined"
                  {...register("username", { required: true, minLength: 5 })}
                  error={errors.username ? true : false}
                  helperText={errors.username ? "Username is required | minLength 5 character" : ""}
                />

                <TextField
                  margin="normal"
                  fullWidth
                  label="รหัสผ่าน"
                  type="password"
                  variant="outlined"
                  {...register("password", { required: true })}
                  error={errors.password ? true : false}
                  helperText={errors.password ? "Password is required" : ""}
                />

                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="info"
                  startIcon={<LoginIcon />}
                  sx={{ mt: 3, mb: 3 }}
                >
                  LOGIN
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/signup" variant="body2">
                      {"Don't have an account? Sign Up"}
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
  bgSignin: {
    backgroundImage: "url(/assets/bg-signin.jpg)",
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