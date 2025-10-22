import { del, head, list, put } from '@vercel/blob';
import { blobAccess, buildBlobPath, getBlobPrefix } from '@/lib/blobConfig';
import type {
  ListMediaOptions,
  ListMediaResult,
  MediaAsset,
  MediaAssetKind,
  UploadMediaOptions,
  UploadMediaResult,
} from '@/types/allTypes';

const photoPrefix = getBlobPrefix('photo').replace(/\/$/, '').replace(/^\/+/, '');
const videoPrefix = getBlobPrefix('video').replace(/\/$/, '').replace(/^\/+/, '');

const fallbackContentType = 'application/octet-stream';
const mimeByExtension: Record<string, string> = {
  webp: 'image/webp',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  avif: 'image/avif',
  gif: 'image/gif',
  mp4: 'video/mp4',
  webm: 'video/webm',
  mov: 'video/quicktime',
};

function normalizeUploadedAt(value: Date | string): string {
  if (value instanceof Date) {
    return value.toISOString();
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? new Date().toISOString() : parsed.toISOString();
}

function inferContentType(pathname: string, explicit?: string): string {
  if (explicit) {
    return explicit;
  }

  const cleanPath = pathname.split('?')[0];
  const extension = cleanPath.split('.').pop() ?? '';
  const normalizedExtension = extension.toLowerCase();
  return mimeByExtension[normalizedExtension] || fallbackContentType;
}

function inferKindFromPath(pathname: string, fallback: MediaAssetKind = 'photo'): MediaAssetKind {
  const normalized = pathname.replace(/^\/+/, '');

  if (normalized.startsWith(videoPrefix)) {
    return 'video';
  }

  if (normalized.startsWith(photoPrefix)) {
    return 'photo';
  }

  return fallback;
}

function withTrailingSlash(value: string) {
  return value.endsWith('/') ? value : `${value}/`;
}

function toMediaAsset(kind: MediaAssetKind, blob: {
  pathname: string;
  url: string;
  size: number;
  uploadedAt: Date | string;
  contentType?: string;
}): MediaAsset {
  return {
    kind,
    pathname: blob.pathname,
    url: blob.url,
    size: blob.size,
    uploadedAt: normalizeUploadedAt(blob.uploadedAt),
    contentType: inferContentType(blob.pathname, blob.contentType),
  };
}

export async function uploadMedia(options: UploadMediaOptions): Promise<UploadMediaResult> {
  const { file, kind, targetPath, addRandomSuffix = true, contentType } = options;
  const candidateName = targetPath?.trim() || file.name;

  if (!candidateName) {
    throw new Error('targetPath or file.name must be provided to upload media to Vercel Blob');
  }

  const blobPath = buildBlobPath(kind, candidateName);
  const putResult = await put(blobPath, file, {
    access: blobAccess,
    addRandomSuffix,
    contentType: contentType || (file.type || undefined),
  });

  const metadata = await head(putResult.url);
  const asset = toMediaAsset(kind, {
    pathname: metadata.pathname,
    url: metadata.url,
    size: metadata.size,
    uploadedAt: metadata.uploadedAt,
    contentType: metadata.contentType,
  });

  return {
    asset,
    downloadUrl: metadata.downloadUrl,
    contentDisposition: metadata.contentDisposition,
  };
}

export async function listMedia(options: ListMediaOptions = {}): Promise<ListMediaResult> {
  const { kind, prefixOverride, limit, cursor } = options;
  const prefix = prefixOverride
    ? withTrailingSlash(prefixOverride.replace(/\/$/, ''))
    : kind
      ? withTrailingSlash(getBlobPrefix(kind).replace(/\/$/, ''))
      : undefined;

  const result = await list({
    prefix,
    limit,
    cursor,
  });

  const items = result.blobs.map((blob) => {
    const resolvedKind = kind ?? inferKindFromPath(blob.pathname);

    return toMediaAsset(resolvedKind, {
      pathname: blob.pathname,
      url: blob.url,
      size: blob.size,
      uploadedAt: blob.uploadedAt,
    });
  });

  return {
    items,
    cursor: result.cursor,
    hasMore: result.hasMore,
  };
}

export async function deleteMedia(target: string | string[]): Promise<void> {
  await del(target);
}
