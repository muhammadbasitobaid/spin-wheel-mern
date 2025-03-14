import { ModalNames } from "src/pages/HomePage";

export const NUMBER_WHEEL_HIGHEST_PORTION = 1000;
export const  UPPERCASE = "UPPERCASE";
export const DEFAULT_LETTER_WHEEL_CASING = UPPERCASE;
export const NUMBER_WHEEL_LOWEST_PORTION = 1;
export const DEFAULT_INPUT_NUMBER_FOR_Y_N_WHEEL = 3;
export const DEFAULT_VOLUME = 50;
export const DEFAULT_WHEEL_METADATA = {
  _id: "",
  description: "Test Wheel description",
  popUpMessage: "Congratulations!",
}

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
  options: string[];
  defaultOption?: string;
  slug: string;
  htmlStr: string;
}

export interface WheelSnapshot {
  selectedOption?: string;
  inputNumbers?: number;
  history: string[];
  options?: string[];
  lowerNumber?: number;
  highestNumber?: number;
  excludeNumbers?: string
  interval?: number;
  customLetterList?: string;
  casing?: string;
}


const COMMON_CONTENT = `
<style>
  /* Default styles for larger screens */
  .paragraph {
    font-size: 18px;
    line-height: 40px;
    margin-bottom: 1rem;
  }

  .heading, .heading2 {
    font-size: 24px;
    line-height: 45px;
    margin-bottom: 2rem;
  }

  .l-img {
    width: 60%;
    height: auto;
    margin: 8px auto !important;
  }

  .s-img {
    width: 25%;
    height: auto;
    margin: 8px auto !important;
  }

  .xs-img {
    width: 10%;
    height: auto;
    margin: 8px auto !important;
  }

  /* Responsive styles */
  @media (max-width: 1024px) {
    .paragraph {
      font-size: 16px;
      line-height: 35px;
    }

    .heading, .heading2 {
      font-size: 22px;
      line-height: 40px;
    }

    .l-img {
      width: 70%;
    }

    .s-img {
      width: 30%;
    }

    .xs-img {
      width: 15%;
    }
  }

  @media (max-width: 768px) {
    .paragraph {
      font-size: 14px;
      line-height: 30px;
    }

    .heading, .heading2 {
      font-size: 20px;
      line-height: 35px;
    }

    .l-img {
      width: 80%;
    }

    .s-img {
      width: 40%;
    }

    .xs-img {
      width: 20%;
    }
  }

  @media (max-width: 480px) {
    .paragraph {
      font-size: 12px;
      line-height: 25px;
    }

    .heading, .heading2 {
      font-size: 18px;
      line-height: 30px;
    }

    .l-img {
      width: 90%;
    }

    .s-img {
      width: 50%;
    }

    .xs-img {
      width: 25%;
    }
  }
</style>

<ul><li><strong style="background-color: transparent;">Click "Spin" to start:</strong></li></ul><p class="paragraph"><br></p><p class="paragraph" class="ql-align-center"><strong style="background-color: transparent;"><img alt="" src="images/image13.png" style="margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" class="xs-img" title=""></strong></p><p class="paragraph"><span class="paragraph" style="background-color: transparent;">Once your wheel is ready, click the spin button and watch it go! The smooth spinning animation adds a bit of excitement as you wait to see where it lands. The ticking sound gives the spinning an ASMR experience. When it finally lands on an option, a pop-up box highlighting the result with confetti falling down and celebration music in the background appears.</span></p><ul><li><strong style="background-color: transparent;">View the result and spin again if needed:</strong></li></ul><p class="paragraph"><br></p><p class="paragraph"><span class="paragraph" style="background-color: transparent;">After the wheel stops spinning, the result is clearly displayed for you. If you want to try again or need another answer, just click spin and let the wheel do its magic once more.</span></p><p class="paragraph" class="ql-align-center"><span class="paragraph" style="background-color: transparent;"><img alt="" src="images/image6.png" style="margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);"   class="l-img"  title=""></span></p><h2><strong style="background-color: transparent;" class="heading"> Customise the Spinner Wheel</strong></h2><p class="paragraph"><span class="paragraph" style="background-color: transparent;">You can make the wheel truly yours by editing each segment. Add labels, change colors, or adjust the number of segments to match your preferences. Whether it’s names, numbers, or fun phrases, this step allows you to personalize the wheel for any situation.</span></p><p class="paragraph"><span class="paragraph" style="background-color: transparent;">To customize the wheel, you need to be logged in to your account. If you haven’t already created an account, you can do so by clicking here**[insert the signup link]**.</span></p><ul><li><strong style="background-color: transparent;">Add New Option:</strong><span class="paragraph" style="background-color: transparent;"> You can enter any value of your choice in the “Add new option” box under the “Edit Wheel” heading. Just enter any value and click/tap on the check mark symbol </span><strong style="background-color: transparent;">✅</strong><span class="paragraph" style="background-color: transparent;"> next to it.</span></li></ul><p class="paragraph"><br></p><p class="paragraph"><span class="paragraph" style="background-color: transparent;"><img alt="" src="images/image16.png" style="margin: 0 auto; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);"   class="l-img"  title=""></span></p><ul><li><strong style="background-color: transparent;">Changing the position:</strong><span class="paragraph" style="background-color: transparent;"> You can also use the </span><strong style="background-color: transparent;">“↑↓”</strong><span class="paragraph" style="background-color: transparent;"> symbol in front of the values to adjust their positions. Click the “↑” symbol to move a value up by one spot or the “↓” symbol to move it down by one spot.</span></li></ul><p class="paragraph"><br></p><p class="paragraph" class="ql-align-center"><span class="paragraph" style="background-color: transparent;"><img alt="" src="images/image1.png" style="margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);"  class="xs-img"  title=""></span></p><ul><li><strong style="background-color: transparent;">Duplicate any value:</strong><span class="paragraph" style="background-color: transparent;"> The “⧉” symbol represents the duplication option. Click on it to create a duplicate of any value easily.</span></li></ul><p class="paragraph"><br></p><p class="paragraph" class="ql-align-center"><span class="paragraph" style="background-color: transparent;"><img alt="" src="images/image12.png" style="margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);"  class="xs-img"  title=""></span></p><ul><li><strong style="background-color: transparent;">Removing any value:</strong><span class="paragraph" style="background-color: transparent;"> Just like the “⧉” symbol represents the duplication option, the “✕” symbol represents the removal option. Click on it to remove any value you choose.</span></li></ul><p class="paragraph"><br></p><p class="paragraph" class="ql-align-center"><span class="paragraph" style="background-color: transparent;"><img alt="" src="images/image17.png" style="margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);"   class="xs-img"  title=""></span></p><ul><li><strong style="background-color: transparent;">Fullscreen:</strong><span class="paragraph" style="background-color: transparent;"> The full screen option removes all editing and customization tools, letting you enjoy just the wheel on a big screen. Even in full screen, the sound adjustment and result display options stay in their usual spots, so you can still use them.</span></li></ul><p class="paragraph"><br></p><p class="paragraph" class="ql-align-center"><span class="paragraph" style="background-color: transparent;"><img alt="" src="images/image5.png" style="margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);"   class="l-img"  title=""></span></p><p class="paragraph" class="ql-align-center"><br></p><ul><li><span class="paragraph" style="background-color: transparent;">To go back to the regular view, just click the </span><strong style="background-color: transparent;">Close Fullscreen Mode</strong><span class="paragraph" style="background-color: transparent;"> button in the bottom right corner.</span></li><li><br></li><li><strong style="background-color: transparent;">Reset Count Option:</strong><span class="paragraph" style="background-color: transparent;"> The ↻ symbol allows you to reset the spin count and clear all the previous results. This is useful if you want to start fresh or track a new set of spins. Simply click on the symbol, and the wheel will be ready for a new session.</span></li></ul><p class="paragraph" class="ql-align-center"><span class="paragraph" style="background-color: transparent;"><img alt="" src="images/image8.png" style="margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);"  class="l-img"  title=""></span></p><ul><li><strong style="background-color: transparent;">Modify Name, Description and Pop-Up Message:</strong><span class="paragraph" style="background-color: transparent;"> The Ⓣ symbol allows you to customize the wheel's name and description to match your purpose. You can also edit the pop-up message that appears when the result is displayed. By default, it shows a </span><strong style="background-color: transparent;">"Congratulations"</strong><span class="paragraph" style="background-color: transparent;"> message, but you can personalize it with any text that suits your needs, making the experience more fun and unique.</span></li></ul><p class="paragraph"><br></p><p class="paragraph" class="ql-align-center"><span class="paragraph" style="background-color: transparent;"><img alt="" src="images/image15.png" style="margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);"  class="l-img"  title=""></span></p><p class="paragraph" class="ql-align-center"><span class="paragraph" style="background-color: transparent;"><img alt="" src="images/image9.png" style="margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);"  class="l-img"  title=""></span></p><h2><strong style="background-color: transparent;">Wheel Settings:</strong></h2><p class="paragraph"><span class="paragraph" style="background-color: transparent;">The gear icon in the header menu lets you adjust the settings of the spinner wheel to fit your preferences. You can modify the </span><strong style="background-color: transparent;">Spin Behavior</strong><span class="paragraph" style="background-color: transparent;">, turn </span><strong style="background-color: transparent;">Confetti</strong><span class="paragraph" style="background-color: transparent;"> effects on or off, adjust the </span><strong style="background-color: transparent;">Sound</strong><span class="paragraph" style="background-color: transparent;">, and explore different </span><strong style="background-color: transparent;">Color Palette Themes</strong><span class="paragraph" style="background-color: transparent;"> to give your wheel a unique look. Simply click the gear icon and customize the settings to make the spinner wheel just the way you like it!</span></p><h3><strong style="background-color: transparent;">Spin Behavior:</strong></h3><p class="paragraph" class="ql-align-center"><strong style="background-color: transparent;"><img alt="" src="images/image7.png" style="margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);"  class="l-img"  title=""></strong></p><ul><li><strong style="background-color: transparent;">Spinning Speed Level:</strong></li><li class="ql-indent-1"><span class="paragraph" style="background-color: transparent;">By default, the speed is set to </span><strong style="background-color: transparent;">5</strong><span class="paragraph" style="background-color: transparent;">, but you can adjust it up to </span><strong style="background-color: transparent;">10 levels</strong><span class="paragraph" style="background-color: transparent;"> using a sliding control for faster or slower spins.</span></li><li><strong style="background-color: transparent;">Spinning Duration:</strong></li><li class="ql-indent-1"><span class="paragraph" style="background-color: transparent;">The spin duration is set to </span><strong style="background-color: transparent;">9 seconds</strong><span class="paragraph" style="background-color: transparent;"> by default. You can slide to increase it up to </span><strong style="background-color: transparent;">30 seconds</strong><span class="paragraph" style="background-color: transparent;"> for a longer spin.</span></li><li><strong style="background-color: transparent;">Manually Stop:</strong></li><li class="ql-indent-1"><span class="paragraph" style="background-color: transparent;">Allows you to manually stop the wheel. The maximum spin duration is </span><strong style="background-color: transparent;">1 minute</strong><span class="paragraph" style="background-color: transparent;">, but custom speed adjustments won’t be available in this mode.</span></li><li><strong style="background-color: transparent;">Random Initial Angle:</strong></li><li class="ql-indent-1"><span class="paragraph" style="background-color: transparent;">Enables the wheel to start spinning from a </span><strong style="background-color: transparent;">random angle</strong><span class="paragraph" style="background-color: transparent;"> whenever new inputs are added, ensuring more randomness.</span></li><li><strong style="background-color: transparent;">Mystery Spin:</strong></li><li class="ql-indent-1"><span class="paragraph" style="background-color: transparent;">Hides all the inputs on the wheel while spinning, adding a fun element of surprise to the experience.</span></li><li><strong style="background-color: transparent;">Spin Count:</strong></li><li class="ql-indent-1"><span class="paragraph" style="background-color: transparent;">Displays the </span><strong style="background-color: transparent;">total number of spins</strong><span class="paragraph" style="background-color: transparent;">, letting you track how many times the wheel has been spun.</span></li></ul><h3><strong style="background-color: transparent;">Confetti and Sound:</strong></h3><p class="paragraph" class="ql-align-center"><strong style="background-color: transparent;"><img alt="" src="images/image2.png" style="margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);"   class="l-img"  title=""></strong></p><ul><li><strong style="background-color: transparent;">Confetti Type:</strong></li><li class="ql-indent-1"><span class="paragraph" style="background-color: transparent;">Choose between </span><strong style="background-color: transparent;">Confetti</strong><span class="paragraph" style="background-color: transparent;"> or </span><strong style="background-color: transparent;">Fireworks</strong><span class="paragraph" style="background-color: transparent;"> effects to display when the wheel stops spinning.</span></li><li><strong style="background-color: transparent;">Sound Type:</strong></li><li class="ql-indent-1"><span class="paragraph" style="background-color: transparent;">Select whether you want a </span><strong style="background-color: transparent;">Sound Effect</strong><span class="paragraph" style="background-color: transparent;"> or </span><strong style="background-color: transparent;">No Sound</strong><span class="paragraph" style="background-color: transparent;"> during the spin.</span></li><li><strong style="background-color: transparent;">Checkboxes:</strong></li><li class="ql-indent-1"><strong style="background-color: transparent;">Confetti On/Off:</strong><span class="paragraph" style="background-color: transparent;"> Enable or disable the confetti effect.</span></li><li class="ql-indent-1"><strong style="background-color: transparent;">Sound On/Off:</strong><span class="paragraph" style="background-color: transparent;"> Turn the sound on or off based on your preference.</span></li></ul><h2><strong style="background-color: transparent;">Wheel Themes:</strong></h2><p class="paragraph" class="ql-align-center"><span class="paragraph" style="background-color: transparent;"><img alt="" src="images/image3.png" style="margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);"  class="l-img"  title=""></span></p><p class="paragraph"><span class="paragraph" style="background-color: transparent;">The Wheel Theme Settings allow you to customize the look of your wheel by choosing from 58 unique color palettes. Each palette offers a distinct combination of colors, giving your wheel a fresh and vibrant appearance. This feature makes it easy to match the wheel’s design to your preferences or the theme of your activity.</span></p><h2><strong style="background-color: transparent;">Saved Wheels:</strong></h2><p class="paragraph"><span class="paragraph" style="background-color: transparent;">The </span><strong style="background-color: transparent;">Wheel Selection</strong><span class="paragraph" style="background-color: transparent;"> option, located in the header menu, allows you to access and choose from your previously saved wheels. This makes it easy to switch between different custom wheels without needing to recreate them, saving you time and effort.</span></p><h2><strong style="background-color: transparent;">Switch Wheels:</strong></h2><p class="paragraph" class="ql-align-center"><strong style="background-color: transparent;"><img alt="" src="images/image10.png" style="margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" class="s-img" title=""></strong></p><p class="paragraph"><span class="paragraph" style="background-color: transparent;">The </span><strong style="background-color: transparent;">Switch Wheels</strong><span class="paragraph" style="background-color: transparent;"> option, found in the header menu, allows users to pick from pre-built wheels. You can use them as they are or customize them based on your preferences. The available options include:</span></p><ul><li><strong style="background-color: transparent;">Yes/No Wheel:</strong><span class="paragraph" style="background-color: transparent;"> A simple wheel with two options: </span><strong style="background-color: transparent;">Yes</strong><span class="paragraph" style="background-color: transparent;"> and </span><strong style="background-color: transparent;">No.</strong><span class="paragraph" style="background-color: transparent;"> Ideal for making quick decisions or resolving simple dilemmas.</span></li><li><strong style="background-color: transparent;">Number Wheel:</strong><span class="paragraph" style="background-color: transparent;"> A wheel featuring a range of numbers. Perfect for activities like random number selection, games, or lotteries.</span></li><li><strong style="background-color: transparent;">Letter Wheel:</strong><span class="paragraph" style="background-color: transparent;"> A wheel with alphabet letters. Great for educational purposes, word games, or randomly picking names starting with specific letters.</span></li><li><strong style="background-color: transparent;">Custom Options Wheel:</strong><span class="paragraph" style="background-color: transparent;"> This wheel allows you to add and customize your own options. Whether it's names, activities, or specific choices, you can design it to suit any purpose.</span></li></ul><p class="paragraph"><span class="paragraph" style="background-color: transparent;">This option provides ready-to-use wheels while still allowing customization to meet your needs.</span></p><h2><strong style="background-color: transparent;">Share Option</strong></h2><p class="paragraph" class="ql-align-center"><strong style="background-color: transparent;"><img alt="" src="images/image11.png" style="margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);"   class="xs-img"  title=""></strong></p><p class="paragraph"><span class="paragraph" style="background-color: transparent;">The </span><strong style="background-color: transparent;">Share Option</strong><span class="paragraph" style="background-color: transparent;">, located in the header menu, allows you to generate a shareable link for your wheel. This makes it easy to share your customized or pre-built wheels with others. Simply click the option, copy the link, and share it with friends, family, or colleagues for collaborative or fun activities.</span></p><ul><li><strong style="background-color: transparent;">Sound Adjustment:</strong><span class="paragraph" style="background-color: transparent;"> There is a speaker icon in the bottom right corner of the screen. You can click on the icon to adjust the wheel's volume to match your preference. You can make it louder, softer, or even mute it completely.</span></li></ul><p class="paragraph"><br></p><p class="paragraph" class="ql-align-center"><span class="paragraph" style="background-color: transparent;"><img alt="" src="images/image4.png" style="margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);"  class="xs-img"  title=""></span></p><ul><li><strong style="background-color: transparent;">Check History:</strong><span class="paragraph" style="background-color: transparent;"> The 【┘】 symbol allows you to check all the previous results of your spins. Click on it to easily track and review the outcomes without losing any information.</span></li></ul><p class="paragraph"><br></p><p class="paragraph" class="ql-align-center"><span class="paragraph" style="background-color: transparent;"><img alt="" src="images/image14.png" style="margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);"  class="xs-img"  title=""></span></p><ul><li><strong style="background-color: transparent;">Save your customized wheel (optional):</strong></li><li><br></li><li><span class="paragraph" style="background-color: transparent;">To save a wheel, you need to be logged in to your account. If you haven’t already created an account, you can do so by clicking here**[insert the signup link]**. If you love the wheel you’ve designed and want to use it again, you can save it. This makes it easy to come back later without having to recreate it from scratch.</span></li><li><br></li></ul><p class="paragraph"><br></p>
` 

