type Props = {
  orderId: string;
  loading?: boolean;
};

function OrderHeader({ orderId, loading }: Props) {
  return (
    <header>
      <p className={`text`}>
        Id do pedido <br />
        <span className={`${loading ? "loading" : ""}`}>{orderId}</span>
      </p>
    </header>
  );
}

export default OrderHeader;
