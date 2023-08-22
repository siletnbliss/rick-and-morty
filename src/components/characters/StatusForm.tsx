"use client";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomButton } from "../ui/button";
import { CustomSelect } from "../ui/select";
import { CHARACTER_STATUSES } from "./table-config";
import { Character, CharacterStatus } from "@/types/character";
import { CharacterDisplay } from "./Display";

const FormSchema = z.object({
  status: z.string().trim(),
});
type FormValues = { status: CharacterStatus };

interface Props {
  onSubmit: (values: Character) => void;
  initialValues: Character;
}

export const CharacterStatusForm = ({ onSubmit, initialValues }: Props) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    values: { status: initialValues.status },
  });

  const handleSubmit = (values: FormValues) => {
    onSubmit({ ...initialValues, ...values });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className=" flex-col flex"
      >
        <div className="space-y-5">
          <div className="text-sm ">
            <p className="mb-2 text-muted-foreground">Updating status for:</p>
            <CharacterDisplay character={initialValues} />
          </div>
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Life status</FormLabel>
                <CustomSelect
                  options={CHARACTER_STATUSES}
                  placeholder="Select status"
                  useFormControl
                  value={field.value}
                  onValueChange={field.onChange}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <CustomButton type="submit" className="w-full mt-8">
          Update Status
        </CustomButton>
      </form>
    </Form>
  );
};