export const MAX_INPUT_NUMBER = 5;

export const ALPHABETS_OPTION = "A-Z / a-z"
export const CONSONANT_OPTION = "Consonant"
export const VOWEL_OPTION = "Vowel"
export const LETTERS_OPTION = "A-Z + a-z"
export const CUSTOM_LETTERS_OPTION = "Custom Letters"

export const YES_NO_OPTION = "Yes or No";
export const YES_NO_MAYBE_OPTION = "Yes, No or Maybe";

export const YesNoWheel: Wheel = {
    name: "yes-no-wheel",
    label: "Yes or No",
    options: [YES_NO_OPTION, YES_NO_MAYBE_OPTION],
    slug: "/yes-or-no-wheel",
    htmlStr:`
<h2><strong style="background-color: transparent;" class="heading">What is a Spinner Wheel?</strong></h2><p class="paragraph"><span class="paragraph" style="background-color: transparent;">The spinner wheel is a fun and simple tool that lets you spin a colourful wheel to get random results. It’s easy to use and fully customizable—you can change the labels, colors, and even the type of wheel to suit your needs. Whether you want a Yes/No Wheel, a Number Wheel, a Letter Wheel, or a Custom Wheel, this tool has you covered. The spinning animation is smooth, and the results are shown clearly with a confetti and party celebration sound, making it exciting to use. Perfect for decisions, games, or just for fun, the spinner wheel works well on any device, adding a bit of excitement to your day.</span></p><h2><strong style="background-color: transparent;" class="heading2">Purpose and Use Cases</strong></h2><p class="paragraph"><span class="paragraph" style="background-color: transparent;">The spinner wheel is perfect for anyone looking for a fun way to make decisions or add a twist to their activities.</span></p><ul><li><strong style="background-color: transparent;">Make Quick Decisions:</strong><span class="paragraph" style="background-color: transparent;"> Use the spinner wheel to help decide what to eat, where to go, or what task to tackle first.</span></li><li><strong style="background-color: transparent;">Add Fun to Games:</strong><span class="paragraph" style="background-color: transparent;"> Bring excitement to party games, trivia, or challenges by letting the wheel determine the next move or winner.</span></li><li><strong style="background-color: transparent;">Classroom Activities:</strong><span class="paragraph" style="background-color: transparent;"> Teachers can use it to randomly select students, assign tasks, or create interactive learning experiences.</span></li><li><strong style="background-color: transparent;">Team Building:</strong><span class="paragraph" style="background-color: transparent;"> Perfect for brainstorming ideas or assigning roles in group activities.</span></li><li><strong style="background-color: transparent;">Random Selection:</strong><span class="paragraph" style="background-color: transparent;"> Use it to choose names, numbers, or any option when you want to keep things fair and random.</span></li><li><strong style="background-color: transparent;">Personal Challenges:</strong><span class="paragraph" style="background-color: transparent;"> Use it to create fun personal challenges or goals, like trying new hobbies or workouts.</span></li><li><strong style="background-color: transparent;">Event Coordination:</strong><span class="paragraph" style="background-color: transparent;"> Decide on event themes, seating arrangements, or random rewards in a fun way.</span></li><li><strong style="background-color: transparent;">Randomized Scheduling:</strong><span class="paragraph" style="background-color: transparent;"> Spin the wheel to shuffle tasks or schedules for variety.</span></li><li><strong style="background-color: transparent;">Family Bonding:</strong><span class="paragraph" style="background-color: transparent;"> Use it at family gatherings for games or deciding who does what chore.</span></li></ul><p class="paragraph"><br></p><h3><strong style="background-color: transparent;">Yes or No Wheel:</strong></h3><p class="paragraph"><img alt="" src="images/image8_y.png" style="margin: 0 auto; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width:35%; height: auto;" title=""></p><p class="paragraph"><span class="paragraph" style="background-color: transparent;">The </span><strong style="background-color: transparent;">Yes/No Wheel</strong><span class="paragraph" style="background-color: transparent;"> is a straightforward wheel option that helps users make quick decisions with just a spin. This wheel comes with two modes:</span></p><ol><li><strong style="background-color: transparent;">Yes and No</strong><span class="paragraph" style="background-color: transparent;"> – A simple choice between yes and no.</span></li><li><strong style="background-color: transparent;">Yes, No, or Maybe</strong><span class="paragraph" style="background-color: transparent;"> – Adds a “maybe” option for those times when the answer isn’t so black and white.</span></li></ol><p class="paragraph"><span class="paragraph" style="background-color: transparent;">By default, the wheel includes three “Yes” and three “No” options, creating a balanced layout. The </span><strong style="background-color: transparent;">Yes/No Wheel</strong><span class="paragraph" style="background-color: transparent;"> starts with a default size of </span><strong style="background-color: transparent;">6 segments</strong><span class="paragraph" style="background-color: transparent;">, equally divided into three "Yes" and three "No" options. However, users can customize the size of the wheel by adding or removing options. The max limit is 5 and the minimum limit is 1.</span></p><p class="paragraph" class="ql-align-center"><img alt="" src="images/image7_y.png" style="margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" class="l-img"  title=""></p><p class="paragraph"><span class="paragraph" style="background-color: transparent;">Whether you’re deciding what to eat or choosing between two tasks, the Yes/No Wheel is here to make it easier.</span></p><h2><strong style="background-color: transparent;" class="heading"> How to Use The Yes/No Picker Spinner Wheel?</strong></h2><ul><li><strong style="background-color: transparent;">Select the “Yes/No Wheel” from the header:</strong></li></ul><p class="paragraph"><img alt="" src="images/image20_y.png" style="margin: 0 auto; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);"  class="l-img"  title=""></p><p class="paragraph"><br></p><p class="paragraph"><span class="paragraph" style="background-color: transparent;">You can start by choosing the </span><strong style="background-color: transparent;">“Yes/No Wheel”</strong><span class="paragraph" style="background-color: transparent;"> from the </span><strong style="background-color: transparent;">“Switch Wheels”</strong><span class="paragraph" style="background-color: transparent;"> drop-down menu in the header.</span></p> ${COMMON_CONTENT}
` 
};

