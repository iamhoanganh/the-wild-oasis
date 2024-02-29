import supabase, { supabaseUrl } from 'src/services/supabase.js'

export async function login ({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password
  })
  if (error) throw new Error(error.message)
  return data
}

export async function signUp ({ fullName, email, password }) {
  let { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        fullName: fullName,
        avatar: ''
      }
    }
  })
  if (error) throw new Error(error.message)
  return data
}

export async function getCurrentUser () {
  const { data: session } = await supabase.auth.getSession()
  if (!session.session) throw new Error(error.message)
  const { data, error } = await supabase.auth.getUser()
  if (error) throw new Error(error.message)
  return data?.user
}

export async function logout () {
  const { error } = await supabase.auth.signOut()
  if (error) throw new Error(error.message)
}
export async function updateCurrentUser ({ password, fullName, avatar }) {
  let updateData;
  if (password) {
    updateData = { password }
  }
  if (fullName) {
    updateData = { data: { fullName} }
  }
  //   1. update password or full name
  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) throw new Error(error.message)
  if (!avatar) return data
  //   2. update avatar image
    const fileName = `avatar-${data.user.id}-${Math.random()}`
    const {error: storageError} = await supabase.storage.from("avatars").upload(fileName, avatar)
    if (storageError) throw new Error(storageError.message)
  //   3, update avatar in the user
    const { data: updatedUser, error: avatarError } = await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`
        // avatar: "https://tohgbibdkhbplmwsllpz.supabase.co/storage/v1/object/public/avatars/1.jpg"
      }
    })
    if (avatarError) throw new Error(avatarError.message)
    return updatedUser
}