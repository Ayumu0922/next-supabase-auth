"use client";

import {
  UserCircleIcon,
  EnvelopeIcon,
  KeyIcon,
  ArrowLeftEndOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import Link from "next/link";

// ナビゲーション
const subNavigation = [
  {
    name: "プロフィール",
    icon: UserCircleIcon,
    href: "/settings/profile",
  },
  {
    name: "メールアドレス",
    icon: EnvelopeIcon,
    href: "/settings/email",
  },
  {
    name: "パスワード",
    icon: KeyIcon,
    href: "/settings/password",
  },
  {
    name: "ログアウト",
    icon: ArrowLeftEndOnRectangleIcon,
    href: "/settings/logout",
  },
];

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  // 現在のパスの取得
  const pathname = usePathname();

  return (
    <div className=" rounded-xl bg-white w-full grid grid-cols-3 gap-3 p-3 max-w-containerSmall max-h-[600px] mt-10">
      <div className="col-span-1 text-sm space-y-1 font-bold flex flex-col">
        {subNavigation.map((item, index) => (
          <Link href={item.href} key={index}>
            <div
              className={`${
                item.href == pathname ? "bg-sky-100" : ""
              } hover:bg-sky-100 px-3 py-2 rounded-full transition-all duration-300 ease-in-out transform  hover:shadow-lg`}
            >
              <item.icon className="inline-block w-5 h-5 mr-2" />
              {item.name}
            </div>
          </Link>
        ))}
      </div>
      <div className="col-span-2 ">{children}</div>
    </div>
  );
};

export default SettingsLayout;
