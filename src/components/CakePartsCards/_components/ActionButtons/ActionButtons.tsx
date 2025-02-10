import { BsPencilSquare, BsTrash } from "react-icons/bs";
import styles from "../../CakePartsCard.module.scss";
import SpinnerLoader from "@/components/SpinnerLoader/SpinnerLoader";

type Props = {
  openModal: () => void;
  requestIsPending: boolean;
  deleteRequest: () => Promise<void>;
};

function ActionButtons({ openModal, requestIsPending, deleteRequest }: Props) {
  return (
    <div className={styles.actionButtons}>
      <div className={styles.divIcons}>
        <BsPencilSquare
          onClick={openModal}
          style={{ color: "var(--secondary-color)", fontSize: "1.5rem" }}
        />

        {!requestIsPending && (
          <BsTrash
            onClick={deleteRequest}
            style={{ color: "red", fontSize: "1.5rem" }}
          />
        )}

        {requestIsPending && (
          <SpinnerLoader
            color="var(--primary-color)"
            size={1.5}
            unitSize="rem"
          />
        )}
      </div>
    </div>
  );
}

export default ActionButtons;
