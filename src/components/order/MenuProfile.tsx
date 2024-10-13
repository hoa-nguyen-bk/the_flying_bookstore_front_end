"use client";
import {
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
} from "@mui/material";
import Image from "next/image";
import AvaImg from "@/assets/images/no avatar.jpeg";
import { CiUser, CiBag1, CiViewList, CiCirclePlus } from "react-icons/ci";
import { PiBriefcaseLight } from "react-icons/pi";
import Link from "next/link";
import { useAuthStore } from "../../hooks/user";
import { OrderType } from "../../types/order";
import { useRouter } from "next/navigation";
import { useStoreStep } from "../../hooks/step";
import Order from "../checkout/Order";
const sizeIcon = 22;
type IMenuItem = {
  href: string,
  icon: React.ReactNode,
  text: string,
  orderType?: OrderType
}
const menuItems: IMenuItem[] = [
  {
    href: '/profile',
    icon: <CiUser size={sizeIcon} />,
    text: 'Cài đặt tài khoản',
  },
  {
    href: '/my-order/0',
    icon: <CiBag1 size={sizeIcon} />,
    text: 'Đơn ' + OrderType.Leasee,
    orderType: OrderType.Leasee
  },
  {
    href: '/customer-order',
    icon: <PiBriefcaseLight size={sizeIcon} />,
    text: 'Đơn ' + OrderType.Leasor,
    orderType: OrderType.Leasor
  },
  {
    href: '/buy-order',
    icon: <CiBag1 size={sizeIcon} />,
    text: 'Đơn ' + OrderType.Buy,
    orderType: OrderType.Buy
  },
  {
    href: '/sell-order',
    icon: <PiBriefcaseLight size={sizeIcon} />,
    text: 'Đơn ' + OrderType.Sell,
    orderType: OrderType.Sell
  },
  {
    href: '/manager-post',
    icon: <CiViewList size={sizeIcon} />,
    text: 'Quản lý bài đăng',
  },
  {
    href: '/manager-post/add-post',
    icon: <CiCirclePlus size={sizeIcon} />,
    text: 'Thêm bài đăng',
  },
];
const MenuProfile = () => {
  const { profile } = useAuthStore();
  const { push } = useRouter();
  const { changeTabNum } = useStoreStep()
  const handleRedirect = (item: IMenuItem) => {
    if (item.orderType == OrderType.Leasee || item.orderType == OrderType.Leasor) {
      changeTabNum(0);
    } else if (item.orderType == OrderType.Buy || item.orderType == OrderType.Sell) {
      changeTabNum(1);
    }
    push(item.href);
  }
  const renderMenuItems = () => {
    return menuItems.map((item, index) => (
      <MenuItem sx={{ py: 1.5, px: 2 }} key={index} onClick={() => handleRedirect(item)}>
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText>{item.text}</ListItemText>
      </MenuItem>
    ));
  };
  return (
    <MenuList>
      <MenuItem sx={{ py: 1.5, px: 2 }}>
        <ListItemIcon>
          <div className="relative w-14 h-14">
            <Image
              src={profile?.avatarUrl ? profile?.avatarUrl : AvaImg}
              alt="ava"
              sizes="14"
              fill
              className="object-cover rounded-full"
            />
          </div>
        </ListItemIcon>
        <ListItemText sx={{ ml: 2 }}>Chào {profile?.firstName ? profile?.firstName : profile?.username}</ListItemText>
      </MenuItem>
      <Divider />
      {renderMenuItems()}
    </MenuList>
  );
};

export default MenuProfile;
