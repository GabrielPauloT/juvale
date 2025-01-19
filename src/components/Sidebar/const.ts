import { MenuProps } from "./MenuItem/types";

export const SidebarMenu: MenuProps[] = [
  {
    id: 1,
    setter: () => {},
    title: "Dashboard",
    icon: "BsGraphUpArrow",
    path: "/dashboard",
    roles: ["user"],
  },
  {
    id: 2,
    setter: () => {},
    title: "VR",
    icon: "MdOutlineFoodBank",
    path: "/vr",
    roles: ["user"],
  },
  {
    id: 3,
    setter: () => {},
    title: "VT",
    icon: "BsTruck",
    path: "/vt",
    roles: ["user"],
  },
  {
    id: 4,
    setter: () => {},
    title: "Funcionários",
    icon: "BsFilePerson",
    path: "/funcionario",
    roles: ["admin"],
  },
  {
    id: 5,
    setter: () => {},
    title: "Usuários",
    icon: "BsPerson",
    path: "/usuario",
    roles: ["admin"],
  },
  {
    id: 6,
    setter: () => {},
    title: "Relatório",
    icon: "MdReport",
    path: "/relatorio",
    roles: ["user"],
  },
];
