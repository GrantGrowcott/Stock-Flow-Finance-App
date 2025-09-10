import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";

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

    // Get file metadata to know size and type
    const fileMeta = await drive.files.get({ fileId, fields: "name,mimeType,size" });
    const fileName = fileMeta.data.name || "video.mp4";
    const mimeType = fileMeta.data.mimeType || "video/mp4";
    const fileSize = Number(fileMeta.data.size);

    // Parse Range header
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

    // Get partial content from Google Drive
    const response = await drive.files.get(
      { fileId, alt: "media" },
      { headers: { Range: `bytes=${start}-${end}` }, responseType: "stream" }
    );

    const stream = response.data as any; // Node Readable stream

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
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
