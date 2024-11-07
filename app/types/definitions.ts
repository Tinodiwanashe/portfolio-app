
import { Doc, Id } from "@/convex/_generated/dataModel";
import React from "react";
import { z } from "zod";

export type RootLayoutProps = Readonly<{
    children: React.ReactNode;
}>

export type Navlink = {
    href: string;
    label: string;
    icon?: React.ReactNode | JSX.Element | any;
  };

  export type MenuItem = {
    label: string;
    href: string;
    icon?: React.ReactNode | JSX.Element | any;
    isPrivateRoute: boolean,
    hasProductItem: boolean;
    SubMenuItems?: SubMenuItem[];
  }; 

  export type SubMenuItem = {
    label: string;
    description?: string; 
    icon?: React.ReactNode | JSX.Element | any;  
    isPrivateRoute: boolean,
    href: string;
    src?: string;   
  };
  
  export type userData = 
  {
    data: {
      user: {
        id: string;
        aud: string;
        role: string;
        email: string;
        email_confirmed_at: string;
        phone: string;
        confirmed_at: string;
        last_sign_in_at: string;
        app_metadata: appMetadata,
        user_metadata: userMetadata,
        identities: identity[],
        created_at: string;
        updated_at: string;
        is_anonymous: boolean;
      }
    },
    error: null;
  }
  
  type identity =  {
    identity_id: string;
    id: string;
    user_id: string;
    identity_data: identityData,
    provider: string;
    last_sign_in_at: string;
    created_at: string;
    updated_at: string;
    email: string;
  }
  
  type identityData = {
    email: string;
    email_verified: boolean;
    phone_verified: boolean;
    sub: string;
  }
  
  type userMetadata = {
    email: string;
    email_verified: false;
    phone_verified: false;
    sub: string;
  }
  
  type appMetadata = {
    provider: string;
    providers: string[]
  }
  
  export const ProfileFormSchema = z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    pictureUrl: z.string().optional(),
    phoneNumber: z.string({
      required_error: "Please add a phone number to display.",
    }).optional(),
    address: z.string({
      message: "address must be at least 2 characters.",
    }).optional(),
    countryId: z.string({
      required_error: "Please select a country."
    }).optional(),
    latitude: z.number().gte(-360, { message: "must be greater than or equal to -360" })
      .lte(360, {message: "must be less than or equal to 360"})
      .optional(),
    longitude: z.number().gte(-360, { message: "must be greater than or equal to -360" })
      .lte(360, {message: "must be less than or equal to 360"})
      .optional(),     
    socialLinks: z.array(
      z.object({
        value: z.string().url({ message: "Please enter a valid URL." }),
        isSocialProfile: z.boolean().default(true)
      })
    ).optional()
  })
  
  export type ProfileFormValues = z.infer<typeof ProfileFormSchema>;

  export const OccupationFormSchema = z.object({
    title: z.string().optional(),
    startDate: z.date({
      required_error: "Start Date is required.",
    }),
    endDate: z.date({
      required_error: "End Date is required.",
    }),
    responsibilities: z.array(
      z.object({
        value: z.string({message: "Please enter a valid responsibility." }),
      })
    ).optional(),
    achievements: z.array(
      z.object({
        value: z.string({message: "Please enter a valid achievement." }),
      })
    ).optional(),
    companyId: z.nullable(z.string()).optional()
  })
  
  export type OccupationFormValues = z.infer<typeof OccupationFormSchema>;

  export const ProjectFormSchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    responsibilities: z.array(
      z.object({
        value: z.string({message: "Please enter a valid responsibility." }),
      })
    ).optional(),
    skills: z.array(
      z.object({
        value: z.string({message: "Please enter a valid skill." }),
      })
    ).optional(),    
    companyId: z.string().optional()
  })
  
  export type ProjectFormValues = z.infer<typeof ProjectFormSchema>;

  export const CompanyFormSchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    url: z.string().url({ message: "Please enter a valid URL." }).optional(),
  })
  
  export type CompanyFormValues = z.infer<typeof CompanyFormSchema>;

  const MAX_FILE_SIZE = 5000000; // 5MB
  const ACCEPTED_FILE_TYPES = [
    "application/pdf", 
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document" 
  ];

  export const ACCEPTED_FILE_MIMETYPES = "application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document";

  export const arrCategory = ["Resume", "Image", "Video"] as const; //  use as const to define your enum values as a tuple of strings

  export const FileSchema = z.object({
      category: z.enum(arrCategory).optional(), //a Zod-native way to declare a schema with a fixed set of allowable string values.
      file: z.instanceof(File, { message: "Please upload a file" })
          .refine((file) => file.size <= MAX_FILE_SIZE, {
              message: 'File size should be less than 5MB',
          })
          .refine((file) => ACCEPTED_FILE_TYPES.includes(file.type), {
              message: 'Only .pdf and .docx formats are supported',
          })
  })

  export type FileFormValues = z.infer<typeof FileSchema>;

  export const SkillFormSchema = z.object({
    name: z.string(),
    code: z.string().optional(),
    icon: z.string().optional()
  })
  
  export type SkillFormValues = z.infer<typeof SkillFormSchema>;

  export const SkillLinkFormSchema = z.object({
    childId: z.string({
      required_error: "Please select a skill."
    })
  })
  
  export type SkillLinkFormValues = z.infer<typeof SkillLinkFormSchema>;

  export type UserWithCountry = Doc<"User"> & {
    country: Doc<"Country">
  };
  
  export type User = Doc<"User">;
  export type Occupation = Doc<"Occupation">;
  
  export type Country = Doc<"Country">;
  
  export type Company = Doc<"Company">;
  export type Skill = Doc<"Skill">;
  
  export type CompanyWithOccupation = Doc<"Company"> & {
    company: Doc<"Occupation">,
    user: Doc<"User">
  };
  
  export type UserSkill = Doc<"Skill"> & {
    user: {
      userName: string;
      userEmail: string;
      userPictureUrl: string;
    };
    linkedSkills: []
  };
  
  export type CompanyWithUser = Doc<"Company"> & {
    company: Doc<"User">
  };
  
  export type CompanyWithProject = Doc<"Company"> & {
    company: Doc<"Project">,
    user: Doc<"User">,
  };