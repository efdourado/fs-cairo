import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon, SlidersHorizontalIcon } from "lucide-react";

export const Search = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative w-full">
        <Input
          placeholder="Buscar restaurantes"
          className="rounded-full border-none bg-secondary pl-10"
        />
        <SearchIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
      </div>
      <Button size="icon" variant="outline" className="shrink-0 rounded-full">
        <SlidersHorizontalIcon />
      </Button>
    </div>
); };