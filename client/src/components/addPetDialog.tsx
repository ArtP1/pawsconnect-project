// import { Button } from "@/components/ui/button"
// import { DialogTrigger, DialogTitle, DialogHeader, DialogFooter, DialogContent, Dialog } from "@/components/ui/dialog"
// import { Label } from "@/components/ui/label"
// import { Input } from "@/components/ui/input"
// import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"


// export default function AddPetDialog() {
//     return (
//         <Dialog key="1">
//             <DialogTrigger asChild>
//                 <Button variant="outline">Add Pet</Button>
//             </DialogTrigger>
//             <DialogContent className="sm:max-w-[425px]">
//                 <DialogHeader>
//                     <DialogTitle>Add Pet</DialogTitle>
//                     <div className="ml-auto">
//                         <Button variant="outline">Close</Button>
//                     </div>
//                 </DialogHeader>
//                 <div className="grid gap-4 py-4">
//                     <div className="grid grid-cols-4 items-center gap-4">
//                         <Label className="text-right" htmlFor="name">
//                             Name
//                         </Label>
//                         <Input className="col-span-3" id="name" placeholder="Pet's name" />
//                     </div>
//                     <div className="grid grid-cols-4 items-center gap-4">
//                         <Label className="text-right" htmlFor="breed">
//                             Breed
//                         </Label>
//                         <Input className="col-span-3" id="breed" placeholder="Pet's breed" />
//                     </div>
//                     <div className="grid grid-cols-4 items-center gap-4">
//                         <Label className="text-right" htmlFor="age">
//                             Age
//                         </Label>
//                         <Input className="col-span-3" id="age" placeholder="Pet's age" />
//                     </div>
//                     <div className="grid grid-cols-4 items-center gap-4">
//                         <Label className="text-right" htmlFor="type">
//                             Type
//                         </Label>
//                         <Select className="col-span-3" id="type">
//                             <SelectTrigger className="bg-gray-100 rounded-md p-2 dark:bg-gray-800">
//                                 <SelectValue placeholder="Select pet type" />
//                             </SelectTrigger>
//                             <SelectContent>
//                                 <SelectItem value="dog">Dog</SelectItem>
//                                 <SelectItem value="cat">Cat</SelectItem>
//                                 <SelectItem value="bird">Bird</SelectItem>
//                             </SelectContent>
//                         </Select>
//                     </div>
//                     <div className="grid grid-cols-4 items-center gap-4">
//                         <Label className="text-right" htmlFor="image">
//                             Image
//                         </Label>
//                         <Input accept="image/*" className="col-span-3" type="file" />
//                     </div>
//                 </div>
//                 <DialogFooter>
//                     <div>
//                         <Button variant="outline">Cancel</Button>
//                     </div>
//                     <Button type="submit">Save</Button>
//                 </DialogFooter>
//             </DialogContent>
//         </Dialog>
//     )
// }

