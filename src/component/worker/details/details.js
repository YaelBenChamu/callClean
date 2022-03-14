import React from "react";
import { connect } from 'react-redux'
import { actionsStore } from '../../../redux/actions/actions';
import Http from '../../../config/axios';
import { useNavigate } from 'react-router-dom'
import DetailsForm from '../../common-components/details/detailsForm';

const mapDispatchToProps = (dispatch) => ({
    editUserDetails: (token) => dispatch(actionsStore.editUserDetails(token)),
    setUserKind: (token) => dispatch(actionsStore.setUserKind(token)),
    setIsLoading: (token) => dispatch(actionsStore.setIsLoading(token)),
    setError: (token) => dispatch(actionsStore.setError(token)),
    setSuccess: (token) => dispatch(actionsStore.setSuccess(token))
})

export default connect(null, mapDispatchToProps)(function DetailsWorker(props) {
    const { editUserDetails, setUserKind, setIsLoading, setError, setSuccess } = props;
    const navigate = useNavigate()
    function update(updatedUser) {
        Http.post('Cleaner/Update', updatedUser).then(res => {
            setIsLoading(false)
            if (res.data !== "העדכון נכשל") {
                setUserKind("worker");
                setSuccess("הפעולה עברה בהצלחה")
                editUserDetails(res.data)
                navigate("/worker", { replace: true });
            } else {
                setError("הפעולה נכשלה. יתכן ואינך מזוהה כעובד.")
            }
        }).catch(err => {
            setIsLoading(false)
            setError("הפעולה נכשלה")
        }
        )
    }

    return (
        <DetailsForm isWorker={true} isRegister={false} handleFunc={update} />
    )
})
