import { deleteMedia, listMedia, uploadMedia } from './blobStorage';
import type { UploadMediaOptions } from '@/types/allTypes';

jest.mock('@vercel/blob', () => ({
  put: jest.fn(),
  head: jest.fn(),
  list: jest.fn(),
  del: jest.fn()
}));

const { put, head, list, del } = jest.requireMock('@vercel/blob');

const createFile = () => new File(['hello'], 'cover.webp', { type: 'image/webp' });

describe('blob storage helpers', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('uploads files and returns normalized metadata', async () => {
    put.mockResolvedValue({ url: 'https://blob.vercel.com/test' });
    head.mockResolvedValue({
      pathname: 'assets/images/cover.webp',
      url: 'https://blob.vercel.com/test',
      size: 512,
      uploadedAt: new Date('2024-01-01T00:00:00Z'),
      contentType: 'image/webp',
      downloadUrl: 'https://blob.vercel.com/download/test',
      contentDisposition: 'inline'
    });

    const options: UploadMediaOptions = {
      file: createFile(),
      kind: 'photo'
    };

    const result = await uploadMedia(options);

    expect(put).toHaveBeenCalledWith('assets/images/cover.webp', expect.any(File), expect.objectContaining({
      access: 'public'
    }));
    expect(result.asset).toMatchObject({
      kind: 'photo',
      pathname: 'assets/images/cover.webp',
      size: 512,
      uploadedAt: '2024-01-01T00:00:00.000Z'
    });
    expect(result.downloadUrl).toBe('https://blob.vercel.com/download/test');
  });

  it('lists media and infers kind from prefix', async () => {
    list.mockResolvedValue({
      blobs: [
        { pathname: 'assets/videos/clip.mp4', url: 'https://blob/clip', size: 1, uploadedAt: new Date().toISOString() }
      ],
      cursor: 'next',
      hasMore: true
    });

    const result = await listMedia({ kind: 'video', limit: 10 });
    expect(list).toHaveBeenCalledWith(expect.objectContaining({ prefix: 'assets/videos/' }));
    expect(result.items[0]).toMatchObject({ kind: 'video', pathname: 'assets/videos/clip.mp4' });
    expect(result.cursor).toBe('next');
  });

  it('delegates delete requests to vercel blob API', async () => {
    await deleteMedia('assets/images/cover.webp');
    expect(del).toHaveBeenCalledWith('assets/images/cover.webp');
  });
});
