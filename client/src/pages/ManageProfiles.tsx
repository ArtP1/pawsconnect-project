import { useEffect, useState } from "react";
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
import useUser from "@/hooks/useUsers";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { DynamicAlert } from "@/components/component/dynamic-alert";
import { Pet } from "@/models/petModel";

export const ManageProfiles = () => {
  const authHeader = useAuthHeader();

  // Necessary imports

  const {
    userProfile,
    userPets,
    updateProfile,
    deletePet,
    addNewPet, 
    loadingProfile, 
    loadingPets, 
    error,
    success,
    isAlert,
    updatePet,
  } = useUser(`${authHeader}`);


  const loading = loadingProfile || loadingPets;

  const [profilePicture, setProfilePicture] = useState("");
  const [firstName, setFirstName] = useState("");
  const [username, setUsername] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [prefLang, setPrefLang] = useState("");

  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [petName, setPetName] = useState<string>("");
  const [petAge, setPetAge] = useState<number>(0); 
  const [petProfilePicture, setPetProfilePicture] = useState<string>("");
  const [petDescription, setPetDescription] = useState<string>("");
  const [petBreed, setPetBreed] = useState<string>("");
  const [petColor, setPetColor] = useState<string>("");

  if (loading) { // Unified loading condition
    return <div>Loading...</div>; // Customize as needed
  }


  useEffect(() => {
    // handles user profile prefill
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

  // Source: https://www.youtube.com/watch?v=2okUvC2qBWk
  const compressImage = (imageDataUrl: string): Promise<string> => {
    const maxWidth = 200;
    const maxHeight = 200;
    const quality = 0.7;

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d")!;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(img, 0, 0, width, height);

        const compressedDataUrl = canvas.toDataURL("image/jpeg", quality);

        resolve(compressedDataUrl);
      };

      img.onerror = (error) => {
        reject(error);
      };

      img.src = imageDataUrl;
    });
  };

  const handleUserPFPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageDataUrl = reader.result as string;

        compressImage(imageDataUrl)
          .then((compressedDataUrl) => {
            setProfilePicture(compressedDataUrl);
          })
          .catch((error) => {
            console.error("Error compressing image:", error);
          });
      };

      reader.readAsDataURL(file);
    }
  };

  const handlePetPFPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageDataUrl = reader.result as string;

        compressImage(imageDataUrl)
          .then((compressedDataUrl) => {
            setPetProfilePicture(compressedDataUrl);
          })
          .catch((error) => {
            console.error("Error compressing image:", error);
          });
      };

      reader.readAsDataURL(file);
    }
  };


  const handleAddNewPet = async (e: React.FormEvent<HTMLFormElement>) => {
    
    e.preventDefault();
    if (!userProfile.user_id) {
      console.error("User ID is missing");
      return;
    }

    const petDetails = {
      name: petName,
      age: petAge,
      profile_pic: petProfilePicture,
      description: petDescription,
      breed: petBreed,
      color: petColor,
      owner_id: userProfile.user_id,
    };

    try {
      const response = await addNewPet(petDetails);
      console.log("Pet added successfully:", response);
      // Reset the form fields after successful submission
      setPetName("");
      setPetAge(0);
      setPetProfilePicture("");
      setPetDescription("");
      setPetBreed("");
      setPetColor("");
    } catch (error) {
      console.error("Error adding pet:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;

    switch (id) {
      case 'petName':
        setPetName(value);
        break;
      case 'petAge':
        setPetAge(Number(value));
        break;
      case 'petProfilePicture':
        setPetProfilePicture(value);
        break;
      case 'petDescription':
        setPetDescription(value);
        break;
      case 'petBreed':
        setPetBreed(value);
        break;
      case 'petColor':
        setPetColor(value);
        break;
      default:
        break;
    }
  };

  return (
    <div key="1" className="flex flex-col gap-4 p-5">
      {error && isAlert && (
        <DynamicAlert type="error" title="Error" description={error} />
      )}
      {success && isAlert && (
        <DynamicAlert type="success" title="Success" description={success} />
      )}

      <main className="flex flex-col gap-4">
        <Tabs className="w-full" defaultValue="profile">
          <TabsList className="grid w-full grid-cols-2 bg-gray-200">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="pets">Pets</TabsTrigger>
          </TabsList>

          {/* {loading && <div>Loading...</div>}
          {!loading && ( */}
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
                      onChange={handleUserPFPChange}
                    />
                  </div>
                </div>

                {/* Username display */}
                {username && `@${username}`}

                <form
                  id="profileForm"
                  className="mt-4 space-y-4"
                  onSubmit={() =>
                    updateProfile({
                      nProfilePicture: profilePicture,
                      nFirstName: firstName,
                      nLastName: lastName,
                      nEmail: email,
                      nLocation: location,
                      nPrefLang: prefLang,
                    })
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
                    <Button variant="outline">Cancel</Button>
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
            value="pets"
          >
            <div className="flex flex-wrap gap-4 w-4/5 justify-center">
              <Dialog>
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
                  <form className="grid gap-4 py-4" onSubmit={handleAddNewPet}>
                    <Label htmlFor="petName">Pet Name</Label>
                    <Input id="petName" placeholder="Pet Name" value={petName} onChange={handleChange} />

                    <Label htmlFor="petAge">Pet Age</Label>
                    <Input id="petAge" placeholder="Pet Age" type="number" value={petAge} onChange={handleChange} />

                    <Label htmlFor="petProfilePicture">Pet Profile Picture URL</Label>
                    <Input id="petProfilePicture" placeholder="Pet Profile Picture URL" value={petProfilePicture} onChange={handleChange} />

                    <Label htmlFor="petDescription">Pet Description</Label>
                    <Textarea id="petDescription" placeholder="Pet Description" value={petDescription} onChange={handleChange} />

                    <Label htmlFor="petBreed">Pet Breed</Label>
                    <Input id="petBreed" placeholder="Pet Breed" value={petBreed} onChange={handleChange} />

                    <Label htmlFor="petColor">Pet Color</Label>
                    <Input id="petColor" placeholder="Pet Color" value={petColor} onChange={handleChange} />

                    <DialogFooter>
                      <Button type="submit">Add Pet</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>

              </Dialog>


              <div className="grid grid-cols-3 gap-10 w-full">
                {/* Loops through the list of pets and assigns each a Card and other components */}
                {userPets.map((pet, index) => (
                  <Card key={index} className="w-full max-w-sm shadow-lg">
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
                            Edit Pet
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
                                      onChange={handlePetPFPChange}
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

                                {/* <div className="grid grid-cols-4 items-center gap-4">
                                  <Label
                                    className="text-right"
                                    htmlFor="profile-picture"
                                  >
                                    Profile Picture
                                  </Label>
                                  <div className="col-span-3">
                                    <Input
                                      id="profile-picture"
                                      type="file"
                                      accept="image/*"
                                      className="cursor-pointer"
                                      onChange={(e) =>
                                        handleEditPetPictureChange(e, setSelectedPet)
                                      }
                                      required
                                    />
                                  </div>
                                </div> */}
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
                                <Button
                                  type="submit">
                                  Save changes
                                </Button>
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
                            Delete Pet
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
                              onClick={() => deletePet(pet.pet_id)}
                            >
                              Delete
                            </AlertDialogAction>
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
  );
};
