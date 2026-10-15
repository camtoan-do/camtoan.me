import { site } from "./site";

export interface SubstackPost {
  title: string;
  description: string;
  url: string;
  date: Date;
}

const tag = (xml: string, name: string) =>
  xml.match(new RegExp(`<${name}>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?</${name}>`))?.[1].trim() ?? "";

const decode = (s: string) =>
  s.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'");

let cache: Promise<SubstackPost[]> | undefined;

// Fetches the latest Substack posts at build time. If Substack is unreachable,
// the build still succeeds and the blog simply shows local posts only.
export function getSubstackPosts(): Promise<SubstackPost[]> {
  cache ??= (async () => {
    try {
      const res = await fetch(site.substack.feed, { signal: AbortSignal.timeout(10_000) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const xml = await res.text();
      const posts = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(([, item]) => ({
        title: decode(tag(item, "title")),
        description: decode(tag(item, "description")),
        url: tag(item, "link"),
        date: new Date(tag(item, "pubDate")),
      })).filter((p) => p.title && p.url.startsWith("https://"));
      console.log(`\n::notice::Substack: ${posts.length} posts loaded from ${site.substack.feed}`);
      return posts;
    } catch (e) {
      console.log(`\n::warning::Substack feed unavailable (${(e as Error).message}); showing local posts only`);
      return [];
    }
  })();
  return cache;
}
