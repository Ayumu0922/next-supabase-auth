"use client";
import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  UserCircleIcon,
  EnvelopeIcon,
  KeyIcon,
  ArrowLeftEndOnRectangleIcon,
} from "@heroicons/react/24/outline";

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

interface SettingsLayoutProps {
  children: ReactNode;
}

const SettingsLayout = ({ children }: SettingsLayoutProps) => {
  // 現在のパスの取得
  const pathname = usePathname();

  return (
    <div className="w-[600px] h-[500px] overflow-hidden">
      <div className="rounded-md glassBackgroundColor grid grid-cols-3 gap-3 p-3 max-w-containersx pt-5 mt-14">
        <div className="col-span-1 text-sm space-y-1 font-bold flex flex-col">
          {subNavigation.map((item, index) => (
            <Link href={item.href} key={index} legacyBehavior>
              <a
                className={`${
                  item.href === pathname ? "text-textGreen" : ""
                } hover:text-textGreen`}
              >
                <item.icon className="inline-block w-5 h-5 mr-2" />
                {item.name}
              </a>
            </Link>
          ))}
        </div>
        <div className="col-span-2">{children}</div>
      </div>
    </div>
  );
};

export default SettingsLayout;
