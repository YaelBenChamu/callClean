import React
    // , { useState }
    from "react";
import PropTypes from 'prop-types';
import { Box, Collapse, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, Button } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { connect } from 'react-redux'
import '../../../App.css'
import Http from '../../../config/axios';
import { actionsStore } from '../../../redux/actions/actions'
import { useParams } from 'react-router-dom'

const mapDispatchToProps = (dispatch) => ({
    setIsLoading: (token) => dispatch(actionsStore.setIsLoading(token)),
    setError: (token) => dispatch(actionsStore.setError(token)),
    setSuccess: (token) => dispatch(actionsStore.setSuccess(token))
})

function createData(name, mail, date, address, floor, entrance, phone, description, day, beginingTime, endingTime, ok) {
    return {
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
    // const [sug, setSug] = useState(undefined)
    function ok() {
        mySetIsLoading(true)
        setOkJob({ ...okJob, okJob: row.ok });
        const work = {
            "WorkId": row.id,
            "IsTemporary": row.day ? false : true,
        }
        Http.post('Cleaner/ApprovalWork', work)
            .then(res => {
                mySetIsLoading(false)
                mySetSuccess("הפעולה עברה בהצלחה")
                res.json()
                setOkJob(res.job.ok)
                row.ok = !row.ok
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
                    {row.ok === true ? <TableCell align="right">
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

const rows = [];

export default connect(null, mapDispatchToProps)(function VerifyOneSuggestion(props) {
    const { setIsLoading, setError, setSuccess } = props;
    const params = useParams();
    const workId = params["id"].substring(14, params["id"].length - 14)
    const isPermanent = params["isPermanent"] === "true" ? true : false;

    React.useEffect(() => {
        setIsLoading(true)
        debugger
        Http.get(`Cleaner/GetWorkForApproval?workId=${workId}&isPermanent=${isPermanent}`)
            .then(job => {
                setIsLoading(false)
                let sug = createData(job.data.name, job.data.mail, job.data.date, job.data.address, job.data.floor, job.data.entrance, job.data.phone, job.data.ok)
                rows.push(sug)
            })
            .catch((err) => {
                setIsLoading(false)
                setError("הפעולה נכשלה")
            })
    }, [setIsLoading, setError, isPermanent, workId])

    return (
        <>
            <div className="proposals"
            >
                <h1 >הצעת עבודה לאישור</h1>
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
