import { UserContext } from "@/contexts/userProvider";
import { useContext, useEffect, useState } from "react";

export const useUserInfo = () => {
  const [reqIsPending, setReqIsPending] = useState(true);
  const { getUserLogged } = useContext(UserContext);

  useEffect(() => {
    getUserLogged().finally(() => setReqIsPending(false));
  }, []);

  return { reqIsPending };
};
