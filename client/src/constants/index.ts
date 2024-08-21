import { ModalNames } from "src/pages/HomePage";

export const THEMES: string[][] = [
  ["#CFFDE1", "#3D5656", "#FED049", "#68B984"],
  ["#F2CC8F", "#E07A5F", "#81B29A", "#3D405B"],
  ["#426045", "#D25C2D", "#E2DDC6", "#7B9B86"],
  ["#F2E8CF", "#386641", "#A7C957", "#6A994E"],
  ["#FFEA11", "#355764", "#81CACF", "#5A8F7B"],
  ["#FCF8E8", "#76549A", "#94B49F", "#DF7861"],
  ["#FAEDC6", "#3E8E7E", "#FABB51", "#7CD1B8"],
  ["#FFEF82", "#82954B", "#EFD345", "#BABD42"],
  ["#F1E0AC", "#495371", "#98B4AA", "#74959A"],
  ["#EA907A", "#AACDBE", "#FBC687", "#F4F7C5"],
  ["#FCF8E8", "#DF7861", "#D4E2D4", "#ECB390"],
  ["#F47C7C", "#70A1D7", "#F7F48B", "#A1DE93"],
  ["#EDE6DB", "#1A3C40", "#417D7A", "#1D5C63"],
  ["#F0EBE3", "#576F72", "#E4DCCF", "#7D9D9C"],
  ["#D0C9C0", "#5F7161", "#E2DDC6", "#6D8B74"],
  ["#F2E8CF", "#344D67", "#ADE792", "#6ECCAF"],
  ["#E5D9B6", "#285430", "#A4BE7B", "#5A8F7B"],
  ["#DAD7CD", "#3A5A40", "#A3B18A", "#588157"],
  ["#CAD2C5", "#354F52", "#84A98C", "#52796F"],
  ["#0E3150", "#F7E9E3", "#6DC9C8", "#FFC0C2"],
  ["#0E3150", "#FFFFFF", "#FF15E5", "#6903F9"],
  ["#FF9A76", "#637373", "#FFEADB", "#679B9B"],
  ["#F8B400", "#004445", "#FAF5E4", "#2C786C"],
  ["#F3D5C0", "#506D84", "#D4B499", "#889EAF"],
  ["#FEF1E6", "#90AACB", "#F9D5A7", "#FFB085"],
  ["#316B83", "#D5BFBF", "#6D8299", "#8CA1A5"],
  ["#CEE5D0", "#FF7878", "#F3F0D7", "#E0C097"],
  ["#FF5C58", "#FFEDD3", "#FE8F8F", "#FCD2D1"],
  ["#32502E", "#F3EFCC", "#406343", "#ECE7B4"],
  ["#4B3869", "#A9E4D7", "#664E88", "#63B4B8"],
  ["#F5C6A5", "#852747", "#FF7777", "#A2416B"],
  ["#14279B", "#E6E6E6", "#3D56B2", "#5C7AEA"],
  ["#FBFBFB", "#756C83", "#B9E1DC", "#F38181"],
  ["#F7F7E8", "#557174", "#C7CFB7", "#9DAD7F"],
  ["#D68060", "#86ABA1", "#F1AE89", "#DFF3E3"],
  ["#FF00E4", "#FFEDED", "#ED50F1", "#FDB9FC"],
  ["#EADEB8", "#A09F57", "#CFB784", "#C56824"],
  ["#A2D2FF", "#FEE440", "#FEF9EF", "#FF865E"],
  ["#F38181", "#95E1D3", "#FCE38A", "#EAFFD0"],
  ["#364F6B", "#FC5185", "#3FC1C9", "#F5F5F5"],
  ["#F9F7F7", "#112D4E", "#DBE2EF", "#3F72AF"],
  ["#E4F9F5", "#40514E", "#30E3CA", "#11999E"],
  ["#00B8A9", "#FFDE7D", "#F8F3D4", "#F6416C"],
  ["#F4EEFF", "#424874", "#DCD6F7", "#A6B1E1"],
  ["#303841", "#EEEEEE", "#3A4750", "#D72323"],
  ["#FAFAFA", "#004A7C", "#E8F1F5", "#005691"],
  ["#384259", "#C4EDDE", "#F73859", "#7AC7C4"],
  ["#48466D", "#ABEDD8", "#3D84A8", "#46CDCF"],
  ["#303841", "#FF5722", "#00ADB5", "#EEEEEE"],
  ["#07689F", "#FF7E67", "#A2D5F2", "#FAFAFA"],
  ["#FFB6B6", "#679B9B", "#FDE2E2", "#AACFCF"],
  ["#7D5A5A", "#FAF2F2", "#F1D1D1", "#F3E1E1"],
  ["#F85F73", "#283C63", "#FBE8D3", "#928A97"],
  ["#4B3869", "#A9E4D7", "#664E88", "#63B4B8"],
  ["#F5C6A5", "#852747", "#FF7777", "#A2416B"],
  ["#14279B", "#E6E6E6", "#3D56B2", "#5C7AEA"],
  ["#FBFBFB", "#756C83", "#B9E1DC", "#F38181"],
  ["#F7F7E8", "#557174", "#C7CFB7", "#9DAD7F"],
];

