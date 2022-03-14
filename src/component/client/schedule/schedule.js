import { Eventcalendar, locale, setOptions, Popup, Button, Input, Textarea, Datepicker } from '@mobiscroll/react';
import React, { useState, useEffect } from 'react'
import '../../worker/schedule/schedule.css'
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux'
import Http from '../../../config/axios'
import '../../../App.css'
import { actionsStore } from '../../../redux/actions/actions'

function mapStateToProps(state) {
    return {
        user: state.user,
        userKind: state.userKind
    }
}

const mapDispatchToProps = (dispatch) => ({
    setIsLoading: (token) => dispatch(actionsStore.setIsLoading(token)),
    setError: (token) => dispatch(actionsStore.setError(token)),
    setSuccess: (token) => dispatch(actionsStore.setSuccess(token))
})

setOptions({
    theme: 'ios',
    themeVariant: 'light'
});

const now = new Date();
const defaultEvents = [{
    id: 1,
    start: '2022-03-07T13:00',
    end: '2022-03-07T13:45',
    title: 'יצחק בן צבי 2, אשקלון, ישראל',
    description: '',
    allDay: false,
    free: true,
    color: '#009788',
    phone: "0556858888",
    mail: "5a@gmail.com",
    name: "Dan Cohen",
    date: "2/2/2020"
}, {
    id: 2,
    start: '2022-03-85T15:00',
    end: '2022-03-08T16:00',
    title: 'הרב סורוצקין 5, בני ברק, ישראל',
    description: '',
    allDay: false,
    free: false,
    color: '#ff9900',
    phone: "0556858888",
    mail: "5a@gmail.com",
    name: "Dan Cohen",
    date: "2/2/2020"
}, {
}, {
    id: 3,
    recurring: {
        repeat: "weekly",
        weekDays: "WE"//SU,MO,TU,WE,TH,FR,SA
    },
    start: '2021-11-15 T15:00',
    end: '2021-11-15 T15:13',
    title: 'ארוע שבועי',
    description: '',
    allDay: false,
    free: true,
    color: '#ff9900',
    phone: "0556858888",
    mail: "5a@gmail.com",
    name: "Dan Cohen",
    date: "2/2/2020"
}, {
    id: 4,
    start: '2022-03-14T18:00',
    end: '2022-03-14T22:00',
    title: 'גאולה 5, חיפה, ישראל',
    description: '',
    allDay: false,
    free: true,
    color: '#3f51b5',
    phone: "0556858888",
    mail: "5a@gmail.com",
    name: "Dan Cohen",
    date: "2/2/2020"
}, {
    id: 5,
    start: '2022-03-17T10:30',
    end: '2022-03-17T11:30',
    title: 'יהודה מרגוזה, תל אביב-יפו, ישראל',
    description: '',
    allDay: false,
    free: false,
    color: '#f44437',
    phone: "0556858888",
    mail: "5a@gmail.com",
    name: "Dan Cohen",
    date: "2/2/2020"
}
    // , {
    //     id: 6,
    //     start: '2021-12-17T10:30',
    //     end: '2021-12-21T11:30',
    //     title: 'long event',
    //     description: '',
    //     allDay: false,
    //     free: false,
    //     color: '#f44437',
    //     phone: "0556858888",
    //     mail: "5a@gmail.com",
    //     name: "Dan Cohen",
    //     date: "2/2/2020"
    // }
];

