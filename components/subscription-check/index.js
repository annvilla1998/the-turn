import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SubscriptionModal from "./subscription-modal";
import { markSubscriptionPromptAsSeen } from "@/store/user";

const SubscriptionCheck = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const currentUser = useSelector((state) => state.user?.currentUser);

  useEffect(() => {
    if (
      currentUser &&
      !currentUser.subscribed &&
      currentUser.verified &&
      !currentUser.hasSeenSubscriptionPrompt
    ) {
      setShowModal(true);
    }
  }, [currentUser]);

  const handleClose = () => {
    setShowModal(false);
    dispatch(markSubscriptionPromptAsSeen(true));
  };

  return (
    <SubscriptionModal
      currentUser={currentUser}
      open={showModal}
      onClose={handleClose}
    />
  );
};

export default SubscriptionCheck;
