"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import useFileProcessing from "@/app/expense/import/hooks/useFileProcessing";
import { useCategories } from "@/app/hooks";
import FileForm from "@/app/expense/import/components/FileForm";
import CardForm from "@/app/expense/import/components/CardForm";
import { z } from "zod";
import { formListSchema } from "@/app/expense/Validations";
import { Button } from "@/app/components/ui/button";

const FileUploadForm = () => {
  const { data, error, isLoading } = useCategories();
  const { processedData, processFiles } = useFileProcessing();

  const onSubmit: SubmitHandler<{ inputFiles: File[] }> = async (formData: {
    inputFiles: File[];
  }) => {
    processFiles(formData.inputFiles);
  };

  const onSubmitForm = (values: z.infer<typeof formListSchema>) => ({});

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!data) return null;

  if (!processedData) {
    return <FileForm onSubmit={onSubmit} />;
  } else {
    return (
      <div className="flex flex-col space-y-4 w-full">
        <div className="sticky top-0 flex justify-between px-4 bg-white dark:bg-gray-800 py-2 shadow z-50">
          <Button variant="outline">Previous</Button>
          <span className="text-center">Page 1 of 2</span>
          <Button variant="outline">Next</Button>
        </div>
        <CardForm
          key={Math.random().toString()}
          expenses={processedData}
          categories={data.data}
          onSubmit={onSubmitForm}
        />
      </div>
    );
  }
};

export default FileUploadForm;
