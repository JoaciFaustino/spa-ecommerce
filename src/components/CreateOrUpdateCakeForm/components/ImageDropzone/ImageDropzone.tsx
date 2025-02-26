import Dropzone from "react-dropzone";
import styles from "./ImageDropzone.module.scss";
import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { BsPlus } from "react-icons/bs";
import { formatFileSize } from "@/utils/formatFileSize";
import { CgClose } from "react-icons/cg";
import { useImageDropzone } from "./useImageDropzone";

const fileTypes = [".jpeg", ".png", ".pjpeg", ".webp"];

const fiveMb = 1024 * 1024 * 5;

type Props = {
  imageUrl?: string;
  file: File | null;
  setFile: Dispatch<SetStateAction<File | null>>;
};

function ImageDropzone({ file, setFile, imageUrl }: Props) {
  const { deleteFile, handleDropFile } = useImageDropzone(setFile);

  return (
    <div>
      <label>Imagem: </label>
      <Dropzone
        accept={{ "image/*": fileTypes }}
        multiple={false}
        maxSize={fiveMb}
        maxFiles={1}
        onDrop={handleDropFile}
      >
        {({ getRootProps, getInputProps, isDragActive }) => (
          <div
            {...getRootProps({
              className: `${styles.dropzone} ${
                isDragActive ? styles.dragActive : ""
              }`
            })}
          >
            <input {...getInputProps({})} />

            {!!imageUrl ? (
              <div className={styles.divImage}>
                <p className="text">Imagem atual</p>

                <Image
                  src={imageUrl}
                  alt={"Imagem atual do bolo"}
                  width={80}
                  height={80}
                  className={styles.image}
                  style={{ objectFit: "cover" }}
                  priority
                />
              </div>
            ) : (
              <BsPlus
                style={{
                  color: "var(--color-text-paragraph)",
                  fontSize: "3rem"
                }}
              />
            )}

            <p className="text">Selecione a imagem ou arraste até aqui. </p>
            <p className="text" style={{ color: "var(--secondary-color)" }}>
              Tipos aceitos: {fileTypes.join(", ")}
            </p>
            <p className="text" style={{ color: "var(--secondary-color)" }}>
              Procure usar imagens quadradas!
            </p>
          </div>
        )}
      </Dropzone>

      {!!file && (
        <div className={styles.newImage}>
          <p className={`text`}>
            Nova imagem:{" "}
            <span className={`${styles.info}`}>
              {`${file.name} - ${formatFileSize(file.size)}`}
            </span>
          </p>

          <CgClose
            onClick={deleteFile}
            style={{ color: "var(--gray-3)", fontSize: "1.5rem" }}
          />
        </div>
      )}
    </div>
  );
}

export default ImageDropzone;
