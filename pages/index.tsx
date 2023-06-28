import { Box, FilterTab, RecentOrderPaper } from "components/dashboard";
import type { NextPage } from "next";
import React from "react";
const Dashborad: NextPage = () => {
  return (
    <section className="flex">
      <section className="space-y-7 md:w-9/12  px-7 ">
        <section className="space-y-3">
          <h1 className="font-bold text-lg tracking-wider">Welcome, Porlar</h1>
          <FilterTab />
          <Box />
        </section>

        <div className="flex gap-2">
          <RecentOrderPaper />
        </div>
      </section>
      <section className="md:w-3/12 p-3 space-y-3">
        <div className="bg-red-500 p-10 rounded-md">
          <h1>Pizza Hut</h1>
          <h1>Discount 30%</h1>
        </div>
        <div className="bg-yellow-500 p-10 rounded-md">
          <h1>Cake</h1>
          <h1>Discount 30%</h1>
        </div>
      </section>
    </section>
  );
};

export default Dashborad;
