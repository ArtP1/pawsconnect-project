import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogTrigger, DialogTitle, DialogDescription, DialogHeader, DialogFooter, DialogContent, Dialog } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface PostCreationModalProps {
  onClose: () => void;
}

const PostCreationModal: React.FC<PostCreationModalProps> = ({ onClose }) => {
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [caption, setCaption] = useState<string>('');

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };

  const handleCaptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCaption(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Handle post creation
    // You can send the image and caption to the backend for further processing
    onClose();
  };

  return (
    <div className="flex flex-wrap gap-4 w-4/5 justify-center">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default" size="sm">
            Add New Post
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Add New Post</DialogTitle>
            <DialogDescription>Enter your new post's details.</DialogDescription>
          </DialogHeader>
          <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
            <Label htmlFor="image">Upload Image</Label>
            <Input id="image" type="file" onChange={handleImageChange} accept="image/*" />

            {imageUrl && (
              <div>
                <img src={imageUrl} alt="Uploaded" className="max-w-full h-auto mb-4" />
              </div>
            )}

            <Label htmlFor="caption">Caption</Label>
            <Textarea id="caption" placeholder="Write your caption here..." value={caption} onChange={handleCaptionChange} />

            <DialogFooter>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PostCreationModal;
