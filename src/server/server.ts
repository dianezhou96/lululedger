import express = require('express');
import { Request, Response } from 'express';
const app = express();
const port = 3123;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
