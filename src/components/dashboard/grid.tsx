"use client";
import React from "react";
import { DashboardCard } from "./card";
import { FilmIcon, RocketIcon } from "lucide-react";
import { motion } from "framer-motion";
import { DashboardSpotlight } from "./spotlight";
import { Character } from "@/types/character";
import { Stats } from "./stats";
import { DashboardViews } from "./views";
/* 
const menuItems: MenuItem[] = [
  { title: "Dashboard", link: "/auth", Icon: HomeIcon },
  { title: "Characters", link: "/auth/characters", Icon: RocketIcon },
  { title: "Episodes", link: "/auth/episodes", Icon: FilmIcon },
]; */

const DEFAULT_CHARACTER: Character = {
  id: "1",
  name: "Rick Sanchez",
  status: "Alive",
  species: "Human",
  image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  gender: "Male",
  created: "",
};

export default function DashboardGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 grid-rows-3 md:grid-rows-4 md:grid-cols-4 gap-6 md:gap-4  ">
      <div className="col-span-1 md:col-span-2">
        <DashboardCard
          Icon={RocketIcon}
          title="Characters"
          description="Created"
          count={826}
          link="/auth/characters"
        />
      </div>
      <div className=" col-span-1 md:col-span-2 row-span-2 ">
        <DashboardSpotlight character={DEFAULT_CHARACTER} />
      </div>
      <div className="col-span-1 md:col-span-2">
        <DashboardCard
          Icon={FilmIcon}
          title="Episodes"
          description="Aired"
          count={51}
          link="/auth/episodes"
        />
      </div>
      <div className=" md:col-span-4  row-span-2 ">
        <DashboardViews values={[10, 21, 30, 50, 6]} />
      </div>
    </div>
  );
}
