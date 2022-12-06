import { useRouter } from "next/router";
import cloudinary from "utils/cloudinary";
import Link from "@/components/Link";
import Image from "next/future/image";
import getBase64ImageUrl from "utils/generateBlurPlaceholder";
import Masonry from "react-masonry-css";
import {
  Dialog,
  DialogTrigger,
  DialogOverlay,
  DialogContent,
  DialogPortal,
} from "@radix-ui/react-dialog";

const Gallery = ({ images }) => {
  const router = useRouter();
  const { photoId } = router.query;

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <main>
      <div className="">
        <Dialog>
          <DialogTrigger>Click me</DialogTrigger>
          <DialogPortal>
            <DialogOverlay className="fixed inset-0 bg-black/75 backdrop-blur-md rdx-state-open:overlay-fade-in rdx-state-closed:overlay-fade-out" />
            <DialogContent
              className="fixed inset-0 mx-auto my-auto rounded shadow outline-none h-fit w-fit rdx-state-open:dialog-item-open rdx-state-closed:dialog-item-close"
              onCloseAutoFocus={(e) => e.preventDefault()}
            >
              content
            </DialogContent>
          </DialogPortal>
        </Dialog>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {images.map(
            ({ id, public_id, format, width, height, blurDataUrl }) => (
              <Link
                key={id}
                href="/gallery/[id]"
                as={`/gallery/${id}`}
                shallow
                className="overflow-hidden transition-all duration-500 border rounded-lg shadow betterhover:hover:shadow-xl betterhover:hover:shadow-yolk/50 betterhover:hover:border-yolk border-stone"
              >
                <Image
                  alt=""
                  placeholder="blur"
                  blurDataURL={blurDataUrl}
                  src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_720/${public_id}.${format}`}
                  width={width}
                  height={height}
                />
              </Link>
            )
          )}
        </Masonry>
      </div>
    </main>
  );
};

export async function getStaticProps() {
  const results = await cloudinary.v2.search
    .expression(`folder:typicalmitul/*`)
    .sort_by("public_id", "desc")
    .max_results(400)
    .execute();
  let reducedResults = [];

  let i = 0;
  for (let result of results.resources) {
    reducedResults.push({
      id: i,
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

export default Gallery;
