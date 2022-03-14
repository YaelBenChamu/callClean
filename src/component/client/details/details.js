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
    setSuccess: (token) => dispatch(actionsStore.setSuccess(token)),
})

export default connect(null, mapDispatchToProps)(function DetailsClient(props) {
    const { editUserDetails, setUserKind, setIsLoading, setError,setSuccess } = props;
    const navigate = useNavigate();

    function update(updatedUser) {
        Http.post('Customer/Update', updatedUser).then(res => {
            setIsLoading(false)
            if (res.data !== "העדכון נכשל") {
                setSuccess("הפעולה עברה בהצלחה")
                setUserKind("customer");
                editUserDetails(res.data);
                navigate("/client", { replace: true });
            }
            else {
                setError("הפעולה נכשלה. יתכן ואינך מזוהה כלקוח")
            }
        }).catch(err => {
            setIsLoading(false)
            setError("הפעולה נכשלה")
        }
        )
    }

    return (
        <DetailsForm isWorker={false} isRegister={false} handleFunc={update} />
    )
})
