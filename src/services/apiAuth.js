import supabase from 'src/services/supabase.js'

export async function login ({ email, password }) {
  console.log("call api login")
  let { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password
  })
  if (error) throw new Error(error.message)
  console.log("login data", data)
  return data
}
