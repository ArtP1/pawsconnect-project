import { Link } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import { Notification as NotificationModel } from "@/models/notificationsModel";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { DialogTrigger, DialogTitle, DialogDescription, DialogHeader, DialogFooter, DialogContent, Dialog } from "@/components/ui/dialog"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import useUser from "@/hooks/useUser";
import useNotifications from "@/hooks/useNotifications";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import "./notification.css"


export const Notification = (props: NotificationModel) => {
    const authHeader = useAuthHeader();
    const { acceptFriendRequest } = useUser(`${authHeader}`);


    return (
        <div className="notification">
            <GoDotFill className={`icon ${props.type}`} />
            <div className="labels">
                <p className="title">{props.title}</p>

                {props.type === 'post-l' ? (
                    <p className="sub-heading">
                        <Link
                            to={`${props.ref_user_id}`}
                            className="font-semibold">
                            @{props.ref_username}
                        </Link>
                        <span>{props.sub_heading}</span>
                    </p>
                ) : props.type === 'post-c' ? (
                    <p className="sub-heading">
                        <Link
                            to={`${props.ref_user_id}`}
                            className="font-semibold">
                            @{props.ref_username}
                        </Link>
                        <span>{props.sub_heading}</span>
                    </p>
                ) : props.type === 'f-request' ? (
                    <p className="sub-heading">
                        <Link
                            to={`${props.ref_user_id}`}
                            className="font-semibold">
                            @{props.ref_username}
                        </Link>
                        <span>{props.sub_heading}</span>
                    </p>
                ) : props.type === 't-request' ? (
                    <p className="sub-heading">
                        <Link
                            to={`${props.ref_user_id}`}
                            className="font-semibold">
                            @{props.ref_username}
                        </Link>
                        <span>{props.sub_heading}</span>
                    </p>
                ) : <> </>}

                <p className="time">{formatDate(props.created_at)}</p>
            </div>

            {props.type === 'post-l' && (
                <div>
                    <Link to={`${props.post_id}`}>
                        <div className="w-[125px]">
                            <AspectRatio ratio={13 / 9}>
                                <img
                                    src={`${props.content}`}
                                    alt="Image"
                                    className="rounded-md object-cover" />
                            </AspectRatio>
                        </div>
                    </Link>
                </div>
            )}

            {props.type === 'post-c' && (
                <div>
                    <Link to={`${props.post_id}`}>
                        <div className="w-[125px]">
                            <AspectRatio ratio={13 / 9}>
                                <img
                                    src={`${props.content}`}
                                    alt="Image"
                                    className="rounded-md object-cover" />
                            </AspectRatio>
                        </div>
                    </Link>
                </div>
            )}

            {props.type === 'f-request' && (
                <div className="actions">
                    <Button
                        className="accept"
                        variant='outline'
                        onClick={() => {
                            console.log(props.ref_user_id);
                            if (props.ref_user_id) {
                                acceptFriendRequest(props.ref_user_id, props.noti_id);
                            }
                        }}>
                        Accept
                    </Button>
                    <Button className="decline">Decline</Button>
                </div>
            )}

            {props.type === 't-request' && (
                <Dialog key="1">
                    <DialogTrigger asChild>
                        <Button>View</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[675px] gap-4">
                        <DialogHeader>
                            <DialogTitle>Pet Profile</DialogTitle>
                            <DialogDescription>View the detailed profile of the pet here.</DialogDescription>
                        </DialogHeader>
                        <div className="flex flex-1 items-center gap-6">
                            <div className="flex flex-col flex-1 items-center gap-2">
                                <Avatar className="h-80 w-80 rounded-full">
                                    <AvatarImage
                                        alt="Pet Image"
                                        src="https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGRvZ3xlbnwwfHwwfHx8MA%3D%3D"
                                        className="object-cover" />
                                    <AvatarFallback>PT</AvatarFallback>
                                </Avatar>

                                <span className="font-semibold">Pluto</span>
                            </div>

                            <div className="flex flex-col">
                                <div className="items-center p-2">
                                    <Label className="text-left" htmlFor="age">
                                        Age:
                                    </Label>
                                    <div id="age" className="ml-2">
                                        2 years
                                    </div>
                                </div>

                                <div className="items-center p-2">
                                    <Label className="text-left" htmlFor="description">
                                        Description:
                                    </Label>
                                    <div className="md-text ml-2" id="description">
                                        This is a very friendly and playful pet. Loves to be around people and other pets.
                                    </div>
                                </div>

                                <div className="items-center p-2">
                                    <Label className="text-left" htmlFor="description">
                                        Breed:
                                    </Label>
                                    <div className="md-text ml-2" id="description">
                                        Doodle
                                    </div>
                                </div>

                                <div className="items-center p-2">
                                    <Label className="text-left" htmlFor="description">
                                        Color:
                                    </Label>
                                    <div className="md-text ml-2" id="description">
                                        Brown-White
                                    </div>
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                type="submit"
                                variant='outline'>
                                Accept
                            </Button>
                            <Button type="submit">Decline</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
};