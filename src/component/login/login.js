import React, { useState } from "react";
import { connect } from 'react-redux'
import { actionsStore } from '../../redux/actions/actions'
import Http from '../../config/axios';
import { useNavigate } from 'react-router-dom';
import {
    Card, Avatar, CssBaseline, TextField, Link, Box, Typography, Container, OutlinedInput, InputLabel, InputAdornment, FormHelperText, FormControl, IconButton
} from '@mui/material';
import MyButton from '@mui/material/Button'
import { LockOutlined } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import './style.css'

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'.'}<Link color="inherit" href="#">Call Clean</Link>{' '}{new Date().getFullYear()} {' '}{'© '}
        </Typography>
    );
}

const theme = createTheme();

const mapDispatchToProps = (dispatch) => ({
    addNewUser: (token) => dispatch(actionsStore.addNewUser(token)),
    setUserKind: (token) => dispatch(actionsStore.setUserKind(token)),
    setError: (token) => dispatch(actionsStore.setError(token)),
    setIsLoading: (token) => dispatch(actionsStore.setIsLoading(token)),
    setSuccess: (token) => dispatch(actionsStore.setSuccess(token))
})

export default connect(null, mapDispatchToProps)(function Login(props) {
    const {
        setUserKind, setIsLoading,
        addNewUser,
        setError,
        setSuccess } = props;
    const [values, setValues] = React.useState({
        password: '',
        mail: '',
        showPassword: false
    });
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()

    function login() {

        const user = {
            "email": values["mail"],
            "password": values["password"]
        }
        Http.post('UserLogin/Login', user)
            .then(res => {
                setIsLoading(false)
                if (res.data === "משתמש לא קיים") {
                    setError("משתמש לא קיים. עליך להרשם")
                }
                else {
                    addNewUser(res.data);
                    if (res.data.isFemale === undefined) {
                        navigate("/client", { replace: true });
                        setUserKind("customer");
                    }
                    else {
                        navigate("/worker", { replace: true });
                        setUserKind("worker");
                    }

                }
            })
            .catch((err) => {
                setIsLoading(false)
                setError('הפעולה נכשלה, נסה שוב.')
            })
    }

    function handleValidation() {
        let formvalues = values;
        let error = {};
        let formIsValid = true;

        if (!formvalues["password"]) {
            formIsValid = false;
            error["password"] = "חובה להכניס סיסמא";
        }
        else {
            error["password"] = "";
        }
        if (!formvalues["mail"]) {
            formIsValid = false;
            error["mail"] = "חובה להכניס מייל";
        }
        else {
            error["mail"] = "";
        }
        if (typeof formvalues["mail"] !== "undefined" && formvalues["mail"]) {
            if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(formvalues["mail"]) === false) {
                formIsValid = false;
                error["mail"] = "כתובת מייל לא חוקית";
            }
            else {
                error["mail"] = "";
            }
        }
        setErrors(error)
        return formIsValid
    }

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    function contactSubmit(e) {
        setError('')
        e.preventDefault();
        if (handleValidation()) {
            setErrors({})
            setIsLoading(true)
            login()
        }
    }

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    function navigateOne() {
        setError('')
        let formvalues = values;
        if (!formvalues["mail"]) {
            setErrors({ ...errors, "mail": "חובה להכניס מייל" })
        }
        else {
            setErrors({})
            setIsLoading(true)
            Http.post(`UserLogin/ForgotPassword?mail=${values["mail"]}` )
                .then(res => {
                    setSuccess("הסיסמא נשלחה למייל שלך על ידי המערכת.")
                    setIsLoading(false)
                })
                .catch((err) => {
                    setError('הפעולה נכשלה, נסה שוב.')
                    setIsLoading(false)
                })
        }
    }

    return (
        <div className="login">
            <Card>
                <ThemeProvider theme={theme}>
                    <Container
                        component="main" maxWidth="xs">
                        <CssBaseline />
                        <Box sx={{
                            direction: 'ltr',
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                        >
                            <Avatar >
                                <LockOutlined />
                            </Avatar>
                            <Typography
                                component="h1" variant="h5">
                                כניסה          </Typography>
                            <Box className="box2" component="form" noValidate >
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="כתובת מייל"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    helperText={
                                        <div >
                                            {errors["mail"]}
                                        </div>}
                                    onChange={handleChange('mail')}
                                />
                                <FormControl fullWidth required variant="outlined">
                                    <InputLabel htmlFor="password">סיסמא</InputLabel>
                                    <OutlinedInput
                                        id="password"
                                        type={values.showPassword ? 'text' : 'password'}
                                        value={values.password}
                                        onChange={handleChange('password')}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                >
                                                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="סיסמא"
                                    />
                                    <FormHelperText >{errors["password"]}</FormHelperText>
                                </FormControl>
                                <div className="button1">
                                    <MyButton
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        onClick={contactSubmit}
                                    >
                                        כניסה
                        </MyButton>
                                </div>
                                <MyButton sx={{ margin: "auto", direction: "ltr", marginLeft: "initial" }}>
                                    <Link variant="body2" onClick={navigateOne}>
                                        שכחתי סיסמא
                                    </Link>
                                </MyButton>
                            </Box>
                        </Box>
                        <p className="copy">
                            <Copyright /></p>
                    </Container>
                </ThemeProvider>
            </Card>
        </div>
    )
})
