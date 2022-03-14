import React, { useState } from "react";
import { connect } from 'react-redux'
import {
    FormHelperText, Button, CardContent, CardActions, Card, Typography, TextField, Autocomplete, Stack
} from "@mui/material";
import {
    LocalizationProvider, TimePicker, DatePicker
} from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import './style.css';
import { actionsStore } from '../../../../redux/actions/actions'
import ErrorPage from '../../../common-components/error'

function mapStateToProps(state) {
    return {
        error: state.error,
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => ({
    setIsLoading: (token) => dispatch(actionsStore.setIsLoading(token))
})

export default connect(mapStateToProps, mapDispatchToProps)(function Job(props) {
    const { user, isPermanent, handleForm, setIsLoading, error } = props;
    let days = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי"]
    const [fields, setFields] = useState({ description: 'נקיון כללי' })
    const [errors, setErrors] = useState({})
    const [beginningTime, setBeginningTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [day, setDay] = useState();
    const [dateOfWork, setDateOfWork] = useState(null);

    function getResult() {
        if (isPermanent) {
            let myDayNumber = day === "ראשון" ? 1 : day === "שני" ? 2 : day === "שלישי" ? 3 : day === "רביעי" ? 4 : day === "חמישי" ? 5 : 6;
            const job = {
                "Job": {
                    "beginingTime": beginningTime,
                    "endingTime": endTime,
                    "day": Number(myDayNumber),
                    "description": fields["description"]
                },
                "CustomerMail": user.mail,
                "Password": user.password
            };
            debugger
            handleForm(job)
        }
        else {
            const job = {
                "Job": {
                    "beginingTime": beginningTime,
                    "endingTime": endTime,
                    "date": dateOfWork,
                    "description": fields["description"]
                },
                "customerMail": user.mail,
                "customerPassword": user.password
            };
            handleForm(job)
        }
    }

    function handleValidation() {
        let error = {};
        let formIsValid = true;
        if (isPermanent) {
            debugger
            if (day === undefined || day==="") {
                formIsValid = false;
                error["day"] = "שדה חובה";
            }
            // else (day === "שישי") {
            // if(endTime && endTime.hour<14:00(&&>6))
            //     {
            //         formIsValid = false;
            //         error["day"] = "שדה חובה";
            //     }
            // }
        } else {
            if (dateOfWork === null) {
                formIsValid = false;
                error["dateOfWork"] = "שדה חובה";
            }
        }
        if (!beginningTime) {
            formIsValid = false;
            error["beginningTime"] = "שדה חובה";
        }
        if (!endTime || endTime==="Invalid Date") {
            formIsValid = false;
            error["endTime"] = "שדה חובה";
        }
        debugger
        if (endTime && beginningTime) {
            if (endTime < beginningTime) {
                formIsValid = false;
                error["endTime"] = "שדה לא תקין. על תאריך סיום ליהיות מאוחר יותר מתאריך התחלה";
            }
        }
        setErrors(error)
        return formIsValid
    }

    const handleChange = (prop) => (event) => {
        setFields({ ...fields, [prop]: event.target.value });
        debugger

    }

    function contactSubmit(e) {
        e.preventDefault();
        if (handleValidation()) {
            setIsLoading(true)
            getResult();
        }
    }

    return (
        <>
            <div className="job">
                <Card>
                    <CardContent >
                        <Typography variant="h5" component="div">
                            {isPermanent ? <p>עבודה קבועה</p> : <p>עבודה זמנית</p>}
                        </Typography>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Stack spacing={3}>
                                {isPermanent && <Autocomplete
                                    disablePortal
                                    id="day"
                                    options={days}
                                    onInputChange={(event, newInputValue) => {
                                        setDay(newInputValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} label="יום בשבוע" />}
                                />}{isPermanent && <FormHelperText >{fields["day"] !== undefined ? "היום הראשון לעבודה הוא מהיום הנבחר הקרוב, באם תאושר הבקשה לפני יום זה" : errors["day"]}
                                </FormHelperText>}
                                {!isPermanent && <DatePicker
                                    views={['year', 'month', 'day']}
                                    label="תאריך"
                                    value={dateOfWork}
                                    onChange={(newValue) => {
                                        setDateOfWork(newValue)
                                    }}
                                    renderInput={(params) => <TextField {...params} helperText={errors.dateOfWork} />}
                                />}
                                <TimePicker
                                    label="שעת התחלה"
                                    value={beginningTime}
                                    onChange={(newValue) => {
                                        setBeginningTime(newValue)
                                    }}
                                    renderInput={(params) => <TextField {...params} helperText={errors.beginningTime} />}
                                />
                                <TimePicker
                                    label="שעת סיום"
                                    value={endTime}
                                    onChange={(newValue) => {
                                        setEndTime(newValue)
                                    }}
                                    renderInput={(params) => <TextField {...params} helperText={errors.endTime} />}
                                />
                                <TextField
                                    label="תאור העבודה"
                                    multiline
                                    rows={4}
                                    value={fields.description}
                                    onChange={handleChange('description')}
                                />
                            </Stack>
                        </LocalizationProvider>
                    </CardContent>
                    <CardActions>
                        <Button
                            onClick={contactSubmit}>שלח בקשה </Button>
                    </CardActions>
                </Card>
                {error && <ErrorPage />}
            </div>
        </>
    )
})
