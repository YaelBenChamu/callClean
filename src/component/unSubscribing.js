import React, { useState } from "react";
import { Modal } from 'react-bootstrap';
import { Button } from '@mobiscroll/react';
import { connect } from 'react-redux'
import { actionsStore } from '../redux/actions/actions';
import Http from '../config/axios';
import { useNavigate } from 'react-router-dom'

function mapStateToProps(state) {
    return {
        user: state.user,
        userKind: state.userKind
    }
}

const mapDispatchToProps = (dispatch) => ({
    setIsLoading: (token) => dispatch(actionsStore.setIsLoading(token)),
    setError: (token) => dispatch(actionsStore.setError(token)),
    setSuccess: (token) => dispatch(actionsStore.setSuccess(token)),
})

export default connect(mapStateToProps, mapDispatchToProps)(function UnSubscribing(props) {
    const [message, setMessage] = useState(true)
    const { user, userKind, setIsLoading, setError, setSuccess } = props;
    const navigate = useNavigate()

    const handleClose = () => {
        setMessage(false);
        navigate("/About",{replace:true})
    }

    function unSubscribe() {
        setIsLoading(true)
        if (userKind === 'worker') {
            Http.get(`Cleaner/UnSuscribe?cleanerMail=${user.mail}`).then(() => {
                setIsLoading(false)
                setSuccess("הפעולה עברה בהצלחה")
            }).catch(err => {
                setIsLoading(false)
                setError("הפעולה נכשלה, נסה שוב")
            })
        }
    }

    return (
        <>
            <Modal
                show={message}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header >
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    לסיום שמוש בשרותי האתר עליך לבטל ידנית את כל העבודות שלך
             <br />
             ולאחר מכן לבקש מהמערכת הפסקת קבלת שרותיה
             <br />
             מרגע התנתקותך לא תקבל הצעות עבודה נוספות
                    <Button onClick={unSubscribe}>נתק אותי מהמערכת</Button>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose} variant="primary">הבנתי</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
})
