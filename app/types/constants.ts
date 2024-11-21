export const BLUR_FADE_DELAY = 0.04;

export const MAX_FILE_SIZE = 5000000; // 5MB
export const ACCEPTED_FILE_TYPES = [
  "application/pdf", 
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document" 
];

export const ACCEPTED_FILE_MIMETYPES = "application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document";

export const arrCategory = ["Resume", "Image", "Video"] as const; //  use as const to define your enum values as a tuple of strings