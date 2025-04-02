import { useAuth } from "../context/AuthContextProvider";
function AuthButton() {
  const { signIn } = useAuth();
  return (
    <button onClick={() => signIn({ provider: "google" })} className="text-white border px-4 py-2 rounded-lg">
      Googleログインをする
    </button>
  );
}

export default AuthButton;
