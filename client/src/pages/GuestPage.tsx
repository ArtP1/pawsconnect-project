import { Link } from "react-router-dom";
import { SVGProps } from 'react';
import { NavMenu } from "@/components/navmenu";
import { AccordionTrigger, AccordionContent, AccordionItem, Accordion } from "@/components/ui/accordion"


export const GuestPage = () => {
  return (
    <div key="1" className="flex flex-col min-h-[100vh]">
      <main className="flex-1">

        <NavMenu />

        <section className="w-full pt-1 pb-1 sm:pt-8 sm:pb-12 md:pt-16 md:pb-24 lg:pt-24 lg:pb-32 xl:pt-36 xl:pb-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <video
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
                autoPlay
                loop>
                <source src="https://cdn.pixabay.com/vimeo/719443737/woman-119799.mp4?width=720&hash=34d6d7cc3fd6b57517b28d586c8176440fca349b" />
              </video>

              <div className="flex flex-col justify-center space-y-10">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none mb-5">
                    Connect with Pet Lovers Near You
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Discover local pet events, find pet playdates, and foster friendships with fellow pet lovers.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
                  <Link
                    className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                    to="/signup">
                    Get Started
                  </Link>
                  <Link
                    className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                    to="#">
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Discover the Power of Pet Connect</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  From finding pet playdates to discovering local pet events, Pet Connect offers a variety of features
                  to enhance your pet-loving lifestyle.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex items-center justify-center">
                  <DogIcon className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-bold">Find Pet Playdates</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Connect with other pet owners to arrange fun playdates for your furry friends.
                </p>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex items-center justify-center">
                  <LocateIcon className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-bold">Discover Local Pet Events</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Stay up-to-date with local pet events and meetups happening in your area.
                </p>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex items-center justify-center">
                  <UsersIcon className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-bold">Connect with Pet Lovers Near You</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Join a community of pet lovers and share your experiences, tips, and adorable pet photos.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">

                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Meet Our Adorable Community</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Take a peek at some of the adorable pets from our Pet Connect community.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <img
                alt="Pet Image"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                height="200"
                src="https://plus.unsplash.com/premium_photo-1668606763482-8dd2042c934e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZG9nc3xlbnwwfHwwfHx8MA%3D%3D"
                width="200"
              />
              <img
                alt="Pet Image"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                height="200"
                src="https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGRvZ3N8ZW58MHwwfDB8fHww"
                width="200"
              />
              <img
                alt="Pet Image"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                height="200"
                src="https://images.unsplash.com/photo-1477973770766-6228305816df?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGRvZ3N8ZW58MHwwfDB8fHww"
                width="200"
              />
              <img
                alt="Pet Image"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                height="200"
                src="https://images.unsplash.com/photo-1621265845825-b261b2aa439f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fGRvZ3N8ZW58MHwwfDB8fHww"
                width="200"
              />
              <img
                alt="Pet Image"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                height="200"
                src="https://images.unsplash.com/photo-1534361960057-19889db9621e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fGRvZ3N8ZW58MHwwfDB8fHww"
                width="200"
              />
              <img
                alt="Pet Image"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                height="200"
                src="https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fGRvZ3N8ZW58MHwwfDB8fHww"
                width="200"
              />
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">FAQs</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Frequently Asked Questions</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Have questions? We've got answers. Explore our FAQs to learn more about PawsConnect.
                </p>
              </div>
              <div className="mx-auto w-full max-w-4xl space-y-4">
                {/* Accordion API reference: https://www.radix-ui.com/primitives/docs/components/accordion#api-reference */}
                <Accordion type="single" collapsible>
                  <AccordionItem value="item1" className="mt-4">
                    <AccordionTrigger className="flex cursor-pointer items-center justify-between p-4 rounded-lg bg-gray-200 dark:bg-gray-700">
                      How do I create a pet profile on PawsConnect?
                    </AccordionTrigger>
                    <AccordionContent className="mt-2 p-4 text-gray-500 dark:text-gray-400">
                      Creating a pet profile on PawsConnect is easy and fun! Once you're logged in, navigate to the "My Pets" section and click on
                      "Create Pet Profile." Fill in the details about your furry friend, including their name, age, breed, and a little bio. You can
                      also upload your pet's photo to personalize their profile. Don't forget to save your changes!
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item2" className="mt-4">
                    <AccordionTrigger className="flex cursor-pointer items-center justify-between p-4 rounded-lg bg-gray-200 dark:bg-gray-700">
                      How can I ensure my privacy on PawsConnect?
                    </AccordionTrigger>
                    <AccordionContent className="mt-2 p-4 text-gray-500 dark:text-gray-400">
                      Your privacy is our top priority. In the "Settings" section, you can customize your privacy settings, including who can see your
                      posts, who can message you, and what information is visible on your profile. We recommend reviewing these settings to ensure
                      you're comfortable with your privacy level on PawsConnec
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item3" className="mt-4">
                    <AccordionTrigger className="flex cursor-pointer items-center justify-between p-4 rounded-lg bg-gray-200 dark:bg-gray-700">
                      How can I connect with other pet lovers on PawsConnect?
                    </AccordionTrigger>
                    <AccordionContent className="mt-2 p-4 text-gray-500 dark:text-gray-400">
                      Connecting with fellow pet parents on PawsConnect is easy! Explore the "Community" section to find posts from other users. You can
                      interact by liking, commenting, and sharing posts that resonate with you. For more direct engagement, use the "Messages" feature to
                      start conversations with other members who share your interests.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item4" className="mt-4">
                    <AccordionTrigger className="flex cursor-pointer items-center justify-between p-4 rounded-lg bg-gray-200 dark:bg-gray-700">
                      How do I share or find information about pet care on PawsConnect?
                    </AccordionTrigger>
                    <AccordionContent className="mt-2 p-4 text-gray-500 dark:text-gray-400">
                      While PawsConnect doesn't directly provide pet care resources, our vibrant community of pet lovers frequently shares tips, advice,
                      and personal experiences on a wide range of pet care topics. Dive into the "Community" section to read posts or ask questions about
                      pet health, behavior, nutrition, and more. It's a great way to gain insights from the experiences of fellow pet parents.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item5" className="mt-4">
                    <AccordionTrigger className="flex cursor-pointer items-center justify-between p-4 rounded-lg bg-gray-200 dark:bg-gray-700">
                      Can I share information about pet-related events on PawsConnect?
                    </AccordionTrigger>
                    <AccordionContent className="mt-2 p-4 text-gray-500 dark:text-gray-400">
                      Absolutely! If you know about an upcoming pet-related event or have attended one recently, feel free to share your experiences or
                      event details with the community. Post in the "Community" section, including any useful information such as the event's date,
                      location, and what attendees can expect. It's a fantastic way to keep the community informed and involved, even if PawsConnect
                      doesn't host its own events currently.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-gray-800 text-white">
        <p className="text-xs text-white dark:text-gray-400">© 2024 PawsConnect. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" to="#">
            About Us
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" to="#">
            Contact
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" to="#">
            Terms of Service
          </Link>
        </nav>
      </footer>
    </div>
  )
}


function ChevronDownIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

function DogIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.47-4.113 6.006-4 7 .08.703 1.725 1.722 3.656 1 1.261-.472 1.96-1.45 2.344-2.5" />
      <path d="M14.267 5.172c0-1.39 1.577-2.493 3.5-2.172 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.239-2.5" />
      <path d="M8 14v.5" />
      <path d="M16 14v.5" />
      <path d="M11.25 16.25h1.5L12 17l-.75-.75Z" />
      <path d="M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444c0-1.061-.162-2.2-.493-3.309m-9.243-6.082A8.801 8.801 0 0 1 12 5c.78 0 1.5.108 2.161.306" />
    </svg>
  )
}


function LocateIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="2" x2="5" y1="12" y2="12" />
      <line x1="19" x2="22" y1="12" y2="12" />
      <line x1="12" x2="12" y1="2" y2="5" />
      <line x1="12" x2="12" y1="19" y2="22" />
      <circle cx="12" cy="12" r="7" />
    </svg>
  )
}


function UsersIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}
