import React from "react";
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { actionsStore } from '../../../../../redux/actions/actions'
import Job from '../job';

function mapStateToProps(state) {
    return {
        user: state.user,
        isPermanent: state.isPermanent,
        isLoading: state.isLoading
    }
}

const mapDispatchToProps = (dispatch) => ({
    setJob: (token) => dispatch(actionsStore.setJob(token)),
    setIsPermanent: (token) => dispatch(actionsStore.setIsPermanent(token))
})

export default connect(mapStateToProps, mapDispatchToProps)(function Temporary(props) {
    const { setJob, setIsPermanent } = props;
    const navigate = useNavigate()

    function getResult(job) {
        debugger
        setJob(job);
        setIsPermanent(false)
        navigate("/searchResult", { replace: true });
    }

    return (
        <div className="temporary-job">
            <Job handleForm={getResult} isPermanet={false} />
        </div>
    )
})
