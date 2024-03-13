import React from 'react';
import Graph from 'graphology';
import { SigmaContainer, useLoadGraph } from '@react-sigma/core';
import useUser from '@/hooks/useUsers';
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { User } from '@/models/userModel';
import '@react-sigma/core/lib/react-sigma.min.css';

const LoadGraph = ({ userFriends }: { userFriends: User[] }) => {
    const loadGraph = useLoadGraph();

    React.useEffect(() => {
        const graph = new Graph();
        userFriends.forEach(friend => {
            graph.addNode(friend.user_id, {
                x: Math.random(),
                y: Math.random(),
                size: 10,
                label: friend.username,
                color: '#FA4F40',
            });
        });

        loadGraph(graph);
    }, [loadGraph, userFriends]);

    return null;
};

export const NetworkGraph = () => {
    const authHeader = useAuthHeader();
    const { userFriends } = useUser(`${authHeader}`);

    return (
        <>
            <div className="flex-1 mt-10">
                <div className="flex-1 flex-col max-w-5xl mx-auto">
                    {userFriends.length > 0 ? (
                        <div className="min-h-[700px] border border-gray-300 rounded">
                            <SigmaContainer style={{ height: "700px", width: "100%" }}>
                                <LoadGraph userFriends={userFriends} />
                            </SigmaContainer>
                        </div>
                    ) : (
                        <div className="min-h-[700px] border border-gray-300 rounded flex items-center justify-center">
                            <p>No friends to display. Connect with others!</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};
