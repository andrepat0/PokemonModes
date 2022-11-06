import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ArrowLeft from "../icons/arrowLeft";
import Link from "next/link";
import Head from "next/head";

export async function getStaticPaths() {
  const resp = await fetch(
    "https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json"
  );
  const pokemon = await resp.json();

  return {
    paths: pokemon.map((pokemon) => ({
      params: { id: pokemon.id.toString() },
    })),
    fallback: false,
  };
}

/*
 SSG Static Site Generation: pre-render this page at build time using the props returned by getStaticProps.
 ISG: SSG page with a re-build value 

*/
export async function getStaticProps({ params }) {
  const resp = await fetch(
    `https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${params.id}.json`
  );

  return {
    props: {
      pokemonDetail: await resp.json(),
    },
     // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 30 seconds
    revalidate: 30,
  };
}

export default function Details({ pokemonDetail }) {
  return (
    <div>
      <Head>
        <title>{pokemonDetail.name}</title>
      </Head>
      <div className="flex container mx-5 my-5 ">
        <Link href="/">
          <ArrowLeft className="h-4 w-4" />
        </Link>
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
              <th className="text-left"> Name</th>
              <th className="text-left">Value</th>
            </thead>
            <tbody>
              {pokemonDetail.stats.map(({ name, value }) => (
                <tr key={name}>
                  <td className="text-left">{name}</td>
                  <td className="text-left">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
