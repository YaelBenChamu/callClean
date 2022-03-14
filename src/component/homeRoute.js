import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom'
import Login from './login/login';
import About from './client/about/about';
import Feedback from './client/Feedback to the system/Feedback'
import ScheduleClient from './client/schedule/schedule'
import SearchResults from './client/searchResults/searchResults'
import JobApplication from './client/job application/jobApplication';
import Details from './worker/details/details'
import DetailsClient from './client/details/details'
import ProposalsForApproval from './worker/proposalsForApproval/proposalsForApproval'
import CalendarWorker from './worker/schedule/schedule'
import FeedbackWorker from './worker/feedback/feedback'
import RegisterClient from './client/register/register'
import RegisterWorker from './worker/register/register'
import FeedbackGeneral from './contactUs';
import UnSubscribing from './unSubscribing';
import { connect } from 'react-redux'
import ProposalForApproval from './worker/proposalsForApproval/verifyOneSuggestion';

function mapStateToProps(state) {
    return {
        userKind: state.userKind,
    }
}

export default connect(mapStateToProps, null)(function HomeRouter(props) {
    const { userKind } = props;

    return (
        <div>
            <Routes>
                {userKind === "customer" ? <Route path="/Feedback" element={<Feedback />} /> : null}
                {userKind === "customer" ? <Route path="/ScheduleClient" element={<ScheduleClient />} /> : null}
                {userKind === "customer" ? <Route path="/JobApplication" element={<JobApplication />} /> : null}
                {(userKind === "customer") ?
                    <Route path="/searchResult" element={<SearchResults client={{ "name": "fbf" }} job={{ "id": "fd" }}
                        // suggestions={[{ "name": "1", "mail": "aaa@gmail.com", "phone": "0556725588", "street": "רבן יוחנן בן זכאי 7, ירושלים, ישראל", "price": "70", "gender": "נקבה" },
                        // { "name": "2", "mail": "ccc@gmail.com", "phone": "0556725589", "street": "הרב סורוצקין 3, ירושלים, ישראל", "price": "70", "gender": "נקבה" },
                        // { "name": "3", "mail": "bbb@gmail.com", "phone": "0556725587", "street": "fnjk", "price": "70", "gender": "זכר" }]}
                        ></SearchResults>} />
                    : null}
                {userKind === "customer" ? <Route path="/DetailsClient" element={<DetailsClient />}></Route> : null}
                {userKind === "customer" ? <Route path="/client" element={<Navigate to="/About" />}></Route> : null}
                {userKind === "worker" ? <Route path="/worker" element={<Navigate to="/proposalsForApproval" />}></Route> : null}
                {userKind === "worker" ? <Route path="/details" element={<Details />}></Route> : null}
                {userKind === "worker" ? <Route path="/proposalsForApproval" element={<ProposalsForApproval />}></Route> : null}
                {userKind === "worker" ? <Route path="/schedule" element={<CalendarWorker />}></Route> : null}
                {userKind === "worker" ? <Route path="/feedbackWorker" element={<FeedbackWorker />}></Route> : null}
                {userKind === "worker" ? <Route path="/unSubscribing" element={<UnSubscribing />}></Route> : null}
                <Route path="/About" element={<About />} />
                <Route path="/verified/:id/:isPermanent" element={<ProposalForApproval />} />
                <Route path="/signIn" element={<Login />}></Route>
                <Route path="/signUp" element={<RegisterClient />}></Route>
                <Route path="/signingUp" element={<RegisterWorker />}></Route>
                <Route path="/feedbackGeneral" element={<FeedbackGeneral />}></Route>
                <Route path="/" exact element={<About />}></Route>
                <Route path="*" element={<Navigate to="/About" />} />
            </Routes>
        </div>
    )
})
