"use client";

import { threadValidation } from "@/lib/validation/threads";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { createThreads } from "@/lib/actions/thread.actions";
import { usePathname, useRouter } from "next/navigation";
import { z } from "zod";
import { Button } from "../ui/button";

const PostThreads = ({ userId }: { userId: string }) => {
  const pathName = usePathname();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(threadValidation),
    defaultValues: {
      thread: "",
      accountId: userId,
    },
  });

  const onSubmit = async (values: z.infer<typeof threadValidation>) => {
    await createThreads({
      text: values.thread,
      author: userId,
      communityId: null,
      path: pathName,
    });

    router.push("/");
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" mt-10 flex flex-col justify-start gap-10"
      >
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3 ">
              <FormLabel className="text-base-semibold text-light-2">
                Content
              </FormLabel>
              <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                <Textarea rows={15} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="">
          POST THREAD
        </Button>
      </form>
    </Form>
  );
};

export default PostThreads;
