import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { ChevronLeft, X } from "lucide-react";
import DialogWarning from "../dialogwarning";
import CodeEditor from "@uiw/react-textarea-code-editor";
import { getAllEmails, sendGroupNewsletter } from "@/models/Mail";

export default function EmailNewsletterCreateForm() {
  const [formData, setFormData] = useState();
  const [status, setStatus] = useState("");
  const [code, setCode] = useState("");
  const [isLoaded, setLoaded] = useState();
  const [isProcessed, setProcessed] = useState(true);
  const [hasPassword, setHasPassword] = useState(
    localStorage.getItem("adminPassword")
  );

  const navigate = useNavigate();
  const iframeRef = useRef();

  const toastStyle = {
    error: "background-primary-light border-red-900/20",
    success: "bg-green-100 border-green-900/20",
  };

  const textStyle = {
    error: "text-red-900",
    success: "text-green-900",
  };

  const buttonStyle = {
    error:
      "!text-red-900 !bg-transparent background-button-hover !p-1 !h-7 !w-7 !transition-colors",
    success:
      "!text-green-900 !bg-transparent hover:!bg-green-900/10 !p-1 !h-7 !w-7 !transition-colors",
  };

  const postForm = async () => {
    setProcessed(false);
    const groupNewsletter = await sendGroupNewsletter(formData);
    if (groupNewsletter.status === 200) {
      //console.log(groupNewsletter);
      setProcessed(true);
      setStatus("success");
      toast("Newsletter byl úspěšně odeslán všem odběratelům", {
        action: {
          label: <X />,
        },
      });
      return navigate();
    } else {
      setProcessed(true);
      setStatus("error");
      toast("Chyba " + groupNewsletter.status + " při vytváření newsletteru", {
        description: groupNewsletter.message,
        action: {
          label: <X />,
        },
      });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      password: localStorage.getItem("adminPassword"),
    });
    //console.log(formData);
  };

  const handlePreview = (e) => {
    const iframeBody = iframeRef.current.contentWindow.document;
    iframeBody.open("text/html", "replace");
    iframeBody.write(e.target.value);
    iframeBody.close();
  };

  const handlePost = (e) => {
    e.preventDefault();
    if (formData && formData.emailHTML) postForm();
    else {
      setStatus("error");
      toast("Vyplňte všechny údaje", {
        action: {
          label: <X />,
        },
      });
    }
  };

  const load = async (password) => {
    const emails = await getAllEmails({ password });
    if (emails.status === 200) setLoaded(true);
    else setLoaded(null);

    // udela pole vsech emailu na ktery to ma posilat newsletter
    let emailArray = [];
    emails.payload.map((value) => {
      emailArray.push(value.email);
    });
    // console.log(emailArray);

    setFormData({
      password: password,
      emailList: emailArray,
    });
  };

  useEffect(() => {
    const password = localStorage.getItem("adminPassword");
    load(password);
    document.title = "Pigress - Admin panel";
  }, []);

  if (isLoaded === null)
    return (
      <div className="text-center h-screen flex justify-center items-center text-lg">
        Emaily nenalezeny
      </div>
    );

  if (!isLoaded)
    return (
      <div className="text-center h-screen flex justify-center items-center text-lg">
        Emaily se načítají...
      </div>
    );

  return (
    <>
      <DialogWarning pass={hasPassword} />
      <div className="container px-2 mx-auto">
        <div className="flex justify-between items-center my-3">
          <h1 className="text-2xl">Rozeslat newsletter</h1>
          <Link to={"/admin"}>
            <Button variant="outline" className="gap-1 pl-3">
              <ChevronLeft />
              <span>Jít zpět</span>
            </Button>
          </Link>
        </div>
        <form className="flex flex-col gap-2">
          <Label className="text-xs text-neutral-500">Titulek</Label>
          <Input
            type="text"
            name="subject"
            placeholder="Zadejte titulek"
            defaultValue="Pigress - Newsletter"
            onChange={handleChange}
          />
          <Label className="text-xs text-neutral-500">HTML obsah</Label>
          {/* Credit: https://uiwjs.github.io/react-textarea-code-editor/ */}
          <CodeEditor
            name="emailHTML"
            required
            value={code}
            language="html"
            placeholder="Zadejte HTML obsah"
            data-color-mode="light"
            onChange={(e) => {
              setCode(e.target.value);
              handleChange(e);
              handlePreview(e);
            }}
            className="flex min-h-[80px] w-full rounded-md border border-neutral-200 !bg-white px-3 py-2 !text-base ring-offset-white placeholder:!text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:!text-sm dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300 !font-mono"
          />
          <Label className="text-xs text-neutral-500">HTML náhled</Label>
          <iframe ref={iframeRef} src="about:blank" title="preview" className="w-full rounded-md border border-neutral-200 !bg-white px-3 py-2" />
          <Button
            variant="secondary"
            onClick={handlePost}
            className="w-[157px] mb-2"
          >
            <span>
              {isProcessed ? (
                "Odeslat newsletter"
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={30}
                  height={30}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="animate-spin mx-auto"
                >
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
              )}
            </span>
          </Button>
        </form>
      </div>
      <Toaster
        position="bottom-right"
        className="font-manrope"
        toastOptions={{
          unstyled: false,
          classNames: {
            toast: toastStyle[status],
            title: textStyle[status],
            description: textStyle[status],
            actionButton: buttonStyle[status],
            cancelButton: buttonStyle[status],
            closeButton: buttonStyle[status],
          },
        }}
      />
    </>
  );
}
