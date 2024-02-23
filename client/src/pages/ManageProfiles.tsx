import { useState } from 'react';
import React from "react"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { configs } from "@/configs";
const BASE_URL = configs.api.BASE_URL;

export const ManageProfiles = () => {
    const [displayName, setDisplayName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('aj@gmail.com');
    const [profilePicture, setProfilePicture] = useState('');
    const [language, setLanguage] = useState('');
    const [location, setLocation] = useState('');
    const [error, setError] = useState('');

    const handleSignUp = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    
        try {
          const response = await fetch(`${BASE_URL}/users/session`, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  // Include any authentication headers if required
                  // Authorization: `Bearer ${token}`,
              },
          });
  
          if (response.ok) {
              const userData = await response.json();
              // Update state with fetched data
              setDisplayName(userData.display_name);
              setUsername(userData.username);
              setEmail(userData.email);
              setProfilePicture(userData.profile_pic);
              setLanguage(userData.preferred_lang);
              setLocation(userData.location);
          } else {
              const errorData = await response.json();
              setError(errorData.message || 'Failed to fetch profile data');
          }
      } catch (error) {
          setError('Network error');
      }
      };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
      <div className="w-full max-w-2xl p-4 bg-white rounded-lg shadow-md dark:bg-gray-900">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100">Profile Management</h2>
        <div className="flex items-center justify-center mt-4">
          <Avatar className="h-24 w-24">
            <AvatarImage alt="@shadcn" src="/placeholder-avatar.jpg" />
            <AvatarFallback>JP</AvatarFallback>
          </Avatar>
        </div>
        <form className="mt-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="displayName">Display Name</Label>
            <Input id="displayName" placeholder="Enter your display name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input disabled id="username" placeholder="Enter your username" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="Enter your email" type="email" value={email}/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="profilePicture">Profile Picture</Label>
            <Input id="profilePicture" placeholder="Upload your profile picture" type="file" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="language">Preferred Language</Label>
            <Input id="language" placeholder="Enter your preferred language" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" placeholder="Enter your location" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="createdAt">Created At</Label>
            <Input disabled id="createdAt" placeholder="Account creation date" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="updatedAt">Updated At</Label>
            <Input disabled id="updatedAt" placeholder="Last account update date" />
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline">Cancel</Button>
            <Button>Save</Button>
          </div>
        </form>
      </div>
    </div>
  )
}