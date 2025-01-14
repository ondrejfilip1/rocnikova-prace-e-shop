export default function LoadingScreen() {
  return (
    <>
      <div className="background">
        <div
          className="flex flex-col items-center gap-2 min-h-screen text-red-900"
          style={{ justifyContent: "center" }}
        >
          <p className="text-xl">Načítá se</p>
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
            className="animate-spin"
          >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
        </div>
      </div>
    </>
  );
}