export const initCustomWheelOptions = ["Hank", "Walter", "Jesse", "Nacho", "Saul"];

export const CustomOptionsWheel: Wheel = {
    name: "custom-options-wheel",
    label: "Custom Options",
    options: initCustomWheelOptions,
    slug: "/",
      htmlStr: `<h2><strong style="background-color: transparent;" class="heading">What is a Spinner Wheel?</strong></h2><p class="paragraph"><span class="paragraph" style="background-color: transparent;">The spinner wheel is a fun and simple tool that lets you spin a colourful wheel to get random results. It’s easy to use and fully customizable—you can change the labels, colors, and even the type of wheel to suit your needs. Whether you want a Yes/No Wheel, a Number Wheel, a Letter Wheel, or a Custom Wheel, this tool has you covered. The spinning animation is smooth, and the results are shown clearly with a confetti and party celebration sound, making it exciting to use. Perfect for decisions, games, or just for fun, the spinner wheel works well on any device, adding a bit of excitement to your day.</span></p><h2><strong style="background-color: transparent;" class="heading2">Purpose and Use Cases</strong></h2><p class="paragraph"><span class="paragraph" style="background-color: transparent;">The spinner wheel is perfect for anyone looking for a fun way to make decisions or add a twist to their activities.</span></p><ul><li><strong style="background-color: transparent;">Make Quick Decisions:</strong><span class="paragraph" style="background-color: transparent;"> Use the spinner wheel to help decide what to eat, where to go, or what task to tackle first.</span></li><li><strong style="background-color: transparent;">Add Fun to Games:</strong><span class="paragraph" style="background-color: transparent;"> Bring excitement to party games, trivia, or challenges by letting the wheel determine the next move or winner.</span></li><li><strong style="background-color: transparent;">Classroom Activities:</strong><span class="paragraph" style="background-color: transparent;"> Teachers can use it to randomly select students, assign tasks, or create interactive learning experiences.</span></li><li><strong style="background-color: transparent;">Team Building:</strong><span class="paragraph" style="background-color: transparent;"> Perfect for brainstorming ideas or assigning roles in group activities.</span></li><li><strong style="background-color: transparent;">Random Selection:</strong><span class="paragraph" style="background-color: transparent;"> Use it to choose names, numbers, or any option when you want to keep things fair and random.</span></li><li><strong style="background-color: transparent;">Personal Challenges:</strong><span class="paragraph" style="background-color: transparent;"> Use it to create fun personal challenges or goals, like trying new hobbies or workouts.</span></li><li><strong style="background-color: transparent;">Event Coordination:</strong><span class="paragraph" style="background-color: transparent;"> Decide on event themes, seating arrangements, or random rewards in a fun way.</span></li><li><strong style="background-color: transparent;">Randomized Scheduling:</strong><span class="paragraph" style="background-color: transparent;"> Spin the wheel to shuffle tasks or schedules for variety.</span></li><li><strong style="background-color: transparent;">Family Bonding:</strong><span class="paragraph" style="background-color: transparent;"> Use it at family gatherings for games or deciding who does what chore.</span></li></ul><h2><strong style="background-color: transparent;" class="heading">How to Use This Spinner Wheel?</strong></h2><ul><li><p style="b
ackground-color: transparent;" class="paragraph">Select the “Custom Options Wheel from the header menu:</p></li></ul><p class="paragraph"><br></p><p class="paragraph"><strong style="background-color: transparent;"> <img alt="" src="images/image18.png" style="margin: 0 auto; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" class="l-img" title=""></strong></p><p class="paragraph"><span class="paragraph" style="background-color: transparent;">By default, you get a ready-made custom wheel. If you prefer something unique, you can customize this wheel by changing the input values or you can create your own custom wheel from scratch. This lets you design a wheel that fits exactly what you need.</span></p> ${COMMON_CONTENT}`
};

