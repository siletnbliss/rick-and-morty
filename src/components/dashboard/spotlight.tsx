import {
  ChevronRightIcon,
  HeartPulseIcon,
  HelpCircleIcon,
  LucideIcon,
  MailIcon,
  RefreshCwIcon,
  SkullIcon,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { Counter } from "./counter";
import { motion } from "framer-motion";

interface Props {
  character: Pick<Character, "name" | "status" | "image" | "species">;
}

import { Character } from "@/types/character";
import Image from "next/image";

export function DashboardSpotlight({ character }: Props) {
  const Icon =
    character.status === "Alive"
      ? HeartPulseIcon
      : character.status === "Dead"
      ? SkullIcon
      : HelpCircleIcon;
  return (
    <motion.aside
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "100%", opacity: 1 }}
    >
      <Card className="p-10 flex flex-col h-full py-15 justify-between ">
        <div>
          <CardTitle className="flex justify-between items-center">
            <span>Character Spotlight</span> <RefreshCwIcon />
          </CardTitle>

          <CardDescription className="text-xl mb-3">
            {character.name}
          </CardDescription>
          <CardDescription className=" flex justify-between text-lg">
            {" "}
            <span className="flex items-center gap-1 ">
              <Icon size={20} />
              {character.status}
            </span>
            <span>{character.species}</span>
          </CardDescription>
        </div>
        <CardContent className="flex p-0   items-end  justify-center">
          <Image
            width={150}
            height={150}
            src={character.image}
            alt={"logo-" + character.name}
            style={{ borderRadius: "50%" }}
            placeholder='empty'
            className=" object-ccover"
          />
        </CardContent>
      </Card>
    </motion.aside>
  );
}
