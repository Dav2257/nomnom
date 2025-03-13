export async function getUsers() {
  const response = await fetch('https://nomnom.thepantoms586.workers.dev/api/produks')
  return await response.json()
}
