import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input"
import { AvatarImage, Avatar } from "@/components/ui/avatar"
import { CardContent, Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import useUser from "@/hooks/useUsers"
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { User } from '@/models/userModel';

export const FriendsPage = () => {
    const authHeader = useAuthHeader();
    const { userFriends, loadingFriends } = useUser(`${authHeader}`); // Pass authHeader correctly
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredFriends, setFilteredFriends] = useState<User[]>([]);

    useEffect(() => {
        if (!loadingFriends && userFriends) {
            setFilteredFriends(
                searchQuery === '' ? userFriends : userFriends.filter(user =>
                    user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    user.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    (user.location && user.location.toLowerCase().includes(searchQuery.toLowerCase()))
                )
            );
        }
    }, [searchQuery, userFriends, loadingFriends]);

    return (
        <>
            <div className="flex-1 mt-10">
                <div className="flex-1 flex-col max-w-5xl mx-auto">
                    <div className="min-h-[700px]">
                        <div className="flex items-center justify-center gap-2 mb-[40px]">
                            <Input
                                className="max-w-[275px] py-3 px-4"
                                placeholder="Filter friends. . ."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)} />
                        </div>
                        {loadingFriends && !userFriends ? (
                            <div className="flex justify-center items-center h-[70vh]">
                                <img src="/Running dog.gif" alt="Loading" />
                            </div>
                        ) : userFriends && userFriends.length > 0 ? (
                            filteredFriends.length > 0 ? (
                                <ScrollArea className="h-[70vh]" type="hover" scrollHideDelay={75}>
                                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                        {filteredFriends.map((user) => (
                                            <Card key={user.user_id} className="cursor-pointer">
                                                <CardContent className="flex flex-col space-y-4 p-5">
                                                    <div className="flex flex-col items-center space-y-4">
                                                        <Avatar className="h-[60px] w-[60px]">
                                                            <AvatarImage
                                                                className="object-cover"
                                                                alt={`${user.first_name} ${user.last_name}`}
                                                                src={user.profile_pic} />
                                                        </Avatar>
                                                        <div className="w-full">
                                                            <h3 className="text-lg font-semibold">{user.first_name} {user.last_name}</h3>
                                                            <p className="text-sm text-gray-500 dark:text-gray-400 w-full break-words">@{user.username}</p><br />
                                                            <p className="text-sm text-gray-500 dark:text-gray-400 w-4/5 break-words">{user.location}</p>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </ScrollArea>
                            ) : (
                                <div className="text-center py-10 w-full">
                                    <p>No friends found matching your search.</p>
                                </div>
                            )
                        ) : (
                            <div className="text-center py-10 w-full">
                                <p>No users found.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}