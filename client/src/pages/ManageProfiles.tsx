import { useEffect, useState, ChangeEvent} from 'react';
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { TabsTrigger, TabsList, TabsContent, Tabs } from "@/components/ui/tabs"
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { AlertDialogTrigger, AlertDialogTitle, AlertDialogDescription, AlertDialogHeader, AlertDialogCancel, AlertDialogAction, AlertDialogFooter, AlertDialogContent, AlertDialog } from "@/components/ui/alert-dialog"
import { DialogTrigger, DialogTitle, DialogDescription, DialogHeader, DialogFooter, DialogContent, Dialog } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import useUser from '@/hooks/useUsers';
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { DynamicAlert } from '@/components/component/dynamic-alert';


export const ManageProfiles = () => {

  const authHeader = useAuthHeader();

  // Necessary imports
  const {
    userProfile, userPets, updateProfile, deletePet, loading, error, success, isAlert
  } = useUser(`${authHeader}`); 

  
  const [profilePicture, setProfilePicture] = useState('');
  const [firstName, setFirstName] = useState('');
  const [username, setUsername] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [prefLang, setPrefLang] = useState('');


  useEffect(() => { // handles user profile prefill
    if (userProfile) {
      setProfilePicture(userProfile.profile_pic|| '');
      setFirstName(userProfile.first_name|| '');
      setLastName(userProfile.last_name|| '');
      setUsername(userProfile.username|| '');
      setEmail(userProfile.email|| '');
      setLocation(userProfile.location|| '');
      setPrefLang(userProfile.preferred_lang || '');
    }
  }, [userProfile]);


  return (
    <div key="1" className="flex flex-col gap-4 p-10">
      
      {error && isAlert && <DynamicAlert type="error" title="Error" description={error} />}
      {success && isAlert && <DynamicAlert type="success" title="Success" description={success} />}
      
      <main className="flex flex-col gap-4">
        <Tabs className="w-full" defaultValue="profile">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="pets">Pets</TabsTrigger>
          </TabsList>

          {loading && <div>Loading...</div>}
          {!loading && (<TabsContent className='flex justify-center items-center flex-col w-full' value="profile">
            <div className="w-full max-w-2xl p-10 rounded-lg shadow-2xl dark:bg-gray-900 my-10">
              <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100">Profile Management</h2>
              <div className="flex items-center justify-center mt-4">

                <Dialog>
                  <DialogTrigger asChild>
                    <Avatar className="h-32 w-32 cursor-pointer">
                      <AvatarImage alt="User Profile" src={profilePicture} />
                      <AvatarFallback>
                        {firstName && firstName.length > 0 ? firstName[0].toUpperCase() : ''}
                        {lastName && lastName.length > 0 ? lastName[0].toUpperCase() : ''}
                      </AvatarFallback>
                    </Avatar>
                  </DialogTrigger>
                  <DialogContent className="w-full max-w-sm">
                    <DialogHeader>
                      <DialogTitle>Upload New Profile Picture</DialogTitle>
                      <DialogDescription>Choose a new profile picture from your device.</DialogDescription>
                    </DialogHeader>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="picture">Picture</Label>
                      <Input 
                        accept="image/*" 
                        id="picture" 
                        type="file"/>
                    </div>
                    <DialogFooter>
                      <Button className="ml-auto">Upload</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Username display */}
              {username && `@${username}`}

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
                      value={firstName}
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
                      value={lastName}
                      type='text' />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className='text-blue-600' htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="Enter an email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email} 
                    />
                </div>

                <div className="space-y-2">
                  <Label className='text-blue-600' htmlFor="language">Preferred Language</Label>
                  <Input
                    id="language"
                    placeholder="Choose a preferred language"
                    value={prefLang}
                    type='text'
                    onChange={(e) => setPrefLang(e.target.value)} />
                </div>

                <div className="space-y-2">
                  <Label className='text-blue-600' htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="Enter a location"
                    type='text'
                    value={location}
                    onChange={(e) => setLocation(e.target.value)} />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline">Cancel</Button>
                  <Button 
                    onClick={() => updateProfile({
                                       nProfilePicture: profilePicture, 
                                       nFirstName: firstName, 
                                       nLastName: lastName, 
                                       nEmail: email,
                                       nLocation: location,
                                       nPrefLang: prefLang
                                   })}>
                    Save
                  </Button>
                </div>
              </form>
            </div>
          </TabsContent>)}
          
          

          {/* Pets tab */}
          <TabsContent className='flex justify-center items-center flex-col w-full' value="pets">
            <div className="flex flex-wrap gap-4 w-4/5 ">
              <div className='grid grid-cols-3 gap-4 w-full'>

                {/* Loops through the list of pets and assigns each a Card and other components */}
                {userPets.map((pet, index) => (
                  <Card key={index} className="w-full max-w-md">
                    <CardHeader>
                      <CardTitle>{pet.name}</CardTitle>
                      <CardDescription>{pet.breed}, {pet.age} years old</CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-center content-center">
                      <img
                        alt="Pet"
                        src={pet.profile_pic}
                        className="max-w-full h-auto max-h-72"/>
                    </CardContent>

                    <CardFooter className='flex justify-evenly'>

                      {/* Delete Pet Button & Alert Dialog */}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size='sm' className='shadow-lg' variant="outline">Edit Pet</Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-lg">
                          <DialogHeader>
                            <DialogTitle>Edit Pet</DialogTitle>
                            <DialogDescription>Make changes to your pet's profile here. Click save when you're done.</DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label className="text-right" htmlFor="name">
                                Name
                              </Label>
                              <Input 
                                className="col-span-3" 
                                id="name" 
                                value={pet.name}/>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label className="text-right" htmlFor="name">
                                Age
                              </Label>
                              <Input 
                                className="col-span-3" 
                                id="name" 
                                value={pet.age} 
                                type='number' 
                                min="0" 
                                max="20"/>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label className="text-right" htmlFor="profile-picture">Profile Picture</Label>
                              <div className="col-span-3">
                                <Input id="profile-picture" 
                                  type="file"
                                  className='cursor-pointer'/>
                              </div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label className="text-right" htmlFor="description">Description</Label>
                              <Textarea 
                                className="col-span-3" 
                                id="description" 
                                value={pet.description} />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label className="text-right" htmlFor="breed">Breed</Label>
                              <Input 
                                className="col-span-3" 
                                id="breed" 
                                value={pet.breed} />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label className="text-right" htmlFor="color">
                                Color
                              </Label>
                              <Input 
                                className="col-span-3" 
                                id="color" 
                                value={pet.color} />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button type="submit">Save changes</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      {/* Delete Pet Button & Alert Dialog */}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button 
                            variant="destructive"
                            className='shadow-lg' 
                            size='sm'>
                              Delete Pet
                          </Button>
                        </AlertDialogTrigger>

                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete your pet's data from our database.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => deletePet(pet.pet_id)}>Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </CardFooter>
                  </Card>
                ))}

              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}