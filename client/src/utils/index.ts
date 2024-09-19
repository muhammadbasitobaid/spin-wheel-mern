import { v4 as uuidv4 } from "uuid";

// Reference: https://gist.github.com/krabs-github/ec56e4f1c12cddf86ae9c551aa9d9e04
function getLabelColor(color: string): '#000000'  | '#FFFFFF' {
  let r: number, g: number, b: number;
  let hsp: number;

  // Check the format of the color, HEX or RGB?
  if (/^rgb/.exec(color)) {
    // If RGB
    // Extract the red, green, blue values
    const regex = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/;
    const match = regex.exec(color);
    if (!match) throw new Error('Invalid color format');
    r = parseInt(match[1]);
    g = parseInt(match[2]);
    b = parseInt(match[3]);
  } else {
    // If HEX
    // Convert HEX to RGB
    const hex = +('0x' + color.slice(1).replace(color.length < 5 ? /./g : "", '$&$&'));
    r = hex >> 16;
    g = (hex >> 8) & 255;
    b = hex & 255;
  }

  // Calculate HSP value
  hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));

  // Determine whether the color is light or dark based on HSP value
  return hsp > 127.5 ? '#000000' : '#FFFFFF';
}

function getBgColorForLabel(index: number, colors: string[]): string {
    const colorIndex: number = index % (colors.length * 2); // Double the length to cover the pattern
    if (colorIndex < colors.length) {
      return colors[colorIndex];
    } else {
      return colors[colorIndex - colors.length];
    }
  }

function getRandomYesOrNo() {
  // Generate a random number between 0 and 1
  const randomNumber = Math.random();

  // If the random number is less than 0.5, return "Yes", otherwise return "No"
  return randomNumber < 0.5 ? "Yes" : "No";
}

function getDefaultWheelName() {
 return `Wheel ${uuidv4()}`;
}

export { getLabelColor, getBgColorForLabel, getRandomYesOrNo, getDefaultWheelName };
