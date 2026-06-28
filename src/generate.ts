import type { OpenAPISpec } from "./parseSpec.js";
import { listOperations } from "./parseSpec.js";

function tsTypeFromSchema(schema: { type?: string } | undefined): string {
  if (!schema?.type) return "unknown";
  switch (schema.type) {
    case "integer":
    case "number":
      return "number";
    case "boolean":
      return "boolean";
    case "array":
      return "unknown[]";
    default:
      return "string";
  }
}

export function generateInterfaces(spec: OpenAPISpec): string {
  const schemas = spec.components?.schemas ?? {};
  const lines = ["// Auto-generated TypeScript interfaces (portfolio starter)", ""];
  for (const [name, schema] of Object.entries(schemas)) {
    lines.push(`export interface ${name} {`);
    for (const [prop, def] of Object.entries(schema.properties ?? {})) {
      lines.push(`  ${prop}: ${tsTypeFromSchema(def)};`);
    }
    lines.push("}", "");
  }
  if (Object.keys(schemas).length === 0) {
    lines.push("// No components.schemas found in spec", "");
  }
  return lines.join("\n");
}

export function generateClient(spec: OpenAPISpec, baseUrl = "process.env.API_BASE_URL"): string {
  const ops = listOperations(spec);
  const lines = [
    "// Auto-generated fetch client (portfolio starter)",
    `export const BASE_URL = ${baseUrl};`,
    "",
  ];

  for (const op of ops) {
    const fnName = op.operationId.replace(/[^a-zA-Z0-9_]/g, "_");
    lines.push(
      `/** ${op.method} ${op.path}${op.summary ? ` — ${op.summary}` : ""} */`,
      `export async function ${fnName}(init?: RequestInit): Promise<Response> {`,
      `  return fetch(\`\${BASE_URL}${op.path}\`, { method: "${op.method}", ...init });`,
      `}`,
      "",
    );
  }

  return lines.join("\n");
}

export function formatEndpointList(spec: OpenAPISpec): string {
  return listOperations(spec)
    .map((op) => `${op.method.padEnd(6)} ${op.path}  (${op.operationId})`)
    .join("\n");
}
