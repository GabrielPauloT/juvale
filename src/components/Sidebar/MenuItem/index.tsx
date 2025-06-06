import Link from "next/link";
import { usePathname } from "next/navigation";

import { Icons } from "@/components/Icons";

import { MenuProps } from "./types";

export function MenuItem({
  icon,
  title: name,
  path: route,
  setter,
}: MenuProps) {
  const pathname = usePathname();
  const colorClass =
    pathname === route
      ? "bg-white dark:bg-gray-600 text-primary-100 dark:text-white rounded-md"
      : "text-white hover:bg-white hover:dark:bg-gray-600 hover:text-primary-100 hover:dark:text-white rounded-md";

  return (
    <Link
      href={route}
      onClick={() => {
        setter((prevState: boolean) => !prevState);
      }}
      className={`text-md flex gap-1 border-b-white/10 py-3 pl-6 [&>*]:my-auto ${colorClass}`}
    >
      <div className="flex w-[30px] text-xl [&>*]:mx-auto">
        <Icons size={18} name={icon} />
      </div>
      <div>{name}</div>
    </Link>
  );
}
