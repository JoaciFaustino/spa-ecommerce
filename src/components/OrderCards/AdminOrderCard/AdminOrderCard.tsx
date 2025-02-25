"use client";
import { IOrder, OrderState } from "@/@types/Order";
import styles from "../OrderCard.module.scss";
import OrderProductsList from "@/components/OrderProductsList/OrderProductsList";
import OrderHeader from "../_components/OrderHeader/OrderHeader";
import ContactDetails from "../_components/ContactDetails/ContactDetails";
import DeliveryAddress from "../_components/DeliveryAdress/DeliveryAdress";
import OrderInfo from "../_components/OrderInfo/OrderInfo";
import { useEffect, useState } from "react";
import Modal from "@/components/Modal/Modal";
import { normalizeDate } from "@/utils/dateUtils";
import FormUpdateOrder from "../_components/FormUpdateOrder/FormUpdateOrder";
import { toast } from "react-toastify";
import { deleteOrder, updateOrder } from "@/services/order";
import SpinnerLoader from "@/components/SpinnerLoader/SpinnerLoader";

type Props = {
  order: IOrder;
  updateOrderItem: (id: string, newOrder: IOrder) => void;
  deleteOrderItem: (id: string) => void;
};

function AdminOrderCard({
  order: {
    _id,
    cakes,
    contactDetails,
    state,
    typeOfReceipt,
    dateAndTimeDelivery,
    deliveryAddress,
    observations,
    createdAt
  },
  updateOrderItem,
  deleteOrderItem
}: Props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [requestIsPending, setRequestIsPending] = useState(false);

  const [dateCreatedAt] = useState(() => normalizeDate(createdAt) || undefined);
  const [dateDelivery, setDateDelivery] = useState(
    normalizeDate(dateAndTimeDelivery) || undefined
  );

  useEffect(() => {
    setDateDelivery(normalizeDate(dateAndTimeDelivery) || undefined);
  }, [dateAndTimeDelivery]);

  const updateRequest = async ({
    newDateDelivery,
    newState
  }: {
    newDateDelivery: Date | undefined;
    newState: OrderState;
  }) => {
    try {
      const order = await updateOrder(_id, newState, newDateDelivery);

      updateOrderItem(_id, order);

      toast.success("Pedido atualizado com sucesso");
      setModalIsOpen(false);
    } catch (error) {
      toast.error("Erro ao atualizar pedido");
    }
  };

  const deleteRequest = async () => {
    try {
      setRequestIsPending(true);
      await deleteOrder(_id);

      deleteOrderItem(_id);

      setRequestIsPending(false);
      toast.success("Marcado como entregue com sucesso!");
    } catch (error) {
      toast.error("Erro ao marcar como entregue");
    }
  };

  return (
    <>
      {modalIsOpen && (
        <Modal onClose={() => setModalIsOpen(false)}>
          <FormUpdateOrder
            typeOfReceipt={typeOfReceipt}
            defaultValues={{ dateDelivery, state }}
            onUpdate={updateRequest}
          />
        </Modal>
      )}

      <div className={styles.orderCard}>
        <OrderHeader orderId={_id} />

        <div className={styles.cardContent}>
          <OrderProductsList cakes={cakes} style="dark" />

          <div className={styles.orderInfo}>
            <ContactDetails contactDetails={contactDetails} />

            {deliveryAddress && (
              <DeliveryAddress deliveryAddress={deliveryAddress} />
            )}

            <OrderInfo
              createdAt={dateCreatedAt}
              state={state}
              typeOfReceipt={typeOfReceipt}
              dateAndTimeDelivery={dateDelivery}
            />

            {!!observations && (
              <div className={styles.infoCol}>
                <h4>Observações:</h4>

                <p className={"text"}>{observations}</p>
              </div>
            )}

            <div className={styles.actionButtons}>
              <button onClick={() => setModalIsOpen(true)}>Editar</button>

              <button onClick={deleteRequest} disabled={requestIsPending}>
                {!requestIsPending && <>Marcar como entregue</>}
                {requestIsPending && (
                  <SpinnerLoader color="#fff" size={1} unitSize="rem" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminOrderCard;
