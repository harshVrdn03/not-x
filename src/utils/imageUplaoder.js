// import { Client, Storage, ID } from "appwrite";

// const client = new Client()
//   .setEndpoint("https://cloud.appwrite.io/v1")
//   .setProject("66193bd11242d33f5aa2");
import { v4 as uuidv4 } from "uuid";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient("rtyujn", "ertyuikmnbv");
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