export const NumberWheel: Wheel = {
    name: "number-wheel",
    label: "Number",
    options: [""],
    slug: "/random-number-wheel",
    htmlStr: `
  <h2><strong style="background-color: transparent;" class="heading">What is a Spinner Wheel?</strong></h2><p class="paragraph"><span class="paragraph" style="background-color: transparent;">The spinner wheel is a fun and simple tool that lets you spin a colourful wheel to get random results. It’s easy to use and fully customizable—you can change the labels, colors, and even the type of wheel to suit your needs. Whether you want a Yes/No Wheel, a Number Wheel, a Letter Wheel, or a Custom Wheel, this tool has you covered. The spinning animation is smooth, and the results are shown clearly with a confetti and party celebration sound, making it exciting to use. Perfect for decisions, games, or just for fun, the spinner wheel works well on any device, adding a bit of excitement to your day.</span></p><h2><strong style="background-color: transparent;" class="heading2">Purpose and Use Cases</strong></h2><p class="paragraph"><span class="paragraph" style="background-color: transparent;">The spinner wheel is perfect for anyone looking for a fun way to make decisions or add a twist to their activities.</span></p><ul><li><strong style="background-color: transparent;">Make Quick Decisions:</strong><span class="paragraph" style="background-color: transparent;"> Use the spinner wheel to help decide what to eat, where to go, or what task to tackle first.</span></li><li><strong style="background-color: transparent;">Add Fun to Games:</strong><span class="paragraph" style="background-color: transparent;"> Bring excitement to party games, trivia, or challenges by letting the wheel determine the next move or winner.</span></li><li><strong style="background-color: transparent;">Classroom Activities:</strong><span class="paragraph" style="background-color: transparent;"> Teachers can use it to randomly select students, assign tasks, or create interactive learning experiences.</span></li><li><strong style="background-color: transparent;">Team Building:</strong><span class="paragraph" style="background-color: transparent;"> Perfect for brainstorming ideas or assigning roles in group activities.</span></li><li><strong style="background-color: transparent;">Random Selection:</strong><span class="paragraph" style="background-color: transparent;"> Use it to choose names, numbers, or any option when you want to keep things fair and random.</span></li><li><strong style="background-color: transparent;">Personal Challenges:</strong><span class="paragraph" style="background-color: transparent;"> Use it to create fun personal challenges or goals, like trying new hobbies or workouts.</span></li><li><strong style="background-color: transparent;">Event Coordination:</strong><span class="paragraph" style="background-color: transparent;"> Decide on event themes, seating arrangements, or random rewards in a fun way.</span></li><li><strong style="background-color: transparent;">Randomized Scheduling:</strong><span class="paragraph" style="background-color: transparent;"> Spin the wheel to shuffle tasks or schedules for variety.</span></li><li><strong style="background-color: transparent;">Family Bonding:</strong><span class="paragraph" style="background-color: transparent;"> Use it at family gatherings for games or deciding who does what chore.</span></li></ul><h3><strong style="background-color: transparent;">Number Wheel:</strong></h3><p class="paragraph"><span class="paragraph" style="background-color: transparent;">The </span><strong style="background-color: transparent;">Number Wheel</strong><span class="paragraph" style="background-color: transparent;"> is designed for anyone who wants to work with numbers in a fun and interactive way. Here’s how to use the wheel:</span></p><ul><li><span class="paragraph" style="background-color: transparent;">You simply set a </span><strong style="background-color: transparent;">lower number</strong><span class="paragraph" style="background-color: transparent;"> and a </span><strong style="background-color: transparent;">higher number</strong><span class="paragraph" style="background-color: transparent;">, and the wheel automatically generates numbers within that range.</span></li></ul><p class="paragraph"><br></p><p class="paragraph"><span class="paragraph" style="background-color: transparent;">This wheel has advanced features, too:</span></p><ul><li><strong style="background-color: transparent;">Exclude Numbers</strong><span class="paragraph" style="background-color: transparent;">: You can skip certain numbers by listing them, separated by commas.</span></li><li><strong style="background-color: transparent;">Set Intervals</strong><span class="paragraph" style="background-color: transparent;">: Add steps between numbers (e.g., 2, 4, 6) for more precise customization.</span></li></ul><p class="paragraph" class="ql-align-center"><span class="paragraph" style="background-color: transparent;"><img alt="" src="images/image3_n.png" style="margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 35%; margin: 8px auto;"title=""></span></p><p class="paragraph"><span class="paragraph" style="background-color: transparent;">Whether you’re choosing random numbers for a raffle, picking a lucky number, or creating a unique way to teach math, this wheel is highly flexible and easy to use.</span></p><h2><strong style="background-color: transparent;" class="heading"> How to Use The Number Picker Spinner Wheel?</strong></h2><ul><li><strong style="background-color: transparent;">Select the Number Wheel from the header:</strong></li></ul><p class="paragraph"><br></p><p class="paragraph"><strong style="background-color: transparent;"><img alt="" src="images/image20_y.png" title="" style="margin: 0 auto; transform: rotate(0rad) translateZ(0px);" class="l-img"></strong></p><p class="paragraph"><span class="paragraph" style="background-color: transparent;">You can start by choosing the </span><strong style="background-color: transparent;">“Number Wheel”</strong><span class="paragraph" style="background-color: transparent;"> from the </span><strong style="background-color: transparent;">“Switch Wheels”</strong><span class="paragraph" style="background-color: transparent;"> drop-down menu in the header.</span></p>
 ${COMMON_CONTENT}
`
};

