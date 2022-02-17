import { Switch, Transition } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Close } from "@mui/icons-material";
import MenuAPI from "appApi/MenuAPI";
import { useCategory, useTag } from "hooks/swr";
import Menu from "models/Menu";
import Image from "next/image";
import { Fragment, useEffect, useLayoutEffect, useState } from "react";
import {
  Controller,
  FieldError,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import Select from "react-select";
import { toBase64 } from "utli";
import * as yup from "yup";

enum Action {
  NONE,
  CREATE,
  UPDATE,
}

type CreateMenuProp = {
  action: Action;
  closeDialogModal: Function;
  triggerRefreshMenuList: Function;
  menu: Menu | undefined;
};

type ReactSelectOption = {
  label: string;
  value: number;
};

type FormValues = {
  name: string;
  price: number;
  category: ReactSelectOption;
  tags: ReactSelectOption[];
  description: string;
  menu_image: FileList;
  is_available: boolean;
};

export default function CreateMenu({
  triggerRefreshMenuList,
  action,
  closeDialogModal,
  menu,
}: CreateMenuProp) {
  const menuAPI = new MenuAPI();
  const [isSaveLoading, setIsSaveLoading] = useState<boolean>(false);

  const { data: tagOptions } = useTag(true);
  const { data: categoriesOptions } = useCategory(true);

  const schema = yup
    .object({
      name: yup.string().required("The name is a required field."),
      price: yup.number().required("The price is a requred field."),
      category: yup.object().required("The category is required field."),
      tags: yup.array().required("The tags is required field"),
      description: yup.string().required("The description is required field."),
      menu_image:
        action != Action.UPDATE
          ? yup
              .mixed()
              .test("EmptyFile", "Please select a image", (value) => {
                return value?.length !== 0;
              })
              .test("fileType", "Unsupported File Format", function (value) {
                return ["image/jpg", "image/jpeg", "image/png"].includes(
                  value?.[0]?.type
                );
              })
          : yup.mixed(),
      is_available: yup.boolean().required("This field is required field."),
    })
    .required();

  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(schema) });

  useEffect(() => {
    console.log(menu);
    if (menu) {
      setValue("name", menu.name!);
      setValue("price", menu.price!);
      setValue("category", {
        label: menu.categories.name!,
        value: menu.categories.id!,
      });
      setValue(
        "tags",
        menu.tags!.map((t) => ({ value: t.tag.id, label: t.tag.name }))
      );
      setValue("description", menu.description!);
      setValue("is_available", menu.is_available!);
      // setValue('menu_image', menu.menu_image!);
    }
  }, [menu, setValue]);
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (action != Action.UPDATE) {
      setIsSaveLoading(true);
      const menuData = {
        name: data.name,
        price: data.price,
        categoryId: data.category.value,
        tags: data.tags.map((tag) => tag.value),
        description: data.description,
        is_available: data.is_available,
        image:
          data.menu_image.length > 0
            ? await toBase64(data.menu_image[0])
            : menu?.menu_image,
      };
      // console.log(menuData);
      menuAPI
        .createMenu(menuData)
        .then((data) => {
          triggerRefreshMenuList();
          setIsSaveLoading(false);
        })
        .catch((e) => {
          console.log(e);
          setIsSaveLoading(false);
        });
    } else {
      alert("Update is in development.");
    }
  };
  return (
    <Transition
      key={action}
      show={action !== Action.NONE}
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      as={Fragment}
    >
      <form
        key={action}
        className="mx-auto space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex justify-between">
          <h1 className="font-bold text-xl tracking-wider">Create Menu</h1>
          <Close
            fontSize="medium"
            sx={{
              ":hover": {
                backgroundColor: "gray",
                color: "white",
                cursor: "pointer",
              },
              borderRadius: "50%",
            }}
            onClick={() => closeDialogModal()}
          />
        </div>
        <section className="grid grid-cols-2 gap-5">
          <div className="space-y-3">
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Name
              </label>
              <input
                type="text"
                {...register("name")}
                id="name"
                autoComplete="given-name"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
              <p className="text-red-700 text-sm mt-1">
                {errors.name?.message}
              </p>
            </div>

            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Price
              </label>
              <input
                type="number"
                {...register("price")}
                id="price"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
              <p className="text-red-700 text-sm mt-1">
                {errors.price?.message}
              </p>
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <Controller
                render={({ field: { onChange, value, name, ref } }) => (
                  <Select
                    ref={ref}
                    name={name}
                    value={value}
                    className="mt-1"
                    styles={{
                      input: (provided: any) => ({
                        ...provided,
                        "input:focus": {
                          boxShadow: "none",
                        },
                      }),
                    }}
                    onChange={onChange}
                    options={categoriesOptions as ReactSelectOption[]}
                  />
                )}
                name="category"
                control={control}
              />
              <p className="text-red-700 text-sm mt-1">
                {(errors.category as FieldError)?.message}
              </p>
            </div>

            <div className="flex-grow-0">
              <label
                htmlFor="tags"
                className="block text-sm font-medium text-gray-700"
              >
                Tag
              </label>
              <Controller
                render={({ field: { onChange, value, name, ref } }) => (
                  <Select
                    ref={ref}
                    name={name}
                    value={value}
                    className="mt-1"
                    styles={{
                      input: (provided: any) => ({
                        ...provided,
                        "input:focus": {
                          boxShadow: "none",
                        },
                      }),
                    }}
                    isMulti
                    closeMenuOnSelect={false}
                    onChange={onChange}
                    options={tagOptions as ReactSelectOption[]}
                  />
                )}
                name="tags"
                control={control}
              />
              <p className="text-red-700 text-sm mt-1">
                {errors.tags && "The tags is a required field."}
              </p>
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                {...register("description")}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
              <p className="text-red-700 text-sm mt-1">
                {errors.description?.message}
              </p>
            </div>
            {/* <button onClick={reset}>Reset</button> */}
            <div className="flex gap-2">
              <button
                disabled={isSaveLoading}
                type="submit"
                className="flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                {isSaveLoading && (
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                )}
                {(Action.CREATE == action && "Create") ||
                  (Action.UPDATE == action && "Update")}
              </button>
              <button
                type="reset"
                className="flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Reset
              </button>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex-grow-0">
              <label
                htmlFor="tags"
                className="block text-sm font-medium text-gray-700"
              >
                Is Available
              </label>
              <Controller
                defaultValue={false}
                render={({ field: { onChange, value } }) => (
                  <Switch
                    checked={value}
                    onChange={onChange}
                    className={`${
                      value == true ? "bg-red-600" : "bg-gray-200"
                    } mt-3 relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500`}
                  >
                    <span
                      className={`${
                        value == true ? "translate-x-6" : "translate-x-1"
                      } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                    />
                  </Switch>
                )}
                name="is_available"
                control={control}
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Menu Image
              </label>
              <div className="flex mt-1  items-center w-full">
                <label className="flex flex-col cursor-pointer border-red-500 rounded-md border-2 bg-red-500 text-white border-solid p-1 hover:bg-red-700 hover:border-red-300">
                  <div className="flex cursor-pointer items-center gap-2 justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 text-white "
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="text-sm tracking-wider text-white">
                      Select a photo
                    </p>
                  </div>
                  <input
                    id="menu_image"
                    {...register("menu_image")}
                    type="file"
                    className="sr-only"
                    // required
                  />
                </label>
              </div>
              <p className="text-red-700 text-sm mt-1">
                {errors.menu_image?.message}
              </p>
            </div>
            {(watch("menu_image")?.length > 0 || menu?.menu_image) && (
              <div className="rounded-md relative w-full lg:w-1/3 h-1/2 lg:h-1/3 overflow-hidden border-gray-300 border-2">
                <Image
                  layout="fill"
                  objectFit="cover"
                  src={
                    menu?.menu_image
                      ? menu.menu_image
                      : URL.createObjectURL(watch("menu_image")?.[0])
                  }
                  alt="menu image"
                />
              </div>
            )}
          </div>
        </section>
      </form>
    </Transition>
  );
}
