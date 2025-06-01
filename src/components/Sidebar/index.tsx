"use client";
import Image from "next/image";
const logoPath = `/logo/logo2.png`;
import Link from "next/link";
import { useRouter } from "next/navigation";

import { SidebarMenu } from "./const";
import { MenuItem } from "./MenuItem";
import { SidebarProps } from "./types";
import Cookie from "js-cookie";
import { useEffect, useState } from "react";
import { getUserRoleFromToken } from "@/utils/role";
import { roleEnum } from "./MenuItem/types";

export function Sidebar({ show, setter }: SidebarProps) {
  const [role, setRole] = useState<roleEnum>(roleEnum.user);

  useEffect(() => {
    const r = getUserRoleFromToken();
    if (r && Object.values(roleEnum).includes(r as unknown as roleEnum)) {
      setRole(r as unknown as roleEnum);
    } else {
      setRole(roleEnum.user);
    }
  }, []);

  const filteredMenu = SidebarMenu.filter(
    (item) => !item.roles || item.roles.includes(role)
  );

  const oldVal = () => (oldVal: boolean) => !oldVal;
  const router = useRouter();

  function handleLogin() {
    Cookie.remove("auth_token");
    router.refresh();
  }

  const className =
    "relative min-h-screen min-w-fit bg-primary-100 dark:bg-gray-800 w-[250px] transition-[margin-left] ease-in-out duration-500 md:static top-0 bottom-0 left-0 z-40 px-5";
  const appendClass = show ? " ml-0" : " ml-[-250px] md:ml-0";

  const ModalOverlay = () => (
    <div
      className={`fixed bottom-0 left-0 right-0 top-0 z-30 flex bg-black/50 md:hidden`}
      onClick={() => {
        setter((oldVal: boolean) => !oldVal);
      }}
    />
  );

  return (
    <>
      <div className={`${className}${appendClass}`}>
        <div className="mt-9 flex p-2 justify-center">
          <Link href="/">
            <Image
              src={logoPath}
              alt="logo_juvale"
              width={60}
              height={60}
              className="rounded-full"
            />
          </Link>
        </div>
        <div className="mt-9 flex flex-col gap-2">
          {filteredMenu.map((item) => (
            <MenuItem
              key={item.id}
              setter={oldVal}
              title={item.title}
              path={item.path}
              icon={item.icon}
            />
          ))}
          <div onClick={() => handleLogin()}>
            <MenuItem setter={oldVal} title="Sair" path="/" icon="ImExit" />
          </div>
        </div>
      </div>
      {show ? <ModalOverlay /> : <></>}
    </>
  );
}
