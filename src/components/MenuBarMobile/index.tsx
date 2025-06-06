import Image from "next/image";
import Link from "next/link";

import { Icons } from "../Icons";

import { MenuBarMobileProps } from "./types";

export default function MenuBarMobile({
  setter,
  className,
}: Readonly<MenuBarMobileProps>) {
  return (
    <div className={className}>
      <nav className="fixed bottom-20 left-0 right-0 top-0 z-20 flex h-[60px] bg-primary-100 dark:bg-gray-800 px-2 md:hidden [&>*]:my-auto">
        <button
          className="flex text-4xl text-white"
          onClick={() => {
            setter((oldVal) => !oldVal);
          }}
        >
          <Icons size={40} name="MdOutlineMenu" />
        </button>
        <Link href="/" className="mx-auto">
          <Image
            src="/logo/logo2.png"
            alt="logo_juvale"
            width={30}
            height={30}
            className="rounded-full"
          />
        </Link>
      </nav>
    </div>
  );
}