const viewSettings = {
    calendar: { labels: true }
};
const responsivePopup = {
    medium: {
        display: 'anchored',
        width: 400,
        fullScreen: false,
        touchUi: false
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(function CalendarWorker(props) {
    const { userKind, user, setError, setIsLoading, setSuccess } = props;
    const [myEvents, setMyEvents] = React.useState(defaultEvents);
    const [tempEvent, setTempEvent] = React.useState(null);
    const [isOpen, setOpen] = React.useState(false);
    const [isPermanent, setIsPermanent] = React.useState(false);
    const [anchor, setAnchor] = React.useState(null);
    const [start, startRef] = React.useState(null);
    const [end, endRef] = React.useState(null);
    const [popupEventTitle, setTitle] = React.useState('');
    const [popupEventDescription, setDescription] = React.useState('');
    const [popupEventId, setId] = React.useState(null);
    const [popupEventDate, setDate] = React.useState([]);
    const [mySelectedDate, setSelectedDate] = React.useState(now);
    const [popupUserName, setUserName] = React.useState(null);
    const [popupUserMail, setUserMail] = React.useState(null);
    const [popupUserPhone, setUserPhone] = React.useState(null);
    const [popupUserDate, setUserDate] = React.useState(null);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function onDeleteOneClick(args) {
        setTempEvent({ ...args.event });
        if (tempEvent.day !== undefined) {
            let work = {
                "UserMail": user.mail,
                "WorkId": args.event.id,
                "WorkDate": args.event.date,
                "IsCustomer": userKind === "customer" ? true : false,
                "Password": user.password
            }
            Http.post("PermanentWork/DeleteOneOfPermanentDay", work)
                .then(res => {
                    setIsLoading(false)
                    setSuccess("הפעולה עברה בהצלחה")
                })
                .catch((err) => {
                    setIsLoading(false)
                    setError("הפעולה נכשלה")
                })
        }
        setOpen(false);
    }

    const deleteEvent = React.useCallback((event) => {
        let work = {
            "UserMail": user.mail,
            "WorkId": event.id,
            "IsCustomer": userKind === "customer" ? true : false,
            "Password": user.password
        }
        if (event.day) {
            Http.post("PermanentWork/DeleteWholeWork", work)
                .then(res => {
                    setIsLoading(false)
                    setSuccess("הפעולה עברה בהצלחה")
                })
                .catch((err) => {
                    setIsLoading(false)
                    setError("הפעולה נכשלה")
                })
        } else
            Http.post("TemporaryWork/Delete", work)
                .then(res => {
                    setIsLoading(false)
                    setSuccess("הפעולה עברה בהצלחה")
                    setMyEvents(myEvents.filter(item => item.id !== event.id));
                })
                .catch((err) => {
                    setIsLoading(false)
                    setError("הפעולה נכשלה")
                })

        setMyEvents(myEvents.filter(item => item.id !== event.id));
    }, [myEvents, user, setIsLoading, userKind, setError, setSuccess]);

    const loadPopupForm = React.useCallback((event) => {
        setTitle(event.title);
        setDescription(event.description);
        setDate([event.start, event.end]);
        setId(event.id || null);
        setUserPhone(event.phone || null);
        setUserMail(event.mail || null);
        setUserName(event.name || null);
        setUserDate(event.date || null);
    }, []);

    const onDeleteClick = React.useCallback((args) => {
        setTempEvent({ ...args.event });
        deleteEvent(
            tempEvent
        );
        setOpen(false);
    }, [deleteEvent, tempEvent]);

    // scheduler options
    const onSelectedDateChange = React.useCallback((event) => {
        setSelectedDate(event.date);
    }, []);

    const onEventClick = React.useCallback((args) => {
        if (args.event.recurring !== undefined) {
            setIsPermanent(true);
        }
        if (args.event.title !== "New event") {
            setTempEvent({ ...args.event });
            loadPopupForm(args.event);
            setAnchor(args.domEvent.target);
            setOpen(true);
            handleShow()
        }
    }, [loadPopupForm]);

    const onEventDeleted = React.useCallback((args) => {
        setTempEvent({ ...args.event });
        deleteEvent(args.event)
    }, [deleteEvent]);

    const onEventUpdated = React.useCallback((args) => {
    }, []);

    const headerText = React.useMemo(() =>
        'ארוע'
        , []);

    const popupButtons = React.useMemo(() => {
        return [
            'בטל',
            {}
        ];
    }, []);

    const onClose = React.useCallback(() => {
        setIsPermanent(false)
        setMyEvents([...myEvents]);
        setOpen(false);
    }, [myEvents]);

    useEffect(() => {
        Http.get(`Customer/GetAllWorks?customerMail=${user.mail}`)
            .then(res => {
                setIsLoading(false)
                setMyEvents(res.data)
            })
            .catch((err) => {
                setIsLoading(false)
                setError("הפעולה נכשלה")
            })
    }, [user, setIsLoading, setError])

    return (<div className="schedule">
        <h1 >לוח זמנים</h1>
        <Eventcalendar
            locale={locale['he']}
            view={viewSettings}
            data={myEvents}
            clickToCreate="double"
            dragToCreate={false}
            dragToMove={false}
            dragToResize={false}
            selectedDate={mySelectedDate}
            onSelectedDateChange={onSelectedDateChange}
            onEventClick={onEventClick}
            onEventDeleted={onEventDeleted}
            onEventUpdated={onEventUpdated}
        />
        <Popup
            display="bottom"
            fullScreen={true}
            contentPadding={false}
            headerText={headerText}
            anchor={anchor}
            buttons={popupButtons}
            isOpen={isOpen}
            onClose={onClose}
            responsive={responsivePopup}
        >
            <div className="mbsc-form-group">
                <Input label="כותרת" value={popupEventTitle} />
                <Textarea label="תאור" value={popupEventDescription} />
            </div>
            <div className="mbsc-form-group">
                <Input label="קוד" value={popupEventId} />
                <Input ref={startRef} label="שעת התחלה" disabled />
                <Input ref={endRef} label="שעת סיום" disabled />
                <Input label="תאריך" disabled value={popupUserDate} />
                <Datepicker
                    select="range"
                    touchUi={true}
                    startInput={start}
                    endInput={end}
                    showRangeLabels={false}
                    value={popupEventDate}
                />
                <div className="mbsc-form-group" style={{ textAlign: "center" }}>
                    <Input label=":פרטי המנקה" style={{ textAlign: "center" }} />
                </div>
                <Input label="שם" value={popupUserName} />
                <Input label="מייל" value={popupUserMail} />
                <Input label="מספר פלאפון" value={popupUserPhone} />
                <div className="mbsc-button-group"><Button className="mbsc-button-block" color="danger" variant="outline" onClick={onDeleteClick}>{isPermanent ? "בטל ארוע לגמרי- מכל שבוע" : "בטל ארוע"}</Button></div>
                {isPermanent ? <div className="mbsc-button-group"><Button className="mbsc-button-block" color="danger" variant="outline" onClick={onDeleteOneClick}>בטל ארוע</Button></div> : null}
            </div>
        </Popup>
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header >
                <Modal.Title>עדכון ארוע שבועי</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                אין אפשרות לעדכן אך ניתן למחוק ולבקש מחדש / למחוק בלבד
           <br />
            בעת מחיקת עבודה בתאריך ספציפי מעבודה קבועה, השינוי לא יראה בלוח הזמנים שלך, לכן עליך לזכור מה בטלת,
            בעת כל בטול המערכת תדאג לעדכן את המנקה
            <br />
                <br />
      לצפיה בפרטי העבודה לחץ לחיצה אחת על האירוע
         </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleClose} variant="primary">הבנתי</Button>
            </Modal.Footer>
        </Modal>
    </div>
    )
})
