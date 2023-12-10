"use client";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

import { iconClass, largeIconClass, activeIconClass } from "@/lib/styles";
import Link from "next/link";

export default function Menu() {
  const pathname = usePathname();
  const icons = [
    { Icon: FormatListBulletedRoundedIcon, href: "/" },
    { Icon: SearchRoundedIcon, href: "/search" },
    { Icon: NotificationsNoneRoundedIcon, href: "/notifications" },
    { Icon: SettingsOutlinedIcon, href: "/settings" },
  ];

  return (
    <div className="flex justify-between p-10 pt-4 border-top bg-secondary">
      {icons.map(({ Icon, href }, i) => (
        <Link
          href={href}
          key={i}
          className={cn(
            iconClass,
            largeIconClass,
            pathname === href && activeIconClass
          )}
        >
          <Icon />
        </Link>
      ))}
    </div>
  );
}
