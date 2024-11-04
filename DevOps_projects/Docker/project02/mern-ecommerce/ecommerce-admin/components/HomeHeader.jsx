import Image from "next/image";
import { useSession } from "next-auth/react";

export default function HomeHeader() {
  const { data: session } = useSession();
  return (
    <div>
      <div className="text-blue-900 flex justify-between">
        <h2 className="mt-0">
          <div className="flex gap-2 items-center">
            <Image
              src={session?.user?.image}
              alt="session image"
              className="w-6 h-6 rounded-md sm:hidden"
              width={17}
              height={17}
              priority
            />
            <div>
              Hello, <b>{session?.user?.name}</b>
            </div>
          </div>
        </h2>

        <div className="hidden sm:block">
          <div className="flex bg-gray-300 gap-1 text-black rounded-md overflow-hidden">
            <Image
              src={session?.user?.image}
              alt="session image"
              className="w-6 h-6"
              width={17}
              height={17}
              priority
            />
            <span className="px-2">{session?.user?.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
