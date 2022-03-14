import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Box, Collapse, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, Button } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { connect } from 'react-redux'
import '../../../App.css'
import Http from '../../../config/axios';
import { actionsStore } from '../../../redux/actions/actions'
import { useNavigate } from 'react-router-dom'

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => ({
    setIsLoading: (token) => dispatch(actionsStore.setIsLoading(token)),
    setError: (token) => dispatch(actionsStore.setError(token)),
    setSuccess: (token) => dispatch(actionsStore.setSuccess(token))
})

function createData(id, name, mail, date, address, floor, entrance, phone, description, day, beginingTime, endingTime, ok) {
    return {
        id,
        name,
        mail,
        date,
        address,
        phone,
        description,
        floor,
        entrance,
        day,
        beginingTime,
        endingTime,
        ok
    };
}

function Row(props) {
    const { row, mySetIsLoading, mySetError, mySetSuccess } = props;
    const [open, setOpen] = React.useState(false);
    const [okJob, setOkJob] = React.useState();
    const navigate = useNavigate();

    function ok() {
        mySetIsLoading(true)
        setOkJob({ ...okJob, okJob: row.ok });
        const work = {
            "WorkId": row.id,
            "IsTemporary": row.day ? false : true,
        }
        debugger
        Http.post('Cleaner/ApprovalWork', work)
            .then(res => {
                mySetIsLoading(false)
                mySetSuccess("הפעולה עברה בהצלחה")
                res.json()
                setOkJob(res.job.ok)
                row.ok = !row.ok
                navigate("/About", { replace: true });
                // setSug(res);
            })
            .catch((err) => {
                mySetIsLoading(false)
                mySetError("הפעולה נכשלה")
            })
    }
    return (
        <>
            <React.Fragment>
                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                    <TableCell component="th" align="right">
                        {row.name}
                    </TableCell>
                    <TableCell align="right">{row.mail}</TableCell>
                    <TableCell align="right">{row.address}</TableCell>
                    <TableCell align="right">{row.floor}</TableCell>
                    <TableCell align="right">{row.entrance}</TableCell>
                    <TableCell align="right">{row.phone}</TableCell>
                    <TableCell align="right">{row.date}</TableCell>
                    <TableCell align="right">{row.day}</TableCell>
                    <TableCell align="right">{row.beginingTime}</TableCell>
                    <TableCell align="right">{row.endingTime}</TableCell>
                    <TableCell align="right">{row.ok ? 'לא מאושר' : 'מאושר'}</TableCell>
                    {row.ok === false ? <TableCell align="right">
                        <Button variant="contained" onClick={ok}>אישור</Button>
                    </TableCell>
                        : <TableCell align="right">
                            -
                        </TableCell>}
                    <TableCell>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                        </IconButton>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1 }}>
                                <Typography variant="h6" gutterBottom component="div">
                                    {row.description}
                                </Typography>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment >  </>
    );
}


Row.propTypes = {
    row: PropTypes.shape({
        id: PropTypes.number.isRequired,
        address: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        mail: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        floor: PropTypes.number.isRequired,
        entrance: PropTypes.number.isRequired,
        description: PropTypes.number.isRequired,
        beginingTime: PropTypes.number.isRequired,
        endingTime: PropTypes.number.isRequired,
        day: PropTypes.number.isRequired,
        ok: PropTypes.bool.isRequired,
    }).isRequired,
};

// createData(1, 'Dan Cohen', "d@gmail.com", '', "Sorozkin", 5, "2", "0556772585", "נקיון כללי", "wednesday", "16:30", "18:30", true),
// createData(2, 'Gad Levy', "d@gmail.com", "", "Sorozkin", 6, "a", "0556772585", "נקיון לאחר שפוץ", "wednesday", "15:30", "17:00", false),
// createData(3, 'Avy Cohen', "d@gmail.com", "", "Sorozkin", -1, "2", "0556772585", "נקיון חלונות", "thursday", "18:00", "21:00", true),
// createData(4, 'Moshe Levy', "d@gmail.com", "23/7/2020", "Sorozkin", 2, "", "0556772585", "Pesach cleaning", "", "18:00", "21:00", false),


export default connect(mapStateToProps, mapDispatchToProps)(function ProposalsForApproval(props) {
    const { user, setIsLoading, setError, setSuccess } = props;
    const [rows, setRows] = useState([])

    React.useEffect(() => {
        setIsLoading(true)
        Http.get(`Cleaner/GetWorksForApproval?cleanerMail=${user.mail}`)
            .then(jobs => {
                setIsLoading(false)
                let suggestions = []
                jobs.data.forEach(element => {
                    let start = element.Work.starting_time.substring(11, 19);
                    let end = element.Work.ending_time.substring(11, 19);
                    let dayName = undefined;
                    if (element.Work.day) {
                        let day = Number(element.Work.day)
                        dayName = day === 1 ? "ראשון" : day === 2 ? "שני" : day === 3 ? "שלישי" : day === 4 ? "רביעי" : day === 5 ? "חמישי" : "שישי";
                    }
                    let job = createData(element.Work.id, element.Customer.name, element.Customer.mail, element.Work.day ? undefined : element.Work.date, element.Customer.address, element.Customer.floor, element.Customer.entrance, element.Customer.phone, element.Work.description, dayName, start, end, false)
                    suggestions.push(job)
                });
                setRows(suggestions)
                debugger
            })
            .catch((err) => {
                setIsLoading(false)
                setError("הפעולה נכשלה")
            })
    }, [user, setIsLoading, setError])

    return (
        <>
            <div className="proposals"
                style={{
                    width: "1000px"
                }} >
                <h1 >הצעות עבודה לאישור</h1>
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">פרטי הלקוח</TableCell>
                                <TableCell align="right"></TableCell>
                                <TableCell align="right"></TableCell>
                                <TableCell align="right"></TableCell>
                                <TableCell align="right"></TableCell>
                                <TableCell align="right"></TableCell>
                                <TableCell align="right">פרטי העבודה</TableCell>
                                <TableCell align="right"></TableCell>
                                <TableCell align="right"></TableCell>
                                <TableCell align="right"></TableCell>
                                <TableCell align="right"></TableCell>
                                <TableCell align="right"></TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">שם</TableCell>
                                <TableCell align="right">מייל</TableCell>
                                <TableCell align="right">כתובת</TableCell>
                                <TableCell align="right">קומה</TableCell>
                                <TableCell align="right">כניסת בנין</TableCell>
                                <TableCell align="right">טלפון</TableCell>
                                <TableCell align="right">תאריך</TableCell>
                                <TableCell align="right">יום בשבוע</TableCell>
                                <TableCell align="right">שעת התחלה</TableCell>
                                <TableCell align="right">שעת סיום</TableCell>
                                <TableCell align="right">סטטוס</TableCell>
                                <TableCell align="right">שינוי סטטוס</TableCell>
                                <TableCell align="right">פרטים נוספים</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <Row key={row.name} row={row} mySetIsLoading={setIsLoading} mySetError={setError} mySetSuccess={setSuccess} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    );
})
