import React from 'react';
import TemporaryWork from './job/temporary work/temporaryWork'
import PermamentJob from './job/Permanent job/PermanentJob'

export default function JobApplication(props) {
    return (
        <>
            <div className="container" style={{ marginTop: "25px" }}>
                <div className="row">
                    <div className="col-6">
                        <PermamentJob></PermamentJob>
                    </div>
                    <div className="col-6">
                        <TemporaryWork></TemporaryWork>
                    </div>
                </div>
            </div>
        </>
    )
}
