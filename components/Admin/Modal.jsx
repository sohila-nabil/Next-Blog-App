"use client";

import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

function ModalComponent({ setOpenModal, openModal, deleteFunction }) {
  return (
    <Modal
      show={openModal}
      size="md"
      onClose={() => setOpenModal(false)}
      popup
      className="flex items-center justify-center" // center horizontally & vertically
    >
      <ModalHeader />
      <ModalBody>
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200 " />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to delete this?
          </h3>
          <div className="flex justify-center gap-4">
            <Button
              color="red"
              onClick={() => deleteFunction()}
              className="text-red-700 cursor-pointer"
            >
              Yes, I&apos;m Sure
            </Button>
            <Button
              color="alternative"
              onClick={() => setOpenModal(false)}
              className="cursor-pointer"
            >
              No, cancel
            </Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
}

export default ModalComponent;
