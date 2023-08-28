import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";
import Link from "next/link";
import Logo from "@/components/logo/Logo";
import Bounded from "@/components/bounded/Bounded";

async function Footer() {
  const client = createClient();

  const settings = await client.getSingle("settings");
  return (
    <Bounded as="footer">
      <div className="flex sm:flex-row flex-col justify-between items-center ga-6">
      <Link href={"/"} className="p-3 hover:scale-125 transition-transform duration-200 ease-in-out"><Logo /></Link>
      <p className="font-semibold text-lg leading-10 font-body text-slate-600 ">
        ©{new Date().getFullYear()} {settings.data.site_title}
      </p>
      <ul className="flex ">
        {settings.data.navigation.map(({ label, link }) => (
          <li key={label}>
            <PrismicNextLink field={link} className="p-3 font-semibold  text-lg leading-10 font-body text-slate-600  hover:text-blue-700 transition-all ">{label}</PrismicNextLink>
          </li>
        ))}
      </ul>
      </div>
    </Bounded>
  );
}

export default Footer;
