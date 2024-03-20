import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { IoIosSend } from "react-icons/io";
import { LuCombine } from "react-icons/lu";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { formatMsgDate } from "@/lib/utils";
import useUser from "@/hooks/useUser";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

export const MessagesPage = () => {
    const authHeader = useAuthHeader();


    const { userMessages } = useUser(`${authHeader}`); // Get user messages and the refresh function


    return (
        <Card className="rounded-lg m-5 h-full w-full drop-shadow-sm">
            <main className="flex flex-col h-[815px]">
                <div className="flex flex-1 overflow-hidden">
                    <div className="border-r w-full max-w-xs overflow-auto dark:border-gray-800">
                        <div className="group flex flex-col bg-[#fafafa] h-full">

                            <div className="py-4">
                                <Button variant="outline">
                                    New Message
                                    <LuCombine className="ml-2 w-6 h-6" />
                                </Button>
                            </div>

                            <Separator />

                            <ScrollArea type="hover" scrollHideDelay={75}>
                                {userMessages.map((message) => (
                                    <div key={message.msg_id} className="flex items-center p-4 cursor-pointer hover:bg-[#e2e8f0]">
                                        <Avatar className="w-12 h-12 rounded-full">
                                            <AvatarImage 
                                                alt={message.receiver_username} 
                                                src={message.receiver_profile_pic}
                                                className="object-cover" />
                                            <AvatarFallback>{message.receiver_username?.[0]}</AvatarFallback>
                                        </Avatar>
                                        <div className="ml-4 flex-1 grid gap-1">
                                            <div className="font-semibold">{message.receiver_username}</div>
                                            <div className="line-clamp-1 text-sm text-gray-500 dark:text-gray-400">
                                                {message.message_txt}
                                            </div>
                                        </div>
                                        <div className="ml-4 text-xs text-gray-500 dark:text-gray-400">
                                            {formatMsgDate(message.timestamp)}
                                        </div>
                                    </div>
                                ))}
                            </ScrollArea>
                        </div>
                    </div>
                    <div className="flex-1 overflow-auto">
                        <div className="flex flex-col h-full">
                            <div className="flex-1 p-4 overflow-auto">
                                {/* <div className="flex items-end gap-4 mb-4">
                                    <Avatar className="w-8 h-8">
                                        <AvatarImage alt="@shadcn" src="/placeholder-avatar.jpg" />
                                        <AvatarFallback>JP</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 p-3 rounded-lg bg-gray-100 dark:bg-gray-800 max-w-lg">
                                        <p className="mb-2 text-sm">Hey, let's catch up sometime...</p>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">5 min ago</div>
                                    </div>
                                </div>
                                <div className="flex items-start justify-end gap-4 mb-4">
                                    <div className="flex-1 p-3 rounded-lg bg-gray-200 dark:bg-gray-700 max-w-lg">
                                        <p className="mb-2 text-sm">Sure, that sounds great! How about this weekend?</p>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">3 min ago</div>
                                    </div>
                                    <Avatar className="w-8 h-8">
                                        <AvatarImage alt="Responder" src="/placeholder-avatar.jpg" />
                                        <AvatarFallback>RP</AvatarFallback>
                                    </Avatar>
                                </div>
                                <div className="flex items-end gap-4 mb-4">
                                    <Avatar className="w-8 h-8">
                                        <AvatarImage alt="@shadcn" src="/placeholder-avatar.jpg" />
                                        <AvatarFallback>JP</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 p-3 rounded-lg bg-gray-100 dark:bg-gray-800 max-w-lg">
                                        <p className="mb-2 text-sm">Perfect! Let's meet at our usual spot.</p>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">1 min ago</div>
                                    </div>
                                </div> */}
                            </div>

                            <div className="border-t p-4 dark:border-gray-800">
                                <form className="flex space-x-2">
                                    <Input className="flex-1 text-sm" placeholder="Type a message" type="text" />
                                    <Button type="submit">
                                        <IoIosSend className="w-5 h-5" />
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </Card>
    )
}