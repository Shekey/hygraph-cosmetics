import Hero from "@/app/(ui)/Hero";
import NoComponentFile from "@/app/(ui)/NoComponentFile";
import Routine from "@/app/(ui)/Routine";
import ProductHighlight from "@/app/(ui)/ProductHighlight";
import Editorial from "@/app/(ui)/Editorial";
import Cta from "@/app/(ui)/Cta";
import Card from "@/app/(ui)/Card";
import Tutorial from "@/app/(ui)/Tutorial";
import TutorialItem from "@/app/(ui)/TutorialItem";
import ProductList from "@/app/(ui)/ProductList";

type Mapping = {
  [name: string]: any;
};

const mapping: Mapping = {
  Editorial,
  Hero,
  ProductHighlight,
  Routine,
  Cta,
  Card,
  Tutorial,
  TutorialItem,
  ProductList,
};

export function getComponentForName(name: string) {
  return mapping[name] ?? NoComponentFile;
}
