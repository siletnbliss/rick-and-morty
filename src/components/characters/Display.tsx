import { Character } from "@/types/character";
import Image from "next/image";

export const CharacterDisplay = ({
  character,
}: {
  character: Pick<Character, "name" | "type" | "image">;
}) => {
  return (
    <div className="flex space-x-2 items-center">
      <Image
        height={45}
        width={45}
        src={character.image}
        alt={"logo-" + character.name}
        style={{ borderRadius: "50%" }}
        className=" object-cover"
      />
      <span>
        {character.name} <br />
        <span className="text-xs text-gray-400">{character.type}</span>
      </span>
    </div>
  );
};
