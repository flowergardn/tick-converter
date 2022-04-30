import Head from "next/head";
import Footer from "./Components/Footer";
import { useRef, useState } from "react";

export default function Home() {
  const durationRef = useRef();
  const durationTypeRef = useRef();

  const [ticks, setTicks] = useState(0);
  const [convertInfo, setConvertInfo] = useState({});
  const [error, setError] = useState("");

  async function convert() {
    if (durationRef?.current && durationTypeRef?.current) {
      const { value: durationValue } = durationRef?.current;
      const { value: durationType } = durationTypeRef?.current;
      if (durationType && durationValue) {
        console.log(durationType, durationValue);
        const res = await fetch(
          `http://localhost:3000/api/convert?duration=${durationValue}&type=${durationType}`
        );
        const json = await res.json();
        if (json.error) setError(json.error);
        setTicks(json.ticks);
        setConvertInfo({
          duration: durationValue,
          type: durationType,
        });
      }
    }
  }

  function Page(props) {
    return (
      <>
        <div className={"flex align-center justify-center mt-[5rem]"}>
          <div className={"flex flex-col items-center"}>{props.children}</div>
        </div>
      </>
    );
  }

  function Retry() {
    return (
      <button
        className="text-sm font-bold tracking-wide bg-indigo-500 text-gray-100 p-3 rounded-lg focus:outline-none focus:shadow-outline hover:bg-indigo-700 mt-5"
        type="button"
        onClick={() => {
          setTicks(0);
          setConvertInfo({});
        }}
      >
        Again?
      </button>
    );
  }

  function main() {
    return (
      <Page>
        <form>
          <div className={"flex"}>
            <div className={""}>
              <span className="uppercase text-sm text-gray-300 font-bold">
                Duration
              </span>
              <input
                className="w-9/12 bg-gray-200 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-indigo-400"
                type="text"
                ref={durationRef}
                placeholder="The time to convert"
                required
              />
            </div>
            <div className={""}>
              <span className="uppercase text-sm text-gray-300 font-bold">
                Duration type
              </span>
              <input
                className="w-full bg-gray-200 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-indigo-400"
                type="text"
                ref={durationTypeRef}
                placeholder="Seconds, minutes, hours..."
                required
              />
            </div>
            <div className="ml-7 mt-7">
              <button
                className="uppercase text-sm font-bold tracking-wide bg-indigo-500 text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:shadow-outline hover:bg-indigo-700"
                type="button"
                onClick={convert}
              >
                Convert
              </button>
            </div>
          </div>
        </form>
      </Page>
    );
  }

  function showTicks() {
    const { duration, type } = convertInfo;

    return (
      <Page>
        <h1 className={"text-3xl text-white"}>
          {duration} {type} is {ticks} ticks
        </h1>
        <Retry />
      </Page>
    );
  }

  function show() {
    if (error) {
      return (
        <Page>
          <h1 className={"text-3xl text-white"}>There was an error</h1>
          <h1 className={"text-1xl text-white mt-5"}>{error}</h1>
          <Retry />
        </Page>
      );
    } else return ticks ? showTicks() : main();
  }

  return (
    <>
      <Head>
        <meta property="og:url" content="tick-converter.vercel.app" />
        <meta property="og:type" content="website" />
        <meta property="theme-color" content="#1F2937" />
        <meta property="og:title" content={"Minecraft tick converter"} />
        <meta
          name="og:description"
          content="A web app to easily convert durations into Minecraft time"
        />
        <title>Minecraft tick converter</title>
      </Head>
      {show()}
      <Footer />
    </>
  );
}
