// In AuthenticatedLayout.tsx
import React, { useState } from 'react';
import { NavMenu } from '@/components/navmenu';
import { IoIosGitNetwork } from "react-icons/io";
import { IoIosAddCircle } from "react-icons/io";
import { IoIosNotifications } from "react-icons/io";
import { FiMessageSquare } from "react-icons/fi";
import { FaUserFriends } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Link, useLocation } from "react-router-dom";
import { Footer } from '@/components/Footer';
import { Button } from "@/components/ui/button"
import { DialogTrigger, DialogTitle, DialogDescription, DialogHeader, DialogFooter, DialogContent, Dialog } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import usePost from '@/hooks/usePost';
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { compressImage } from '@/lib/utils';
import { DialogClose } from '@radix-ui/react-dialog';
import { DynamicAlert } from '@/components/custom-components/dynamic-alert';

interface AuthenticatedLayoutProps {
    children: React.ReactNode;
}


export const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = ({ children }) => {
    const authHeader = useAuthHeader();
    const location = useLocation();

    const [postContent, setPostContent] = useState("");
    const [postCaption, setPostCaption] = useState("");
    const [postVisibility, setPostVisibility] = useState("");

    const {
        addUserPost,
        isAlert: postIsAlert,
        error: postError,
        success: postSuccess,
    } = usePost(`${authHeader}`);


    const handleImagePostUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageDataUrl = reader.result as string;

                compressImage(imageDataUrl)
                    .then((compressedDataUrl) => {
                        if (postContent) {
                            URL.revokeObjectURL(postContent);
                        }
                        setPostContent(compressedDataUrl);
                    })
                    .catch((error) => {
                        console.error("Error compressing image:", error);
                    });
            };

            reader.readAsDataURL(file);
        }
    };

    
    const routeMap: { [key: string]: string } = {
        '/': 'Home',
        '/friends': 'Friends',
        '/messages': 'Messages',
        '/notifications': 'Notifications',
        '/connections': 'Network'
    };

    const getPageTitle = () => {
        return routeMap[location.pathname] || 'N/A';
    };


    return (
        <>
            <NavMenu />

            <div className='container flex flex-col md:flex-row px-0 min-h-screen'>
                {postSuccess && postIsAlert && (
                    <DynamicAlert type="success" title="Success" description={postSuccess} />
                )}

                {postError && postIsAlert && (
                    <DynamicAlert type="error" title="Error" description={postError} />
                )}

                <div className="flex flex-col border-r w-full md:w-56 sticky top-0">

                    <div className="flex h-[90px] justify-center items-center border-b">

                        <span className="h-fit">{getPageTitle()}</span>
                    </div>

                    <nav className="flex-grow p-4 space-y-7 overflow-auto">
                        <Input className="w-full h-25 rounded-md text-black" placeholder="Search for users..." type="search" />

                        <Link
                            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
                            to="/friends">
                            <FaUserFriends className="h-5 w-5" />
                            <span>Friends</span>
                        </Link>

                        <Link
                            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
                            to="/messages">
                            <FiMessageSquare className="h-5 w-5" />
                            <span>Messages</span>
                        </Link>

                        <Link
                            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
                            to="#">
                            <IoIosNotifications className="h-5 w-5" />
                            <span>Notifications</span>
                        </Link>

                        <Link
                            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
                            to="/connections">
                            <IoIosGitNetwork className="h-5 w-5" />
                            <span>Network</span>
                        </Link>

                        <Dialog>
                            <DialogTrigger asChild>
                                <button className="flex items-center space-x-2">
                                    <IoIosAddCircle className="h-5 w-5" />
                                    <span>Add Post</span>
                                </button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Add a new post</DialogTitle>
                                    <DialogDescription>Share your thoughts with the world. Click add post when you're done.</DialogDescription>
                                </DialogHeader>

                                <form
                                    className="grid gap-4 py-4"
                                    onSubmit={(e) => {
                                        e.preventDefault();

                                        addUserPost({
                                            content: postContent,
                                            caption: postCaption,
                                            visibility: postVisibility
                                        })
                                    }
                                    }>

                                    <div className="flex items-center justify-center mb-5 rounded overflow-hidden w-96 h-80">
                                        <div className="flex items-center justify-center h-full w-full">
                                            <Label htmlFor="picture">
                                                <Avatar className="h-full w-full cursor-pointer ">
                                                    <AvatarImage
                                                        alt="User Profile"
                                                        src={postContent}
                                                        className="object-cover w-96 h-80"
                                                    />
                                                    <AvatarFallback className="bg-gray-100 w-96 h-80 text-center">
                                                        Add Post Image <br />(tap to choose)
                                                    </AvatarFallback>
                                                </Avatar>
                                            </Label>
                                            <Input
                                                accept="image/*"
                                                id="picture"
                                                type="file"
                                                required
                                                className='hidden'
                                                onChange={handleImagePostUpload}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label
                                            className="text-right"
                                            htmlFor="description">
                                            Caption
                                        </Label>
                                        <Textarea
                                            className="col-span-3 max-h-32 overflow-auto"
                                            id="description"
                                            required
                                            onChange={(e) => setPostCaption(e.target.value)}
                                        />
                                    </div>

                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label
                                            className="text-right"
                                            htmlFor="select">
                                            Visibility
                                        </Label>
                                        <Select
                                            required
                                            onValueChange={(value) => setPostVisibility(value)}>

                                            <SelectTrigger id='select' className="w-[200px]">
                                                <SelectValue placeholder="Select visibility" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Public">Public</SelectItem>
                                                <SelectItem value="Friends Only">Friends Only</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <DialogFooter>
                                        {postContent && postCaption && postVisibility ? (
                                            <DialogClose asChild>
                                                <div>
                                                    <Button variant="outline" className='mr-5'>Cancel</Button>
                                                    <Button type="submit">Add Post</Button>
                                                </div>
                                            </DialogClose>
                                        ) : (
                                            <div>
                                                <DialogClose asChild>
                                                    <Button variant="outline" className='mr-5'>Cancel</Button>
                                                </DialogClose>

                                                <Button type="submit">Add Post</Button>

                                            </div>
                                        )}
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </nav>
                </div>

                {children}
            </div>

            <Footer />


        </>
    );
};

