"use client";

import dynamic from "next/dynamic";
import Invoice from "../components/ui/Invoice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Text, View } from "@react-pdf/renderer";
import Link from "next/link";

type TruckObj = {
  id: string;
  sellingPrice: number;
  itemBrand: string;
  itemAge: number;
  listingDescription: string;
  listingTitle: string;
};

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

function extractUUID(url: string): string | null {
  const uuidRegex =
    /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/;
  const match = url.match(uuidRegex);
  return match ? match[0] : null;
}

function validUrl(url: string): boolean {
  const uuidRegex =
    /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/;
  const match = url.match(uuidRegex);
  return match !== null;
}

async function getData(url: string) {
  try {
    const uuid = extractUUID(url);
    const res = await fetch("https://garage-backend.onrender.com/getListing", {
      method: "POST",
      body: JSON.stringify({ id: uuid }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    const details = res.result.listing;
    return {
      id: details.id,
      sellingPrice: details.sellingPrice,
      itemBrand: details.itemBrand,
      itemAge: details.itemAge,
      listingDescription: details.listingDescription,
      listingTitle: details.listingTitle,
    };
  } catch (error) {
    console.error(error);
  }
}

const generatePdf = async (url: string) => {
  return await getData(url);
};

export default function Home() {
  const [url, setUrl] = useState<string>("");
  const [obj, setObj] = useState<TruckObj>();
  return (
    <main className="flex flex-col items-center justify-between p-5">
      <div className="flex w-full max-w-sm items-center space-x-2 m-5">
        <Input
          type="email"
          placeholder="Item URL"
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button
          type="submit"
          onClick={async () => {
            const item = await generatePdf(url);
            setObj(item);
          }}
        >
          Generate
        </Button>
      </div>
      {!validUrl(url) && url !== "" ? (
        <Text
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "bold",
            color: "red",
          }}
        >
          The URL you inputted is invalid!
        </Text>
      ) : obj ? (
        <PDFViewer width="1000" height="800">
          <Invoice item={obj} />
        </PDFViewer>
      ) : (
        <View>
          <Text
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "bold",
              color: "#bf3d11",
            }}
          >
            {
              "Input a URL to see the PDF!\n You can browse the listings by navigating to "
            }
          </Text>
          <Link
            href="https://www.withgarage.com"
            className="underline text-blue-700 visited:text-purple-700"
          >
            the listings page
          </Link>
        </View>
      )}
    </main>
  );
}
