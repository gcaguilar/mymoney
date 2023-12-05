"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import useFileProcessing from "@/app/expense/import/hooks/useFileProcessing";
import { useCategories } from "@/app/hooks";
import FileForm from "@/app/expense/import/components/FileForm";
import CardForm from "@/app/expense/import/components/CardForm";
import { z } from "zod";
import { formListSchema } from "@/app/expense/Validations";

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
      <CardForm
        expenses={processedData}
        categories={data.data}
        onSubmit={onSubmitForm}
      />
    );
  }
};

export default FileUploadForm;
