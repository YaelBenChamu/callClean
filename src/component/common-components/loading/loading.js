import React from "react";
import { connect } from 'react-redux'
import { Box, Modal, CircularProgress } from '@mui/material';


function mapStateToProps(state) {
    return {
        isLoading: state.isLoading
    }
}

export default connect(mapStateToProps)(function Loading(props) {
    const { isLoading
    } = props;

    return (
        <div className="loading">
            <Modal
                open={isLoading}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlighn: "center" }}>
                    <CircularProgress sx={{ color: "white" }} />
                </Box>
            </Modal>
        </div>
    )
})
