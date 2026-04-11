import { POST } from './route';

jest.mock('@/lib/experiences/previews', () => ({
  fetchExperiencePreview: jest.fn()
}));

const mockFetchPreview = jest.mocked(
  require('@/lib/experiences/previews').fetchExperiencePreview
);

const buildRequest = (payload: unknown) => new Request('http://localhost/api/games/previews', {
  method: 'POST',
  body: JSON.stringify(payload)
});

describe('games previews route', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('rejects invalid JSON payloads', async () => {
    const response = await POST(new Request('http://localhost', {
      method: 'POST',
      body: 'not-json'
    }));

    expect(response.status).toBe(400);
  });

  it('returns empty previews when there are no valid targets', async () => {
    const response = await POST(buildRequest({ games: [{ id: '', sourceUrl: 'invalid' }] }));
    expect(await response.json()).toEqual({ previews: [] });
  });

  it('fetches previews for sanitized targets', async () => {
    mockFetchPreview.mockResolvedValue({
      posterUrl: 'poster',
      description: 'desc',
      videoUrl: null,
      canonicalUrl: 'https://example.com/game'
    });

    const response = await POST(buildRequest({
      games: [
        { id: ' 42 ', sourceUrl: 'https://meta.com/game' },
        { id: 99, sourceUrl: 'http://meta.com/other' }
      ]
    }));

    const payload = await response.json();
    expect(response.status).toBe(200);
    expect(payload.previews).toHaveLength(2);
    expect(mockFetchPreview).toHaveBeenCalledTimes(2);
  });

  it('surfaces errors when fetching fails', async () => {
    mockFetchPreview.mockRejectedValue(new Error('preview-failed'));
    const response = await POST(buildRequest({ games: [{ id: 7, sourceUrl: 'https://meta.com/a' }] }));
    expect(response.status).toBe(502);
    const payload = await response.json();
    expect(payload.errors[0]).toEqual(expect.objectContaining({ gameId: 7 }));
  });
});
