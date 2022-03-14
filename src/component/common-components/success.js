import React from "react";
import { Modal } from 'react-bootstrap';
import { Button } from '@mobiscroll/react';
import { CheckCircleOutline } from '@mui/icons-material';
import { connect } from 'react-redux'
import { actionsStore } from '../../redux/actions/actions'

function mapStateToProps(state) {
    return {
        success: state.success
    }
}

const mapDispatchToProps = (dispatch) => ({
    setSuccess: (token) => dispatch(actionsStore.setSuccess(token))
})

export default connect(mapStateToProps, mapDispatchToProps)(function Success(props) {
    const handleClose = () => setSuccess('');
    const { success,setSuccess  } = props;

    return (
        <Modal
            show={success}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header >
                <Modal.Title><CheckCircleOutline style={{color:"green"}}/></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {success}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleClose} variant="primary">הבנתי</Button>
            </Modal.Footer>
        </Modal>
    )
})
