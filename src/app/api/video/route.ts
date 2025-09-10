import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import { Readable } from "stream";

function nodeToWebStream(nodeStream: Readable): ReadableStream {
  return new ReadableStream({
    start(controller) {
      nodeStream.on("data", (chunk) => controller.enqueue(chunk));
      nodeStream.on("end", () => controller.close());
      nodeStream.on("error", (err) => controller.error(err));
    },
    cancel() {
      nodeStream.destroy();
    },
  });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const fileId = searchParams.get("id");
  if (!fileId) return NextResponse.json({ error: "Missing file ID" }, { status: 400 });

  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_DRIVE_CLIENT_ID,
      process.env.GOOGLE_DRIVE_CLIENT_SECRET
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_DRIVE_REFRESH_TOKEN,
    });

    const drive = google.drive({ version: "v3", auth: oauth2Client });

    const fileMeta = await drive.files.get({ fileId, fields: "name,mimeType,size" });
    const fileName = fileMeta.data.name || "video.mp4";
    const mimeType = fileMeta.data.mimeType || "video/mp4";
    const fileSize = Number(fileMeta.data.size);

    const rangeHeader = req.headers.get("range");
    let start = 0;
    let end = fileSize - 1;

    if (rangeHeader) {
      const match = rangeHeader.match(/bytes=(\d+)-(\d*)/);
      if (match) {
        start = parseInt(match[1], 10);
        if (match[2]) end = parseInt(match[2], 10);
      }
    }

    const contentLength = end - start + 1;

    const response = await drive.files.get(
      { fileId, alt: "media" },
      { headers: { Range: `bytes=${start}-${end}` }, responseType: "stream" }
    );

    // Convert Node Readable to Web ReadableStream
    const stream = nodeToWebStream(response.data as Readable);

    return new NextResponse(stream, {
      status: rangeHeader ? 206 : 200,
      headers: {
        "Content-Type": mimeType,
        "Content-Length": contentLength.toString(),
        "Content-Disposition": `inline; filename="${fileName}"`,
        ...(rangeHeader && {
          "Accept-Ranges": "bytes",
          "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        }),
      },
    });
  } catch (err: unknown) {
  if (err instanceof Error) {
    // Now TypeScript knows `err` has a `message`
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  } else {
    console.error(err);
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}

}
