import { getCollection } from "astro:content";
import { getSubstackPosts } from "./substack";

// All posts (this site + Substack), newest first.
export async function getAllPosts() {
  const local = (await getCollection("blog")).map((p) => ({
    title: p.data.title,
    description: p.data.description,
    date: p.data.date,
    url: `/blog/${p.id}/`,
    external: false,
  }));
  const substack = (await getSubstackPosts()).map((p) => ({ ...p, external: true }));
  return [...local, ...substack].sort((a, b) => b.date.valueOf() - a.date.valueOf());
}

export const formatDate = (d: Date) => d.toLocaleDateString("en-US", { dateStyle: "long" });
