"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation'
import { Button } from "@/app/components/ui/button"

interface UploadResponse {
  redirect: string;
}

const FileUploadForm = () => {
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    setFile(selectedFile);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("http://localhost:3000/api/import", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const jsonResponse: UploadResponse = await response.json();
          router.push(`http://localhost:3000/expense/import/${jsonResponse.redirect}`)
        } else {
          console.error("Hubo un error al subir el archivo.");
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        onChange={handleFileChange}
        className="file-input file-input-bordered w-full max-w-xs"
        required
      />
      <button type="submit" className="btn">Subir archivo</button>
    </form>
  );
};

export default FileUploadForm;
