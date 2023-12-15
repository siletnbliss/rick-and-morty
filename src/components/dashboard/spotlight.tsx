import {
  HeartPulseIcon,
  HelpCircleIcon,
  RefreshCwIcon,
  SkullIcon,
} from "lucide-react";
import { CardDescription } from "../ui/card";

interface Props {
  character: Pick<Character, "name" | "status" | "image" | "species">;
}

import { Character } from "@/types/character";
import Image from "next/image";
import { DashboardCard } from "./card";

export function DashboardSpotlight({ character }: Props) {
  const Icon =
    character.status === "Alive"
      ? HeartPulseIcon
      : character.status === "Dead"
      ? SkullIcon
      : HelpCircleIcon;
  return (
    <DashboardCard
      animation="top"
      title={{ text: "Character Spotlight", right: <RefreshCwIcon /> }}
      description={{ text: character.name }}
    >
      <div className="flex flex-col items-center justify-between">
        <CardDescription className=" flex mb-3  justify-between w-full text-md">
          {" "}
          <span className="flex items-center gap-1 ">
            <Icon size={18} />
            {character.status}
          </span>
          <span>{character.species}</span>
        </CardDescription>
        <Image
          width={150}
          height={150}
          src={character.image}
          alt={"logo-" + character.name}
          style={{ borderRadius: "50%" }}
          placeholder="empty"
          className=" object-ccover"
        />
      </div>
    </DashboardCard>
  );
}
