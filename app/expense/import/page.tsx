import FormSubmitButton from "@/app/components/FormSubmitButton";

function ImportExpensePage() {
  return (
    <div>
      <form action="/api/import" method="post" encType="multipart/form-data">
        <input
          className="file-input file-input-bordered w-full max-w-xs"
          name="file"
          type="file"
          required
        />
        <FormSubmitButton>Guardar</FormSubmitButton>
      </form>
    </div>
  );
}

export default ImportExpensePage;
