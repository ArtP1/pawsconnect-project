import { Fragment, useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
    DialogTrigger,
    DialogTitle,
    DialogDescription,
    DialogHeader,
    DialogFooter,
    DialogContent,
    Dialog
} from "@/components/ui/dialog"
import { DialogClose } from '@radix-ui/react-dialog';
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { IoIosSend } from "react-icons/io";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import { LuCombine } from "react-icons/lu";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { formatMsgDate } from "@/lib/utils";
import { UserConvSnippet } from "@/models/msgModel";
import { UserSnippet } from "@/models/userModel";
import useMessages from "@/hooks/useMessages";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useUser from "@/hooks/useUser";
import { Combobox } from '@headlessui/react';
import { IoCheckmark } from "react-icons/io5";
import { HiOutlineSelector } from "react-icons/hi";
import { GoDotFill } from "react-icons/go";

// const userList = [
//     { user_id: '', first_name: '', last_name: '', username: '', profile_pic: '' },
//     { user_id: '1', first_name: 'Leslie', last_name: 'Alexander', username: 'leslie123', profile_pic: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGVyc29ufGVufDB8fDB8fHww' },
//     { user_id: '2', first_name: 'Michael', last_name: 'Foster', username: 'michael831', profile_pic: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGVyc29ufGVufDB8fDB8fHww' },
// ];


