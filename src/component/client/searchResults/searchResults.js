import * as React from 'react';
import { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Modal, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router';
import '../../../App.css'
import { connect } from 'react-redux'
import Http from '../../../config/axios';
import { actionsStore } from '../../../redux/actions/actions'

function mapStateToProps(state) {
    return {
        user: state.user,
        job: state.job,
        isPermanent: state.isPermanent
    }
}

const mapDispatchToProps = (dispatch) => ({
    setIsLoading: (token) => dispatch(actionsStore.setIsLoading(token)),
    setError: (token) => dispatch(actionsStore.setError(token)),
    setSuccess: (token) => dispatch(actionsStore.setSuccess(token))
})

function createData(name, mail, phone, isFemale, tariff,lat,length,identity,id,address,password) {
    return { name, mail, phone, isFemale, tariff,lat,length,identity,id,address,password };
}

export default connect(mapStateToProps, mapDispatchToProps)(function SearchResults(props) {
    const { user, job, isPermanent, 
        // suggestions,
         setIsLoading, setError, setSuccess } = props;
    const navigate = useNavigate()
    const [currentWorker, setCurrentWorker] = useState(null)
    const [show, setShow] = useState(false);
    const [rows,setRows] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // useEffect(() => {
    //     suggestions.forEach(element => {
    //         let suggestion = createData(element.name, element.mail, element.phone, element.gender, element.tariff)
    //         rows.push(suggestion)

    //     });
    //     setSug(true)
    // }, [suggestions, rows])

    React.useEffect(() => {
        setIsLoading(true)
        if (!isPermanent) {
            Http.post(`TemporaryWork/Search`, job)
                .then(res => {
                    debugger
                    setSuccess("הפעולה עברה בהצלחה")
                    setIsLoading(false)
                    let suggestions=[]
                    res.data.forEach(element => {
                        let suggestion = createData(element.name, element.mail, element.phone, element.isFemale, element.tariff,element.lat,element.length,element.identity,element.id,element.address,element.password)
                        suggestions.push(suggestion)
                    });
                    setRows(suggestions)
                })
                .catch((err) => {
                    setError('הפעולה נכשלה, נסה שוב.')
                    setIsLoading(false)
                })
        } else {
            // Http.get(`Customer/MyWorker?user=${user}&work=${job}&isPermanent=${isPermanent}`)
            //     .then(res => {
            //         setIsLoading(false)
            //         setJobId(res[1].id)
            //         if (res[0] !== null)
            //             setSug(true)
            //         setRows(res[0]);
            //     })
            //     .catch((err) => {
            //         setIsLoading(false)
            //         setError("הפעולה נכשלה")
            //     })
            debugger
            Http.post('PermanentWork/Search', job)
                .then(res => {
                    debugger
                    setIsLoading(false)
                    setSuccess("הפעולה עברה בהצלחה")
                    debugger
                    let suggestions=[]
                    res.data.forEach(element => {
                        let suggestion = createData(element.name, element.mail, element.phone, element.isFemale, element.tariff,element.lat,element.length,element.identity,element.id,"vjhb",element.password)
                        suggestions.push(suggestion)
                    });
                    setRows(suggestions)
                    debugger
                    // setJob(res);
                    // if (res[0] !== null)
                    // setRows(res[0]);
                    // rows.push(res[0])
                })
                .catch((err) => {
                    setIsLoading(false)
                    setError('הפעולה נכשלה, נסה שוב.')
                })
        }
    }, []);
    // user, job, isPermanent, setIsLoading, setError, setJob, rows, suggestions, setSuccess

    function select(worker) {
        setIsLoading(true)
        setCurrentWorker(worker)
        if (isPermanent) {
            debugger
            let objects={
                "Job":job.Job,
                "Cleaner":worker,
                "Customer":user
            }
            Http.post('PermanentWork/Add', objects)
                .then(res => {
                    debugger
                    setIsLoading(false)
                    setSuccess("הפעולה עברה בהצלחה")
                    handleShow()
                }
                ).catch((err) => {
                    setIsLoading(false)
                    setError("הפעולה נכשלה")
                })
        }
        else{
            debugger
            Http.post('TemporaryWork/Add', job.job, user,worker)
            .then(res => {
                setIsLoading(false)
                setSuccess("הפעולה עברה בהצלחה")
                handleShow()
            }
            ).catch((err) => {
                setIsLoading(false)
                setError("הפעולה נכשלה")
            })
        }
    }

    function afterClose() {
        handleClose()
        navigate("/client", { replace: true });
    }

    return (
        <>
            <h1 >תוצאות חיפוש עובד</h1>
             <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">שם</TableCell>
                            <TableCell align="right">מין</TableCell>
                            <TableCell align="right">מייל</TableCell>
                            <TableCell align="right">פלאפון</TableCell>
                            <TableCell align="right">מחיר לשעה</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.mail}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" align="right">  {row.name}  </TableCell>
                                <TableCell align="right">{row.isFemale?"נקבה":"זכר"}</TableCell>
                                <TableCell align="right">{row.mail}</TableCell>
                                <TableCell align="right">{row.phone}</TableCell>
                                <TableCell align="right">{row.tariff}</TableCell>
                                <TableCell align="right"><button className='btn btn-primary' type='button' onClick={() => select(row)}>בחר</button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header >
                    <Modal.Title>לקוח יקר</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    בקשתך נשלחה לעובד {currentWorker !== null ? currentWorker.name : ''} וממתינה לאישורו
                    בעת אישור העובד תשלח לך הודעה למייל
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={afterClose} variant="primary">הבנתי</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
})
