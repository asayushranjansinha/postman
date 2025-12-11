"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Modal } from "@/components/shared/Modal";
import {
  RequestForm,
  RequestFormValues,
} from "@/features/request/components/forms/RequestForm";
import { useCreateRequestMutation } from "@/features/request/mutations";

interface CreateRequestInput extends RequestFormValues {
  workspaceId: string;
  collectionId: string;
}

interface CreateRequestModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  workspaceId: string;
  collectionId: string;
  collectionName: string;
}

export const CreateRequestModal = ({
  isModalOpen,
  setIsModalOpen,
  workspaceId,
  collectionId,
  collectionName,
}: CreateRequestModalProps) => {
  const createRequest = useCreateRequestMutation();

  const handleCreateRequest = (formValues: RequestFormValues) => {
    const values: CreateRequestInput = {
      ...formValues,
      workspaceId, // Passed from props
      collectionId, // Passed from props
    };

    createRequest.mutate(
      {
        name: values.name,
        url: values.url!,
        method: values.method,
        workspaceId,
        collectionId,
      },
      {
        onSuccess(data) {
          if (!data || !data.success || !data.data) {
            return toast.error("Failed to create request", {
              description: data.message,
            });
          } else {
            toast.success(
              `Request "${data.data.name}" (${data.data.method}) created`,
              {
                description: "You can now view and execute this request.",
              }
            );
            setIsModalOpen(false);
          }
        },
        onError(error) {
          console.error(
            "[handleCreateRequest] Failed to create request:",
            error
          );
          toast.error("Failed to create request", {
            description: error.message,
          });
        },
      }
    );
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      title="Add New Request"
      description={`Create a new request in collection "${collectionName}"`}
      isOpen={isModalOpen}
      onClose={handleCancel}
      className="max-w-md"
    >
      <RequestForm
        onSubmit={handleCreateRequest}
        onCancel={handleCancel}
        isSubmitting={createRequest.isPending}
      />
    </Modal>
  );
};
