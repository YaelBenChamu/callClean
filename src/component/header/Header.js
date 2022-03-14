import React from "react";
import { Link } from 'react-router-dom'
import {
    Drawer, List, ListItem, ListItemIcon
} from "@mui/material";
import { connect } from 'react-redux'
import { ThumbUpOffAlt, Unsubscribe, Mail, PersonPin, CalendarToday, WaterDamage, Add, PersonAddAlt1, PersonAddAlt, LockOpen, ContactMail } from "@mui/icons-material";
import './style.css';
function mapStateToProps(state) {
    return {
        userKind: state.userKind
    }
}

export default connect(mapStateToProps)(function Header(props) {
    const { userKind } = props;
    const num = userKind === "user" ? "0" : userKind === "worker" ? "1" : "2";
    const links = [
        {
            "user": [
                { "name": "אודות", "to": "/About", "icon": <WaterDamage /> },
                { "name": "כניסה", "to": "/signIn", "icon": <LockOpen /> },
                { "name": "הרשמת לקוח", "to": "/signUp", "icon": <PersonAddAlt1 /> },
                { "name": "הרשמת עובד", "to": "/signingUp", "icon": <PersonAddAlt /> },
                { "name": "צור קשר", "to": "/feedbackGeneral", "icon": <ContactMail /> }
            ]
        },
        {
            "worker": [
                { "name": "אודות", "to": "/About", "icon": <WaterDamage /> },
                { "name": "פרטים אישיים", "to": "/details", "icon": <PersonPin /> },
                { "name": "לוח זמנים", "to": "/schedule", "icon": <CalendarToday /> },
                { "name": "הצעות לאישור", "to": "/proposalsForApproval", "icon": <ThumbUpOffAlt /> },
                { "name": "משוב למערכת", "to": "/feedbackWorker", "icon": <Mail /> },
                { "name": "התנתקות", "to": "/unSubscribing", "icon": <Unsubscribe /> }

            ]
        },
        {
            "customer": [
                { "name": "אודות", "to": "/About", "icon": <WaterDamage /> },
                { "name": "פרטים אישיים", "to": "/DetailsClient", "icon": <PersonPin /> },
                { "name": "לוח זמנים", "to": "/ScheduleClient", "icon": <CalendarToday /> },
                { "name": "בקשת עבודה", "to": "/JobApplication", "icon": <Add /> },
                { "name": "משוב למערכת", "to": "/feedback", "icon": <Mail /> }
            ]
        }
    ];

    return (
        <div className="header">
            <Drawer
                variant="permanent"
                sx={{
                    "& .MuiDrawer-paper": {
                        width: 240,
                        right: "0px",
                        borderLeft: "1px solid rgba(0, 0, 0, 0.12)"
                    }
                }}
            >
                <div>
                    <br />
                    <div className="logo" />
                    <br />
                    <List>
                        {
                            links[num][userKind].map((link, index) => {
                                return <Link className="link" key={link.to}
                                    aria-current="page" to={link.to} >
                                    <ListItem
                                        button
                                        key={link.index}
                                    >
                                        <ListItemIcon>
                                            {link.icon}
                                        </ListItemIcon>
                                        {link.name}
                                    </ListItem>
                                </Link>
                            })
                        }
                    </List>
                </div>
            </Drawer>
        </div>
    )
})
