"use client";
import React from "react";
import { CardCounter } from "./card";
import { FilmIcon, RocketIcon } from "lucide-react";
import { DashboardSpotlight } from "./spotlight";
import { Character } from "@/types/character";
import { DashboardViews } from "./views";

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
        <CardCounter
          title={{ text: "Characters" }}
          description={{ text: "Created", Icon: RocketIcon }}
          count={826}
          link="/auth/characters"
        />
      </div>
      <div className=" col-span-1 md:col-span-2 row-span-2 ">
        <DashboardSpotlight character={DEFAULT_CHARACTER} />
      </div>
      <div className="col-span-1 md:col-span-2">
        <CardCounter
          title={{ text: "Episodes" }}
          description={{ text: "Aired", Icon: FilmIcon }}
          count={51}
          link="/auth/episodes"
        />
      </div>
      <div className=" md:col-span-4  row-span-2 ">
        <DashboardViews values={[21, 10, 30, 28, 50, 60, 42]} />
      </div>
    </div>
  );
}
