import { usePets } from "@/hooks/usePets"; // Import the hook that fetches pet data
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon } from 'lucide-react';

export const PetsViewPage = () => {
  const { pets, loading } = usePets(); // Fetch pets and loading state using your custom hook

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center px-4 py-2 border-b lg:px-6">
        <div className="space-y-1">
          <h1 className="text-lg font-bold tracking-wide">Pet Connections & Profiles</h1>
          <div className="flex items-center w-full max-w-md rounded-lg bg-gray-100 dark:bg-gray-800 p-2">
            <SearchIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <Input
              className="w-full bg-transparent focus:outline-none dark:placeholder-gray-400"
              placeholder="Search for pet owners..."
              type="search"
            />
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 lg:p-6">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:gap-6">
            {pets.map(pet => (
              <div key={pet.pet_id} className="flex items-start gap-4">
                <img
                  alt={`${pet.name} profile picture`}
                  className="rounded-full"
                  src={pet.profile_pic || '/placeholder.svg'}
                  style={{ aspectRatio: "1 / 1", objectFit: "cover" }}
                  width="80"
                  height="80"
                />
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-semibold">{pet.name}</h2>
                    <Button size="sm">View Profile</Button>
                  </div>
                  {/* Display the pet's description */}
                  <p className="text-sm text-gray-500 dark:text-gray-400">{pet.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex items-center justify-center p-4 border-t sm:p-6">
        <Button className="h-10 m-1" variant="outline">Load More</Button>
      </div>
    </div>
  );
};
