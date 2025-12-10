"use client";

import { Button } from "@/components/ui/button";
import { CreateWorkspaceModal } from "./modals/CreateWorkspaceModal";
import { useState } from "react";

type ComponentProps = React.ComponentProps<typeof Button>;


// TODO: Remove this button and use same logic in main UI components
export const CreateWorkspaceButton = (props: ComponentProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleModalOpen() {
    setIsModalOpen(true);
  }

  return (
    <>
      <Button {...props} onClick={handleModalOpen}>
        Create Workspace
      </Button>
      <CreateWorkspaceModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
};
