import React from "react";
import { connect } from 'react-redux'
import { actionsStore } from '../../../../../redux/actions/actions'
import Job from '../job';
import { useNavigate } from 'react-router-dom'

function mapStateToProps(state) {
    return {
        user: state.user,
        isPermanent: state.isPermanent
    }
}

const mapDispatchToProps = (dispatch) => ({
    setJob: (token) => dispatch(actionsStore.setJob(token)),
    setIsPermanent: (token) => dispatch(actionsStore.setIsPermanent(token))
})

export default connect(mapStateToProps, mapDispatchToProps)(function PermamentJob(props) {
    const { setJob, setIsPermanent } = props;
    const navigate = useNavigate()

    function getResult(job) {
        debugger
        setJob(job);
        setIsPermanent(true)
        navigate("/searchResult", { replace: true });
    }

    return (
        <div className="permanent-job">
            <Job handleForm={getResult} isPermanent={true} />
        </div>
    )
})
