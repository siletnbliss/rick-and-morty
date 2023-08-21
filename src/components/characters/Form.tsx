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
import { ChangeEvent, useState } from "react";
import { CustomSelect } from "../ui/select";
import { CHARACTER_GENDERS, CHARACTER_STATUSES } from "./table-config";
import { Character } from "@/types/character";

const FormSchema = z.object({
  name: z.string().trim().min(3, {
    message: "Name must be at least 3 characters",
  }),
  status: z.string().trim(),
  species: z.string().trim().min(3, {
    message: "Species must be at least 3 characters",
  }),
  type: z.string().trim().optional(),
  gender: z.string(),
  image: z.string(),
});
type FormValues = z.infer<typeof FormSchema>;

interface Props {
  onSubmit: (values: FormValues) => void;
}

export const CharacterForm = ({ onSubmit }: Props) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
  });

  const handleSubmit = (values: FormValues) => {
    onSubmit(values);
  };

  const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const buffer = await file.arrayBuffer();
      const fileBuffer = Buffer.from(buffer);
      form.setValue(
        "image",
        `data:image/*;base64,${fileBuffer.toString("base64")}`
      );
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className=" flex-col flex"
      >
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
            name="species"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Species</FormLabel>
                <FormControl>
                  <Input className="" placeholder="Human" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <Input
                    className=""
                    placeholder="Experiment, parasite, mutant,..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
                <FormDescription>Character specification</FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <CustomSelect
                  options={CHARACTER_GENDERS}
                  placeholder="Select gender"
                  useFormControl
                  value={field.value}
                  onValueChange={field.onChange}
                />
                <FormMessage />
              </FormItem>
            )}
          />
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
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    placeholder="Upload file"
                    onChange={onFileChange}
                    accept="image/*"
                  />
                </FormControl>
                <FormMessage />
                <FormDescription>Avatar for this character</FormDescription>
              </FormItem>
            )}
          />
        </div>
        <CustomButton type="submit" className="w-full mt-8">
          Add Character
        </CustomButton>
      </form>
    </Form>
  );
};
