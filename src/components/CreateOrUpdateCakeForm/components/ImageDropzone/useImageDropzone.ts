import { FileRejection } from "react-dropzone";
import { ErrorCode } from "react-dropzone";
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";

const errorCodes = [...Object.values(ErrorCode), "unknown-error"] as const;

const fileTypesCompleteString = [
  "image/png",
  "image/jpeg",
  "image/pjpeg",
  "image/webp"
];

type MessagesError = {
  [key in ErrorCode | "unknown-error"]: string;
};

const messagesError: MessagesError = {
  "file-invalid-type": "Esse tipo de arquivo é inválido!",
  "file-too-large": "Esse arquivo é muito grande!",
  "file-too-small": "Esse arquivo é muito pequeno!",
  "too-many-files": "Você só pode mandar 1 imagem de cada vez!",
  "unknown-error": "Ocorreu um erro, envie a imagem novamente!"
};

export const useImageDropzone = (
  setFile: Dispatch<SetStateAction<File | null>>
) => {
  const handleDropFile = (
    acceptedFiles: File[],
    fileRejections: FileRejection[]
  ) => {
    const errorCode = fileRejections[0]?.errors[0]?.code;

    if (!!errorCode && errorCodes.includes(errorCode as ErrorCode)) {
      toast.error(messagesError[errorCode as ErrorCode]);
      return;
    }

    if (!!errorCode && !errorCodes.includes(errorCode as ErrorCode)) {
      toast.error(messagesError["unknown-error"]);
      return;
    }

    if (!fileTypesCompleteString.includes(acceptedFiles[0]?.type)) {
      toast.error(messagesError["file-invalid-type"]);
      return;
    }

    setFile(acceptedFiles[0]);
  };

  const deleteFile = () => setFile(null);

  return { handleDropFile, deleteFile };
};
