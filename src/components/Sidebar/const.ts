import { MenuProps, roleEnum } from "./MenuItem/types";

export const SidebarMenu: MenuProps[] = [
  {
    id: 1,
    setter: () => {},
    title: "Dashboard",
    icon: "BsGraphUpArrow",
    path: "/dashboard",
    roles: [roleEnum.user, roleEnum.admin],
  },
  {
    id: 4,
    setter: () => {},
    title: "Funcionários",
    icon: "BsFilePerson",
    path: "/funcionario",
    roles: [roleEnum.user, roleEnum.admin],
  },
  {
    id: 5,
    setter: () => {},
    title: "Usuários",
    icon: "BsPerson",
    path: "/usuario",
    roles: [roleEnum.admin],
  },
  {
    id: 6,
    setter: () => {},
    title: "Companias",
    icon: "HiBuildingOffice",
    path: "/compania",
    roles: [roleEnum.user, roleEnum.admin],
  },
  {
    id: 7,
    setter: () => {},
    title: "Relatório",
    icon: "MdReport",
    path: "/relatorio",
    roles: [roleEnum.user, roleEnum.admin],
  },
];
