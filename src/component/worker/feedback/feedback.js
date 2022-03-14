import React from 'react'
import Http from '../../../config/axios';
import FeedbackToSystem from '../../common-components/feedback/feedback'
import { connect } from 'react-redux'
import { actionsStore } from '../../../redux/actions/actions'

function mapStateToProps(state) {
    return {
        user: state.user
    }
}
const mapDispatchToProps = (dispatch) => ({
    setIsLoading: (token) => dispatch(actionsStore.setIsLoading(token)),
    setError: (token) => dispatch(actionsStore.setError(token)),
    setSuccess: (token) => dispatch(actionsStore.setSuccess(token))
})

export default connect(mapStateToProps, mapDispatchToProps)(function Feedback(props) {
    const { user, setError, setIsLoading, setSuccess } = props;

    function sendEmail(value) {
        Http.get(`Feedback/SendEmail?content=${value}&isCleaner=${true}&isAnonymous=${false}&mail=${user.mail}`)
            .then(res => {
                setIsLoading(false)
                setSuccess("הפעולה עברה בהצלחה")
            })
            .catch(err => {
                setIsLoading(false);
                setError('הפעולה נכשלה');
            })
    }
    return (
        <FeedbackToSystem handleSendEmail={sendEmail} />
    )
})
