import { Hono } from 'hono'
type Bindings = {
  ASSETS: Fetcher
  DB: D1Database
}
const app = new Hono<{ Bindings: Bindings }>()

app.get('/api/nomnom', async (c) => {
  let { results } = await c.env.DB.prepare("SELECT * FROM nomnom").all()
  return c.json(results)
})
app.post('/api/nomnom', async (c) => { 
  const newId = crypto.randomUUID()
  const input = await c.req.json<any>()
  const query = `INSERT INTO nomnom(id,name,place,time) values ("${newId}","${input.name}","${input.place}",${input.time})`
  const newNom = await c.env.DB.exec(query)
  return c.json(newNom)
})
   export default app