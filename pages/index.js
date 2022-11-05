import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    getPokemonList();
  }, []);

  async function getPokemonList() {
    const pokemonList = await fetch(
      "https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json"
    );
    setPokemonList(await pokemonList.json());
  }

  if(pokemonList.length == 0){
    return <p>...loading</p>
  }

  return (
    <div>
      <Head>
        <title>Pokemon List</title>
      </Head>
      <div className="container my-5 mx-5">
        <h1 className="text-2xl mb-5 font-medium">Pokemon List</h1>
        <div className="grid-cols-3 grid  gap-10 ">
          {pokemonList.map((pokemon, index) => (
            <div className="flex mx-5 my-3 justify-center " key={index}>
              <Link href={'/pokemon/'+pokemon.id}>
                  <img
                    src={
                      "https://jherr-pokemon.s3.us-west-1.amazonaws.com/" +
                      pokemon.image
                    }
                    alt={pokemon.name}
                    className="w-36 h-36"
                  />
                  <p className=" text-center">{pokemon.name}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
