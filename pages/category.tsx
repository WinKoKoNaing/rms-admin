import { useCategory } from "hooks/swr";
import Category from "models/Category";
import type { NextPage } from "next";

const CategoryPage: NextPage = (props) => {
  const { data: categories } = useCategory();
  return (
    <div className="px-6">
      <h1 className="font-bold text-xl tracking-wider">Category Listing</h1>
      <div className="flex flex-col gap-3 mt-5">
        {categories?.map((category: any, index) => (
          <p className="font-bold" key={index}>
            {index + 1}. {category?.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
