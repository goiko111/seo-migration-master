import { Skeleton } from "@/components/ui/skeleton";

const ArticleCardSkeleton = () => (
  <div className="bg-gradient-card rounded-xl overflow-hidden border border-border">
    <Skeleton className="aspect-square w-full" />
    <div className="p-6 space-y-3">
      <Skeleton className="h-3 w-20" />
      <Skeleton className="h-5 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  </div>
);

const HeroSkeleton = () => (
  <section className="pt-32 pb-16 px-6 md:px-12 text-center">
    <Skeleton className="h-12 w-64 mx-auto mb-6" />
    <Skeleton className="h-5 w-96 mx-auto max-w-full" />
  </section>
);

const FeaturedSkeleton = () => (
  <div className="max-w-7xl mx-auto px-6 md:px-12 pb-16">
    <div className="grid md:grid-cols-2 gap-8 bg-gradient-card rounded-2xl overflow-hidden border border-border">
      <Skeleton className="aspect-square md:aspect-auto min-h-[300px]" />
      <div className="flex flex-col justify-center p-8 space-y-4">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  </div>
);

export const BlogSkeleton = () => (
  <>
    <HeroSkeleton />
    <FeaturedSkeleton />
    <div className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <ArticleCardSkeleton key={i} />
        ))}
      </div>
    </div>
  </>
);

export const InterviewSkeleton = () => (
  <>
    <HeroSkeleton />
    <div className="max-w-7xl mx-auto px-6 md:px-12 pb-24 space-y-16">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="grid md:grid-cols-2 gap-8 bg-gradient-card rounded-2xl overflow-hidden border border-border">
          <Skeleton className="aspect-square md:aspect-auto min-h-[300px]" />
          <div className="flex flex-col justify-center p-8 space-y-4">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-3 w-32 mt-4" />
          </div>
        </div>
      ))}
    </div>
  </>
);