export interface Wheel {
  _id?: string;
  name: string;
  label: string;
  options?: string[];
}

export const ALPHABETS_OPTION = "A-Z / a-z;eg: A,B,C,D"
export const CONSONANT_OPTION = "Consonant;eg: B,C,D,F"
export const VOWEL_OPTION = "Vowel;eg:A,E,I,O"
export const LETTERS_OPTION = "A-Z + a-z;eg:A,B,a,b"
export const CUSTOM_LETTERS_OPTION = "Custom Letters;eg: Picker"

export const wheels: Wheel[] = [
  {
    name: "yes-no-wheel",
    label: "YES or NO",
    options: ["Yes", "No"],
  },
  {
    name: "yes-no-maybe-wheel",
    label: "YES or NO or MAYBE",

    options: ["Yes", "No", "Maybe"],
  },
  {
    name: "letter-wheel",
    label: "Letter Picker Wheel",
    options: [ALPHABETS_OPTION, CONSONANT_OPTION, VOWEL_OPTION, LETTERS_OPTION, CUSTOM_LETTERS_OPTION],
  },
  {
    name: "number-wheel",
    label: "Number Picker Wheel"
  },
];


export interface MenuItem {
  label: string;
  svgSrc: string;
  value: ModalNames;
  disabled?: boolean;
}

export const menuItems: MenuItem[] = [
  {
    label: "Login/Signup",
    svgSrc: "/assets/icons/login.svg",
    value: "profile",
  },
  {
    label: "Switch Wheel",
    svgSrc: "/assets/icons/wheel_page.svg",
    value: "wheels",
  },
  {
    label: "Setting",
    svgSrc: "/assets/icons/setting_page.svg",
    value: "settings",
  },
  {
    label: "Tools",
    svgSrc: "/assets/icons/hammer_page.svg",
    value: "share",
    disabled: true,
  },
];

export interface SpinConfig {
  spinningSpeedLevel: number;
  spinningDuration: number;
  manuallyStopOption: boolean;
  randomInitialAngleOption: boolean;
  mysterySpinOption: boolean;
  spinCountOption: boolean;
  confetti: boolean;
  sound: boolean;
  confettiType: "Confetti" | "Fireworks";
  soundType: "Sound" | "No Sound";
  inputNumbers: number;
}

export const defaultSpinConfig: SpinConfig = {
  spinningSpeedLevel: 5,
  spinningDuration: 9,
  manuallyStopOption: false,
  randomInitialAngleOption: false,
  mysterySpinOption: false,
  spinCountOption: false,
  confetti: true,
  sound: true,
  confettiType: "Confetti",
  soundType: "Sound",
  inputNumbers: 1,
};
