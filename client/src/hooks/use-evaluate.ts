import { useMutation } from "@tanstack/react-query";
import { api, type EvaluateRequest } from "@shared/routes";
import { z } from "zod";

function parseWithLogging<T>(schema: z.ZodSchema<T>, data: unknown, label: string): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    console.error(`[Zod Validation Error] ${label}:`, result.error.format());
    throw result.error;
  }
  return result.data;
}

export function useEvaluate() {
  return useMutation({
    mutationFn: async (data: EvaluateRequest) => {
      const validated = api.evaluate.submit.input.parse(data);
      const res = await fetch(api.evaluate.submit.path, {
        method: api.evaluate.submit.method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validated),
        credentials: "include",
      });
      
      const responseData = await res.json();
      
      if (!res.ok) {
        if (res.status === 400) {
          const error = parseWithLogging(api.evaluate.submit.responses[400], responseData, "evaluate.400");
          throw new Error(error.message);
        }
        if (res.status === 404) {
          const error = parseWithLogging(api.evaluate.submit.responses[404], responseData, "evaluate.404");
          throw new Error(error.message);
        }
        if (res.status === 500) {
          const error = parseWithLogging(api.evaluate.submit.responses[500], responseData, "evaluate.500");
          throw new Error(error.message);
        }
        throw new Error('Failed to evaluate code');
      }
      
      return parseWithLogging(api.evaluate.submit.responses[200], responseData, "evaluate.200");
    },
  });
}