export const letterWheelDefaultOption = ALPHABETS_OPTION;

export const LetterWheel: Wheel = {
    name: "letter-wheel",
    label: "Letter",
    options: [letterWheelDefaultOption, CONSONANT_OPTION, VOWEL_OPTION, LETTERS_OPTION, CUSTOM_LETTERS_OPTION],
    defaultOption: letterWheelDefaultOption,
    slug: "/random-letter-generator",
    htmlStr: `
<h2><strong style="background-color: transparent;" class="heading">What is a Spinner Wheel?</strong></h2><p class="paragraph"><span class="paragraph" style="background-color: transparent;">The spinner wheel is a fun and simple tool that lets you spin a colourful wheel to get random results. It’s easy to use and fully customizable—you can change the labels, colors, and even the type of wheel to suit your needs. Whether you want a Yes/No Wheel, a Number Wheel, a Letter Wheel, or a Custom Wheel, this tool has you covered. The spinning animation is smooth, and the results are shown clearly with a confetti and party celebration sound, making it exciting to use. Perfect for decisions, games, or just for fun, the spinner wheel works well on any device, adding a bit of excitement to your day.</span></p><h2><strong style="background-color: transparent;" class="heading2">Purpose and Use Cases</strong></h2><p class="paragraph"><span class="paragraph" style="background-color: transparent;">The spinner wheel is perfect for anyone looking for a fun way to make decisions or add a twist to their activities.</span></p><ul><li><strong style="background-color: transparent;">Make Quick Decisions:</strong><span class="paragraph" style="background-color: transparent;"> Use the spinner wheel to help decide what to eat, where to go, or what task to tackle first.</span></li><li><strong style="background-color: transparent;">Add Fun to Games:</strong><span class="paragraph" style="background-color: transparent;"> Bring excitement to party games, trivia, or challenges by letting the wheel determine the next move or winner.</span></li><li><strong style="background-color: transparent;">Classroom Activities:</strong><span class="paragraph" style="background-color: transparent;"> Teachers can use it to randomly select students, assign tasks, or create interactive learning experiences.</span></li><li><strong style="background-color: transparent;">Team Building:</strong><span class="paragraph" style="background-color: transparent;"> Perfect for brainstorming ideas or assigning roles in group activities.</span></li><li><strong style="background-color: transparent;">Random Selection:</strong><span class="paragraph" style="background-color: transparent;"> Use it to choose names, numbers, or any option when you want to keep things fair and random.</span></li><li><strong style="background-color: transparent;">Personal Challenges:</strong><span class="paragraph" style="background-color: transparent;"> Use it to create fun personal challenges or goals, like trying new hobbies or workouts.</span></li><li><strong style="background-color: transparent;">Event Coordination:</strong><span class="paragraph" style="background-color: transparent;"> Decide on event themes, seating arrangements, or random rewards in a fun way.</span></li><li><strong style="background-color: transparent;">Randomized Scheduling:</strong><span class="paragraph" style="background-color: transparent;"> Spin the wheel to shuffle tasks or schedules for variety.</span></li><li><strong style="background-color: transparent;">Family Bonding:</strong><span class="paragraph" style="background-color: transparent;"> Use it at family gatherings for games or deciding who does what chore.</span></li></ul><h3><strong style="background-color: transparent;">Letter Wheel:</strong></h3><p class="paragraph" class="ql-align-center"><span class="paragraph" style="background-color: transparent;"> <img alt="" src="images/image3_l.png" style=" margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);  width:35%; height: auto; margin: 8px auto;" title=""></span></p><p class="paragraph"><span class="paragraph" style="background-color: transparent;">The </span><strong style="background-color: transparent;">Letter Wheel</strong><span class="paragraph" style="background-color: transparent;"> is perfect for activities involving letters, whether for games, education, or random selection. It includes all </span><strong style="background-color: transparent;">A-Z letters</strong><span class="paragraph" style="background-color: transparent;"> and allows users to choose between uppercase and lowercase options.</span></p><p class="paragraph"><span class="paragraph" style="background-color: transparent;">Additional features include:</span></p><ul><li><strong style="background-color: transparent;">Vowels Only</strong><span class="paragraph" style="background-color: transparent;">: Quickly configure the wheel to display only vowels: </span><strong style="background-color: transparent;">A, E, I, O, U</strong><span class="paragraph" style="background-color: transparent;">. This is great for activities that focus on phonics, word building, or vowel-specific games.</span></li><li><strong style="background-color: transparent;">Consonants Only</strong><span class="paragraph" style="background-color: transparent;">: Alternatively, set the wheel to show only consonants, excluding vowels. This includes letters like </span><strong style="background-color: transparent;">B, C, D, F, G,</strong><span class="paragraph" style="background-color: transparent;"> and so on. This feature is useful for games or tasks that require focus on consonants, such as creating unique word challenges.</span></li></ul><p class="paragraph" class="ql-align-center"><span class="paragraph" style="background-color: transparent;"><img alt="" src="images/image17_l.png" style="margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);   width:35%; height: auto; margin: 8px auto;" title=""></span></p><ul><li><strong style="background-color: transparent;">Custom Letters</strong><span class="paragraph" style="background-color: transparent;">: You can input specific letters of your choice to make the wheel suit your needs. For instance, you could add only your initials, favorite letters, or even letters that hold special significance for a game or activity.</span></li></ul><p class="paragraph"><br></p><p class="paragraph"><span class="paragraph" style="background-color: transparent;">However, if you type an entire word in the Custom Letters Box, the wheel will automatically take the </span><strong style="background-color: transparent;">first letter</strong><span class="paragraph" style="background-color: transparent;"> of that word and display it as a segment on the wheel. For example, typing "Apple" will add the letter "A" to the wheel. This ensures the wheel remains clean and focused on individual letters.</span></p><p class="paragraph"><span class="paragraph" style="background-color: transparent;"><img alt="" src="images/image20_l.png" style="margin: 0 auto;  transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); " class="l-img" title=""></span></p><h2><strong style="background-color: transparent;" class="heading"> How to Use The Letter Picker Spinner Wheel?</strong></h2><ul><li><strong style="background-color: transparent;">Select the Letter Wheel from the header:</strong></li></ul><p class="paragraph"><br></p><p class="paragraph"><strong style="background-color: transparent;"><img alt="" src="images/image20_y.png" title="" style="margin: 0 auto; transform: rotate(0rad) translateZ(0px);" class="l-img" ></strong></p><p class="paragraph"><span class="paragraph" style="background-color: transparent;">You can start by choosing the </span><strong style="background-color: transparent;">“Letter Wheel”</strong><span class="paragraph" style="background-color: transparent;"> from the </span><strong style="background-color: transparent;">“Switch Wheels”</strong><span class="paragraph" style="background-color: transparent;"> drop-down menu in the header.</span></p>
  ${COMMON_CONTENT}
`
};

export const wheels: Wheel[] = [
  YesNoWheel,
  CustomOptionsWheel,
  NumberWheel,
  LetterWheel,
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
    label: "Select Wheel",
    svgSrc: "/assets/icons/wheel_page.svg",
    value: "wheels",
  },
  {
    label: "Setting",
    svgSrc: "/assets/icons/setting_page.svg",
    value: "settings",
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
};
