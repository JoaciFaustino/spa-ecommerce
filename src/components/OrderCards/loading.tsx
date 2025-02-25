import OrderProductsListSkeleton from "@/components/OrderProductsList/loading";
import styles from "./OrderCard.module.scss";
import Text from "./_components/Text/Text";
import OrderHeader from "./_components/OrderHeader/OrderHeader";
import ContactDetails from "./_components/ContactDetails/ContactDetails";
import DeliveryAddress from "./_components/DeliveryAdress/DeliveryAdress";
import OrderInfo from "./_components/OrderInfo/OrderInfo";

type Props = {
  type?: "admin" | "user";
};

function OrderCardSkeleton({ type = "user" }: Props) {
  return (
    <div className={`${styles.orderCard}`}>
      <OrderHeader orderId="999999999999999999999999" loading />

      <div className={styles.cardContent}>
        <OrderProductsListSkeleton />

        <div className={styles.orderInfo}>
          {type === "admin" && (
            <>
              <ContactDetails
                contactDetails={{
                  email: "reidosuco@xxxxx.xx",
                  name: "nego alves",
                  phoneNumber: "(99) 99999-9999"
                }}
                isSkeleton
              />

              <DeliveryAddress
                deliveryAddress={{
                  neighborhood: "Takaga No",
                  number: "999",
                  street: "Sitio Tronco",
                  adicionalInfo: "Perto da rua do chibanco"
                }}
                isSkeleton
              />
            </>
          )}

          <OrderInfo
            state="done"
            typeOfReceipt="delivery"
            dateAndTimeDelivery={new Date("2001-09-11T08:46:00Z")}
            isSkeleton
          />
        </div>
      </div>
    </div>
  );
}

export default OrderCardSkeleton;
