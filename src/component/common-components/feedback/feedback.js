import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button, IconButton } from '@mui/material';
import { Send, Delete } from '@mui/icons-material';
import { Card } from '@material-ui/core';
import './style.css';
import { connect } from 'react-redux'
import { actionsStore } from '../../../redux/actions/actions'

const mapDispatchToProps = (dispatch) => ({
    setIsLoading: (token) => dispatch(actionsStore.setIsLoading(token))
})

export default connect(null, mapDispatchToProps)(function FeedbackToSystem(props) {
    const [value, setValue] = useState("");
    const { handleSendEmail, setIsLoading } = props;
    function sendEmail() {
        setIsLoading(true)
        handleSendEmail(value);
        setValue({ value: "" })
    }

    const modules = {
        toolbar: [
            [{ font: [] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }, { background: [] }],
            [{ script: "sub" }, { script: "super" }],
            ["blockquote", "code-block"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
            ["link", "image", "video"],
            ["clean"],
        ]
    }

    return (
        <>
            <div className="Feedback2">
                <Card>
                    <div className="div1">שליחת מייל למערכת</div>
                    <ReactQuill
                        placeholder={"?what do you want to tell us"}
                        value={value}
                        modules={modules}
                        theme="snow"
                        onChange={setValue}
                    />
                    <div className="div2">
                        <Button variant="contained" onClick={sendEmail} endIcon={<Send />}>  שליחה</Button>
                        <IconButton aria-label="delete" size="large">
                            <Delete onClick={() => { setValue({ value: "" }) }} />
                        </IconButton>
                    </div>
                </Card>
            </div>
        </>
    )
})
