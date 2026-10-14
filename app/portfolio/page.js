import PortfolioProfile from "@/components/portfolio/PortfolioProfile";
import { categories, portfolioItems } from "@/data/portfolioItems";

export default function Portfolio() {
  return <PortfolioProfile items={portfolioItems} categories={categories} />;
}
