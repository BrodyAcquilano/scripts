// tools/backupCollection.js

import { MongoClient } from "mongodb";

// ✅ Source and target database URIs
const uri =
  "mongodb+srv://brodya2621:K2PHbPE5bWfW4Wdp@urbanmapcluster.vcxbsoz.mongodb.net/?retryWrites=true&w=majority&appName=UrbanMapCluster";

// ✅ Database and collection names
const sourceDbName = "urban_resource_map";
const sourceCollectionName = "communityResources";

const targetDbName = "urban-resource-map-backup";
const targetCollectionName = "communityResources";

async function backupCollection() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const sourceCollection = client
      .db(sourceDbName)
      .collection(sourceCollectionName);
    const targetCollection = client
      .db(targetDbName)
      .collection(targetCollectionName);

    const documents = await sourceCollection.find().toArray();
    console.log(`✅ Fetched ${documents.length} documents from source.`);

    if (documents.length > 0) {
      const insertResult = await targetCollection.insertMany(documents);
      console.log(
        `✅ Successfully backed up ${insertResult.insertedCount} documents to target.`
      );
    } else {
      console.log("⚠️ No documents found in source collection.");
    }
  } catch (err) {
    console.error("❌ Backup failed:", err);
  } finally {
    await client.close();
    console.log("🔒 MongoDB connection closed.");
  }
}

backupCollection();
