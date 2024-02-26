import { useEffect, useState } from 'react';
import React from "react"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { TabsTrigger, TabsList, TabsContent, Tabs } from "@/components/ui/tabs"
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import SucessAlert from '@/components/successAlert';


export const ManageProfiles = () => {
  // Form inputs
  const [nFirstName, setFirstName] = useState('');
  const [nLastName, setLastName] = useState('');
  const [nUsername, setUsername] = useState('');
  const [nEmail, setEmail] = useState('');
  const [nProfilePicture, setProfilePicture] = useState('');
  const [nLocation, setLocation] = useState('');
  const [nPrefLang, setPrefLang] = useState('');

  // Others
  const [error, setError] = useState('');
  const authHeader = useAuthHeader();

  const [showSuccessAlert, setShowSuccessAlert] = useState(false); // State to control the visibility of SuccessAlert


  const handleProfileChange = async () => {
    try {
      const response = await fetch("/api/users/profile/update", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${authHeader}`
        },
        body: JSON.stringify({
          nFirstName,
          nLastName,
          nUsername,
          nEmail,
          nProfilePicture,
          nLocation,
          nPrefLang
        })
      });

      if(response.ok) {
        console.log("Inside the response ok");
        const resp = await response.json();
        console.log(resp.data);
        setShowSuccessAlert(true);
        setTimeout(() => setShowSuccessAlert(false), 3000);
      }
    } catch(err) {
      setError('Failed to update profile'); 
    }
  }


  const handlePrefill = async () => {
    try {
      const response = await fetch("/api/users/profile", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${authHeader}`
        }
      });

      if (response.ok) {
        const resp = await response.json();
        const data = resp.data;

        setFirstName(data[0].first_name);
        setLastName(data[0].last_name);
        setUsername(data[0].username);
        setEmail(data[0].email);
        setProfilePicture(data[0].profile_pic);
        setPrefLang(data[0].preferred_lang);
        setLocation(data[0].location);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to fetch profile data');
      }
    } catch (error) {
      setError('Network error');
    }
  };

  useEffect(() => {
    handlePrefill();
  }, []);

  return (
    <div key="1" className="flex flex-col gap-4 p-10">
      {showSuccessAlert && <SucessAlert />}
      <main className="flex flex-col gap-4">
        <Tabs className="w-full" defaultValue="profile">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="pets">Pets</TabsTrigger>
          </TabsList>
          <TabsContent className='flex justify-center items-center flex-col w-full' value="profile">
            <div className="w-full max-w-2xl p-10 rounded-lg shadow-2xl dark:bg-gray-900 my-10">
              <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100">Profile Management</h2>
              <div className="flex items-center justify-center mt-4">

                <Avatar className="h-40 w-40">
                  <AvatarImage alt="@shadcn" src="/placeholder-avatar.jpg" />
                  <AvatarFallback>JP</AvatarFallback>
                </Avatar>
              </div>

              <form id="profileForm" className="mt-4 space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label className="text-blue-600" htmlFor="first-name">First name</Label>
                    <Input
                      className="text-gray-600 dark:text-gray-400"
                      id="first-name"
                      placeholder="Enter first name"
                      required
                      onChange={(e) => setFirstName(e.target.value)}
                      value={nFirstName}
                      type='text' />
                  </div>

                  <div className="space-y-2" >
                    <Label className="text-blue-600" htmlFor="last-name">Last name</Label>
                    <Input
                      className="text-gray-600 dark:text-gray-400"
                      id="last-name"
                      placeholder="Enter last name"
                      required
                      onChange={(e) => setLastName(e.target.value)}
                      value={nLastName}
                      type='text' />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className='text-blue-600' htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    readOnly
                    disabled
                    type='text'
                    placeholder="Enter username"
                    value={`@${nUsername}`} />
                </div>

                <div className="space-y-2">
                  <Label className='text-blue-600' htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="Enter an email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={nEmail} />
                </div>

                <div className="space-y-2">
                  <Label className='text-blue-600' htmlFor="language">Preferred Language</Label>
                  <Input
                    id="language"
                    placeholder="Choose a preferred language"
                    value={nPrefLang || ""} 
                    type='text'
                    onChange={(e) => setPrefLang(e.target.value)}/>
                </div>

                <div className="space-y-2">
                  <Label className='text-blue-600' htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="Enter a location"
                    type='text'
                    value={nLocation || ""}
                    onChange={(e) => setLocation(e.target.value)} />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline">Cancel</Button>
                  <Button onClick={handleProfileChange}>Save</Button>
                </div>
              </form>
            </div>
          </TabsContent>
          <TabsContent className='flex justify-center items-center flex-col w-full' value="pets">
            <div className="flex flex-wrap gap-4 w-4/5 ">
              <div className='grid grid-cols-3 gap-4 w-full'>
              <Card className="w-full max-w-md">
                <CardHeader>
                  <CardTitle>Fluffy</CardTitle>
                  <CardDescription>Golden Retriever, 5 years old</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center items-center">
                  <img
                    alt="Pet"
                    className="rounded-full w-50 h-50"
                    height="200"
                    src="/placeholder.svg"
                    style={{
                      aspectRatio: "200/200",
                      objectFit: "cover",
                    }}
                    width="200"
                  />
                </CardContent>
                <CardFooter>
                  <Button className="ml-auto" variant="outline">
                    Edit
                  </Button>
                  <Button className="ml-2" variant="outline">
                    Delete
                  </Button>
                </CardFooter>
              </Card>
              <Card className="w-full max-w-md">
                <CardHeader>
                  <CardTitle>Whiskers</CardTitle>
                  <CardDescription>Tabby Cat, 3 years old</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center items-center">
                  <img
                    alt="Pet"
                    className="rounded-full w-50 h-50"
                    height="200"
                    src="/placeholder.svg"
                    style={{
                      aspectRatio: "200/200",
                      objectFit: "cover",
                    }}
                    width="200"
                  />
                </CardContent>
                <CardFooter>
                  <Button className="ml-auto" variant="outline">
                    Edit
                  </Button>
                  <Button className="ml-2" variant="outline">
                    Delete
                  </Button>
                </CardFooter>
              </Card>
              <Card className="w-full max-w-md">
                <CardHeader>
                  <CardTitle>Goldie</CardTitle>
                  <CardDescription>Goldfish, 1 year old</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center items-center">
                  <img
                    alt="Pet"
                    className="rounded-full w-50 h-50"
                    height="200"
                    src="/placeholder.svg"
                    style={{
                      aspectRatio: "200/200",
                      objectFit: "cover",
                    }}
                    width="200"
                  />
                </CardContent>
                <CardFooter>
                  <Button className="ml-auto" variant="outline">
                    Edit
                  </Button>
                  <Button className="ml-2" variant="outline">
                    Delete
                  </Button>
                </CardFooter>
              </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}