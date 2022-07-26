import { useTag } from "hooks/swr";
import type { NextPage } from "next";

const Tag: NextPage = (props) => {
  const { data: tags } = useTag();
  return (
    <div className="px-7">
      <h1 className="font-bold text-xl tracking-wider">Tag Listing</h1>
      <div className="flex flex-col gap-3 mt-5">
        {tags?.map((category: any, index: number) => (
          <p className="font-bold" key={index}>
            {index + 1}. {category?.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Tag;
