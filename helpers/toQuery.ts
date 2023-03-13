import IFilters from '@/interfaces/filters';
import ISorts from '@/interfaces/sorts';

export default function toQuery(
  offset: number | null = null,
  limit: number | null = null,
  sorts: ISorts | null = null,
  filters: IFilters | null = null,
  additional: Record<string, string | number | boolean | null> | null = null,
): string {
  const params: Record<string, string> = {};

  if (offset !== null) {
    params.offset = String(offset);
  }

  if (limit !== null) {
    params.limit = String(limit);
  }

  let query: string = new URLSearchParams(params).toString();
  let queryFilters: string = '';

  if (filters) {
    Object.keys(filters).forEach((field) => {
      if (queryFilters !== '') {
        queryFilters += '&';
      }

      const value = filters[field];

      if (value !== null && value !== undefined) {
        if (typeof value === 'object') {
          let i = 0;

          Object.values(value).forEach((item) => {
            if (queryFilters !== '') {
              queryFilters += '&';
            }

            queryFilters += `filters[${field}][${i}]=${encodeURIComponent(item as string)}`;
            i++;
          });
        } else if (typeof value === 'boolean' || value === 'true' || value === 'false') {
          const val = (filters[field] === true || filters[field] === 'true') ? 1 : 0;
          queryFilters += `filters[${field}]=${val}`;
        } else {
          queryFilters += `filters[${field}]=${encodeURIComponent(String(filters[field]))}`;
        }
      }
    });
  }

  if (additional) {
    Object.keys(additional).forEach((field) => {
      if (queryFilters !== '') {
        queryFilters += '&';
      }

      if (typeof additional[field] === 'boolean') {
        queryFilters += `${field}=${additional[field] ? 1 : 0}`;
      } else {
        queryFilters += `${field}=${encodeURIComponent(String(additional[field]))}`;
      }
    });
  }

  if (queryFilters) {
    query += `&${queryFilters}`;
  }

  let querySorts = '';

  if (sorts) {
    Object.keys(sorts).forEach((field) => {
      if (querySorts !== '') {
        querySorts += '&';
      }

      querySorts += `sorts[${field}]=${encodeURIComponent(String(sorts[field]))}`;
    });
  }

  if (querySorts) {
    query += `&${querySorts}`;
  }

  return query;
}
