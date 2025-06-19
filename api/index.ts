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
  const query = `INSERT INTO nomnom(id,name,category,price) values ("${newId}","${input.name}","${input.category}",${input.price})`
  const newNom = await c.env.DB.exec(query)
  return c.json(newNom)
})
app.get('/api/events/:id', async (c) => {
  const eventId = c.req.param('id')
  let { results } = await c.env.DB.prepare('SELECT * FROM events WHERE id = ?').bind(eventId).all()
  return c.json(results[0])
})

app.put('/api/events/:id', async (c) => {
  const eventId = c.req.param('id')

  const input = await c.req.json<any>()
  const query = `UPDATE events SET name = "${input.name}", place = "${input.place}", time = ${input.time} WHERE id = "${eventId}"`
  const event = await c.env.DB.exec(query)

  return c.json(event)
})

app.delete('/api/events/:id', async (c) => {
  const eventId = c.req.param('id')

  const query = `DELETE FROM events WHERE id = "${eventId}"`
  const event = await c.env.DB.exec(query)
  return c.json(event)
})
   export default app