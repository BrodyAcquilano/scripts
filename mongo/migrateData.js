// migrateData.js
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

// CHANGE THIS to your target collection name
const collectionName = "communityResources";

async function migrate() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db("urban_resource_map");
    const collection = db.collection(collectionName);

    const documents = await collection.find().toArray();

    for (const doc of documents) {
      if (!doc.categories) {
        // Fix typo: Park or scenic area → Park or Scenic Area
        const fixedResources = fixLabelCase(doc.resources || {});
        const fixedServices = fixLabelCase(doc.services || {});
        const fixedAmenities = fixLabelCase(doc.amenities || {});

        // Step 1: Add categories (but leave existing fields untouched)
        await collection.updateOne(
          { _id: doc._id },
          {
            $set: {
              categories: {
                Resources: fixedResources,
                Services: fixedServices,
                Amenities: fixedAmenities,
              },
            },
          }
        );

        // Step 2: Remove old fields
        await collection.updateOne(
          { _id: doc._id },
          { $unset: { resources: "", services: "", amenities: "" } }
        );

        console.log(`✅ Updated document: ${doc._id}`);
      }
    }

    console.log("🎉 Migration complete.");
  } catch (err) {
    console.error("❌ Migration failed:", err);
  } finally {
    await client.close();
  }
}

function fixLabelCase(category = {}) {
  const corrected = {};
  for (const key in category) {
    if (key === "Park or scenic area") {
      corrected["Park or Scenic Area"] = category[key];
    } else {
      corrected[key] = category[key];
    }
  }
  return corrected;
}

migrate();
