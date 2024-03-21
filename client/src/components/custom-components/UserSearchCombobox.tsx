import { Combobox } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { IoCheckmark } from "react-icons/io5";
import { HiOutlineSelector } from "react-icons/hi";

interface User {
    name: string;
    imageUrl: string;
}

const users: User[] = [
    { name: 'Leslie Alexander', imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww' },
    { name: 'Michael Foster', imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww' },
    { name: 'Dries Vincent', imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww' },
    { name: 'Lindsay Walton', imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww' },
    { name: 'Courtney Henry', imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww' },
    { name: 'Tom Cook', imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww' },
];

export const UserSearchCombobox = () => {
    const [selectedUser, setSelectedUser] = useState<User | null>(users[2]);
    const [query, setQuery] = useState('');

    const filteredUsers =
        query === ''
            ? users
            : users.filter((user) =>
                user.name.toLowerCase().includes(query.toLowerCase())
            );

    return (
        <Combobox
            className="col-span-3"
            as="div"
            value={selectedUser}
            onChange={setSelectedUser} >
            <div className="relative mt-1">
                <Combobox.Input
                    className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    displayValue={(user: User) => user?.name ?? ''}
                    onChange={(event) => setQuery(event.target.value)}
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                    <HiOutlineSelector className="w-5 h-5 text-gray-400" aria-hidden="true" />
                </Combobox.Button>

                {filteredUsers.length > 0 && (
                    <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {filteredUsers.map((user) => (
                            <Combobox.Option key={user.name} value={user} as={Fragment}>
                                {({ active, selected }) => (
                                    <li
                                        className={`relative cursor-default select-none py-2 pl-3 pr-9 ${active ? 'bg-blue-600 text-white' : 'text-gray-900'
                                            }`}
                                    >
                                        {selected && (
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                                <IoCheckmark className="w-5 h-5" aria-hidden="true" />
                                            </span>
                                        )}
                                        <img src={user.imageUrl} alt="" className="w-6 h-6 rounded-full" />
                                        <span className={`ml-3 block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                            {user.name}
                                        </span>
                                    </li>
                                )}
                            </Combobox.Option>
                        ))}
                    </Combobox.Options>
                )}
            </div>
        </Combobox>
    );
}
