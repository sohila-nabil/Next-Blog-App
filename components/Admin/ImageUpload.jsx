"use client";

import { FileInput, Label } from "flowbite-react";
import Image from "next/image";
import { memo, useState } from "react";
 function ImageUpload({ image, setImage, onImageChange, preview }) {
   console.log("image upload");

   const handleChange = (e) => {
     const file = e.target.files[0];
     if (file) {
       const preview = URL.createObjectURL(file);
       setImage(preview);
     }
   };

   return (
     <div className="flex w-full items-center justify-center">
       <Label
         htmlFor="dropzone-file"
         className="flex h-64 w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 overflow-hidden"
       >
         {preview ? (
           <Image
             src={preview}
             alt="Preview"
             width={800}
             height={400}
             className="w-full h-full object-cover"
           />
         ) : (
           <div className="flex flex-col items-center justify-center">
             <p className="mb-2 text-sm text-gray-500">
               <span className="font-semibold">Click to upload</span> or drag
               and drop
             </p>
             <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF</p>
           </div>
         )}

         {/* hidden input */}
         <FileInput
           id="dropzone-file"
           className="hidden"
           onChange={onImageChange}
         />
       </Label>
     </div>
   );
 }

export default memo(ImageUpload)
