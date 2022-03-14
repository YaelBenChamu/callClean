import React from "react";
import { Modal } from 'react-bootstrap';
import { Button } from '@mobiscroll/react';
import { ErrorOutline } from '@mui/icons-material';
import { connect } from 'react-redux'
import { actionsStore } from '../../redux/actions/actions'

function mapStateToProps(state) {
    return {
        error: state.error
    }
}

const mapDispatchToProps = (dispatch) => ({
    setError: (token) => dispatch(actionsStore.setError(token))
})

export default connect(mapStateToProps, mapDispatchToProps)(function Error(props) {
    const handleClose = () => setError('');
    const { error, setError } = props;

    return (
        <Modal
            show={error}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header >
                <Modal.Title><ErrorOutline style={{color:"#EB0014"}}/> הודעת שגיאה</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleClose} variant="primary">הבנתי</Button>
            </Modal.Footer>
        </Modal>
    )
})
