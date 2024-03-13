import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogTrigger, DialogTitle, DialogDescription, DialogHeader, DialogFooter, DialogContent, Dialog } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { PostCreationBody } from "@/models/postModel";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { createPost } from "@/services/postService";
import { fetchUserProfile } from "@/services/userService"; // Import fetchUserProfile

interface PostCreationModalProps {
  onClose: () => void;
}

const PostCreationModal: React.FC<PostCreationModalProps> = ({ onClose }) => {
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [caption, setCaption] = useState<string>('');
  const [userProfile, setUserProfile] = useState<any>(null); // State to store user profile data

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const authHeader = useAuthHeader();
        if (!authHeader) {
          console.error('User not authenticated');
          return;
        }
        const response = await fetchUserProfile(authHeader);
        if (response.success) {
          setUserProfile(response.data[0]); // Assuming user profile is returned as an array with one element
        } else {
          console.error('Failed to fetch user profile:', response.message);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserData();
  }, []); // Run once on component mount

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

  const handleSubmit = async (e: FormEvent) => {
    const authHeader = useAuthHeader();
    e.preventDefault();
  
    try {
      if (!authHeader) {
        console.error('User not authenticated');
        return;
      }
  
      if (!image) {
        console.error('No image selected');
        return;
      }
  
      const formData = new FormData();
      formData.append('image', image);
  
      const postBody: PostCreationBody = {
        user_id: userProfile?.user_id,
        content: imageUrl, // Use imageUrl instead of image
        caption: caption,
        visibility: 'public',
      };
  
      // Call the createPost function from the postService
      const response = await createPost(authHeader, postBody);
  
      if (response.success) {
        // Handle success
        onClose();
      } else {
        // Handle error
        console.error('Failed to create post:', response.message);
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
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
