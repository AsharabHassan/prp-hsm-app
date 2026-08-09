import {loadFont as loadMontserrat} from "@remotion/google-fonts/Montserrat";
import {loadFont as loadPlayfair} from "@remotion/google-fonts/PlayfairDisplay";

export const {fontFamily: sans} = loadMontserrat("normal", {
  subsets: ["latin"],
  weights: ["400", "500", "600", "700", "800", "900"],
});

export const {fontFamily: serif} = loadPlayfair("normal", {
  subsets: ["latin"],
  weights: ["600", "700", "800", "900"],
});

export const palette = {
  black: "#060606",
  gold: "#c7a35c",
  goldLight: "#ead7a7",
  ink: "#f2f0eb",
  muted: "#aaa79f",
  cyan: "#64e9ff",
  red: "#ff4d5e",
};
