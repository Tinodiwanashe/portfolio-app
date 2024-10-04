
import { Doc, Id } from "@/convex/_generated/dataModel";
import React from "react";
import { z } from "zod";



export type UserWithCountry = Doc<"User"> & {
  country: Doc<"Country">
};

export type User = Doc<"User">;

export type Country = Doc<"Country">;

export type UserWithSocialMediaLink = Doc<"User"> & {
  user: Doc<"SocialMediaLink">
};

export type CompanyWithOccupation = Doc<"Company"> & {
  company: Doc<"Occupation">,
  user: Doc<"User">
};

export type CompanyWithUser = Doc<"Company"> & {
  company: Doc<"User">
};

export type CompanyWithProject = Doc<"Company"> & {
  company: Doc<"Project">,
  user: Doc<"User">,
};

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
  