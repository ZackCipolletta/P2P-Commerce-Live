import { v4 } from "uuid";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

export const handleImageUpload = (event, imageUpload, setImageDownloadURL, setIsUploading ) => {
  event.preventDefault();
  if (imageUpload == null) return;

  // can use the setIsUploading state to display a message while product/image is being uploaded to db
  setIsUploading(true);
  // we use v4() here to name the image in the db, because often times people will upload an image with the same name as another
  // given image. By using v4() we can create a new random name to avoid any issues.
  const imageRef = ref(storage, `productImages/${imageUpload.name + v4()}`);
  uploadBytes(imageRef, imageUpload)
    .then((snapshot) => snapshot.metadata.fullPath)
    .then(() => getDownloadURL(imageRef))
    .then((downloadURL) => {
      alert("Image Uploaded"); // can we put a pop up or something here instead? A loading screen?
      setImageDownloadURL(downloadURL);
      setIsUploading(false);
    })
    .catch((error) => {
      console.error(error);
    });

};

