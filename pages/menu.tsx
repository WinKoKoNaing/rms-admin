import { Transition } from "@headlessui/react";
import { Delete, Edit } from "@mui/icons-material";
import MenuAPI from "appApi/MenuAPI";
import CreateMenu from "components/menu/CreateMenu";
import FilterMenu from "components/menu/FilterMenu";
import { useMenus } from "hooks/swr";
import Menu from "models/Menu";
import type { NextPage } from "next";
import Image from "next/image";
import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { mutate } from "swr";

enum Action {
  NONE,
  CREATE,
  UPDATE,
}
const Menu: NextPage = (props) => {
  const menuAPI = new MenuAPI();

  const [visibleCreateUpdateMenu, setVisibleCreateUpdateMenu] =
    useState<Action>(Action.CREATE);
  const [menu, setMenu] = useState<Menu>();
  const { data: menus } = useMenus();

  const refreshMenuList = () => {
    mutate("/api/menus");
  };
  return (
    <section className="px-7">
      <FilterMenu
        onClickCreate={() => setVisibleCreateUpdateMenu(Action.CREATE)}
      />
      <CreateMenu
        triggerRefreshMenuList={() => refreshMenuList()}
        action={visibleCreateUpdateMenu}
        menu={menu}
        closeDialogModal={() => {
          setMenu(undefined);
          setVisibleCreateUpdateMenu(Action.NONE);
        }}
      />
      <table
        style={{ borderCollapse: "separate", borderSpacing: "0 1em" }}
        className="table-fixed w-full"
      >
        <tbody>
          {menus &&
            menus.map((menu) => (
              <tr
                className="shadow-sm font-semibold bg-white rounded-lg"
                key={menu.id}
              >
                <td className="relative rounded-l-md overflow-hidden bg-red-400">
                  {menu?.menu_image && (
                    <Image
                      layout="fill"
                      objectFit="cover"
                      src={menu?.menu_image}
                      alt="menu image"
                    />
                  )}
                </td>
                <td className="px-3 py-4">
                  <div>
                    <h1 className="text-gray-400">အမည်</h1>
                    <h1 className="text-red-500 mt-1 truncate text-sm lg:text-base">
                      {menu.name}
                    </h1>
                  </div>
                </td>
                <td className="px-3 py-4">
                  <div>
                    <h1 className="text-gray-400 text-sm lg:text-base">
                      ဈေးနှုန်း
                    </h1>
                    <h1 className="text-red-500 mt-1 text-sm lg:text-base">
                      {menu.price} ကျပ်
                    </h1>
                  </div>
                </td>
                <td className="px-3 py-4 hidden lg:table-cell">
                  <div>
                    <h1 className="text-gray-400">အမျိုးအစား</h1>
                    <h1 className="text-red-500 mt-1 capitalize">
                      {menu.categories.name}
                    </h1>
                  </div>
                </td>
                <td className="px-3 py-4">
                  <div>
                    <h1 className="text-gray-400 text-sm lg:text-base">
                      အခြေအနေ
                    </h1>
                    <h1 className="text-red-500 mt-1 text-sm lg:text-base">
                      {menu.is_available ? "ရနိုင်သည်" : "မရနိုင်ပါ"}
                    </h1>
                  </div>
                </td>
                <td className="px-3 py-4 hidden lg:table-cell">
                  <div>
                    <h1 className="text-gray-400">ဖော်ပြချက်</h1>
                    <h1 className="text-red-500 mt-1 truncate">
                      {menu.description}
                    </h1>
                  </div>
                </td>
                <td className="px-3 py-4 hidden lg:table-cell">
                  <div>
                    <h1 className="text-gray-400">သတ်မှတ်ချက်</h1>
                    <h1 className="text-red-500 mt-1">{menu.rating}</h1>
                  </div>
                </td>
                <td className="px-3 py-4 hidden lg:table-cell">
                  <div>
                    <h1 className="text-gray-400 ">စုစုပေါင်းကြည့်ရှုမှု</h1>
                    <h1 className="text-red-500 mt-1">{menu.view_count}</h1>
                  </div>
                </td>
                <td className="px-3 py-4 text-center">
                  <div className="flex-1">
                    <h1 className="text-gray-400 text-sm lg:text-base">
                      လုပ်ဆောင်ချက်
                    </h1>
                    <h1 className="text-red-500 mt-1 ">
                      <Edit
                        className="mr-3 cursor-pointer hover:bg-red-500 hover:text-white rounded-md"
                        onClick={() => {
                          setVisibleCreateUpdateMenu(Action.UPDATE);
                          setMenu(menu);
                        }}
                        fontSize="small"
                      />{" "}
                      <Delete
                        className="cursor-pointer hover:bg-red-500 hover:text-white rounded-md"
                        onClick={() => {
                          menuAPI
                            .deleteMenu(menu?.id!)
                            .then(() => refreshMenuList());
                        }}
                        fontSize="small"
                      />
                    </h1>
                  </div>
                </td>
              </tr>
            ))}
          {!menus && (
            <tr>
              <td>
                <Skeleton height={50} />
              </td>
              <td>
                <Skeleton height={50} />
              </td>
              <td>
                <Skeleton height={50} />
              </td>
              <td>
                <Skeleton height={50} />
              </td>
              <td>
                <Skeleton height={50} />
              </td>
              <td>
                <Skeleton height={50} />
              </td>
              <td>
                <Skeleton height={50} />
              </td>
              <td>
                <Skeleton height={50} />
              </td>
              <td>
                <Skeleton height={50} />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
};

export default Menu;
