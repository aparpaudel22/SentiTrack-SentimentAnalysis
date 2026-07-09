import { FaFacebook, FaTiktok, FaYoutube, FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6";
const ICONS = {
  facebook: FaFacebook,
  instagram: FaInstagram,
  tiktok: FaTiktok,
  youtube: FaYoutube,
  linkedin: FaLinkedin,
  twitter: FaXTwitter,
};
export default function PlatformIcon({ platformKey, size = 22, color }) {
  const Icon = ICONS[platformKey];
  if (!Icon) return null;
  return <Icon size={size} color={color} />;
}