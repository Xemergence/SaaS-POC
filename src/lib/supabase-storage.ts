import { supabase } from "./supabase";

// Supabase storage bucket name
const STORAGE_BUCKET = "images";

// Base URL for Supabase storage
const getStorageUrl = () => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  return `${supabaseUrl}/storage/v1/object/public/${STORAGE_BUCKET}`;
};

// Image URLs hosted in Supabase
export const SUPABASE_IMAGES = {
  // Logo and branding
  logo: `${getStorageUrl()}/logo.png`,
  logoBlack: `${getStorageUrl()}/logo-black.png`,

  // Dashboard and features
  dashboardExample: `${getStorageUrl()}/dashboard-example.png`,
  aiTools: `${getStorageUrl()}/ai-tools.png`,
  aiTools2: `${getStorageUrl()}/ai-tools-2.png`,
  cuttingEdgeFeatures: `${getStorageUrl()}/cutting-edge-features.png`,

  // Products
  nfcKeychain: `${getStorageUrl()}/nfc-keychain.png`,

  // Team
  teamMembers: `${getStorageUrl()}/team-members.png`,

  // Vite default
  viteSvg: `${getStorageUrl()}/vite.svg`,
};

// Function to upload an image to Supabase storage
export async function uploadImage(
  file: File,
  fileName: string,
): Promise<string | null> {
  try {
    const { data, error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (error) {
      console.error("Error uploading image:", error);
      return null;
    }

    return `${getStorageUrl()}/${fileName}`;
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
}

// Function to get public URL for an image
export function getImageUrl(fileName: string): string {
  return `${getStorageUrl()}/${fileName}`;
}

// Function to delete an image from Supabase storage
export async function deleteImage(fileName: string): Promise<boolean> {
  try {
    const { error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .remove([fileName]);

    if (error) {
      console.error("Error deleting image:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error deleting image:", error);
    return false;
  }
}

// Function to list all images in the bucket
export async function listImages(): Promise<string[]> {
  try {
    const { data, error } = await supabase.storage.from(STORAGE_BUCKET).list();

    if (error) {
      console.error("Error listing images:", error);
      return [];
    }

    return data?.map((file) => file.name) || [];
  } catch (error) {
    console.error("Error listing images:", error);
    return [];
  }
}
