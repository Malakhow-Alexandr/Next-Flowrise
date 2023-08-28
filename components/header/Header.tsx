import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";
import Link from "next/link";
import Bounded from "@/components/bounded/Bounded";
import Logo from "@/components/logo/Logo";

async function Header() {
  const client = createClient();

  const settings = await client.getSingle("settings");
  return (
    <Bounded as="header" className="py-4 md:py-6 lg:py-8">
      <div className="flex gap-4 items-center justify-between sm:flex-row flex-col">
      <Link href={"/"} className="p-3 hover:scale-125 transition-transform duration-200 ease-in-out"><Logo /></Link>
        <nav>
          <ul className="flex ">
            {settings.data.navigation.map(({ label, link }) => (
              <li key={label}>
                <PrismicNextLink field={link} className="p-3 font-semibold  text-lg leading-10 font-body text-slate-600  hover:text-blue-700 transition-all ">{label}</PrismicNextLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </Bounded>
  );
}
export default Header;
