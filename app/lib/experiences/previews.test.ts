const loadModule = async () => {
  jest.resetModules();
  return import('./previews');
};

describe('fetchExperiencePreview', () => {
  const html = `
    <html>
      <head>
        <link rel="canonical" href="https://www.meta.com/experience" />
        <meta property="og:image" content="/poster.jpg" />
        <meta property="og:description" content="Best experience" />
        <meta property="og:video" content="/video.mp4" />
      </head>
    </html>
  `;

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  it('parses previews and caches responses', async () => {
    const { fetchExperiencePreview } = await loadModule();
    const fetchMock = global.fetch as jest.MockedFunction<typeof fetch>;
    fetchMock.mockResolvedValue(new Response(html, { status: 200 }));

    const result = await fetchExperiencePreview('https://www.meta.com/experiences/game');
    expect(result).toEqual({
      posterUrl: 'https://www.meta.com/poster.jpg',
      description: 'Best experience',
      videoUrl: 'https://www.meta.com/video.mp4',
      canonicalUrl: 'https://www.meta.com/experience'
    });

    const cached = await fetchExperiencePreview('https://www.meta.com/experiences/game');
    expect(cached).toEqual(result);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('accepts upstream 400 responses with usable payloads', async () => {
    const { fetchExperiencePreview } = await loadModule();
    const fetchMock = global.fetch as jest.MockedFunction<typeof fetch>;
    fetchMock.mockResolvedValue(new Response(html, { status: 400 }));

    const result = await fetchExperiencePreview('https://meta.com/vr');
    expect(result.description).toBe('Best experience');
  });

  it('throws when upstream has no usable data', async () => {
    const { fetchExperiencePreview } = await loadModule();
    const fetchMock = global.fetch as jest.MockedFunction<typeof fetch>;
    fetchMock.mockResolvedValue(new Response('<html></html>', { status: 200 }));

    await expect(fetchExperiencePreview('https://meta.com/empty')).rejects.toThrow('experience-empty-response');
  });

  it('rejects missing URLs early', async () => {
    const { fetchExperiencePreview } = await loadModule();
    await expect(fetchExperiencePreview(' ')).rejects.toThrow('missing-target-url');
  });
});
