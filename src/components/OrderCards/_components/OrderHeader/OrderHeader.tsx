type Props = {
  orderId: string;
  loading?: boolean;
};

function OrderHeader({ orderId, loading }: Props) {
  return (
    <header>
      <p className={`text ${loading ? "loading" : ""}`}>
        Id do pedido <br />
        <span>{orderId}</span>
      </p>
    </header>
  );
}

export default OrderHeader;
