"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Input } from "~/components/ui/input";
import { cn } from "~/lib/utils";
import { useToast } from "~/components/ui/use-toast";
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

  const { toast } = useToast();

  const { mutate, isLoading } = api.video.upload.useMutation({
    onSuccess(data, variables, context) {
      form.resetField("url");
      toast({
        title: "success: you uploaded a video 🚀",
        description: data.url,
      });
    },
    onError(err) {
      toast({
        title: "error",
        description: err.message,
      });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate({ url: values.url });
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("mb-4 w-full  justify-start", className)}
      >
        <div className="flex flex-1 flex-row gap-2 text-xs font-bold">
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
                    placeholder="ex. https://www.youtube.com/watch?v=dQw4w9WgXcQ"
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
          <button
            className="relative text-xs tracking-wider flex max-w-[10rem] items-center border-4 border-black bg-black font-bold shadow-[8px_8px_0_0_#000] transition hover:shadow-none focus:outline-none focus:ring"
            type="submit"
          >
            {isLoading ? "..." : "upload"}
          </button>
        </div>
      </form>
    </Form>
  );
}
