import clientPromise from "../../lib/mongodb";
import { compare } from 'bcryptjs';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("nextjs-mongodb-demo");
  switch (req.method) {
    case "POST":
      let bodyObject = JSON.parse(req.body);
      const { email, password } = bodyObject;
      const checkExisting = await db.collection('users').findOne({ email });
      const checkPassword = await compare(password, checkExisting.password)
      if (checkExisting && checkPassword) {
        res.json({ status: 200, data:  checkExisting})
      }
      else{
        res.status(400).json({message: 'Not Found'})
      }
      break;
    case "GET":
      const posts = await db.collection("users").find({}).toArray();
      res.json({ status: 200, data: posts });
      break;
  }

}