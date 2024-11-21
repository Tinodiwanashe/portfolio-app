"use server";

// Step 2: POST the file to the URL. Send a POST request with the file contents to the upload URL and receive a storage ID.
export const uploadFile = async (url: string, body: File | null, contentType: string ) => {
    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": contentType },
        body: body,
      });

      const result = await response.json();
      return result;
}

export const getFileContent = async (url: string) => {
  const response = await fetch(url);

    const result = await response.json();
    return result;
}