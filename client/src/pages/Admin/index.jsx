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
import { useState, useEffect } from "react";
import classNames from "classnames";
import { deleteProduct } from "@/models/Product";
import { isAlive } from "@/models/Server";
import { hasCorrectPassword } from "@/models/Server";
import { KeyRound } from "lucide-react";

export default function Admin() {
  const [updateId, setUpdateId] = useState();
  const [deleteId, setDeleteId] = useState();
  const [status, setStatus] = useState();
  const [isSuccessful, setSuccessful] = useState(false);
  const [isServerAlive, setIsServerAlive] = useState(false);
  const [statusPassword, setStatusPassword] = useState();
  const [password, setPassword] = useState();
  const [hasPassword, setHasPassword] = useState(
    localStorage.getItem("adminPassword")
  );
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handleDeleteProduct = async () => {
    const product = await deleteProduct(
      deleteId,
      localStorage.getItem("adminPassword")
    );
    if (product.status === 201) {
      setStatus("Produkt byl úspěšně odebrán");
      setSuccessful(true);
    } else {
      setStatus("Při odebírání produktu nastala chyba");
      setSuccessful(false);
    }
  };

  const checkPassword = async () => {
    const passData = await hasCorrectPassword({
      password: password,
    });
    if (passData.status === 200) {
      localStorage.setItem("adminPassword", password);
      window.location.reload();
    } else {
      setStatusPassword("Neplatné heslo");
      setButtonDisabled(true);
      setTimeout(() => {
        setButtonDisabled(false);
      }, 2000);
    }
  };

  const checkServer = async () => {
    const serverCheck = await isAlive();
    setIsServerAlive(serverCheck);
  };

  useEffect(() => {
    checkServer();
    document.title = "Pigress - Admin panel";
  }, []);

  return (
    <>
      <Dialog open={!hasPassword}>
        <DialogContent className="sm:max-w-[425px] [&>button]:hidden">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <KeyRound />
              Přihlášení
            </DialogTitle>
            <DialogDescription />
          </DialogHeader>
          <Input
            id="password"
            type="password"
            placeholder="Zadejte heslo do admin panelu"
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="text-sm text-red-500">{statusPassword}</p>
          <DialogFooter>
            <Button
              type="submit"
              className="transition-all"
              onClick={checkPassword}
              disabled={buttonDisabled ? true : false}
            >
              Pokračovat
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="absolute left-0 w-full text-center text-2xl top-4 flex flex-col gap-2">
        <span>Admin panel</span>
        <span className="text-sm text-gray-500">
          {isServerAlive ? "Server je zapnut" : "Server je vypnut"}
        </span>
      </div>
      <div className="flex justify-center items-center min-h-screen">
        <div className="border border-neutral-200 p-3 rounded-xl w-fit">
          <h2 className="font-medium text-lg">Produkty</h2>
          <Link to="/admin/product-list">
            <Button variant="outline" className="my-3">
              List produktů
            </Button>
          </Link>
          <h2 className="font-medium text-sm mb-3">Možnosti</h2>
          <div className="flex gap-3">
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
                <p
                  className={classNames(
                    isSuccessful ? "text-green-500" : "text-red-500",
                    "text-sm"
                  )}
                >
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
        </div>
      </div>
    </>
  );
}
