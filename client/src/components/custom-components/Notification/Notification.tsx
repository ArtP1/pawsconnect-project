import { GoDotFill } from "react-icons/go";
import { AccordionTrigger, AccordionContent, AccordionItem } from "@/components/ui/accordion"
import { Notification as NotificationModel } from "@/models/notificationsModel";
import { formatDate } from "@/lib/utils";
import "./notification.css"


export const Notification = (props: NotificationModel) => {
    const getTypeNotification = () => {
        switch (props.type) {
            case 'info':
                return 'info';
            case 'success':
                return 'success';
            case 'warning':
                return 'warning';
            default:
                return 'default';
        }
    };


    return (
        <AccordionItem value={props.noti_id}>
            {props.content !== null ? (
                <AccordionTrigger className="accordion-trigger">
                    <GoDotFill className={`icon ${getTypeNotification()}`} />
                    <div className="front-labels">
                        <p className="title">{props.title}</p>
                        <p className="sub-heading">{props.sub_heading}</p>
                        <p className="time">{formatDate(props.created_at)}</p>
                    </div>
                </AccordionTrigger>
            ) : (
                <div className="accordion-trigger">
                    <GoDotFill className={`icon ${getTypeNotification()}`} />
                    <div className="front-labels">
                        <p className="title">{props.title}</p>
                        <p className="sub-heading">{props.sub_heading}</p>
                        <p className="time">{formatDate(props.created_at)}</p>
                    </div>
                </div>
            )}
            <AccordionContent>
                <div className="content dark:text-gray-400">
                    {props.content}
                </div>
            </AccordionContent>
        </AccordionItem>
    );
};