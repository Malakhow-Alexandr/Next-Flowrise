import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import {
  JSXMapSerializer,
  PrismicRichText,
  SliceComponentProps,
} from "@prismicio/react";
import Bounded from "@/components/bounded/Bounded";
import Heading from "@/components/heading/Heading";
import { createClient } from "@/prismicio";

const components: JSXMapSerializer = {
  heading2: ({ children }) => (
    <Heading as="h2" size="md" className="text-center mb-9 font-semibold">
      {children}
    </Heading>
  ),
  paragraph: ({ children }) => (
    <p className="text-xl md:text-2xl font-normal font-body text-slate-600 mb-8">
      {children}
    </p>
  ),
};

/**
 * Props for `Testemonials`.
 */

export type TestemonialsProps = SliceComponentProps<Content.TestemonialsSlice>;

/**
 * Component for "Testemonials" Slices.
 */
const Testemonials = async ({
  slice,
}: TestemonialsProps): Promise<JSX.Element> => {
  const client = createClient();

  const testemonials = await Promise.all(
    slice.items.map((item) => {
      if (
        isFilled.contentRelationship(item.testimonials) &&
        item.testimonials.uid
      ) {
        return client.getByUID("testemonial", item.testimonials.uid);
      }
    })
  );
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <PrismicRichText components={components} field={slice.primary.heading} />
      <ul className="grid lg:grid-cols-3 grid-cols-1 gap-8">
        {testemonials.map(
          (item, index) =>
            item && (
              <li className="border bg-white shadow-lg rounded-lg px-8 md:px-14 py-10 md:py-16 grid content-between " key={index}>
                <PrismicRichText
                  components={components}
                  field={item.data.quote}
                />
                <div className="flex items-center">
                  <PrismicNextImage
                    className="rounded-full mr-4 aspect-square"
                    width={56}
                    height={56}
                    field={item.data.avatar}
                    imgixParams={{ ar: "1:1", fit: "crop" }}
                  />
                  <div>
                    <p className="text-base font-medium text-slate-700 text-body">{item.data.name}</p>
                    <p className="text-base  text-slate-600 text-body">{item.data.job_title}</p>
                  </div>
                </div>
              </li>
            )
        )}
      </ul>
    </Bounded>
  );
};

export default Testemonials;
