import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Admin() {
  const [updateId, setUpdateId] = useState("");



  return (
    <>
      <div className="absolute left-0 w-full text-center text-2xl top-4">
        Admin panel
      </div>
      <div className="flex flex-col min-h-screen items-center justify-center gap-2">
        <Link to="/admin/add-product">
          <Button variant="outline">Přidat produkt</Button>
        </Link>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Změnit produkt</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Změnit produkt</DialogTitle>
              <DialogDescription />
            </DialogHeader>
            <Input id="username" placeholder="Zadejte ID produktu" onChange={(e) => setUpdateId(e.target.value)} />
            <DialogFooter>
              <Link to={`/admin/update-product/${updateId}`}>
                <Button type="submit">Pokračovat</Button>
              </Link>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Link to="/admin/delete-product">
          <Button variant="destructive">Odebrat produkt</Button>
        </Link>
      </div>
    </>
  );
}
