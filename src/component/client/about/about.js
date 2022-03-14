import React from "react";
import { List, ListItem, Divider, ListItemText, ListItemAvatar, Typography, Card } from '@mui/material';
import { History, Preview, AddTask } from '@mui/icons-material';
import './style.css'

export default function About(props) {
    return (
        <>
            <div className="about">
                <Card ><br />
                    <Typography gutterBottom variant="h5" component="div">
                        קל-קלין
            <br />
             תווך עובדי משק בית ללקוחות
        </Typography>
                    <List >
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <History />
                            </ListItemAvatar>
                            <ListItemText
                                primary="רקע"
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            תיאור ורקע כללי               </Typography>
                                        <br />
                .אנשים המעוניינים בשירות עובדי משק בית, נתקלים פעמים רבות בקושי במציאת עובד מתאים. כמו"כ עובדי משק בית המעוניינים בעבודה מתקשים באיתור לקוחות פוטנציאלים בימים ובשעות המתאימות להם
<br />
                .האתר ישמש לתיווך בין עובדי משק בית ללקוחות המעוניינים להשתמש בשירותיהם, באופן חד פעמי או קבוע, וישבץ השעות<br />
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >מטרות המערכת</Typography><br />
                                .האתר יציע ללקוחות לבחור עובד מבין אלו הפנויים בתאריכים המבוקשים ובכך יחסוך להם את המאמץ הדרוש בחיפוש אחר עובד מתאים
     <br />
                .האתר ישבץ לעובדים לקוחות פוטנציאלים, בהתאמה מרבית
                .מידת ההתאמה נבדקת ע"פ שעות העבודה שהזין העובד, השעות הרצויות ללקוח, מרחק גאוגרפי ופרמטרים נוספים
          <br />
                .העובד יגבה את התשלום מהלקוח בעת מתן השירות

                </React.Fragment>
                                }
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar >
                                <Preview />
                            </ListItemAvatar>
                            <ListItemText
                                primary="סקירת מצב קיים"
                                secondary={
                                    <React.Fragment>
                                        .כיום רבים הזקוקים לעזרת עובדי משק בית נאלצים לבזבז זמן רב באיתור עובד אמין וזמין
                                        .גם העובדים עצמם המעוניינים בעבודה מוצאים את עצמם מובטלים למרות שקים בשוק בקוש רב, רק מכיוון שאינם יודעים למצוא אלו את אלו
               <br />
                                    .אמנם קיימים אתרים המנגישים עובדים המציעים עבודה ללקוחות המעוניינים בעזרתם, אך העובדים צריכים לבדוק בעצמם האם עבודה מסוימת תוכל להכנס ללו"ז שלהם, וכן הלקוחות נאלצים לעבור עובדים רבים עד שמוצאים עובד מתאים
            </React.Fragment>
                                }
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar >
                                <AddTask />
                            </ListItemAvatar>
                            <ListItemText
                                primary="מה האתר אמור לחדש או לשפר"
                                secondary={
                                    <React.Fragment>
                                        .המערכת תחסוך הן לעובדים והן ללקוחות את כאב הראש הכרוך בבדיקת ההתאמות. עובדים שירשמו למערכת יזינו את מקום מגורם הימים והשעות בהם הם פנויים
                            <br />
                                    .הלקוחות יקבלו רשימת עובדים המתאימים לשעות ולתקציב הרצויים להם ויבחרו עובד ספציפי
                                 <br />
                                    .המערכת תשלח לעובד את פרטי הלקוח לאישור
                                  <br />
                                    .הסדר התשלום הוא בין העובד ללקוח ובכך האתר מאפשר קבלת תשלום מידי בתום מתן השירות
            </React.Fragment>
                                }
                            />
                        </ListItem>
                    </List>
                </Card>
            </div>
        </>
    )
}
