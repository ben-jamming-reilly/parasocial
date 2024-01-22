"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormEvent } from "react";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { cn } from "~/lib/utils";
import useInput from "~/hooks/useInput";
import { api } from "~/trpc/react";
import * as z from "zod";

const formSchema = z.object({
  url: z.string().url({
    message: "Must be a youtube video url",
  }),
});

type UploadFormProps = {
  placeholder: string;
  className?: string;
};

export function UploadForm({ placeholder, className }: UploadFormProps) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  });

  const { data, mutate, isLoading } = api.video.upload.useMutation({
    onSuccess(data, variables, context) {
      //
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    mutate({ url: values.url });
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("mb-4 w-full max-w-sm justify-start", className)}
      >
        <div className="flex flex-1 flex-row gap-2 text-sm font-bold">
          <Image
            src="/icons/youtube.svg"
            width="35"
            height="35"
            alt="Magnifying Glass"
          />
          <FormField
            control={form.control}
            name="url"
            disabled={isLoading}
            render={({ field }) => (
              <FormItem className="w-full bg-transparent text-black">
                <FormLabel>Upload a youtube video</FormLabel>
                <FormControl className="rounded-none border-0 border-b-2 border-black bg-transparent px-0 text-black focus-visible:ring-0">
                  <Input
                    placeholder="ex. https://www.youtube.com/watch?v=2dQ4-VNaG3s"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-black">
                  Paste in the url of a youtube video
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-row-reverse">
          <Button className=" bg-black" type="submit">
            {isLoading ? "..." : "Upload"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
