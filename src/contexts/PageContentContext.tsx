import { createContext, useContext, ReactNode } from "react";
import { usePageContent } from "@/hooks/usePageContent";

interface PageContentContextType {
  get: (section: string, key: string, fallback: string) => string;
  loading: boolean;
}

const PageContentContext = createContext<PageContentContextType | undefined>(undefined);

export const PageContentProvider = ({ page, children }: { page: string; children: ReactNode }) => {
  const { get, loading } = usePageContent(page);
  return (
    <PageContentContext.Provider value={{ get, loading }}>
      {children}
    </PageContentContext.Provider>
  );
};

export const useSharedPageContent = () => {
  const ctx = useContext(PageContentContext);
  if (!ctx) throw new Error("useSharedPageContent must be used within PageContentProvider");
  return ctx;
};
