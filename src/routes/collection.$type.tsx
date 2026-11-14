import { createFileRoute, notFound } from "@tanstack/react-router";
import { collections, type CollectionKey } from "@/data/navigation";
import { getCollection } from "@/utils/productFilters";
import { ListingPage } from "@/components/product/ListingPage";

export const Route = createFileRoute("/collection/$type")({
  loader: ({ params }) => { if (!(params.type in collections)) throw notFound(); return { type: params.type as CollectionKey }; },
  head: ({ loaderData }) => {
    const c = loaderData ? collections[loaderData.type] : null;
    return {
      meta: c
        ? [
            { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: `${c.title} — SHOLOK Shopping` },
            { name: "description", content: c.description },
            { property: "og:title", content: `${c.title} — SHOLOK Shopping` },
            { property: "og:description", content: c.description },
          ]
        : [{ property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Not found — SHOLOK" }, { name: "robots", content: "noindex" }],
    };
  },
  component: CollectionPage,
});

function CollectionPage() {
  const { type } = Route.useLoaderData();
  const c = collections[type];
  return <ListingPage key={type} title={c.title} description={c.description} products={getCollection(type)} />;
}
