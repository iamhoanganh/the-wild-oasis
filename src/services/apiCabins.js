import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data: cabins, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be fetched");
  }
  return cabins;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin?.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replace("/", "");
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  let query = await supabase.from("cabins");
  // https://tohgbibdkhbplmwsllpz.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg?t=2023-08-10T06%3A38%3A48.385Z
  // 1. create/edit a new cabin
  // CREATE
  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }
  // EDIT
  if (id) {
    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  }
  const { data, error } = await query.select();
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }
  // 2. upload the image
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);
  // 3. delete the cabin if the image upload failed
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
  return data;
}
