"use client";

import { useRouter, usePathname } from "next/navigation";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";

import { useEffect } from "react";

type Inputs = {
  title: string;
  content: string;
};

export default function CreateNote() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setFocus,
  } = useForm<Inputs>();

  const router = useRouter();
  const pathname = usePathname();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);

    await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: data.title,
        content: data.content,
      }),
    });

    reset({ title: "", content: "" });

    router.replace(pathname);

    setFocus("title");
  };

  useEffect(() => {
    // attach the event listener
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key == "Enter" && (event.metaKey || event.ctrlKey)) {
        handleSubmit(onSubmit)();
      }
    };
    document.addEventListener("keydown", handleKeyPress);

    setFocus("title");

    // remove the event listener
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <form
      className="duration-400 max-w-[22rem] rounded-lg border-2 border-dashed border-zinc-300 bg-zinc-200 p-5 shadow-sm transition-all ease-in-out focus-within:border-transparent focus-within:bg-zinc-100 focus-within:p-7 focus-within:shadow-lg hover:border-transparent hover:bg-zinc-100 hover:p-7 hover:shadow-lg dark:bg-zinc-800 dark:shadow-md"
      onSubmit={handleSubmit(onSubmit)}
      tabIndex={0}
    >
      <div className="row mb-3 grid columns-auto grid-cols-[repeat(2,_auto)] items-center">
        {" "}
        <input
          onKeyPress={(e) => {
            e.key === "Enter" && e.preventDefault();
          }}
          className="w-full bg-transparent text-2xl font-bold text-gray-900 focus:border-none focus:outline-none dark:text-gray-100"
          placeholder="Enter title"
          {...register("title", {
            required: { value: true, message: "Title is required" },
            maxLength: {
              value: 80,
              message: "Title should be less than 80 characters",
            },
            minLength: {
              value: 2,
              message: "Title should be more than 2 characters",
            },
          })}
          tabIndex={1}
        />
        <input
          type={"submit"}
          className="ml-4 w-12 cursor-pointer justify-self-end rounded-full bg-gray-300 text-lg font-bold text-gray-500 transition-all duration-200 ease-in-out hover:bg-gray-400 dark:text-gray-400 dark:hover:bg-gray-600"
          tabIndex={3}
          value={"+"}
        />
        {errors.title && (
          <p
            role="alert"
            className="col-start-1 col-end-2 mt-2 text-xs text-red-400"
          >
            {errors.title?.message}
          </p>
        )}
      </div>
      <textarea
        className="block w-full resize-none overflow-hidden bg-transparent focus:border-none focus:outline-none"
        onInput={(e) => {
          e.currentTarget.style.height = "min-content";
          e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
        }}
        rows={2}
        placeholder="Try pressing Ctrl/⌘ + Enter to post your note!"
        role="textbox"
        required
        maxLength={280}
        tabIndex={1}
        {...register("content", {
          required: { value: true, message: "Content is required" },
          maxLength: {
            value: 280,
            message: "Content should be less than 280 characters",
          },
          minLength: {
            value: 2,
            message: "Content should be more than 2 characters",
          },
        })}
      ></textarea>
      {errors.content && (
        <p role="alert" className="mt-2 text-xs text-red-400">
          {errors.content?.message}
        </p>
      )}
    </form>
  );
}
