export async function getUsers() {
  const response = await fetch('https://nomnom.thepantoms586.workers.dev/')
  return await response.json()
}
