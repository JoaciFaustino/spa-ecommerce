import SpinnerLoader from "@/components/SpinnerLoader/SpinnerLoader";
import { forwardRef } from "react";
import styles from "../Select.module.scss";

type Props = { isLoading: boolean };

const FinalOptionsInspector = forwardRef<HTMLSpanElement, Props>(
  ({ isLoading = false }, ref) => {
    return (
      <>
        {isLoading && (
          <div className={styles.finalPageInspector}>
            <SpinnerLoader
              color="var(--primary-color)"
              size={1}
              unitSize="rem"
            />
          </div>
        )}

        <span ref={ref} />
      </>
    );
  }
);

export default FinalOptionsInspector;