export const MessagesPage = () => {
    const authHeader = useAuthHeader();


    const { userConvos,
        userConvoMsgs,
        refreshUserConvoMsgs,
        refreshUserConvos,
        createConversation,
        createMessage,
        markMsgsAsRead
    } = useMessages(`${authHeader}`);

    const { allUsersForSearch, getAllUsersForSearch, userId } = useUser(`${authHeader}`);


    const [receiverProfilePic, setReceiverProfilePic] = useState('');
    const [receiverUsername, setReceiverUsername] = useState('');
    const [receiverId, setReceiverId] = useState<string>('');
    const [selectedConvoId, setSelectedConvoId] = useState('');


    const [newConvoMessage, setNewConvoMessage] = useState('');
    const [newMsgRecipient, setNewMsgRecipient] = useState<UserSnippet | null>(null);


    const [newMessage, setNewMessage] = useState('');


    const [query, setQuery] = useState('');


    const filteredUsers = allUsersForSearch.filter(user => {
        const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
        return fullName.includes(query.toLowerCase());
    });


    const isNewConvoFormFilled = newMsgRecipient != null && newConvoMessage !== '';
    const isConvoSelected = selectedConvoId != '';
    const isMsgFormFilled = selectedConvoId != null && newMessage.trim() !== '';


    const handleConvoClick = async (convo: UserConvSnippet) => {
        setSelectedConvoId(convo.convo_id);
        setReceiverProfilePic(convo.receiver_profile_pic || '/default-profile-pic.jpg');
        setReceiverUsername(convo.receiver_username);
        setReceiverId(convo.receiver_id);

        await refreshUserConvoMsgs(convo.receiver_id);
    }

    
    useEffect(() => {
        const markMessagesAsRead = async () => {
            const unreadMsgs = userConvoMsgs.filter(msg => msg.receiver_id === userId && !msg.is_read);

            if (unreadMsgs.length > 0) {
                await markMsgsAsRead(selectedConvoId);
            }
        };

        if (selectedConvoId && userConvoMsgs.length > 0) {
            markMessagesAsRead();
        }
    }, [selectedConvoId, userConvoMsgs]);


    return (
        <Card className="rounded-lg m-5 h-full w-full drop-shadow-sm">
            <main className="flex flex-col h-[815px]">
                <div className="flex flex-1 overflow-hidden">
                    <div className="border-r w-full max-w-xs overflow-auto dark:border-gray-800">
                        <div className="group flex flex-col bg-[#fafafa] h-full">

                            <div className="py-4 sticky top-0 bg-[#fafafa] z-10">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button
                                            variant="outline"
                                            onClick={async () => getAllUsersForSearch()}>
                                            New Message
                                            <LuCombine className="ml-2 w-6 h-6" />
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle>New Message</DialogTitle>
                                            <DialogDescription>Search for a person and write your message.</DialogDescription>
                                        </DialogHeader>
                                        <form
                                            className="grid gap-4 py-4"
                                            onSubmit={async (e) => {
                                                e.preventDefault();
                                                if (newMsgRecipient) {
                                                    await createConversation(newMsgRecipient.user_id, newConvoMessage);
                                                    await refreshUserConvos();
                                                }
                                            }}>
                                            <div className="grid gap-4 py-4">
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label className="text-right" htmlFor="message">
                                                        To:
                                                    </Label>
                                                    <Combobox
                                                        className="col-span-3"
                                                        as="div"
                                                        value={newMsgRecipient}
                                                        onChange={setNewMsgRecipient}>
                                                        <div className="relative mt-1">
                                                            <Combobox.Input
                                                                className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                                                displayValue={(user: UserSnippet) => user ? `${user.first_name} ${user.last_name}` : ''}
                                                                onChange={(event) => setQuery(event.target.value)}
                                                                placeholder='Search...'
                                                            />
                                                            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                                                                <HiOutlineSelector className="w-5 h-5 text-gray-400" aria-hidden="true" />
                                                            </Combobox.Button>

                                                            {filteredUsers.length > 0 && (
                                                                <Combobox.Options
                                                                    className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                                    {filteredUsers.map((user) => (
                                                                        <Combobox.Option
                                                                            key={user.user_id}
                                                                            value={user}
                                                                            as={Fragment}>
                                                                            {({ active, selected }) => (
                                                                                <li
                                                                                    className={`flex items-center cursor-pointer select-none py-2 pl-3 pr-9 ${active ? 'bg-blue-600 text-white' : 'text-gray-900'}`}>
                                                                                    <Avatar className="h-8 w-8 cursor-pointer rounded-full mr-3">
                                                                                        <AvatarImage
                                                                                            alt="User Profile"
                                                                                            src={user.profile_pic}
                                                                                            className="object-cover" />
                                                                                        <AvatarFallback>
                                                                                            {user.first_name && user.first_name.length > 0
                                                                                                ? user.first_name[0].toUpperCase()
                                                                                                : ""}
                                                                                            {user.last_name && user.last_name.length > 0
                                                                                                ? user.last_name[0].toUpperCase()
                                                                                                : ""}
                                                                                        </AvatarFallback>
                                                                                    </Avatar>
                                                                                    <div>
                                                                                        <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                                                                            @{user.username}
                                                                                        </span>
                                                                                        <span className={`block truncate text-xs ${selected ? 'font-medium' : 'font-normal'}`}>
                                                                                            {`${user.first_name} ${user.last_name}`}
                                                                                        </span>
                                                                                    </div>
                                                                                    {selected && (
                                                                                        <IoCheckmark className="w-4 h-4 absolute right-3" aria-hidden="true" />
                                                                                    )}
                                                                                </li>
                                                                            )}
                                                                        </Combobox.Option>
                                                                    ))}
                                                                </Combobox.Options>
                                                            )}
                                                        </div>
                                                    </Combobox>
                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label className="text-right" htmlFor="message">
                                                        Message
                                                    </Label>
                                                    <Textarea
                                                        className="col-span-3 max-h-40"
                                                        id="message"
                                                        placeholder="Write your message"
                                                        value={newConvoMessage}
                                                        onChange={(e) => setNewConvoMessage(e.target.value)} />
                                                </div>
                                            </div>
                                            <DialogFooter>
                                                <DialogClose asChild>
                                                    <Button
                                                        type="submit"
                                                        disabled={!isNewConvoFormFilled}>
                                                        Send Message
                                                    </Button>
                                                </DialogClose>
                                            </DialogFooter>
                                        </form>
                                    </DialogContent>
                                </Dialog>
                            </div>

                            <Separator />

                            {userConvos.length > 0 ? (
                                <ScrollArea
                                    className="flex-1"
                                    type="hover"
                                    scrollHideDelay={75}>
                                    {userConvos.map((convo) => (
                                        <div
                                            key={convo.msg_id}  // Make sure msg_id is unique
                                            className={`flex items-center p-4 cursor-pointer hover:bg-[#e2e8f0] ${selectedConvoId === convo.msg_id ? 'bg-blue-100 dark:bg-blue-800' : ''}`}
                                            onClick={() => { handleConvoClick(convo) }}>

                                            <Avatar className="w-12 h-12 rounded-full">
                                                <AvatarImage
                                                    alt={convo.receiver_username}
                                                    src={convo.receiver_profile_pic}
                                                    className="object-cover" />
                                                <AvatarFallback>{convo.receiver_username?.[0]}</AvatarFallback>
                                            </Avatar>
                                            <div className="ml-4 flex-1 grid gap-1">
                                                <div className="font-semibold text-left">{convo.receiver_username}</div>
                                                <div className={`flex items-center text-left line-clamp-1 text-[12.5px] ${convo.message_direction === 'sent' ? 'text-gray-500 dark:text-gray-400' : convo.is_read ? 'text-gray-500 dark:text-gray-400' : 'text-black dark:text-white font-bold'}`}>
                                                    {convo.message_direction === 'sent' ? (
                                                        <span className="line-clamp-1">You: {convo.message_txt}</span>
                                                    ) : (
                                                        <>
                                                            {!convo.is_read && (<GoDotFill className='min-h-3 min-w-3 text-[#1d4ed8] mr-1' />)}
                                                            <span className="line-clamp-1">{convo.message_txt}</span>
                                                        </>
                                                    )}
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
                            <div className="flex-1 p-6 overflow-auto">
                                {userConvoMsgs.length > 0 ? (
                                    userConvoMsgs.map((msg) => {
                                        const isCurrentUserMessage = msg.sender_id === userId;
                                        return (
                                            <div
                                                key={msg.msg_id}
                                                className={`flex ${isCurrentUserMessage ? 'justify-end' : ''} mb-4`}>
                                                <div className={`flex items-end gap-4`}>
                                                    <Avatar className="w-8 h-8">
                                                        <AvatarImage
                                                            className='rounded-full'
                                                            alt="User Image"
                                                            src={isCurrentUserMessage ? '' : receiverProfilePic}
                                                        />
                                                    </Avatar>
                                                    <div className={`p-3 rounded-lg max-w-lg ${isCurrentUserMessage ? 'bg-blue-100 dark:bg-blue-900 text-right' : 'bg-gray-200 dark:bg-gray-800'}`}>
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
                                                <Button
                                                    variant="outline"
                                                    onClick={async () => getAllUsersForSearch()}>Send New Message</Button>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-[425px]">
                                                <DialogHeader>
                                                    <DialogTitle>Send New Message</DialogTitle>
                                                    <DialogDescription>Search for a person and write your message.</DialogDescription>
                                                </DialogHeader>
                                                <form
                                                    className="grid gap-4 py-4"
                                                    onSubmit={async (e) => {
                                                        e.preventDefault();
                                                        if (newMsgRecipient) {
                                                            await createConversation(newMsgRecipient.user_id, newConvoMessage);
                                                            await refreshUserConvos();
                                                        }
                                                    }}>
                                                    <div className="grid gap-4 py-4">
                                                        <div className="grid grid-cols-4 items-center gap-4">
                                                            <Label className="text-right" htmlFor="message">
                                                                To:
                                                            </Label>
                                                            <Combobox
                                                                className="col-span-3"
                                                                as="div"
                                                                value={newMsgRecipient}
                                                                onChange={setNewMsgRecipient}>
                                                                <div className="relative mt-1">
                                                                    <Combobox.Input
                                                                        className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                                                        displayValue={(user: UserSnippet) => user ? `${user.first_name} ${user.last_name}` : ''}
                                                                        onChange={(event) => setQuery(event.target.value)}
                                                                        placeholder='Search...'
                                                                    />
                                                                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                                                                        <HiOutlineSelector className="w-5 h-5 text-gray-400" aria-hidden="true" />
                                                                    </Combobox.Button>

                                                                    {filteredUsers.length > 0 && (
                                                                        <Combobox.Options
                                                                            className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                                            {filteredUsers.map((user) => (
                                                                                <Combobox.Option
                                                                                    key={user.user_id}
                                                                                    value={user}
                                                                                    as={Fragment}>
                                                                                    {({ active, selected }) => (
                                                                                        <li
                                                                                            className={`flex items-center cursor-pointer select-none py-2 pl-3 pr-9 ${active ? 'bg-blue-600 text-white' : 'text-gray-900'}`}>
                                                                                            <Avatar className="h-8 w-8 cursor-pointer rounded-full mr-3">
                                                                                                <AvatarImage
                                                                                                    alt="User Profile"
                                                                                                    src={user.profile_pic}
                                                                                                    className="object-cover" />
                                                                                                <AvatarFallback>
                                                                                                    {user.first_name && user.first_name.length > 0
                                                                                                        ? user.first_name[0].toUpperCase()
                                                                                                        : ""}
                                                                                                    {user.last_name && user.last_name.length > 0
                                                                                                        ? user.last_name[0].toUpperCase()
                                                                                                        : ""}
                                                                                                </AvatarFallback>
                                                                                            </Avatar>
                                                                                            <div>
                                                                                                <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                                                                                    @{user.username}
                                                                                                </span>
                                                                                                <span className={`block truncate text-xs ${selected ? 'font-medium' : 'font-normal'}`}>
                                                                                                    {`${user.first_name} ${user.last_name}`}
                                                                                                </span>
                                                                                            </div>
                                                                                            {selected && (
                                                                                                <IoCheckmark className="w-4 h-4 absolute right-3" aria-hidden="true" />
                                                                                            )}
                                                                                        </li>
                                                                                    )}
                                                                                </Combobox.Option>
                                                                            ))}
                                                                        </Combobox.Options>
                                                                    )}
                                                                </div>
                                                            </Combobox>
                                                        </div>
                                                        <div className="grid grid-cols-4 items-center gap-4">
                                                            <Label className="text-right" htmlFor="message">
                                                                Message
                                                            </Label>
                                                            <Textarea
                                                                className="col-span-3 max-h-40"
                                                                id="message"
                                                                placeholder="Write your message"
                                                                value={newConvoMessage}
                                                                onChange={(e) => setNewConvoMessage(e.target.value)} />
                                                        </div>
                                                    </div>
                                                    <DialogFooter>
                                                        <DialogClose asChild>
                                                            <Button
                                                                type="submit"
                                                                disabled={!isNewConvoFormFilled}>
                                                                Send Message
                                                            </Button>
                                                        </DialogClose>
                                                    </DialogFooter>
                                                </form>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                )}
                            </div>

                            <div className="border-t p-4 dark:border-gray-800">
                                <form
                                    className="flex space-x-2"
                                    onSubmit={async (e) => {
                                        e.preventDefault();

                                        await createMessage(selectedConvoId, receiverId, newMessage);
                                        setNewMessage('');
                                        await refreshUserConvoMsgs(receiverId);
                                    }}>
                                    <Input
                                        className="flex-1 text-sm"
                                        placeholder="Type a message"
                                        type="text"
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        required
                                        disabled={!isConvoSelected} />
                                    <Button
                                        type="submit"
                                        disabled={!isMsgFormFilled}>
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