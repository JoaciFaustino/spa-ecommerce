import { Option } from "@/@types/SelectsComponents";
import { ChangeEvent } from "react";

export const useSelect = (
  options: Option[],
  handleCloseModal: () => void,
  handleOptionSelected: (newValue: string) => void
) => {
  const handleChangeInputOption = (e: ChangeEvent<HTMLInputElement>) => {
    handleCloseModal();

    const optionNames = options.map(({ name }) => name);

    if (!optionNames.includes(e.target.value)) {
      return;
    }

    handleOptionSelected(e.target.value);
  };

  return { handleChangeInputOption };
};
