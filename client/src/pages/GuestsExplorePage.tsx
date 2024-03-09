import { Link } from "react-router-dom";
import { NavMenu } from "@/components/navmenu";

export const GuestsExplorePage = () =>  {
  return (
    <>
    <NavMenu />

    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Featured Posts</h2>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
              <div className="grid gap-1">
                <img
                  alt="The Benefits of Having a Pet"
                  className="object-cover w-full h-64 rounded-lg"
                  height={300}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "500/300",
                    objectFit: "cover",
                  }}
                  width={500}
                />
                <h3 className="text-lg font-bold">The Benefits of Having a Pet</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">By John Doe</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Discover the numerous benefits of having a pet, from reducing stress to promoting a healthy lifestyle.
                </p>
              </div>
              <div className="grid gap-1">
                <img
                  alt="How to Train Your Dog"
                  className="object-cover w-full h-64 rounded-lg"
                  height={300}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "500/300",
                    objectFit: "cover",
                  }}
                  width={500}
                />
                <h3 className="text-lg font-bold">How to Train Your Dog</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">By Jane Smith</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Learn effective techniques for training your dog, from basic commands to advanced tricks.
                </p>
              </div>
              <div className="grid gap-1">
                <img
                  alt="Choosing the Right Cat Breed"
                  className="object-cover w-full h-64 rounded-lg"
                  height={300}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "500/300",
                    objectFit: "cover",
                  }}
                  width={500}
                />
                <h3 className="text-lg font-bold">Choosing the Right Cat Breed</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">By Mary Johnson</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Explore the different cat breeds and find out which one is the best fit for your lifestyle.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Upcoming Events</h2>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
              <div className="grid gap-1">
                <img
                  alt="Pet Adoption Fair"
                  className="object-cover w-full h-64 rounded-lg"
                  height={300}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "500/300",
                    objectFit: "cover",
                  }}
                  width={500}
                />
                <h3 className="text-lg font-bold">Pet Adoption Fair</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">March 20, 2024</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Central Park, New York City</p>
              </div>
              <div className="grid gap-1">
                <img
                  alt="Dog Training Workshop"
                  className="object-cover w-full h-64 rounded-lg"
                  height={300}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "500/300",
                    objectFit: "cover",
                  }}
                  width={500}
                />
                <h3 className="text-lg font-bold">Dog Training Workshop</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">April 10, 2024</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Pet Lovers Center, Los Angeles</p>
              </div>
              <div className="grid gap-1">
                <img
                  alt="Cat Show"
                  className="object-cover w-full h-64 rounded-lg"
                  height={300}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "500/300",
                    objectFit: "cover",
                  }}
                  width={500}
                />
                <h3 className="text-lg font-bold">Cat Show</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">May 5, 2024</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Convention Center, San Francisco</p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center gap-4 px-4 md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Join Our Community</h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Sign up to get access to exclusive content, participate in discussions, and connect with other pet
                lovers.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                to="#"
              >
                Sign Up
              </Link>
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                to="#"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
    </>
  )
}
