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
import classNames from "classnames";
import { deleteProduct } from "@/models/Product";

export default function Admin() {
  const [updateId, setUpdateId] = useState();
  const [deleteId, setDeleteId] = useState();
  const [status, setStatus] = useState();
  const [isSuccessful, setSuccessful] = useState(false);

  const handleDeleteProduct = async () => {
    const product = await deleteProduct(deleteId);
    if (product.status === 201) {
      setStatus("Produkt byl úspěěšně odebrán");
      setSuccessful(true);
    } else {
      setStatus("Při odebírání produktu nastala chyba");
      setSuccessful(false);
    }
  };

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
            <Button variant="outline">Upravit produkt</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Upravit produkt</DialogTitle>
              <DialogDescription />
            </DialogHeader>
            <Input
              id="updateId"
              placeholder="Zadejte ID produktu"
              onChange={(e) => setUpdateId(e.target.value)}
            />
            <DialogFooter>
              <Link
                to={`/admin/update-product/${updateId}`}
                className={!updateId ? "pointer-events-none" : ""}
              >
                <Button
                  type="submit"
                  disabled={!updateId}
                  className="transition-all"
                >
                  Pokračovat
                </Button>
              </Link>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="destructive">Odebrat produkt</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Odebrat produkt</DialogTitle>
              <DialogDescription />
            </DialogHeader>
            <Input
              id="deleteId"
              placeholder="Zadejte ID produktu"
              onChange={(e) => setDeleteId(e.target.value)}
            />
            <p className={classNames(isSuccessful ? "text-green-500" : "text-red-500", "text-sm")}>
              {status}
            </p>
            <DialogFooter>
              <Button
                className={classNames(
                  !deleteId ? "pointer-events-none" : "",
                  "transition-all"
                )}
                type="submit"
                disabled={!deleteId}
                onClick={handleDeleteProduct}
              >
                Pokračovat
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
