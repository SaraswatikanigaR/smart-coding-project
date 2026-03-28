import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { z } from "zod";

function parseWithLogging<T>(schema: z.ZodSchema<T>, data: unknown, label: string): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    console.error(`[Zod Validation Error] ${label}:`, result.error.format());
    throw result.error;
  }
  return result.data;
}

export function useProblems() {
  return useQuery({
    queryKey: [api.problems.list.path],
    queryFn: async () => {
      const res = await fetch(api.problems.list.path, { credentials: "include" });
      if (!res.ok) throw new Error('Failed to fetch problems');
      const data = await res.json();
      return parseWithLogging(api.problems.list.responses[200], data, "problems.list");
    },
  });
}

export function useProblem(id: number) {
  return useQuery({
    queryKey: [api.problems.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.problems.get.path, { id });
      const res = await fetch(url, { credentials: "include" });
      
      if (res.status === 404) return null;
      if (!res.ok) throw new Error('Failed to fetch problem');
      
      const data = await res.json();
      return parseWithLogging(api.problems.get.responses[200], data, "problems.get");
    },
    enabled: !!id && !isNaN(id),
  });
}
