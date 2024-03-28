import { useEffect, useState, Fragment } from "react";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TabsTrigger, TabsList, TabsContent, Tabs } from "@/components/ui/tabs";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import {
  AlertDialogTrigger,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogFooter,
  AlertDialogContent,
  AlertDialog,
} from "@/components/ui/alert-dialog";
import {
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogContent,
  Dialog,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { DynamicAlert } from "@/components/custom-components/dynamic-alert";
import { Pet } from "@/models/petModel";
import { DialogClose } from "@radix-ui/react-dialog";
import { compressImage } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Combobox } from '@headlessui/react';
import { UserSnippet } from "@/models/userModel";
import { HiOutlineSelector } from "react-icons/hi";
import { IoCheckmark } from "react-icons/io5";
import useUser from "@/hooks/useUser";
import usePet from "@/hooks/usePet";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";


export const ManageProfiles = () => {
  const authHeader = useAuthHeader();


  const {
    userProfile,
    updateProfile,
    loadingProfile,
    error: userError,
    success: userSuccess,
    isAlert: userIsAlert,
    allUsersForSearch,
    getAllUsersForSearch,
    initiatePetTransferReq
  } = useUser(`${authHeader}`);


  const {
    userPets,
    updatePet,
    deletePet,
    addNewPet,
    loadingPets,
    error: petsError,
    success: petsSuccess,
    isAlert: petsIsAlert,
  } = usePet(`${authHeader}`);


  const [profilePicture, setProfilePicture] = useState("");
  const [firstName, setFirstName] = useState("");
  const [username, setUsername] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [prefLang, setPrefLang] = useState("");


  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [petName, setPetName] = useState("");
  const [petAge, setPetAge] = useState(0);
  const [petProfilePicture, setPetProfilePicture] = useState("");
  const [petDescription, setPetDescription] = useState("");
  const [petBreed, setPetBreed] = useState("");
  const [petColor, setPetColor] = useState("");


  const [newPetName, setNewPetName] = useState("");
  const [newPetAge, setNewPetAge] = useState(0);
  const [newPetProfilePicture, setNewPetProfilePicture] = useState("");
  const [newPetDescription, setNewPetDescription] = useState("");
  const [newPetBreed, setNewPetBreed] = useState("");
  const [newPetColor, setNewPetColor] = useState("");


  const [petTransferReqReceiver, setPetTransferReqReceiver] = useState<UserSnippet | null>(null);


  const [query, setQuery] = useState('');


  const filteredUsers = allUsersForSearch.filter(user => {
    const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
    return fullName.includes(query.toLowerCase());
  });


  useEffect(() => {
    if (userProfile) {
      setProfilePicture(userProfile.profile_pic || "");
      setFirstName(userProfile.first_name || "");
      setLastName(userProfile.last_name || "");
      setUsername(userProfile.username || "");
      setEmail(userProfile.email || "");
      setLocation(userProfile.location || "");
      setPrefLang(userProfile.preferred_lang || "");
    }
  }, [userProfile]);


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, setImage: React.Dispatch<React.SetStateAction<string>>, currentImageURL?: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageDataUrl = reader.result as string;
        compressImage(imageDataUrl)
          .then((compressedBlobUrl) => {
            if (currentImageURL && currentImageURL.startsWith('blob:')) {
              URL.revokeObjectURL(currentImageURL);
            }
            setImage(compressedBlobUrl);
          })
          .catch((error) => {
            console.error("Error compressing image:", error);
          });
      };
      reader.readAsDataURL(file);
    }
  };


  return (
    <div key="1" className="flex flex-col gap-4 p-5">
      {userError && userIsAlert && (
        <DynamicAlert type="error" title="Error" description={userError} />
      )}
      {userSuccess && userIsAlert && (
        <DynamicAlert type="success" title="Success" description={userSuccess} />
      )}
      {petsError && petsIsAlert && (
        <DynamicAlert type="error" title="Error" description={petsError} />
      )}

      {petsSuccess && petsIsAlert && (
        <DynamicAlert type="success" title="Success" description={petsSuccess} />
      )}

      <main className="flex flex-col gap-4">
        <Tabs className="w-full" defaultValue="profile">
          <TabsList className="grid w-full grid-cols-2 bg-gray-200">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="pets">Pets</TabsTrigger>
          </TabsList>

          <TabsContent
            className="flex justify-center items-center flex-col w-full"
            value="profile"
          >
            <div className="w-full max-w-2xl p-10 rounded-lg shadow-2xl dark:bg-gray-900 my-10">
              <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100">
                Profile Management
              </h2>
              <div className="flex items-center justify-center mt-4">
                <div className="flex items-center justify-center mt-4">
                  <Label htmlFor="picture">
                    <Avatar className="h-32 w-32 cursor-pointer">
                      <AvatarImage
                        alt="User Profile"
                        src={profilePicture}
                        className="object-cover"
                      />
                      <AvatarFallback>
                        {firstName && firstName.length > 0
                          ? firstName[0].toUpperCase()
                          : ""}
                        {lastName && lastName.length > 0
                          ? lastName[0].toUpperCase()
                          : ""}
                      </AvatarFallback>
                    </Avatar>
                  </Label>
                  <Input
                    accept="image/*"
                    id="picture"
                    type="file"
                    style={{ display: "none" }}
                    onChange={(e) => handleImageChange(e, setProfilePicture, profilePicture)}
                  />
                </div>
              </div>

              {/* Username display */}
              {username && `@${username}`}

              <form
                id="profileForm"
                className="mt-4 space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();

                  updateProfile({
                    nProfilePicture: profilePicture,
                    nFirstName: firstName,
                    nLastName: lastName,
                    nEmail: email,
                    nLocation: location,
                    nPrefLang: prefLang,
                  })
                }
                }
              >
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label className="text-blue-600" htmlFor="first-name">
                      First name
                    </Label>
                    <Input
                      className="text-gray-600 dark:text-gray-400"
                      id="first-name"
                      placeholder="Enter first name"
                      required
                      onChange={(e) => setFirstName(e.target.value)}
                      value={firstName}
                      type="text"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-blue-600" htmlFor="last-name">
                      Last name
                    </Label>
                    <Input
                      className="text-gray-600 dark:text-gray-400"
                      id="last-name"
                      placeholder="Enter last name"
                      required
                      onChange={(e) => setLastName(e.target.value)}
                      value={lastName}
                      type="text"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-blue-600" htmlFor="email">
                    Email
                  </Label>
                  <Input
                    id="email"
                    placeholder="Enter an email"
                    type="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-blue-600" htmlFor="language">
                    Preferred Language
                  </Label>
                  <Input
                    id="language"
                    placeholder="Choose a preferred language"
                    value={prefLang}
                    type="text"
                    onChange={(e) => setPrefLang(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-blue-600" htmlFor="location">
                    Location
                  </Label>
                  <Input
                    id="location"
                    placeholder="Enter a location"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button type="submit">
                    Save
                  </Button>
                </div>
              </form>
            </div>
          </TabsContent>


          {/* Pets tab */}
          <TabsContent
            className="flex justify-center items-center flex-col w-full"
            value="pets">
            <div className="flex flex-wrap gap-4 w-4/5 justify-center">
              <Dialog onOpenChange={(isOpen) => {
                if (!isOpen) {
                  setNewPetProfilePicture("");
                }
              }}>
                <DialogTrigger asChild>
                  <Button variant="default" size="sm">
                    Add New Pet
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg">
                  <DialogHeader>
                    <DialogTitle>Add New Pet</DialogTitle>
                    <DialogDescription>Enter your new pet's details.</DialogDescription>
                  </DialogHeader>
                  <form
                    className="grid gap-4 py-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                      addNewPet({
                        name: newPetName,
                        age: newPetAge,
                        profile_pic: newPetProfilePicture,
                        description: newPetDescription,
                        breed: newPetBreed,
                        color: newPetColor
                      });

                      setNewPetName("");
                      setNewPetAge(0);
                      setNewPetProfilePicture("");
                      setNewPetDescription("");
                      setNewPetBreed("");
                      setNewPetColor("");
                    }}>

                    <div className="grid gap-4 py-4">
                      <div className="flex items-center justify-center mb-5">
                        <div className="flex items-center justify-center">
                          <Label htmlFor="picture">
                            <Avatar className="h-13 w-13 cursor-pointer">
                              <AvatarImage
                                alt="Pet Profile Picture"
                                src={newPetProfilePicture}
                                className="object-cover bg-cover w-[170px] h-[170px]"
                              />
                              <AvatarFallback className="w-[170px] h-[170px] bg-gray-100 text-center">
                                Add Pet Image <br />(tap to choose)
                              </AvatarFallback>
                            </Avatar>
                          </Label>
                          <Input
                            accept="image/*"
                            id="picture"
                            type="file"
                            className="hidden"
                            onChange={(e) => handleImageChange(e, setNewPetProfilePicture, newPetProfilePicture)}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right" htmlFor="name">
                          Name
                        </Label>
                        <Input
                          className="col-span-3"
                          id="name"
                          placeholder="Pet's Name"
                          onChange={(e) => setNewPetName(e.target.value)}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right" htmlFor="name">
                          Age
                        </Label>
                        <Input
                          className="col-span-3"
                          id="name"
                          type="number"
                          min="0"
                          placeholder="Pet's Age (in years)"
                          max="20"
                          required
                          onChange={(e) => setNewPetAge(parseInt(e.target.value))}
                        />
                      </div>

                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label
                          className="text-right"
                          htmlFor="description">
                          Description
                        </Label>
                        <Textarea
                          className="col-span-3 max-h-32 overflow-auto"
                          id="description"
                          required
                          placeholder="Describe your pet (likes, dislikes, temperament)"
                          onChange={(e) => setNewPetDescription(e.target.value)}
                        />
                      </div>

                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right" htmlFor="breed">
                          Breed
                        </Label>
                        <Input
                          className="col-span-3"
                          id="breed"
                          required
                          placeholder="Pet's Breed"
                          onChange={(e) => setNewPetBreed(e.target.value)}
                        />
                      </div>

                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right" htmlFor="color">
                          Color
                        </Label>
                        <Input
                          className="col-span-3"
                          id="color"
                          required
                          placeholder="Pet's Color"
                          onChange={(e) => setNewPetColor(e.target.value)}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        type="submit">
                        Add Pet
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
              <div className="grid grid-cols-3 gap-10 w-full">
                {/* Loops through the list of pets and assigns each a Card and other components */}
                {userPets.map((pet, index) => (
                  <Card key={index} className="w-full max-w-sm shadow-lg relative">
                    {pet.is_pending_transfer && (
                      <Badge className="absolute top-0 right-0 mt-4 mr-4">In Transfer</Badge>
                    )}
                    <CardHeader>
                      <CardTitle>{pet.name}</CardTitle>
                      <CardDescription>
                        {pet.breed}, {pet.age} years old
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-center content-center">
                      <img
                        alt="Pet"
                        src={pet.profile_pic}
                        className="w-48 h-48 object-cover"
                      />
                    </CardContent>

                    <CardFooter className="flex justify-evenly mb-2">
                      {/* Delete Pet Button & Alert Dialog */}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            className="shadow-lg"
                            variant="outline"
                            onClick={() => {
                              setSelectedPet(pet);
                              setPetName(pet.name);
                              setPetAge(pet.age);
                              setPetProfilePicture(pet.profile_pic);
                              setPetDescription(pet.description);
                              setPetBreed(pet.breed);
                              setPetColor(pet.color);
                            }}
                          >
                            Edit
                          </Button>
                        </DialogTrigger>

                        {/* If a pet is selected to be edited, prefill data, otherwise neglect */}
                        {selectedPet && (
                          <DialogContent className="max-w-lg">
                            <DialogHeader>
                              <DialogTitle>Edit Pet</DialogTitle>
                              <DialogDescription>
                                Make changes to your pet's profile here. Click
                                save when you're done.
                              </DialogDescription>
                            </DialogHeader>
                            <form id="editPetForm"
                              onSubmit={(e) => {
                                e.preventDefault();
                                updatePet({
                                  petId: selectedPet.pet_id,
                                  nName: petName,
                                  nAge: petAge,
                                  nProfilePic: petProfilePicture,
                                  nDescription: petDescription,
                                  nBreed: petBreed,
                                  nColor: petColor,
                                });
                              }}>
                              <div className="grid gap-4 py-4">
                                <div className="flex items-center justify-center mb-5">
                                  <div className="flex items-center justify-center">
                                    <Label htmlFor="picture">
                                      <Avatar className="h-13 w-13 cursor-pointer">
                                        <AvatarImage
                                          alt="User Profile"
                                          src={petProfilePicture}
                                          className="object-cover bg-cover"
                                          style={{ width: '180px', height: '180px' }}
                                        />
                                        <AvatarFallback>
                                          N/A
                                        </AvatarFallback>
                                      </Avatar>
                                    </Label>
                                    <Input
                                      accept="image/*"
                                      id="picture"
                                      type="file"
                                      style={{ display: "none" }}
                                      onChange={(e) => handleImageChange(e, setPetProfilePicture, petProfilePicture)}
                                    />
                                  </div>
                                </div>

                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label className="text-right" htmlFor="name">
                                    Name
                                  </Label>
                                  <Input
                                    className="col-span-3"
                                    id="name"
                                    onChange={(e) => setPetName(e.target.value)}
                                    value={petName}
                                    required
                                  />
                                </div>

                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label className="text-right" htmlFor="name">
                                    Age
                                  </Label>
                                  <Input
                                    className="col-span-3"
                                    id="name"
                                    value={petAge}
                                    type="number"
                                    min="0"
                                    max="20"
                                    required
                                    onChange={(e) => setPetAge(parseInt(e.target.value))}
                                  />
                                </div>

                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label
                                    className="text-right"
                                    htmlFor="description"
                                  >
                                    Description
                                  </Label>
                                  <Textarea
                                    className="col-span-3 max-h-32 overflow-auto"
                                    id="description"
                                    required
                                    value={petDescription}
                                    onChange={(e) => setPetDescription(e.target.value)}
                                  />
                                </div>

                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label className="text-right" htmlFor="breed">
                                    Breed
                                  </Label>
                                  <Input
                                    className="col-span-3"
                                    id="breed"
                                    required
                                    value={petBreed}
                                    onChange={(e) => setPetBreed(e.target.value)}
                                  />
                                </div>

                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label className="text-right" htmlFor="color">
                                    Color
                                  </Label>
                                  <Input
                                    className="col-span-3"
                                    id="color"
                                    required
                                    value={petColor}
                                    onChange={(e) => setPetColor(e.target.value)}
                                  />
                                </div>

                              </div>
                              <DialogFooter>
                                <DialogClose asChild>
                                  <Button
                                    type="submit">
                                    Save changes
                                  </Button>
                                </DialogClose>
                              </DialogFooter>
                            </form>
                          </DialogContent>
                        )}
                      </Dialog>

                      {/* Delete Pet Button & Alert Dialog */}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="destructive"
                            className="shadow-lg"
                            size="sm"
                          >
                            Delete
                          </Button>
                        </AlertDialogTrigger>

                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete your pet's data from our
                              database.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deletePet(pet.pet_id)}>
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>

                      {!pet.is_pending_transfer && (
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              onClick={async () => getAllUsersForSearch()}>
                              Transfer
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-80">
                            <form
                              id="petTransferForm"
                              className="grid gap-4"
                              onSubmit={(e) => {
                                e.preventDefault();

                                if (petTransferReqReceiver) {
                                  initiatePetTransferReq(petTransferReqReceiver.user_id, pet.pet_id);
                                }
                              }}>
                              <div className="space-y-2">
                                <h4 className="font-medium leading-none">Pet Transfer Form</h4>
                                <p className="text-sm text-muted-foreground">
                                  Select the user you're transfering this pet to.
                                </p>
                              </div>
                              <div className="grid gap-2">
                                <div className="grid grid-cols-3 items-center gap-4">
                                  <Label htmlFor="width">User</Label>
                                  <Combobox
                                    className="col-span-3"
                                    as="div"
                                    value={petTransferReqReceiver}
                                    onChange={setPetTransferReqReceiver}>

                                    <div className="relative mt-1">
                                      <Combobox.Input
                                        className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                        displayValue={(user: UserSnippet) => user ? `${user.first_name} ${user.last_name}` : ''}
                                        onChange={(event) => setQuery(event.target.value)}
                                        placeholder='Search...'
                                        required />

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
                                <Button type="submit">Send request</Button>
                              </div>
                            </form>
                          </PopoverContent>
                        </Popover>
                      )}

                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};
