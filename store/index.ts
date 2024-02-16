// 状態管理
import { create } from "zustand";
import type { Database } from "../lib/supabase";
type ProfileType = Database["public"]["Tables"]["profiles"]["Row"];

type StateType = {
  user: ProfileType;
  setUser: (paylod: ProfileType) => void;
};

const useStore = create<StateType>((set) => ({
  // 初期値の設定
  user: { id: "", email: "", name: "", introduce: "", avatar_url: "" },
  // アップデート
  setUser: (paylod) => set({ user: paylod }),
}));

export default useStore;
