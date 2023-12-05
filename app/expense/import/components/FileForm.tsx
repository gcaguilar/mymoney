import { Button } from "@/app/components/ui/button";
import { Form, FormField, FormLabel } from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";

interface FileFormProps {
  onSubmit: SubmitHandler<{ inputFiles: File[] }>;
}

const FileForm: React.FC<FileFormProps> = ({ onSubmit }) => {
  const files: File[] = [];
  const form = useForm({
    defaultValues: {
      inputFiles: files,
    },
  });

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormLabel>Fichero del banco:</FormLabel>
          <FormField
            name="inputFiles"
            render={({ field }) => (
              <Input
                type="file"
                accept="application/vnd.ms-excel"
                {...form.register("inputFiles", { required: true })}
              />
            )}
          />
          <Button type="submit">Subir archivo</Button>
        </form>
      </Form>
    </>
  );
};

export default FileForm;
