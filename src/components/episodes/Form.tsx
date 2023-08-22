"use client";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { CustomButton } from "../ui/button";
import { Episode } from "@/types/episode";
import { parseDate } from "@/lib/utils";

const FormSchema = z.object({
  name: z.string().trim().min(3, {
    message: "Name must be at least 3 characters",
  }),
  air_date: z.string().trim(),
  episode: z.string().trim().min(6, {
    message: "Code must be at least 6 characters",
  }),
});

type FormValues = z.infer<typeof FormSchema>;

interface Props {
  onSubmit: (values: Episode) => void;
  initialValues: Episode;
}

export const EpisodeForm = ({ onSubmit, initialValues }: Props) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    values: {
      air_date: parseDate(initialValues?.air_date).toLocaleDateString("en-CA"),
      episode: initialValues?.episode,
      name: initialValues?.name,
    },
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
        {form.getValues("air_date")}
        <div className="space-y-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input className="" placeholder="Bloopgard" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="episode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Episode Code</FormLabel>
                <FormControl>
                  <Input className="" placeholder="S01E01" {...field} />
                </FormControl>
                <FormMessage />
                <FormDescription>
                  Include season number and episode number in code
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="air_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <Input
                    className=""
                    type="date"
                    placeholder="Select when it aired"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <CustomButton type="submit" className="w-full mt-8">
          {initialValues ? "Edit" : "Add"} Episode
        </CustomButton>
      </form>
    </Form>
  );
};
