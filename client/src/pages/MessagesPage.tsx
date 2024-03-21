import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { DialogTrigger, DialogTitle, DialogDescription, DialogHeader, DialogFooter, DialogContent, Dialog } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { IoIosSend } from "react-icons/io";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import { LuCombine } from "react-icons/lu";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { formatMsgDate } from "@/lib/utils";
import { UserConvMessage } from "@/models/messageModel";
import { UserSearchCombobox } from "@/components/custom-components/UserSearchCombobox";
import useMessages from "@/hooks/useMessages";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useUser from "@/hooks/useUser";


export const MessagesPage = () => {
    const authHeader = useAuthHeader();
    const { userConvos, userConvoMsgs, refreshUserConvoMsgs } = useMessages(`${authHeader}`);
    const { retrieveAndSetUserId, userId } = useUser(`${authHeader}`);

    const [receiverProfilePic, setReceiverProfilePic] = useState('');
    const [receiverUsername, setReceiverUsername] = useState('');
    const [selectedConvoId, setSelectedConvoId] = useState<number>();


    const handleConvoClick = async (convo: UserConvMessage) => {
        setSelectedConvoId(convo.msg_id); // Update the selected conversation ID
        setReceiverProfilePic(convo.receiver_profile_pic || '/default-profile-pic.jpg');
        setReceiverUsername(convo.receiver_username);
        await refreshUserConvoMsgs(convo.receiver_id);
        await retrieveAndSetUserId();
    }


    return (
        <Card className="rounded-lg m-5 h-full w-full drop-shadow-sm">
            <main className="flex flex-col h-[815px]">
                <div className="flex flex-1 overflow-hidden">
                    <div className="border-r w-full max-w-xs overflow-auto dark:border-gray-800">
                        <div className="group flex flex-col bg-[#fafafa] h-full">

                            <div className="py-4 sticky top-0 bg-[#fafafa] z-10">
                                <Button variant="outline">
                                    New Message
                                    <LuCombine className="ml-2 w-6 h-6" />
                                </Button>
                            </div>

                            <Separator />

                            {userConvos.length > 0 ? (
                                <ScrollArea
                                    className="flex-1"
                                    type="hover"
                                    scrollHideDelay={75}>
                                    {userConvos.map((convo) => (
                                        <div
                                            key={convo.msg_id}
                                            className={`flex items-center p-4 cursor-pointer hover:bg-[#e2e8f0] ${selectedConvoId === convo.msg_id ? 'bg-blue-100 dark:bg-blue-800' : ''}`} // Conditional class for highlighting the selected conversation

                                            onClick={() => {
                                                handleConvoClick(convo)

                                            }}>

                                            <Avatar className="w-12 h-12 rounded-full">
                                                <AvatarImage
                                                    alt={convo.receiver_username}
                                                    src={convo.receiver_profile_pic}
                                                    className="object-cover" />
                                                <AvatarFallback>{convo.receiver_username?.[0]}</AvatarFallback>
                                            </Avatar>
                                            <div className="ml-4 flex-1 grid gap-1">
                                                <div className="font-semibold">{convo.receiver_username}</div>
                                                <div className="line-clamp-1 text-sm text-gray-500 dark:text-gray-400">
                                                    {convo.message_txt}
                                                </div>
                                            </div>
                                            <div className="ml-4 text-xs text-gray-500 dark:text-gray-400">
                                                {formatMsgDate(convo.timestamp)}
                                            </div>
                                        </div>
                                    ))}
                                </ScrollArea>
                            ) : null}
                        </div>
                    </div>
                    <div className="flex-1 overflow-auto">
                        <div className="flex flex-col h-full">
                            <div className="flex-1 p-4 overflow-auto">
                                {userConvoMsgs.length > 0 ? (
                                    userConvoMsgs.map((msg) => {
                                        const isCurrentUserMessage = msg.sender_id === userId;
                                        return (
                                            <div
                                                key={msg.msg_id}
                                                className={`flex ${isCurrentUserMessage ? 'justify-end' : ''} mb-4`}>
                                                <div className={`flex items-end gap-4 ${isCurrentUserMessage ? 'flex-row-reverse' : ''}`}>
                                                    <Avatar className="w-8 h-8">
                                                        <AvatarImage alt="User Image" src={isCurrentUserMessage ? '/your-current-user-pic.jpg' : receiverProfilePic || '/placeholder-avatar.jpg'} />
                                                        <AvatarFallback>{isCurrentUserMessage ? 'You' : receiverUsername[0]}</AvatarFallback>
                                                    </Avatar>
                                                    <div className={`p-3 rounded-lg max-w-lg ${isCurrentUserMessage ? 'bg-blue-100 dark:bg-blue-900 text-right' : 'bg-gray-100 dark:bg-gray-800'}`}>
                                                        <p className="mb-2 text-sm">{msg.message_txt}</p>
                                                        <div className="text-xs text-gray-500 dark:text-gray-400">{formatMsgDate(msg.timestamp)}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="flex flex-col justify-center items-center h-full">
                                        <BiSolidMessageSquareEdit className="h-14 w-14 text-5xl text-gray-400" />
                                        <h3 className="text-lg font-semibold">Your Messages</h3>
                                        <p className="m-1 text-sm text-gray-600">Send private photos & messages to a friend</p>

                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="outline">Send New Message</Button>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-[425px]">
                                                <DialogHeader>
                                                    <DialogTitle>Send New Message</DialogTitle>
                                                    <DialogDescription>Search for a person and write your message.</DialogDescription>
                                                </DialogHeader>
                                                <div className="grid gap-4 py-4">
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label className="text-right" htmlFor="message">
                                                            To:
                                                        </Label>
                                                        <UserSearchCombobox />
                                                    </div>
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label className="text-right" htmlFor="message">
                                                            Message
                                                        </Label>
                                                        <Textarea className="col-span-3 min-h-[100px]" id="message" placeholder="Write your message" />
                                                    </div>
                                                </div>
                                                <DialogFooter>
                                                    <Button type="submit">Send Message</Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                )}
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