import React, {
    useState, useEffect
} from "react";
import { connect } from 'react-redux'
import { actionsStore } from '../../../redux/actions/actions'
import Http from '../../../config/axios';
import {
    Input, InputLabel, FormHelperText, FormControl, CardContent, CardActions, Card, Typography, Select, MenuItem, InputAdornment, IconButton
} from "@mui/material";
import MyButton from '@mui/material/Button'
import { VisibilityOff, Visibility } from '@mui/icons-material';
import './style.css';
import Autocomplete from "react-google-autocomplete";

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => ({
    addNewUser: (token) => dispatch(actionsStore.addNewUser(token)),
    setUserKind: (token) => dispatch(actionsStore.setUserKind(token)),
    setIsLoading: (token) => dispatch(actionsStore.setIsLoading(token)),
    setError: (token) => dispatch(actionsStore.setError(token))
})

export default connect(mapStateToProps, mapDispatchToProps)(function DetailsForm(props) {
    const { user, isWorker, isRegister, handleFunc, setIsLoading, setError } = props;
    const [fields, setFields] = React.useState({
        name: '',
        password: '',
        email: '',
        gender: '',
        phone: '',
        entrance: '',
        floor: '',
        rate: ''
    });
    const [showPassword, setShowPassword] = useState(false)
    const [googleMapsValue, setGoogleValue] = React.useState({
        lat: -34.397,
        lng: 150.644,
        location: ''
    });
    const [errors, setErrors] = useState({ location: 'הכנס: יישוב, רחוב ומספר בנין.' })

    function register() {
        if (isWorker) {
            const myUser = {
                "isFemale": fields["gender"]==="female"?true:false,
                "name": fields["name"],
                "mail": isRegister ? fields["email"] : user.mail,
                "password": fields["password"],
                "lat": googleMapsValue["lat"],
                "length": googleMapsValue["lng"],
                "phone": fields["phone"],
                "tariff": Number(fields["rate"]),
                "identity": "123456789"
            }
            handleFunc(myUser);
            return;
        }
        else {
            const myUser = {
                "name": fields["name"],
                "mail": isRegister ? fields["email"] : user.mail,
                "password": fields["password"],
                "lat": googleMapsValue["lat"],
                "length": googleMapsValue["lng"],
                "floor": Number(fields["floor"]),
                "phone": fields["phone"],
                "entrance": fields["entrance"],
                "address": googleMapsValue["location"]
            }
            handleFunc(myUser);
        }
    }
    const handleOnPlaceSelected = (place) => {
        setGoogleValue({
            "location": place.formatted_address,
            "lat": place.geometry.location.lat(),
            "lng": place.geometry.location.lng(),
        })
        setErrors({
            ...errors,
            "location": ''
        })
    }
    function handleValidation() {
        let formfields = { ...fields };
        let error = {};
        let formIsValid = true;
        if (isWorker) {
            if (!formfields["gender"]) {
                formIsValid = false;
                error["gender"] = "שדה חובה";
            }
            if (!formfields["rate"]) {
                formIsValid = false;
                error["rate"] = "שדה חובה";
            }
            if (formfields["rate"] && formfields["rate"] < 30) {
                formIsValid = false;
                error["rate"] = "התעריף חיב ליהיות לפחות 30";
            }
        }
        else {
            if (!formfields["floor"]) {
                formIsValid = false;
                error["floor"] = "שדה חובה";
            }
        }

        if (!formfields["name"]) {
            formIsValid = false;
            error["name"] = "שדה חובה";
        }
        if (typeof formfields["name"] !== "undefined" && formfields["name"] !== '') {
            if (!formfields["name"].match(/^[a-z\u0590-\u05fe ]*$/i)) {
                formIsValid = false;
                error["name"] = "אותיות ורווחים בלבד";
            }
        }
        if (!formfields["password"]) {
            formIsValid = false;
            error["password"] = "שדה חובה";
        }
        else if (!formfields["password"].match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)) {
            formIsValid = false;
            error["password"] = "הכנס לפחות 6 תווים הכוללים תו מיוחד, ספרה, אות קטנה וגדולה באנגלית";
        }
        if (isRegister) {
            if (!formfields["email"]) {
                formIsValid = false;
                error["email"] = "שדה חובה";
            }
            if (typeof formfields["email"] !== "undefined") {
                if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(formfields["email"]) === false) {
                    formIsValid = false;
                    error["email"] = "כתובת מייל לא חוקית";
                }
            }
        }
        if (!googleMapsValue["location"]) {
            formIsValid = false;
            error["location"] = "יש לבחור את הצעת התיבה המתאימה";
        }
        if (!formfields["phone"]) {
            formIsValid = false;
            error["phone"] = "שדה חובה";
        }
        if (typeof formfields["phone"] !== "undefined" && formfields["phone"]) {
            if (formfields["phone"].length < 9) {
                formIsValid = false;
                error["phone"] = "מספר טלפון לא חוקי";
            }
            if (!formfields["phone"].match(/^[0-9]+$/)) {
                formIsValid = false;
                error["phone"] = "מספרים בלבד";
            }
        }
        setErrors(error)
        return formIsValid
    }

    const handleChange = (prop) => (event) => {
        setFields({ ...fields, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    function contactSubmit(e) {
        e.preventDefault();
        if (handleValidation()) {
            setErrors({})
            setIsLoading(true)
            register()
        }
    }

    useEffect(() => {
        if (!isRegister)
            setIsLoading(true)
        if (user !== undefined) {
            if ((!isRegister) && (!isWorker)) {
                Http.get(`Customer/GetCustomer?mail=${user.mail}&password=${user.password}`).then(res => {
                    setIsLoading(false)
                    setFields(res.data)
                    debugger
                }).catch(err => {
                    setIsLoading(false)
                    setError("פעולת קבלת הפרטים שלך נכשלה. נסה שוב")
                })
            } else if ((!isRegister) && (isWorker)) {
                Http.get(`Cleaner/GetCleaner?mail=${user.mail}&password=${user.password}`)
                    .then(res => {
                        setFields(res.data);
                        setIsLoading(false)
                    }).catch(err => {
                        setError("פעולת קבלת הפרטים שלך נכשלה. נסה שוב")
                        setIsLoading(false)
                    }
                    )
            }
        }
    }, [isRegister, isWorker, user, setIsLoading, setError]);

    return (
        <div className="detailsForm">
            <Card>
                <CardContent>
                    <Typography variant="h5">
                        {isRegister ? isWorker ? <p>הרשמת עובד</p> : <p>הרשמת לקוח</p> : isWorker ? <p>פרטי עובד</p> : <p>פרטי לקוח</p>}
                    </Typography>
                    <FormControl required sx={{ ml: "80px" }} variant="standard">
                        <InputLabel htmlFor="name" >שם מלא</InputLabel>
                        <Input id="name" type="text" value={fields.name} onChange={handleChange('name')} />
                        <FormHelperText>{errors["name"]} </FormHelperText>
                    </FormControl>
                    {isWorker && <FormControl variant="standard" >
                        <InputLabel required htmlFor="rate" >תעריף</InputLabel>
                        <Input id="rate" type="number" value={fields.rate} onChange={handleChange('rate')} />
                        <FormHelperText>{errors["rate"]} </FormHelperText>
                    </FormControl>}
                    {!isWorker && <FormControl variant="standard" >
                        <InputLabel htmlFor="mail" >כניסת בנין</InputLabel>
                        <Input id="entrance" type="text" value={fields.entrance} onChange={handleChange('entrance')} />
                    </FormControl>}
                    <FormControl required sx={{ ml: "80px" }} variant="standard" >
                        <InputLabel htmlFor="password" >סיסמא</InputLabel>
                        <Input id="password" value={fields.password} onChange={handleChange('password')}
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton onClick={handleClickShowPassword}>
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        <FormHelperText>{errors["password"]} </FormHelperText>
                    </FormControl>
                    <div className="googleMapDiv1">
                        {/* <label className="googleMapLabel" for="googleMapInput">כתובת</label> */}
                        <div className="googleMapDiv" >
                            <Autocomplete
                                placeholder="כתובת"
                                id="googleMapInput"
                                className="googleMap"
                                required
                                apiKey="AIzaSyBwBhST7RvyHmk9JLlkMPHp8LAfY7AqIEw"
                                onPlaceSelected={(place) => handleOnPlaceSelected(place)}
                                onChange={(place) => {
                                    setGoogleValue({
                                        ...googleMapsValue,
                                        location: ''
                                    })
                                }}
                                options={{
                                    types: ['address'],
                                    componentRestrictions: { country: "il" },
                                }}
                            />
                        </div>
                        <FormHelperText>{errors["location"]}</FormHelperText>
                    </div>
                    {(isWorker && isRegister) && <FormControl sx={{ ml: "80px" }} variant="standard" >
                        <InputLabel required htmlFor="gender">מגדר</InputLabel>
                        <Select id="gender" value={fields.gender} onChange={handleChange('gender')}>
                            <MenuItem value="male">זכר</MenuItem>
                            <MenuItem value="female">נקבה</MenuItem>
                        </Select>
                        <FormHelperText>{errors["gender"]} </FormHelperText>
                    </FormControl>}
                    {!isWorker && <FormControl sx={{ ml: "80px" }} variant="standard" >
                        <InputLabel required htmlFor="mail" >קומה</InputLabel>
                        <Input id="floor" type="number" value={fields.floor} onChange={handleChange('floor')} />
                        <FormHelperText>{errors["floor"]} </FormHelperText>
                    </FormControl>}
                    <FormControl required variant="standard" >
                        <InputLabel htmlFor="mail">מספר טלפון</InputLabel>
                        <Input id="phone" type="text" value={fields.phone} onChange={handleChange('phone')} inputProps={{ minLength: 9, maxLength: 11 }} />
                        <FormHelperText>{errors["phone"]} </FormHelperText>
                    </FormControl>
                    {isRegister && <FormControl required variant="standard" >
                        <InputLabel htmlFor="email" >מייל</InputLabel>
                        <Input id="email" type="text" value={fields.email} onChange={handleChange('email')} />
                        <FormHelperText>{errors["email"]}</FormHelperText>
                    </FormControl>}
                </CardContent>
                <CardActions>
                    <MyButton onClick={contactSubmit}>{isRegister ? <p>הרשמה</p> : <p>עדכון</p>}</MyButton>
                </CardActions>
                <br />
            </Card >
        </div>
    )
}) 
