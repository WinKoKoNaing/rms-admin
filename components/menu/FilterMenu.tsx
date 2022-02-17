import { Popover, RadioGroup, Switch } from "@headlessui/react";
import { Create, FilterList } from "@mui/icons-material";
import { useCategory, useTag } from "hooks/swr";
import Category from "models/Category";
import Tag from "models/Tag";
import { useState } from "react";
type FilterMenuProp = {
  onClickCreate?: () => void;
};
export default function FilterMenu({ onClickCreate }: FilterMenuProp) {
  const { data: tags } = useTag();
  const { data: categories } = useCategory();
  const [tag, setTag] = useState();
  const [category, setCategory] = useState();
  const [enabled, setEnabled] = useState(false);
  return (
    <div className="flex relative gap-3 items-center py-2">
      <Popover className="ml-auto">
        <Popover.Button
          onClick={onClickCreate}
          className="border px-2 w-full py-1 flex items-center shadow-sm rounded-md bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          <FilterList style={{ color: "white" }} fontSize="small" />
          <span className="text-white font-medium px-3">Filter</span>
        </Popover.Button>

        <Popover.Panel
          as="div"
          className="absolute z-10 mt-1 p-5 left-0 bg-white w-full"
        >
          <h1 className="tracking-wider font-semibold">Filter Menu</h1>
          <hr className="my-3" />
          <div className="grid grid-cols-4">
            <div>
              <RadioGroup value={tag} onChange={setTag}>
                <RadioGroup.Label>
                  <h1 className="font-semibold tracking-wider">Tags</h1>
                </RadioGroup.Label>
                {(tags as Tag[])?.map((t) => (
                  <RadioGroup.Option key={t.id} value={t.name}>
                    {({ checked }) => (
                      <span
                        className={
                          checked ? "bg-blue-200 capitalize" : "capitalize"
                        }
                      >
                        {t.name}
                      </span>
                    )}
                  </RadioGroup.Option>
                ))}
              </RadioGroup>
            </div>
            <div>
              <RadioGroup value={category} onChange={setCategory}>
                <RadioGroup.Label>
                  <h1 className="font-semibold tracking-wider">Categories</h1>
                </RadioGroup.Label>
                {(categories as Category[])?.map((t) => (
                  <RadioGroup.Option key={t.id} value={t.name}>
                    {({ checked }) => (
                      <span
                        className={
                          checked ? "bg-blue-200 capitalize" : "capitalize"
                        }
                      >
                        {t.name}
                      </span>
                    )}
                  </RadioGroup.Option>
                ))}
              </RadioGroup>
            </div>
            <div>
              <Switch.Group>
                <div className="flex flex-col">
                  <Switch.Label className="mr-4">
                    <h1 className="font-semibold tracking-wider">
                      Is Available?
                    </h1>
                  </Switch.Label>
                  <Switch
                    checked={enabled}
                    onChange={setEnabled}
                    className={`${
                      enabled ? "bg-blue-600" : "bg-gray-200"
                    } mt-3 relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                  >
                    <span
                      className={`${
                        enabled ? "translate-x-6" : "translate-x-1"
                      } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                    />
                  </Switch>
                </div>
              </Switch.Group>
            </div>
            <div>
              <h1 className="font-semibold tracking-wider">Price</h1>
              <input placeholder="Min" />
              <input placeholder="Kax" />
            </div>
          </div>
          <Popover.Button className="border px-3 mt-3 text-white py-1 flex items-center shadow-sm rounded-md bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
            Ok
          </Popover.Button>
        </Popover.Panel>
      </Popover>
      <button
        onClick={onClickCreate}
        className="border px-2 py-1 flex items-center shadow-sm rounded-md bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        <Create style={{ color: "white" }} fontSize="small" />
        <span className="text-white font-medium px-3">Create</span>
      </button>
    </div>
  );
}
