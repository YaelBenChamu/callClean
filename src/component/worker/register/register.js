import React from "react";
import { connect } from 'react-redux'
import { actionsStore } from '../../../redux/actions/actions';
import Http from '../../../config/axios';
import { useNavigate } from 'react-router-dom'
import DetailsForm from '../../common-components/details/detailsForm';

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => ({
    addNewUser: (token) => dispatch(actionsStore.addNewUser(token)),
    setUserKind: (token) => dispatch(actionsStore.setUserKind(token)),
    setIsLoading: (token) => dispatch(actionsStore.setIsLoading(token)),
    setError: (token) => dispatch(actionsStore.setError(token)),
    setSuccess: (token) => dispatch(actionsStore.setSuccess(token))
})

export default connect(mapStateToProps, mapDispatchToProps)(function RegisterWorker(props) {
    const {
        addNewUser, setUserKind, setIsLoading, setError, setSuccess } = props;
    const navigate = useNavigate()
    function register(user) {
        debugger
        Http.post('Cleaner/Add', user).then(res => {
            setIsLoading(false)
            setSuccess("הפעולה עברה בהצלחה")
            addNewUser(res.data);
            navigate("/worker", { replace: true });
            setUserKind("worker");
        }).catch(err => {
            if (err.message === "קיים משתמש רשום במייל זה") {
                setError("קיים משתמש רשום במייל זה")
            }
            else {
                setError("הפעולה נכשלה")
            }
            setIsLoading(false)
        })
    }

    return (
        <DetailsForm isWorker={true} isRegister={true} handleFunc={register} />
    )
})
