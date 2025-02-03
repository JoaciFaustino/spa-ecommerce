import { ICakeWritteOperations } from "./Cake";

export type SubmitData = Omit<ICakeWritteOperations, "frosting"> & {
  frosting?: string | null;
};
