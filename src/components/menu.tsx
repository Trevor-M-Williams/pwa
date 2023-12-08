"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";

import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

import { iconClass, largeIconClass, activeIconClass } from "@/lib/styles";

type ActiveIcon = "list" | "search" | "notifications" | "settings";

export default function Menu() {
  const [activeIcon, setActiveIcon] = useState<ActiveIcon>("list");

  return (
    <div className="flex justify-between p-10 pt-4 border-top bg-secondary">
      <FormatListBulletedRoundedIcon
        className={cn(
          iconClass,
          largeIconClass,
          activeIcon === "list" && activeIconClass
        )}
        onClick={() => setActiveIcon("list")}
      />
      <SearchRoundedIcon
        className={cn(
          iconClass,
          largeIconClass,
          activeIcon === "search" && activeIconClass
        )}
        onClick={() => setActiveIcon("search")}
      />
      <NotificationsNoneRoundedIcon
        className={cn(
          iconClass,
          largeIconClass,
          activeIcon === "notifications" && activeIconClass
        )}
        onClick={() => setActiveIcon("notifications")}
      />
      <SettingsOutlinedIcon
        className={cn(
          iconClass,
          largeIconClass,
          activeIcon === "settings" && activeIconClass
        )}
        onClick={() => setActiveIcon("settings")}
      />
    </div>
  );
}
