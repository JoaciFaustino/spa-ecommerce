"use client";
import { useSearchAndCreateBar } from "./useSearchAndCreateBar";
import CreateOrUpdateCakeForm from "@/components/CreateOrUpdateCakeForm/CreateOrUpdateCakeForm";
import SearchAndCreateBar from "@/app/dashboard/_components/SearchAndCreateBar/SearchAndCreateBar";

function SearchAndCreateCakesBar() {
  const { createNewCake, modalIsActived, openAndCloseModal } =
    useSearchAndCreateBar();

  return (
    <SearchAndCreateBar
      modalIsActived={modalIsActived}
      createFormComponent={
        <CreateOrUpdateCakeForm onUpdateOrCreateCake={createNewCake} />
      }
      openAndCloseModal={openAndCloseModal}
    />
  );
}

export default SearchAndCreateCakesBar;
