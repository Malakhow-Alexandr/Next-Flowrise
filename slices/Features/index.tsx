import { Content } from "@prismicio/client";
import {
  JSXMapSerializer,
  PrismicRichText,
  SliceComponentProps,
} from "@prismicio/react";
import Bounded from "@/components/bounded/Bounded";
import Heading from "@/components/heading/Heading";
import {
  Calendar,
  Clover,
  HourGlass,
  Bargraph,
} from "@/components/featureIcons/FeatureIcons";

const components: JSXMapSerializer = {
  heading2: ({ children }) => (
    <Heading as="h2" size="md" className="text-center mb-12">
      {children}
    </Heading>
  ),
  heading3: ({ children }) => (
    <Heading
      as="h3"
      size="sm"
      className="text-center font-medium sm:text-left mb-3"
    >
      {children}
    </Heading>
  ),
  paragraph: ({ children }) => (
    <p className="mb-3 font-medium font-body text-slate-600 sm:text-left text-center">
      {children}
    </p>
  ),
};

const icons = {
  calendar: <Calendar />,
  clover: <Clover />,
  hourglass: <HourGlass />,
  bargraph: <Bargraph />,
};
/**
 * Props for `Features`.
 */
export type FeaturesProps = SliceComponentProps<Content.FeaturesSlice>;

/**
 * Component for "Features" Slices.
 */
const Features = ({ slice }: FeaturesProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <PrismicRichText components={components} field={slice.primary.heading} />

      <ul className="grid sm:grid-cols-2 lg:grid-cols-4 max-w-5x1 gap-x-8 gap-12 mx-auto sm:place-items-star place-items-center">
        {slice.items.map((item, index) => (
          <li
            key={index}
            className="max-w-xs grid sm:place-items-start place-items-center"
          >
            {item.icon && <div className="mb-5">{icons[item.icon]}</div>}

            <PrismicRichText components={components} field={item.title} />
            <PrismicRichText components={components} field={item.description} />
          </li>
        ))}
      </ul>
    </Bounded>
  );
};

export default Features;
