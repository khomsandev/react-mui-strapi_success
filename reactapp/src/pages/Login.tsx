import { Grid, TextField, Button, Box, Container, Typography, Checkbox, FormControlLabel, Link } from '@mui/material'
import { useForm } from 'react-hook-form'
import { SYSTEM_NAME, DASHBOARD_PATH} from '../config/constants'
import api from '../../services/authUserAPI'
import Swal from 'sweetalert2'
import LoginIcon from '@mui/icons-material/Login'

const Login = () => {

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
        console.log("Login success")

        Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        }).fire({
          icon: 'success',
          title: 'กำลังเข้าสู่ระบบ...'
        }).then(()=>{

          // redirect to dashboard
          window.location.href = DASHBOARD_PATH

          // save token to local storage
          localStorage.setItem("token", res.data.jwt)

        })
      }
    }).catch((error) => {
      console.log(error)
      // alert("Login failed")

      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'ชื่อผู้ใช้งาน หรือ รหัสผ่านไม่ถูกต้อง!',
        // showConfirmButton: false,
        // timer: 1500
      })
    })
  }

  return (
    <>
      <Container component="main" maxWidth="xs">

        <Box
          sx={{
            boxShadow: 3,
            borderRadius: 2,
            px: 4,
            py: 6,
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
        <Box 
          component={'img'}
          sx={styles.appLogo}
          src="/assets/logo-demo.png" />
          <Typography component="h5" variant="h5">
            Stock Management
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>

            <TextField
              margin="normal"
              fullWidth
              autoFocus
              label="ชื่อผู้ใช้งาน"
              type="text"
              variant="outlined"
              {...register("username", { required: true, minLength: 5 })}
              error={errors.username ? true : false}
              helperText={errors.username ? "Username is required" : ""}
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
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>

          </Box>
        </Box>

      </Container >
    </>
  )
}

const styles = {
  appLogo: {
      borderRadius: 2,
      width: 100,
      mb: 2,
      cursor: 'pointer',

  }
}

export default Login