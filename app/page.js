import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
    <div className="flex flex-col justify-center text-white h-[44vh] items-center gap-4 px-5 md:px-0 text-xs md:text-base">
      <div className="font-bold md:text-5xl text-2xl my-4">Get Me A Coffee</div>
      <p className="text-center md:text-left mb-5 text-base md:text-xl">
        A crowdfunding platform for creators. Get funded by your fans and followers. Start now!
      </p>
      <div className="flex gap-4">
        <Link href={"/login"}>
          <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Start Here</button>
        </Link>
        <Link href={"/about"}>
          <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Read More</button>
        </Link>
      </div>
    </div>
      <div className="bg-white h-1 opacity-10">
      </div>
      <div className="text-white container mx-auto py-28 px-10">
        <h1 className="text-2xl font-bold text-center mb-14">Your fans can buy you a Coffee</h1>
        <div className="flex gap-5 justify-around flex-col md:flex-row">
          <div className="item space-y-3 flex flex-col items-center justify-center text-center">
            <img className="rounded-full p-7 bg-neutral-700" width={150} height={150} src="consultation.gif" alt="help gif" />
            <p className="font-bold text-center pt-5">Fans want to help</p>
            <p>Your fans are available for you to help you</p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center text-center">
            <img className="rounded-full p-7 bg-neutral-700" width={150} height={150} src="coin.gif" alt="coin gif" />
            <p className="font-bold text-center pt-5">Fans want to contribute</p>
            <p>Your fans are willing to contribute financially</p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center text-center">
            <img className="rounded-full p-7 bg-neutral-700" width={150} height={150} src="demand.gif" alt="coin gif" />
            <p className="font-bold text-center pt-5">Fans want to collaborate</p>
            <p>Your fans are ready to collaborate with you</p>
          </div>
          
        </div>
      </div>
    </>
  );
}

export const metadata = {
  title: "Home - GetMeACoffee",
};