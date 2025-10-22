import { NextResponse }                        from 'next/server';
import { deleteMedia, listMedia, uploadMedia } from '@/lib/blobStorage';
import type { MediaAssetKind }                 from '@/types/allTypes';

function parseKind(value: string | null): MediaAssetKind | undefined {
  if (!value) {
    return undefined;
  }

  return value.toLowerCase() === 'video' ? 'video' : value.toLowerCase() === 'photo' ? 'photo' : undefined;
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('file');

  if (!(file instanceof File)) {
    return NextResponse.json({ success: false, error: 'A file field is required.' }, { status: 400 });
  }

  const kindValue = (formData.get('kind') as string | null)?.toLowerCase();
  const kind: MediaAssetKind = kindValue === 'video' ? 'video' : 'photo';
  const targetPath = (formData.get('targetPath') as string | null) || undefined;
  const addRandomSuffixValue = formData.get('addRandomSuffix');
  const addRandomSuffix = addRandomSuffixValue == null ? true : addRandomSuffixValue === 'true';
  const contentType = (formData.get('contentType') as string | null) || undefined;

  try {
    const result = await uploadMedia({
      file,
      kind,
      targetPath,
      addRandomSuffix,
      contentType,
    });

    return NextResponse.json({
      success: true,
      asset: result.asset,
      downloadUrl: result.downloadUrl,
      contentDisposition: result.contentDisposition,
    });
  } catch (error) {
    console.error('Failed to upload media to Vercel Blob', error);

    return NextResponse.json({ success: false, error: 'Failed to upload media asset.' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const kind = parseKind(url.searchParams.get('kind'));
  const prefix = url.searchParams.get('prefix') || undefined;
  const cursor = url.searchParams.get('cursor') || undefined;
  const limitValue = url.searchParams.get('limit');
  const limit = limitValue ? Number.parseInt(limitValue, 10) : undefined;

  if (limit != null && Number.isNaN(limit)) {
    return NextResponse.json({ success: false, error: 'limit must be a number' }, { status: 400 });
  }

  try {
    const result = await listMedia({ kind, prefixOverride: prefix, limit, cursor });
    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    console.error('Failed to list media assets from Vercel Blob', error);
    return NextResponse.json({ success: false, error: 'Failed to list media assets.' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch (error) {
    console.error('Invalid JSON payload for media deletion', error);
    return NextResponse.json({ success: false, error: 'Invalid JSON payload.' }, { status: 400 });
  }

  const target = (payload as { target?: string | string[] }).target;

  if (!target || (Array.isArray(target) && target.length === 0)) {
    return NextResponse.json({ success: false, error: 'A target pathname or URL is required.' }, { status: 400 });
  }

  try {
    await deleteMedia(target);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete media asset from Vercel Blob', error);
    return NextResponse.json({ success: false, error: 'Failed to delete media asset.' }, { status: 500 });
  }
}
