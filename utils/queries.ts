
import { SupabaseClient } from "@supabase/supabase-js";
import { cache } from "react";

export const addProfile = cache(async (supabase: SupabaseClient, userId: string) => {
    const { data, error } = await supabase
      .from('Profile')
      .insert([{
        fullname: profile.fullname,
        address: profile.address,
        avatarUrl: profile.avatarUrl,
        id: profile.id
      }]);
  
    return data;
  });

export const getProfile = cache(async (supabase: SupabaseClient, userId: string) => {
    const { data: profile, error } = await supabase
      .from('Profile')
      .select('*')
      .eq('id', userId)
      .maybeSingle();
  
    return profile;
  });

  export const getProjects = cache(async (supabase: SupabaseClient, userId: string) => {
    const { data: project, error } = await supabase
      .from('Project')
      .select('*')
      .eq('profileId', userId)
      //.order('metadata->index')
  
    return project;
  });

  export const getOccupations = cache(async (supabase: SupabaseClient, userId: string) => {
    const { data: occupation, error } = await supabase
      .from('Occupation')
      .select('*')
      .eq('profileId', userId)
      //.order('metadata->index')
  
    return occupation;
  });

  export const getExternalLinks = cache(async (supabase: SupabaseClient, userId: string) => {
    const { data: externalLink, error } = await supabase
      .from('ExternalLink')
      .select('*')
      .eq('profileId', userId)
      //.order('metadata->index')
  
    return externalLink;
  });  

  export const getExperiences = cache(async (supabase: SupabaseClient, userId: string) => {
    const { data: experience, error } = await supabase
      .from('Experience')
      .select('*')
      .eq('profileId', userId)
      //.order('metadata->index')
  
    return experience;
  });  

  export const getCompanies = cache(async (supabase: SupabaseClient, userId: string) => {
    const { data: company, error } = await supabase
      .from('Company')
      .select('*')
      .eq('profileId', userId)
      //.order('metadata->index')
  
    return company;
  });   
  
  export const getCountries = cache(async (supabase: SupabaseClient, userId: string) => {
    const { data: country, error } = await supabase
      .from('Country')
      .select('*')
      .eq('profileId', userId)
      //.order('metadata->index')
  
    return country;
  });  