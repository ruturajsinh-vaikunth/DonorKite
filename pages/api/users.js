import clientPromise from "../../lib/mongodb";
import { hash } from 'bcryptjs';
export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("nextjs-mongodb-demo");
  switch (req.method) {
    case "POST":
      let bodyObject = JSON.parse(req.body);
      const { email, password } = bodyObject;
      const checkExisting = await db.collection('users').findOne({ email: email});
      if (checkExisting) {
        res.status(422).json({ message: 'User already exists' });
        return;
      }else{
        let myPost = await db.collection("users").insertOne({
          email: email,
          password: await hash(password, 12),
        });
        res.json(myPost.ops);}
      break;
    case "GET":
      const posts = await db.collection("users").find({}).toArray();
      res.json({ status: 200, data: posts });
      break;
  }
}