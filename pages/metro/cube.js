import cloudinary from "@/utils/cloudinary";
import getBase64ImageUrl from "@/utils/generateBlurPlaceholder";
import { cva, cx } from "class-variance-authority";
import { ScrollSync, ScrollSyncPane } from "react-scroll-sync";
import Image from "next/image";
import { Rows, SquaresFour } from "phosphor-react";
import React from "react";

const face = cva([], {
  variants: {
    face: {
      main: "rotateY(0deg) translateZ(-50vh)",
      top: "rotateX(-90deg) translateZ(-50vh)",
      bottom: "rotateX(90deg) translateZ(-50vh)",
    },
  },
});

const Face = ({ id, className, children }) => {
  return (
    <div
      className={cx(
        "absolute w-screen h-screen overflow-hidden border-2 border-metro"
      )}
      style={{
        transform: face({ face: id }),
      }}
    >
      <ScrollSyncPane>
        <div
          id={id}
          className={cx(
            "h-screen overflow-auto pb-[20vh]",
            className,
            id === "top" ? "pt-[100vh] no-scrollbar" : ""
          )}
        >
          {children}
        </div>
      </ScrollSyncPane>
    </div>
  );
};

const LAYOUTS = {
  LIST: "LIST",
  GRID: "GRID",
};

const Page = ({ images }) => {
  const [layout, setLayout] = React.useState(LAYOUTS.LIST);

  const Content = () => {
    return (
      <>
        <div
          className="fixed inset-0 pointer-events-none -z-1 isolate opacity-30"
          style={{
            background: "url(/images/noise.svg)",
          }}
        />
        <div className="flex flex-col items-center max-w-screen-xl mx-auto text-metro">
          <div className="relative flex flex-col w-full mt-12 bg-white border-2 border-metro">
            <div className="flex items-end w-full px-12 py-12 gap-x-8">
              <h1 className="font-bold tracking-tight text-9xl whitespace-nowrap ">
                Montreal <br />
                in Motion
              </h1>
              <p
                className="block max-w-prose mb-2.5 text-xl md:text-2xl text-metro"
                style={{
                  textWrap: "balance",
                }}
              >
                A documentation of the Montreal metro system. All photos were
                captured between December 2021 and January 2022, while the city
                was under lockdown and curfew.
              </p>
            </div>
            <div className="w-full px-12 py-2 text-white bg-metro">
              <div className="">Learn More</div>
            </div>
          </div>
          <div className="w-full px-12 py-12 mt-4 bg-white border-2 border-metro">
            <div className="grid grid-cols-2 gap-y-12">
              <h2 className="text-2xl font-semibold">About the photographer</h2>
              <p className="max-w-prose">
                Lorem quis exercitation Lorem aliquip consequat aute excepteur
                occaecat ut sit nulla velit. Ad dolore nostrud non elit. Velit
                anim anim aute dolor aliquip ex magna nostrud reprehenderit nisi
                dolor culpa.
              </p>
            </div>
          </div>

          <div className="flex justify-between w-full px-4 py-2 mt-6 mb-2 font-semibold uppercase bg-white border-2 border-metro">
            <span>Layout</span>
            <div className="flex gap-x-2">
              <button
                className="flex items-center uppercase gap-x-1"
                onClick={() => {
                  setLayout(LAYOUTS.LIST);
                }}
              >
                <Rows />
                List
              </button>
              <button
                className="flex items-center uppercase gap-x-1"
                onClick={() => {
                  setLayout(LAYOUTS.GRID);
                }}
              >
                <SquaresFour />
                Grid
              </button>
            </div>
          </div>

          <div
            className={cx(
              "gap-12 mx-auto bg-white p-12 border-2 border-metro",
              layout === LAYOUTS.LIST ? "flex flex-col" : "grid grid-cols-3"
            )}
          >
            {images.map(
              ({
                id,
                public_id,
                format,
                width,
                height,
                filename,
                blurDataUrl,
              }) => {
                return (
                  <div
                    key={id}
                    className="relative flex flex-col w-full h-full mx-auto overflow-hidden border-2 cursor-pointer border-metro group"
                  >
                    <Image
                      src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_2040/${public_id}.${format}`}
                      alt=""
                      blurDataURL={blurDataUrl}
                      placeholder="blur"
                      className=""
                      width={width}
                      height={height}
                      draggable={false}
                      quality={100}
                    />
                  </div>
                );
              }
            )}
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <ScrollSync>
        <>
          <div
            className="fixed inset-0 z-10 w-full h-full border-[3px] pointer-events-none border-metro"
            style={{
              boxShadow: "0 0 0 4px #000",
            }}
          ></div>
          {/* <div
            className="fixed inset-0 -z-1 isolate opacity-30"
            style={{
              background: "url(/images/noise.svg)",
            }}
          ></div> */}
          <div
            className="fixed w-screen h-screen"
            style={{
              perspective: "3000px",
            }}
          >
            <div
              className="fixed w-full h-full"
              style={{
                transformStyle: "preserve-3d",
                transform: "translateZ(-300px)",
              }}
            >
              <Face id="main">
                <Content />
              </Face>
              <Face id="top">
                <Content />
              </Face>
              <Face id="bottom">
                <div className="mt-[-100vh] pb-[100vh]">
                  <Content />
                </div>
              </Face>
              <div
                className={cx("absolute w-screen h-screen overflow-hidden")}
                style={{
                  transform: "rotateY(-90deg) translateZ(-50vw)",
                }}
              >
                <div
                  className="fixed inset-0 -z-1 isolate opacity-30"
                  style={{
                    background: "url(/images/noise.svg)",
                  }}
                ></div>
              </div>
              <div
                className={cx("absolute w-screen h-screen overflow-hidden")}
                style={{
                  transform: "rotateY(-90deg) translateZ(50vw)",
                }}
              >
                <div
                  className="fixed inset-0 -z-1 isolate opacity-30"
                  style={{
                    background: "url(/images/noise.svg)",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </>
      </ScrollSync>
    </>
  );
};

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;

export async function getStaticProps() {
  const results = await cloudinary.v2.search
    .expression(`folder:metro/*`)
    .sort_by("public_id", "desc")
    .max_results(400)
    .execute();
  let reducedResults = [];

  let i = 0;
  for (let result of results.resources) {
    reducedResults.push({
      id: i,
      filename: result.filename,
      height: result.height,
      width: result.width,
      public_id: result.public_id,
      format: result.format,
    });
    i++;
  }

  const blurImagePromises = results.resources.map((image) => {
    return getBase64ImageUrl(image);
  });
  const imagesWithBlurDataUrls = await Promise.all(blurImagePromises);

  for (let i = 0; i < reducedResults.length; i++) {
    reducedResults[i].blurDataUrl = imagesWithBlurDataUrls[i];
  }

  return {
    props: {
      images: reducedResults,
    },
  };
}
