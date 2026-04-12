import '@testing-library/jest-dom';
import React from 'react';
import { TextEncoder, TextDecoder } from 'util';
import { webcrypto } from 'crypto';
import { ReadableStream } from 'node:stream/web';
import { MessageChannel, MessagePort as WorkerMessagePort } from 'worker_threads';

const getMessageEventConstructor = (): typeof globalThis.MessageEvent => {
  if (typeof MessageEvent !== 'undefined') {
    return MessageEvent;
  }

  class MessageEventPolyfill<T = unknown> extends Event {
    data: T;
    origin: string;
    lastEventId: string;
    source: MessageEventSource | null;
    ports: MessagePort[];

    constructor(type: string, init?: MessageEventInit<T>) {
      super(type);
      this.data = init?.data as T;
      this.origin = init?.origin ?? '';
      this.lastEventId = init?.lastEventId ?? '';
      this.source = init?.source ?? null;
      this.ports = init?.ports ? [...init.ports] : [];
    }
  }

  return MessageEventPolyfill as unknown as typeof globalThis.MessageEvent;
};

const MessageEventConstructor = getMessageEventConstructor();


if (!globalThis.TextEncoder) {
  globalThis.TextEncoder = TextEncoder as unknown as typeof globalThis.TextEncoder;
}

if (!globalThis.TextDecoder) {
  globalThis.TextDecoder = TextDecoder as unknown as typeof globalThis.TextDecoder;
}

if (!globalThis.crypto) {
  globalThis.crypto = webcrypto as unknown as Crypto;
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Headers, Request, Response, FormData } = require('undici');

if (!globalThis.Headers) {
  globalThis.Headers = Headers as typeof globalThis.Headers;
}

if (!globalThis.Request) {
  globalThis.Request = Request as typeof globalThis.Request;
}

if (!globalThis.Response) {
  globalThis.Response = Response as typeof globalThis.Response;
}

if (!globalThis.FormData) {
  globalThis.FormData = FormData as typeof globalThis.FormData;
}

if (!globalThis.ReadableStream) {
  globalThis.ReadableStream = ReadableStream as typeof globalThis.ReadableStream;
}

if (!globalThis.MessageChannel) {
  globalThis.MessageChannel = MessageChannel as typeof globalThis.MessageChannel;
}

if (!globalThis.MessagePort) {
  globalThis.MessagePort = WorkerMessagePort as unknown as typeof globalThis.MessagePort;
}

if (!globalThis.MessageEvent) {
  globalThis.MessageEvent = MessageEventConstructor as typeof globalThis.MessageEvent;
}

process.env.NEXT_PUBLIC_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://vr-case.test';
process.env.NEXT_PUBLIC_ASSETS_BASE = process.env.NEXT_PUBLIC_ASSETS_BASE ?? 'https://cdn.vr-case.test';
process.env.NEXT_PUBLIC_FAVICON_PATH = process.env.NEXT_PUBLIC_FAVICON_PATH ?? '/icons/favicon.ico';
process.env.NEXT_PUBLIC_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://example.supabase.co';
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'supabase-test-key';
process.env.BLOB_MEDIA_PHOTO_PREFIX = process.env.BLOB_MEDIA_PHOTO_PREFIX ?? 'assets/images';
process.env.BLOB_MEDIA_VIDEO_PREFIX = process.env.BLOB_MEDIA_VIDEO_PREFIX ?? 'assets/videos';
process.env.BLOB_MEDIA_ACCESS = process.env.BLOB_MEDIA_ACCESS ?? 'public';

type NextImageMockProps = React.ComponentProps<'img'> & {
  priority?: boolean;
  fill?: boolean;
};

jest.mock('next/image', () => {
  return React.forwardRef((props: NextImageMockProps, ref: React.Ref<HTMLImageElement>) => {
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
