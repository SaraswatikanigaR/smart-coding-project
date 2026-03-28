import { z } from "zod";
import { insertProblemSchema, problems, evaluateRequestSchema, evaluateResponseSchema } from "./schema";

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  problems: {
    list: {
      method: "GET" as const,
      path: "/api/problems" as const,
      responses: {
        200: z.array(z.custom<typeof problems.$inferSelect>()),
      },
    },
    get: {
      method: "GET" as const,
      path: "/api/problems/:id" as const,
      responses: {
        200: z.custom<typeof problems.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
  },
  evaluate: {
    submit: {
      method: "POST" as const,
      path: "/api/evaluate" as const,
      input: evaluateRequestSchema,
      responses: {
        200: evaluateResponseSchema,
        400: errorSchemas.validation,
        404: errorSchemas.notFound,
        500: errorSchemas.internal,
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
