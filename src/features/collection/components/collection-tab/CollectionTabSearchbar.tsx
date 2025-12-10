import { PlusIcon, SearchIcon } from "lucide-react";

import { ToolTipHint } from "@/components/shared/ToolTipHint";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

interface CollectionTabSearchbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onCreateClick: () => void;
}

export const CollectionTabSearchbar = ({
  searchQuery,
  onSearchChange,
  onCreateClick,
}: CollectionTabSearchbarProps) => {
  return (
    <div className="p-2 flex gap-4 border-b shrink-0">
      <ButtonGroup className="w-full">
        <ButtonGroup className="flex-1">
          <InputGroup className="h-8">
            <InputGroupAddon>
              <SearchIcon className="size-4 text-muted-foreground" />
            </InputGroupAddon>
            <InputGroupInput
              className="text-xs"
              placeholder="Search collections..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </InputGroup>
        </ButtonGroup>
        <ButtonGroup>
          <ToolTipHint label="Add New Collection">
            <Button variant="outline" size="icon-sm" onClick={onCreateClick}>
              <PlusIcon />
            </Button>
          </ToolTipHint>
        </ButtonGroup>
      </ButtonGroup>
    </div>
  );
};
