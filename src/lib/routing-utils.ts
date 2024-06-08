import { resolveRoute } from '$app/paths';
import type RouteMetadata from '../../.svelte-kit/types/route_meta_data.json';

/**
* Builds a search parameters string from the given object.
* u/param params - The object containing the search parameters.
* u/returns The search parameters string.
*/
export const buildSearchParamsString = (params: Record<string, any>): string => {
  const searchParams = new URLSearchParams();
  for (const key in params) {
    if (params.hasOwnProperty(key) && params?.[key] !== undefined && params?.[key] !== null) {
      searchParams.append(key, params[key].toString());
    }
  }
  return searchParams.toString();
};

type RouteMetadata = typeof RouteMetadata;
type Prettify<T> = { [K in keyof T]: T[K] } & {};
type ParseParam<T extends string> = T extends `...${infer Name}` ? Name : T;
type ParseParams<T extends string> = T extends `${infer A}[[${infer Param}]]${infer B}`
  ? ParseParams<A> & { [K in ParseParam<Param>]?: string } & ParseParams<B>
  : T extends `${infer A}[${infer Param}]${infer B}`
  ? ParseParams<A> & { [K in ParseParam<Param>]: string } & ParseParams<B>
  : {};
type RequiredKeys<T extends object> = keyof {
  // eslint-disable-next-line /ban-types
  [P in keyof T as {} extends Pick<T, P> ? never : P]: 1;
};

export type RouteId = keyof RouteMetadata;

export type Routes = {
  [K in RouteId]: Prettify<ParseParams<K>>;
};

export function route<T extends keyof Routes>(
  routeId: T,
  options?: {
    query?: Record<string, any> | string;
    hash?: string;
    baseUrl?: string;
  } & (RequiredKeys<Routes[T]> extends never ? { params?: Routes[T] } : { params: Routes[T] }),
) {
  const path = resolveRoute(String(routeId), options?.params ?? {});
  let search = undefined;
  if (options?.query) {
    search = typeof options.query === 'string' ? options.query : buildSearchParamsString(options.query);
  }
  return (options?.baseUrl ?? '') + path + (search ? `?${search}` : '') + (options?.hash ? `#${options?.hash}` : '');
}
