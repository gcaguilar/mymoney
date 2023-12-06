"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import useFileProcessing from "@/app/expense/import/hooks/useFileProcessing";
import { useCategories } from "@/app/hooks";
import FileForm from "@/app/expense/import/components/FileForm";
import CardForm from "@/app/expense/import/components/CardForm";
import { z } from "zod";
import { formListSchema } from "@/app/expense/Validations";
import { Button } from "@/app/components/ui/button";
import { v4 as uuidv4 } from "uuid";

const FileUploadForm = () => {
  const { data, error, isLoading } = useCategories();
  const {
    paginatedData,
    processFiles,
    currentPage,
    nextPage,
    prevPage,
    totalPages,
    onRemoveItem,
  } = useFileProcessing();

  const onSubmit: SubmitHandler<{ inputFiles: File[] }> = async (formData: {
    inputFiles: File[];
  }) => {
    processFiles(formData.inputFiles);
  };

  const onSubmitForm = (values: z.infer<typeof formListSchema>) => ({});

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!data) return null;

  if (paginatedData.length === 0) {
    return <FileForm onSubmit={onSubmit} />;
  } else {
    return (
      <div className="flex flex-col space-y-4 w-full">
        <div className="sticky top-0 flex justify-between px-4 bg-white dark:bg-gray-800 py-2 shadow z-50">
          <Button variant="outline" onClick={prevPage}>
            Previous
          </Button>
          <span className="text-center">
            Page {currentPage} of {totalPages}
          </span>
          <Button variant="outline" onClick={nextPage}>
            Next
          </Button>
        </div>
        <CardForm
          key={uuidv4()}
          expenses={paginatedData}
          categories={data.data}
          onSubmit={onSubmitForm}
          onRemove={onRemoveItem}
        />
      </div>
    );
  }
};

export default FileUploadForm;
