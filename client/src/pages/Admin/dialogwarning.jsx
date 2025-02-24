import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { KeyRound } from "lucide-react";

export default function DialogWarning({ pass }) {
  return (
    <>
      <Dialog open={!pass}>
        <DialogContent className="sm:max-w-[425px] [&>button]:hidden">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <KeyRound />
              Přihlášení
            </DialogTitle>
            <DialogDescription>
              Nemáte nastavené heslo na admin panel
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Link to="/admin">
              <Button type="submit" className="transition-all">
                Zpět na admin panel
              </Button>
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
