import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Accordion } from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Notification } from '@/components/custom-components/Notification/Notification';
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useNotifications from "@/hooks/useNotifications";


export const Notifications = () => {
    const authHeader = useAuthHeader();
    const { notifications } = useNotifications(`${authHeader}`);

    return (
        <main className="flex flex-col items-center w-full">
            <Card className="flex flex-col w-10/12 mt-16 h-[780px] drop-shadow-sm">
                <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-bold text-left">Manage your app notifications</CardTitle>
                </CardHeader>

                <Separator />

                {notifications.length === 0 ? (
                    <CardContent className="flex h-full p-0 justify-center items-center">
                        <p className="w-fit h-fit">No notifications available</p>
                    </CardContent>
                ) : (
                    <CardContent className="divide-y divide-gray dark:divide-gray-800 max-h-full">
                        <ScrollArea
                            className="flex-1"
                            type="hover"
                            scrollHideDelay={75}>

                            <Accordion
                                collapsible
                                type="single">

                                {notifications.map((notification) => (
                                    <Notification
                                        noti_id={notification.noti_id}
                                        title={notification.title}
                                        sub_heading={notification.sub_heading}
                                        content={notification.content}
                                        type={notification.type}
                                        is_read={notification.is_read}
                                        created_at={notification.created_at} />
                                ))}

                            </Accordion>
                        </ScrollArea>
                    </CardContent>
                )}
            </Card>
        </main >
    );
};
