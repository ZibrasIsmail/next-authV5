import dynamic from "next/dynamic";

const ClientResetPassword = dynamic(() => import("./ClientResetPassword"), {
  ssr: false,
});

export default function ResetPasswordPage() {
  return (
    <div>
      <h1>Reset Password</h1>
      <ClientResetPassword />
    </div>
  );
}
