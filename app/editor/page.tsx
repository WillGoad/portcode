'use client';

import './editorPage.css';

import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { useFieldArray, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical } from '@fortawesome/free-solid-svg-icons';

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

import { MainNav } from "@/components/misc/main-nav"
import { UserNav } from "@/components/misc/user-nav"
import { HighlightedRepo } from "@/components/misc/highlighted-repo";
import { ShowOffSection } from "@/components/misc/show-off-section";

import DNDArrayInput from '@/components/ui/dnd-array-input';


const profileFormSchema = z.object({
  highlightedRepo: z.string().refine((value) => {
    const commas = value.match(/,/g)?.length
    return commas === 5 || value === ""
  }, { message: "Highlighted repo requires 5 commas" }).optional(),
  experiences: z
    .array(
      z.object({
        //Check for 2 commas if not return error
        value: z.string().refine((value) => {
          const commas = value.match(/,/g)?.length
          return commas === 2 || value === ""
        }, { message: "An experience requires 2 commas" }),
      })
    )
    .optional(),
  education: z
    .array(
      z.object({
        //Check for 2 commas if not return error
        value: z.string().refine((value) => {
          const commas = value.match(/,/g)?.length
          return commas === 2 || value === ""
        }, { message: "An experience requires 2 commas" }),
      })
    )
    .optional(),
  // Add skills but is only one word per skill so no need to check for commas
  skills: z.array(z.object({ value: z.string() })).optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  highlightedRepo: "",
  experiences: [],
  education: [],
  skills: [],
}

export default function LiveEditorPage() {
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [yourJWT, setYourJWT] = useState(Cookies.get('jwt'));
  const { toast } = useToast();

  useEffect(() => {
    Cookies.get('user-token') && setYourJWT(Cookies.get('user-token'));
    const tempDisplayName = Cookies.get('display-name');
    tempDisplayName && setDisplayName(tempDisplayName);
    const tempUsername = Cookies.get('username')
    tempUsername && setUsername(tempUsername);
    const tempEmail = Cookies.get('user-email');
    tempEmail && setEmail(tempEmail);
  }, []);

  useEffect(() => {
    if (yourJWT && yourJWT !== "") {
      onLoad();
      fetchAndSaveQRCode();
    }
  }, [yourJWT]);

  const onLoad = async () => {
    try {
      if (!yourJWT) {
        throw new Error("No JWT found");
      }
      const response = await fetch('https://api.portco.de/api/live-editor', {
        headers: {
          'x-access-token': yourJWT,
        }
      });
      //If status code 200 then change tab
      if (response.status === 200) {
        const { displayname, username, email, highlightedRepo, experiences, education, skills } = await response.json();
        setDisplayName(displayname);
        setUsername(username);
        setEmail(email);
        form.setValue("highlightedRepo", highlightedRepo);
        const expArray: string[] = experiences;
        const edArray: string[] = education;
        const skiArray: string[] = skills;
        expArray.forEach((exp, index) => {
          form.setValue(`experiences.${index}.value`, exp);
        });
        edArray.forEach((ed, index) => {
          form.setValue(`education.${index}.value`, ed);
        });
        skiArray.forEach((ski, index) => {
          form.setValue(`skills.${index}.value`, ski);
        });
        form.reset({
          ...form.getValues()
        });
      }
    } catch (error) {
      toast({
        title: "Error loading profile",
        description: String(error),
        duration: 5000
      })
    }
  }

  const fetchAndSaveQRCode = async () => {
    try {
      if (!yourJWT) {
        throw new Error("No JWT found");
      }
      const response = await fetch('https://api.portco.de/api/qr-code', {
        headers: {
          'x-access-token': yourJWT,
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const { qrcodeuri } = await response.json();
      setQrCode(qrcodeuri)
    } catch (error) {
      toast({
        title: "Error loading QR Code",
        description: String(error),
        duration: 5000
      })
    }
  }

  const onUpdateProfile = async () => {
    try {
      const response = await fetch('https://api.portco.de/api/live-editor', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': yourJWT || "",
        },
        body: JSON.stringify({
          highlightedRepo: form.getValues("highlightedRepo"),
          experiences: form.getValues("experiences")?.map((item: any) => item.value).filter((item: string) => item !== ""),
          education: form.getValues("education")?.map((item: any) => item.value).filter((item: string) => item !== ""),
          skills: form.getValues("skills")?.map((item: any) => item.value).filter((item: string) => item !== ""),
        })
      });
      //If status code 200 then change tab
      if (response.status === 200) {
        toast({
          description: "Succesfully updated profile",
          duration: 1000
        })
      }
    } catch (error) {
      toast({
        title: "Error updating profile",
        description: String(error),
        duration: 5000
      })
    }
  }

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  })

  // For experiences
  const { fields: experienceFields, append: appendExperience, remove: removeExperience } = useFieldArray({
    name: "experiences",
    control: form.control,
  });

  // For education
  const { fields: educationFields, append: appendEducation, remove: removeEducation } = useFieldArray({
    name: "education",
    control: form.control,
  });



  return (
    <>
      <div className="flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <UserNav displayName={displayName} email={email} />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Live Editor</h2>
            <div className="flex items-center space-x-2">
              <p className="text-grey-500 hover:text-blue-500">
                https://portco.de/{username}
              </p>
              <Button onClick={() => window.open(`https://portco.de/${username}`, '_blank')}>Visit</Button>
            </div>
          </div>
          <div className="flex space-x-4 h-screen">
            <div className="flex-1">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onUpdateProfile)} className="space-y-8">
                  <FormField
                    control={form.control}
                    name="highlightedRepo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Highlighted Repo</FormLabel>
                        <FormControl>
                          <Input placeholder="name,link,description,main language,stars count,last updated" {...field} />
                        </FormControl>
                        <FormDescription>
                          Leave blank to not highlight a repo.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <DNDArrayInput title='Experience' description='Add jobs/work experience/internships. Each line is an experience, with name, dates and description dilineated by a comma.' appendString='Add Experience' fieldName='experiences' form={form} fields={experienceFields} append={appendExperience} remove={removeExperience} />
                  <DNDArrayInput title='Education' description='Add educational experiences. Each line is an experience, with name, dates and description dilineated by a comma.' appendString='Add Education' fieldName='education' form={form} fields={educationFields} append={appendEducation} remove={removeEducation} />
                  <Button type="submit">Update profile</Button>
                </form>
              </Form>
            </div>
            <div className="flex-1 flex flex-start items-center flex-col">
              {qrCode && <img src={qrCode} alt="QR Code" />}
              <h2 className="text-2xl font-bold mb-2">{displayName}</h2>
              <p className="text-gray-400 mb-6">@{username}</p>
              <div className="w-full sm:w-96">
                {
                  form && form.getValues("highlightedRepo") &&
                  <HighlightedRepo
                    highlightedRepo={form.getValues("highlightedRepo")}
                  />}
              </div>
              <div className="w-full sm:w-96">
                {form && form.getValues("experiences") && <ShowOffSection title={"Roles"} experiences={form.getValues("experiences")?.map(exp => exp.value)} />}
              </div>
              <div className="w-full sm:w-96">
                {form && form.getValues("education") && <ShowOffSection title={"Education"} experiences={form.getValues("education")?.map(exp => exp.value)} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}