import type { MediaAssetKind } from '@/types/allTypes';

const defaultPhotoPrefix = process.env.BLOB_MEDIA_PHOTO_PREFIX || 'assets/images';
const defaultVideoPrefix = process.env.BLOB_MEDIA_VIDEO_PREFIX || 'assets/videos';

const prefixes: Record<MediaAssetKind, string> = {
  photo: defaultPhotoPrefix,
  video: defaultVideoPrefix,
};

function resolveBlobAccess(): 'public' {
  const access = process.env.BLOB_MEDIA_ACCESS;

  if (access && access !== 'public') {
    throw new Error('BLOB_MEDIA_ACCESS admite sólo "public"');
  }

  return 'public';
}

export const blobAccess = resolveBlobAccess();

export function getBlobPrefix(kind: MediaAssetKind): string {
  return prefixes[kind] || prefixes.photo;
}

export function buildBlobPath(kind: MediaAssetKind, fileName: string): string {
  const normalizedFileName = fileName.replace(/^\/+/, '');
  const prefix = getBlobPrefix(kind).replace(/\/$/, '');
  return `${prefix}/${normalizedFileName}`;
}
