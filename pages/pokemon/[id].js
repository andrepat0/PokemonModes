import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ArrowLeft from "../icons/arrowLeft";
import Link from "next/link";

export default function Details() {
  const router = useRouter();
  const { id } = router.query;
  const [pokemonDetail, setPokemonDetail] = useState(null);

  useEffect(() => {
    async function getPokemonDetails() {
      const res = await fetch(
        "https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/" +
          id +
          ".json"
      );
      setPokemonDetail(await res.json());
    }
    getPokemonDetails();
  }, []);

  if (!pokemonDetail) {
    return <p>...loading</p>;
  }

  return (
    <div className="flex container mx-5 my-5 ">
        <Link href="/" ><ArrowLeft className="h-4 w-4" /></Link>
      <img
        className="h-56 w-56 mr-5"
        src={
          "https://jherr-pokemon.s3.us-west-1.amazonaws.com/" +
          pokemonDetail.image
        }
        alt={pokemonDetail.name}
      />
      <div className="mx-5">
        <div className="mb-3">
          <p className="text-xl font-bold">{pokemonDetail.name}</p>
          <i>{pokemonDetail.type.join(",")}</i>
        </div>
        <table className="w-56">
          <thead>
            <th className="text-left" > Name</th>
            <th className="text-left" >Value</th>
          </thead>
          <tbody>
            {pokemonDetail.stats.map(({ name, value }) => (
              <tr key={name}>
                <td className="text-left" >{name}</td>
                <td className="text-left" >{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <div>{JSON.stringify(pokemonDetail)}</div> */}
    </div>
  );
}
