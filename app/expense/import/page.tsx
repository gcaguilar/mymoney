"use client"

import { SubmitHandler, useForm } from "react-hook-form";
import useFileProcessing from "@/app/expense/import/hooks/useFileProcessing";
import { useCategories } from "@/app/hooks/hooks";
import FileForm from "@/app/expense/import/components/FileForm";
import CardForm from "@/app/expense/import/components/CardForm";
import { z } from "zod";
import { formListSchema } from "@/app/expense/validations";
import { Button } from "@/app/components/ui/button";
import { v4 as uuidv4 } from "uuid";
import { Category } from "@/app/types/Category";

const FileUploadForm = async () => {
  const categories: Category[] = await useCategories();
  const {
    paginatedData,
    processFiles,
    currentPage,
    nextPage,
    prevPage,
    totalPages,
    onRemoveItem,
    onUpdateItem,
    submitFile,
  } = await useFileProcessing();

  const onSubmit: SubmitHandler<{ inputFiles: File[] }> = async (formData: {
    inputFiles: File[];
  }) => {
    processFiles(formData.inputFiles);
  };

  const onSubmitForm = (values: z.infer<typeof formListSchema>) => {
    submitFile();
  };

  if (!categories) return <div>Error</div>;

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
          categories={categories}
          onSubmit={onSubmitForm}
          onRemove={onRemoveItem}
          onUpdateItem={onUpdateItem}
        />
      </div>
    );
  }
};

export default FileUploadForm;
