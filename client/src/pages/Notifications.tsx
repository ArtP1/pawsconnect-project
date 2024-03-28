import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Accordion } from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Notification } from '@/components/custom-components/Notification/Notification';
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useNotifications from "@/hooks/useNotifications";
import { CiFaceSmile } from "react-icons/ci";


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
                    <CardContent className="flex flex-col h-full p-0 justify-center items-center">
                        <CiFaceSmile className="h-12 w-12 text-gray-500" />
                        <div className="text-gray-400">
                            <p>All caught up!</p>
                            <p> No new notifications at the moment.</p>
                        </div>
                    </CardContent>
                ) : (
                    <CardContent className="divide-y divide-gray dark:divide-gray-800 max-h-full">
                        <ScrollArea
                            className="flex-1"
                            type="hover"
                            scrollHideDelay={75}>

                            {notifications.map((notification) => (
                                <Notification
                                    key={notification.noti_id}
                                    {...notification} />
                            ))}

                        </ScrollArea>
                    </CardContent>
                )}
            </Card>
        </main >
    );
};
