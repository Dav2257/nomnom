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
  const newnom = await c.env.DB.exec(query)
  return c.json(newnom)
})
app.get('/api/nomnom/:id', async (c) => {
  const nomId = c.req.param('id')
  let { results } = await c.env.DB.prepare('SELECT * FROM nomnom WHERE id = ?').bind(nomId).all()
  return c.json(results[0])
})

app.put('/api/nomnom/:id', async (c) => {
  const nomId = c.req.param('id')

  const input = await c.req.json<any>()
  const query = `UPDATE nomnom SET name = "${input.name}", category = "${input.category}", price = ${input.price} WHERE id = "${eventId}"`
  const nom = await c.env.DB.exec(query)

  return c.json(nom)
})

app.delete('/api/nomnom/:id', async (c) => {
  const nomId = c.req.param('id')

  const query = `DELETE FROM nomnom WHERE id = "${nomId}"`
  const nom = await c.env.DB.exec(query)
  return c.json(nom)
})
   export default app