// migrate-to-public.js
// Re-uploads all images from your private blob store to a public one.
//
// Usage:
//   BLOB_READ_WRITE_TOKEN="vercel_blob_rw_xxxxx" node migrate-to-public.js
//
// Or if token is in .env.local:
//   npx dotenv -e .env.local -- node migrate-to-public.js

const { list, put, del } = require("@vercel/blob");

const PRIVATE_BASE =
  "https://lnx8jv0uf25jotc7.private.blob.vercel-storage.com";

async function migrate() {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    console.error("❌ BLOB_READ_WRITE_TOKEN is not set.");
    process.exit(1);
  }

  // 1. List all existing blobs
  console.log("📋 Listing all blobs...\n");
  let cursor;
  const allBlobs = [];

  do {
    const result = await list({ cursor, token });
    allBlobs.push(...result.blobs);
    cursor = result.cursor;
  } while (cursor);

  // Filter to just images in the Images/ folder
  const images = allBlobs.filter(
    (b) =>
      b.pathname.startsWith("Images/") &&
      (b.pathname.endsWith(".jpg") ||
        b.pathname.endsWith(".jpeg") ||
        b.pathname.endsWith(".png") ||
        b.pathname.endsWith(".webp"))
  );

  console.log(`Found ${images.length} images to migrate.\n`);

  if (images.length === 0) {
    console.log("No images found in Images/ folder. Check your blob store.");
    return;
  }

  // 2. Re-upload each as public
  const results = [];

  for (const blob of images) {
    try {
      // Fetch the private blob using the token
      const response = await fetch(blob.url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        console.error(`❌ Failed to fetch: ${blob.pathname} (${response.status})`);
        continue;
      }

      const buffer = await response.arrayBuffer();

      // Re-upload as public with the same pathname
      const uploaded = await put(blob.pathname, Buffer.from(buffer), {
        access: "public",
        token,
        contentType: blob.contentType || "image/jpeg",
        addRandomSuffix: false,
      });

      results.push({ path: blob.pathname, url: uploaded.url });
      console.log(`✅ ${blob.pathname}`);
      console.log(`   → ${uploaded.url}\n`);
    } catch (err) {
      console.error(`❌ Error migrating ${blob.pathname}:`, err.message);
    }
  }

  // 3. Print summary
  console.log("\n" + "═".repeat(60));
  console.log(`Migration complete: ${results.length}/${images.length} images`);
  console.log("═".repeat(60) + "\n");

  if (results.length > 0) {
    // Extract the new base URL from the first result
    const sampleUrl = results[0].url;
    const baseUrl = sampleUrl.substring(0, sampleUrl.indexOf("/Images"));
    console.log("Your new public base URL:");
    console.log(`const IMG = "${baseUrl}/Images";\n`);
    console.log("Update this line in your page.js and you're good to go.\n");

    // Print all URLs
    console.log("All public URLs:");
    results.forEach((r) => console.log(r.url));
  }
}

migrate().catch(console.error);
