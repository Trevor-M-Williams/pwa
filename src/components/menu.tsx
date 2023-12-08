import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

export default function Menu() {
  return (
    <div className="flex justify-between px-8 py-4 border-top bg-secondary">
      <FormatListBulletedRoundedIcon
        fontSize="large"
        className="text-gray-700"
      />
      <SearchRoundedIcon fontSize="large" className="text-gray-400" />
      <NotificationsNoneRoundedIcon
        fontSize="large"
        className="text-gray-400"
      />
      <SettingsOutlinedIcon fontSize="large" className="text-gray-400" />
    </div>
  );
}
