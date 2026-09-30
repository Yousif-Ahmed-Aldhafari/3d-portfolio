import { config } from "@/data/config";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Résumé | Yousif Ahmed",
  description: "Résumé of Yousif Ahmed, Software QA Engineer.",
};

export default function ResumePage() {
  redirect(config.resumeUrl);
}
