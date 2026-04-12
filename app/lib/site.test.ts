import { asset, absoluteAsset, site } from './site';

describe('site helpers', () => {
  it('resolves asset paths using configured base', () => {
    expect(asset('/icons/test.svg')).toBe('https://cdn.vr-case.test/icons/test.svg');
    expect(absoluteAsset('/images/pic.webp')).toBe('https://cdn.vr-case.test/images/pic.webp');
  });

  it('throws when no assets base is configured', async () => {
    const original = process.env.NEXT_PUBLIC_ASSETS_BASE;
    delete process.env.NEXT_PUBLIC_ASSETS_BASE;
    jest.resetModules();

    await expect(async () => {
      const mod = await import('./site');
      mod.asset('/icons/logo.svg');
    }).rejects.toThrow('NEXT_PUBLIC_ASSETS_BASE is not configured');

    process.env.NEXT_PUBLIC_ASSETS_BASE = original;
    jest.resetModules();
  });

  it('exposes configured site metadata', () => {
    expect(site.url).toBe('https://vr-case.test');
    expect(site.faviconPath).toBe('/icons/favicon.ico');
  });
});
