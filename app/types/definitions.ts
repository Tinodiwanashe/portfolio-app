import React from "react";
import { z } from "zod";
import { ACCEPTED_FILE_TYPES, arrCategory, MAX_FILE_SIZE } from "./constants";

  export type RootLayoutProps = Readonly<{
    children: React.ReactNode;
  }>

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

  export const SkillSchema = z.object({
    _id: z.string(), 
    name: z.string(),
    code: z.string().optional(),
    createdBy: z.string().optional(),
    _creationTime: z.number().optional()
  });
  
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
    latitude: z.coerce.number().gte(-360, { message: "must be greater than or equal to -360" })
      .lte(360, {message: "must be less than or equal to 360"})
      .optional(),
    longitude: z.coerce.number().gte(-360, { message: "must be greater than or equal to -360" })
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
    startDate: z.coerce.date({
      required_error: "Start Date is required.",
    }),
    endDate: z.coerce.date({
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

