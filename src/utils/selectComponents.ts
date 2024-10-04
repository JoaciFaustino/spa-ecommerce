import { Option } from "@/@types/SelectsComponents";

export const createOptions = (
  options: string[],
  lastIndex: number = 0
): Option[] => {
  return options.map((option, index) => ({
    id: index + lastIndex,
    name: option
  }));
};
