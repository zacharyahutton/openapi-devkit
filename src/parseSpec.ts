export interface OpenAPISpec {
  openapi: string;
  info: { title: string; version: string };
  paths: Record<string, Record<string, { operationId?: string; summary?: string }>>;
  components?: { schemas?: Record<string, { type?: string; properties?: Record<string, { type?: string }> }> };
}

export function parseSpec(raw: string): OpenAPISpec {
  const spec = JSON.parse(raw) as OpenAPISpec;
  if (!spec.openapi?.startsWith("3.")) {
    throw new Error("Only OpenAPI 3.x JSON specs are supported in this starter");
  }
  if (!spec.paths || typeof spec.paths !== "object") {
    throw new Error("Spec missing paths object");
  }
  return spec;
}

export function listOperations(spec: OpenAPISpec): Array<{ method: string; path: string; operationId: string; summary?: string }> {
  const ops: Array<{ method: string; path: string; operationId: string; summary?: string }> = [];
  for (const [path, methods] of Object.entries(spec.paths)) {
    for (const [method, operation] of Object.entries(methods)) {
      if (method === "parameters") continue;
      ops.push({
        method: method.toUpperCase(),
        path,
        operationId: operation.operationId ?? `${method}${path.replace(/\//g, "_")}`,
        summary: operation.summary,
      });
    }
  }
  return ops;
}
