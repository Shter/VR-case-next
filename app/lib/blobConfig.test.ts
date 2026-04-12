import { blobAccess, buildBlobPath, getBlobPrefix } from './blobConfig';

describe('blob config helpers', () => {
  it('resolves prefixes per media kind', () => {
    expect(blobAccess).toBe('public');
    expect(getBlobPrefix('photo')).toBe('assets/images');
    expect(getBlobPrefix('video')).toBe('assets/videos');
  });

  it('builds normalized paths', () => {
    expect(buildBlobPath('photo', '/covers/test.webp')).toBe('assets/images/covers/test.webp');
  });

  it('throws when invalid access is configured', async () => {
    const original = process.env.BLOB_MEDIA_ACCESS;
    process.env.BLOB_MEDIA_ACCESS = 'private';
    jest.resetModules();

    await expect(import('./blobConfig')).rejects.toThrow('BLOB_MEDIA_ACCESS admite sólo "public"');

    process.env.BLOB_MEDIA_ACCESS = original;
    jest.resetModules();
  });
});
