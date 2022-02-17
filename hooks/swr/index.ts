import Category from "models/Category";
import Menu from "models/Menu";
import Tag from "models/Tag";
import useSWR from "swr";
import { fetcher } from "utli";

export function useTag(isReactSelect: boolean = false) {
  const { data, error } = useSWR<Tag[]>("/api/tags", fetcher);

  return {
    data: isReactSelect
      ? data?.map((t) => ({ label: t.name, value: t.id }))
      : data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function useCategory(isReactSelect: boolean = false) {
  const { data, error } = useSWR<Category[]>("/api/categories", fetcher);

  return {
    data: isReactSelect
      ? data?.map((t) => ({ label: t.name, value: t.id }))
      : data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function useMenus() {
  const { data, error } = useSWR<Menu[]>("/api/menus", fetcher);

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
}
