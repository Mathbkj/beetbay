import { IAPIResponse } from "@/types/IAPIResponse";
import { NavigateFunction, useNavigate } from "react-router";
import { IUser } from "@/types/IUser";
import { Button } from "@/ui/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog";
import { Field, FieldDescription, FieldLabel } from "@/ui/field";
import { Input } from "@/ui/input";
import Cookies from "js-cookie";
import { Crown, Edit, Mail, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useFetcher } from "react-router";
import { toast } from "sonner";

async function changeMail(
  oldEmail: string,
  newEmail: string,
  reloadFn: NavigateFunction,
) {
  const response = await fetch(
    `http://localhost:3000/api/update-mail/${oldEmail}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newEmail }),
    },
  );
  if (!response.ok) {
    const data: IAPIResponse = await response.json();
    throw new Error(data.message);
  }
  const data: IAPIResponse = await response.json();
  Cookies.set("jwt_token", data.token!, { expires: 1 });

  const okPromise = new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
      reloadFn(0);
    }, 2000);
  });
  toast.promise(okPromise, {
    loading: "Updating email...",
    success: "Email successfully updated!",
    error: (err) => `Error updating email:${err.message}`,
  });
}
async function changePfp(
  email: string,
  file: File,
  reloadFn: NavigateFunction,
) {
  const formData = new FormData();

  formData.append("pfp", file);
  formData.append("email", email);

  const response = await fetch("http://localhost:3000/api/update-pfp", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const data: IAPIResponse = await response.json();
    throw new Error(data.message);
  }
  const data: IAPIResponse = await response.json();
  Cookies.set("jwt_token", data.token!, { expires: 1 });

  const okPromise = new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
      reloadFn(0);
    }, 2000);
  });
  toast.promise(okPromise, {
    loading: "Updating profile picture...",
    success: "Profile picture successfully updated!",
    error: (err) => `Error updating profile picture:${err.message}`,
  });
}

export function Uploader({ email }: IUser) {
  const navigate = useNavigate();

  const [file, setFile] = useState<File | null>(null);

  const fetcher = useFetcher();

  useEffect(() => {
    if (!fetcher.data) return;
    (async () => {
      const { newEmail } = fetcher.data;

      try {
        // TODO: Fix the .env variable usage pointing to cached port?
        if (newEmail) {
          changeMail(email, newEmail, navigate);
        }
        // window.location.reload();
      } catch (err) {
        if (err instanceof Error) {
          toast.error(err.message);
        }
      }
    })();
  }, [fetcher.data]);

  return (
    <div className="max-w-2xl mx-auto mt-4">
      {/* <div className="w-24 h-24 rounded-full bg-zinc-800 flex items-center justify-center">`
                  <User className="w-12 h-12 text-zinc-500" />
                </div> */}

      <fetcher.Form
        method="post"
        onSubmit={(ev) =>
          fetcher.submit(ev.currentTarget, { encType: "multipart/form-data" })
        }
      >
        <Field>
          <FieldLabel>Profile Picture</FieldLabel>
          <div className="relative size-fit group">
            <Input
              id="pfp"
              name="pfp"
              type="file"
              accept="image/*"
              onChange={(ev) => setFile(ev.currentTarget.files?.[0]!)}
              className="absolute opacity-0 inset-0 z-10 h-full w-fit text-center aspect-square cursor-pointer"
            />
            {file ? (
              <img
                width={100}
                height={100}
                src={URL.createObjectURL(file)}
                className="rounded-full object-cover"
                alt="Preview"
              />
            ) : (
              <div className="bg-white/10 group max-w-fit p-4 brightness-75 text-green-500 group-hover:ring group-hover:outline-2 group-hover:brightness-150 outline-green-700 transition-all rounded-full">
                <User size={32} className="object-cover" />
              </div>
            )}
          </div>
          <FieldDescription>
            Select an image to upload as your profile picture
          </FieldDescription>
        </Field>
        <Button
          type="submit"
          variant="ghost"
          disabled={fetcher.state !== "idle"}
          className="mt-3"
        >
          {fetcher.state !== "idle" ? "Submitting..." : "Submit Picture"}
        </Button>
      </fetcher.Form>

      <div className="space-y-4">
        <div className="flex items-center gap-4 p-4 bg-zinc-800 rounded-lg">
          <Mail className="w-5 h-5 text-primary" />
          <div>
            <p className="text-sm text-zinc-400">Email</p>
            <p className="font-medium">{email}</p>
          </div>
          <Dialog>
            <DialogTrigger className="ms-auto transition-all p-2 rounded-lg brightness-50 hover:text-primary hover:bg-white/20 hover:brightness-150">
              <Edit />
            </DialogTrigger>
            <DialogPortal>
              <DialogOverlay />
              <DialogContent className="bg-transparent backdrop-blur-2xl">
                <fetcher.Form
                  onSubmit={(ev) => {
                    fetcher.submit(ev.currentTarget);
                  }}
                  method="patch"
                >
                  <DialogHeader>
                    <DialogTitle>Change Email</DialogTitle>
                    <DialogDescription>
                      Switch your email address at any time
                    </DialogDescription>
                  </DialogHeader>
                  <Field>
                    <Input
                      id="new_email"
                      name="new_email"
                      placeholder="Enter your new email"
                      // value={email}
                      // onChange={handleMailChange}
                    />
                  </Field>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="destructive">Cancel</Button>
                    </DialogClose>

                    <Button
                      type="submit"
                      disabled={fetcher.state !== "idle"}
                      variant="ghost"
                    >
                      {fetcher.state !== "idle" ? "Updating..." : "Update"}
                    </Button>
                  </DialogFooter>
                </fetcher.Form>
              </DialogContent>
            </DialogPortal>
          </Dialog>
        </div>

        <div className="flex items-center gap-4 p-4 bg-zinc-800 rounded-lg">
          <Crown className="w-5 h-5 text-primary" />
          <div>
            <p className="text-sm text-zinc-400">Subscription</p>
            <p className="font-medium">Free Tier</p>
          </div>
        </div>
      </div>
    </div>
  );
}
