import clientPromise from "../../lib/mongodb";
var ObjectId = require('mongodb').ObjectId;

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("nextjs-mongodb-demo");
  switch (req.method) {
    case "POST":
        let bodyObject = JSON.parse(req.body);
        let myPost = await db.collection("donations").insertOne(bodyObject);
        res.json(myPost.ops);
       break;
    case "GET":
      const donations = await db.collection("donations").find({}).toArray();
      res.json({ status: 200, data: donations });
      break;
    case "DELETE":
      let bodyObject1 = JSON.parse(req.body);
      let newobj = await db.collection("donations").deleteOne({_id: new ObjectId(bodyObject1.id)});
      res.json(newobj);
      break;
    case "PUT":
      let bodyObject2 = JSON.parse(req.body);
      const { donor, amount, type, fund, status1, date } = bodyObject2;
      let newobj1 = await db.collection("donations").updateOne(
        {
          _id: new ObjectId(bodyObject2.id)
        },{ $set: { Donor: donor, Amount: amount, Type: type, Fund: fund, Status1: status1, Date: date }}
      );
      let newobj2 = await db.collection("donors").updateOne(
        {
          Donor: donor
      },{ $set: {Donor: donor}}
      )
      res.json(newobj1,newobj2);
      break;
  }
}


// const { connectToDatabase } = require('../../lib/mongodb');
// const ObjectId = require('mongodb').ObjectId;

// export default async function handler(req, res) {
//     // switch the methods
//     switch (req.method) {
//         case 'GET': {
//             return getDonation(req, res);
//         }

//         case 'POST': {
//             return addDonation(req, res);
//         }

//         case 'PUT': {
//             return updateDonation(req, res);
//         }

//         case 'DELETE': {
//             return deleteDonation(req, res);
//         }
//     }
// }
// async function getDonation(req, res) {
//   try {
//       let { db } = await connectToDatabase();
//       let donations = await db.collection("donations").find({}).toArray();
//       return res.json({
//           message: JSON.parse(JSON.stringify(donations)),
//           success: true,
//       });
//   } catch (error) {
//       return res.json({
//           message: new Error(error).message,
//           success: false,
//       });
//   }
// }

// // Adding a new post
// async function addDonation(req, res) {
//   try {
//       let { db } = await connectToDatabase();
//       await db.collection("donations").insertOne(JSON.parse(req.body));
//       return res.json({
//           message: 'Post added successfully',
//           success: true,
//       });
//   } catch (error) {
//       return res.json({
//           message: new Error(error).message,
//           success: false,
//       });
//   }
// }

// // Updating a post
// async function updateDonation(req, res) {
//   try {
//       let { db } = await connectToDatabase();
//       let bodyObject2 = JSON.parse(req.body);
//       const { donor, amount, type, fund, status1, date } = bodyObject2;
//       let newobj1 = await db.collection("donations").updateOne(
//         {
//           _id: new ObjectId(bodyObject2.id)
//         },{ $set: { Donor: donor, Amount: amount, Type: type, Fund: fund, Status1: status1, Date: date }}
//       );
//       res.json(newobj1);
//       return res.json({
//           message: 'Post updated successfully',
//           success: true,
//           newobj1
//       });
//   } catch (error) {
//       return res.json({
//           message: new Error(error).message,
//           success: false,
//       });
//   }
// }

// // deleting a post
// async function deleteDonation(req, res) {
//   try {
//       let { db } = await connectToDatabase();
//       await db.collection("donations").deleteOne({_id: new ObjectId(req.body)});
//       return res.json({
//           message: 'Post deleted successfully',
//           success: true,
//       });
//   } catch (error) {
//       return res.json({
//           message: new Error(error).message,
//           success: false,
//       });
//   }
// }