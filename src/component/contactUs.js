import React from 'react'
import Http from '../config/axios'
import { connect } from 'react-redux'
import FeedbackToSystem from './common-components/feedback/feedback'
import { actionsStore } from '../redux/actions/actions'

const mapDispatchToProps = (dispatch) => ({
    setError: (token) => dispatch(actionsStore.setError(token)),
    setIsLoading: (token) => dispatch(actionsStore.setIsLoading(token)),
    setSuccess: (token) => dispatch(actionsStore.setSuccess(token))
})

export default connect(null, mapDispatchToProps)(function FeedbackGeneral(props) {
    const { setError, setIsLoading, setSuccess } = props;

    function sendEmail(value) {
        Http.get(`Feedback/SendEmail?content=${value}&isCleaner=${false}&isAnonymous=${true}`)
            .then(res => {
                setIsLoading(false)
                setSuccess("הפעולה עברה בהצלחה")
            })
            .catch(err => {
                setIsLoading(false)
                setError('הפעולה נכשלה');
            })
    }

    return (
        <FeedbackToSystem handleSendEmail={sendEmail} />
    )
})
