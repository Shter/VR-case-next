import '@testing-library/jest-dom';
import React from 'react';
import { TextEncoder, TextDecoder } from 'util';
import { webcrypto } from 'crypto';
import { ReadableStream } from 'node:stream/web';
import { MessageChannel, MessageEvent, MessagePort } from 'worker_threads';


if (!globalThis.TextEncoder) {
  // @ts-expect-error assigning for test env
  globalThis.TextEncoder = TextEncoder;
}

if (!globalThis.TextDecoder) {
  // @ts-expect-error assigning for test env
  globalThis.TextDecoder = TextDecoder as typeof globalThis.TextDecoder;
}

if (!globalThis.crypto) {
  // @ts-expect-error assign webcrypto for tests
  globalThis.crypto = webcrypto as unknown as Crypto;
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Headers, Request, Response, FormData } = require('undici');

if (!globalThis.Headers) {
  // @ts-expect-error polyfill
  globalThis.Headers = Headers as typeof globalThis.Headers;
}

if (!globalThis.Request) {
  // @ts-expect-error polyfill
  globalThis.Request = Request as typeof globalThis.Request;
}

if (!globalThis.Response) {
  // @ts-expect-error polyfill
  globalThis.Response = Response as typeof globalThis.Response;
}

if (!globalThis.FormData) {
  // @ts-expect-error polyfill
  globalThis.FormData = FormData as typeof globalThis.FormData;
}

if (!globalThis.ReadableStream) {
  // @ts-expect-error polyfill
  globalThis.ReadableStream = ReadableStream as typeof globalThis.ReadableStream;
}

if (!globalThis.MessageChannel) {
  // @ts-expect-error polyfill
  globalThis.MessageChannel = MessageChannel as typeof globalThis.MessageChannel;
}

if (!globalThis.MessagePort) {
  // @ts-expect-error polyfill
  globalThis.MessagePort = MessagePort as unknown as typeof globalThis.MessagePort;
}

if (!globalThis.MessageEvent) {
  // @ts-expect-error polyfill
  globalThis.MessageEvent = MessageEvent as unknown as typeof globalThis.MessageEvent;
}

process.env.NEXT_PUBLIC_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://vr-case.test';
process.env.NEXT_PUBLIC_ASSETS_BASE = process.env.NEXT_PUBLIC_ASSETS_BASE ?? 'https://cdn.vr-case.test';
process.env.NEXT_PUBLIC_FAVICON_PATH = process.env.NEXT_PUBLIC_FAVICON_PATH ?? '/icons/favicon.ico';
process.env.NEXT_PUBLIC_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://example.supabase.co';
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'supabase-test-key';
process.env.BLOB_MEDIA_PHOTO_PREFIX = process.env.BLOB_MEDIA_PHOTO_PREFIX ?? 'assets/images';
process.env.BLOB_MEDIA_VIDEO_PREFIX = process.env.BLOB_MEDIA_VIDEO_PREFIX ?? 'assets/videos';
process.env.BLOB_MEDIA_ACCESS = process.env.BLOB_MEDIA_ACCESS ?? 'public';

jest.mock('next/image', () => {
  return React.forwardRef((props: React.ComponentProps<'img'>, ref: React.Ref<HTMLImageElement>) => {
    const { priority, fill, ...rest } = props;
    return React.createElement('img', { ref, ...rest });
  });
});

jest.mock('next/link', () => {
  return React.forwardRef((props: { href: any } & React.ComponentProps<'a'>, ref: React.Ref<HTMLAnchorElement>) => {
    const { href, children, ...rest } = props;
    const resolvedHref = typeof href === 'string'
      ? href
      : href?.pathname ?? href?.href ?? '#';
    return React.createElement('a', { ref, href: resolvedHref, ...rest }, children);
  });
});
