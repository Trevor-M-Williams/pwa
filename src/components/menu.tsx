import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

export default function Menu() {
  return (
    <div className="flex justify-between p-8 pt-4  border-top bg-secondary">
      <FormatListBulletedRoundedIcon className="text-gray-700" />
      <SearchRoundedIcon className="text-gray-400" />
      <NotificationsNoneRoundedIcon className="text-gray-400" />
      <SettingsOutlinedIcon className="text-gray-400" />
    </div>
  );
}
