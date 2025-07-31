import { useSearchParams } from "react-router-dom";

export default function useUrlPosition() {
  const [searchParams] = useSearchParams(); // 🔧 Removed unused setSearchParams

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return [lat, lng];
}
