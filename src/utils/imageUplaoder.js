// import { Client, Storage, ID } from "appwrite";

// const client = new Client()
//   .setEndpoint("https://cloud.appwrite.io/v1")
//   .setProject("66193bd11242d33f5aa2");
import { v4 as uuidv4 } from "uuid";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://emewyoxgtlwnsanaxgez.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtZXd5b3hndGx3bnNhbmF4Z2V6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDEwODYxMDIsImV4cCI6MjAxNjY2MjEwMn0.8ajCuBA3yyLyt-j7kOYR6kxP0aDHpQ8y09qeD_x-vmc"
);
const imageUploader = async (img) => {
  try {
    const data = await supabase.storage
      .from("avatar")
      .upload("socialApp" + "/" + uuidv4(), img);
    return data;
  } catch (err) {
    return err.message;
  }
};
export default imageUploader;
