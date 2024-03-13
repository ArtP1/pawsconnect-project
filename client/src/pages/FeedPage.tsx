import { useState } from "react";
import { Link } from "react-router-dom";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CiHeart } from "react-icons/ci";
import { FiMessageCircle } from "react-icons/fi";
import { IoIosSend } from "react-icons/io";
import { CiBookmark } from "react-icons/ci";

export const FeedPage = () => {
    // State to track whether comments are expanded or not
    const [commentsExpanded, setCommentsExpanded] = useState(false);

    // Function to toggle comments expansion
    const toggleComments = () => {
        setCommentsExpanded(!commentsExpanded);
    };

    return (
        <>
            <div className="flex-1 mt-10 mb-40">
                <div className="flex flex-col items-center">
                    <ScrollArea className="flex-1 overflow-auto py-2 w-full max-w-md">
                        <div className="grid gap-4 px-4">
                            <Card className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <CardHeader className="p-4 flex flex-row items-center">
                                    <Link className="flex items-center gap-2 text-sm font-semibold" to="#">
                                        <Avatar className="w-8 h-8 border">
                                            <AvatarImage
                                                alt="@shadcn"
                                                src="https://images.unsplash.com/photo-1463453091185-61582044d556?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZSUyMHBpY3R1cmVzfGVufDB8fDB8fHww"
                                                className="object-cover"
                                            />
                                            <AvatarFallback>AC</AvatarFallback>
                                        </Avatar>
                                        @shadcn
                                    </Link>
                                </CardHeader>
                                <CardContent className="p-4">
                                    <img
                                        alt="Product 1"
                                        className="aspect-square object-cover w-full"
                                        height={300}
                                        src="https://images.unsplash.com/photo-1598133894008-61f7fdb8cc3a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZG9nc3xlbnwwfHwwfHx8MA%3D%3D"
                                        width={400}
                                    />
                                    <p className="mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed gravida lorem eget est tincidunt, sed tincidunt neque aliquam. Donec accumsan lorem vel diam interdum varius. Sed posuere placerat libero quis placerat. Quisque eu nisl non leo gravida congue.</p>
                                    {commentsExpanded && (
                                        <div>
                                            {/* Comments section */}
                                            <p>Comments section...</p>
                                        </div>
                                    )}
                                    <div className="flex justify-between mt-4">
                                        <Button size="icon" variant="ghost">
                                            <CiHeart className="w-4 h-4" />
                                            <span className="sr-only">Like</span>
                                        </Button>
                                        <Button size="icon" variant="ghost" onClick={toggleComments}>
                                            <FiMessageCircle className="w-4 h-4" />
                                            <span className="sr-only">Comment</span>
                                        </Button>
                                        <Button size="icon" variant="ghost">
                                            <IoIosSend className="w-4 h-4" />
                                            <span className="sr-only">Share</span>
                                        </Button>
                                        <Button size="icon" variant="ghost">
                                            <CiBookmark className="w-4 h-4" />
                                            <span className="sr-only">Comment</span>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </ScrollArea>
                </div>
            </div>
        </>
    );
};
