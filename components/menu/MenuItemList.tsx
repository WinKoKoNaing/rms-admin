import { Transition } from "@headlessui/react";
import { Delete, Edit } from "@mui/icons-material";
import { baseURL } from "config";
import Menu from "models/Menu";
import Image from "next/image";
import React, { useState } from "react";
import useSWR from "swr";
import { fetcher } from "utli";
import CreateMenu from "./CreateMenu";
import FilterMenu from "./FilterMenu";
type MenuItemListProp = {
  isShowing: boolean;
};
const MenuItemList: React.FC<MenuItemListProp> = ({ isShowing }) => {
  const [visibleCreateMenu, setVisibleCreateMenu] = useState(false);
  const { data: Menus, error } = useSWR<Menu[]>(
    baseURL + "/api/menus",
    fetcher
  );

  return (
    <Transition
      appear={true}
      show={isShowing}
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <Transition.Child>
        <FilterMenu onClickCreate={() => setVisibleCreateMenu(true)} />
      </Transition.Child>
      <Transition.Child>
        <CreateMenu
          isShowing={visibleCreateMenu}
          closeDialogModal={() => setVisibleCreateMenu(false)}
        />
      </Transition.Child>
      <Transition.Child>
        <table
          style={{ borderCollapse: "separate", borderSpacing: "0 1em" }}
          className="table-fixed w-full"
        >
          {/* <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Description</th>
              <th>Rating</th>
              <th>Total View</th>
              <th>Available</th>
              <th>Action</th>
            </tr>
          </thead> */}
          <tbody>
            {Menus?.map((menu) => (
              <tr
                className="shadow-sm font-semibold bg-white rounded-lg"
                key={menu.id}
              >
                <td className="relative rounded-l-md overflow-hidden bg-red-400">
                  <Image
                    layout="fill"
                    objectFit="cover"
                    src={menu.menu_image}
                    alt="menu image"
                  />
                </td>
                <td className="px-3 py-4">
                  <div>
                    <h1 className="text-gray-400">အမည်</h1>
                    <h1 className="text-red-500 mt-1">{menu.name}</h1>
                  </div>
                </td>
                <td className="px-3 py-4">
                  <div>
                    <h1 className="text-gray-400">ဈေးနှုန်း</h1>
                    <h1 className="text-red-500 mt-1">{menu.price} ကျပ်</h1>
                  </div>
                </td>
                <td className="px-3 py-4 spacer">
                  <div>
                    <h1 className="text-gray-400">အမျိုးအစား</h1>
                    <h1 className="text-red-500 mt-1 capitalize">
                      {menu.categories.name}
                    </h1>
                  </div>
                </td>
                <td className="px-3 py-4">
                  <div>
                    <h1 className="text-gray-400">ဖော်ပြချက်</h1>
                    <h1 className="text-red-500 mt-1 truncate">
                      {menu.description}
                    </h1>
                  </div>
                </td>
                <td className="px-3 py-4">
                  <div>
                    <h1 className="text-gray-400">သတ်မှတ်ချက်</h1>
                    <h1 className="text-red-500 mt-1">{menu.rating}</h1>
                  </div>
                </td>
                <td className="px-3 py-4">
                  <div>
                    <h1 className="text-gray-400">စုစုပေါင်းကြည့်ရှုမှု</h1>
                    <h1 className="text-red-500 mt-1">{menu.view_count}</h1>
                  </div>
                </td>
                <td className="px-3 py-4">
                  <div>
                    <h1 className="text-gray-400">အခြေအနေ</h1>
                    <h1 className="text-red-500 mt-1">
                      {menu.is_available ? "ရနိုင်သည်" : "မရနိုင်ပါ"}
                    </h1>
                  </div>
                </td>
                <td className="px-3 py-4 text-center">
                  <div className="flex-1">
                    <h1 className="text-gray-400">လုပ်ဆောင်ချက်</h1>
                    <h1 className="text-red-500 mt-1 ">
                      <Edit className="mr-3" fontSize="small" />{" "}
                      <Delete fontSize="small" />
                    </h1>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Transition.Child>
    </Transition>
  );
};

export default MenuItemList;
