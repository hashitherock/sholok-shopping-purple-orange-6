import { createFileRoute, notFound } from "@tanstack/react-router";
import { getCategory } from "@/data/categories";
import { products } from "@/data/products";
import { ListingPage } from "@/components/product/ListingPage";

export const Route = createFileRoute("/category/$slug")({
  loader: ({ params }) => { const c = getCategory(params.slug); if (!c) throw notFound(); return { name: c.name, slug: c.slug }; },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.name} — SHOLOK Shopping` },
          { name: "description", content: `Shop ${loaderData.name} at SHOLOK with great prices and fast delivery.` },
          { property: "og:title", content: `${loaderData.name} — SHOLOK Shopping` },
          { property: "og:description", content: `Shop ${loaderData.name} at SHOLOK.` },
        ]
      : [{ title: "Category not found — SHOLOK" }, { name: "robots", content: "noindex" }],
  }),
  component: CategoryPage,
});

function CategoryPage() {
  const { name, slug } = Route.useLoaderData();
  return <ListingPage key={slug} title={name} products={products.filter((p) => p.category === slug)} emptyText="New products are coming to this category soon." />;
}
