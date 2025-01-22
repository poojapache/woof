export default function ErrorContainer({
  message,
}: {
  message: string;
}): JSX.Element {
  return (
    <div className="w-full h-screen bg-white flex flex-col justify-center items-center">
      <h1 className="text-2xl text-orange-500 font-bold">
        Woof woof! Something's missing. Paw-lease check and try again!
      </h1>
      <h1 className="text-lg text-orange-500 font-bold">{`Error: ${message}`}</h1>
    </div>
  );
}
