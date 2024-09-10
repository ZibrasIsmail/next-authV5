import dynamic from "next/dynamic";

const ClientResetPassword = dynamic(() => import("./ClientResetPassword"), {
  ssr: false,
});

export default function ResetPasswordPage() {
  return (
    <div>
      <ClientResetPassword />
    </div>
  );
}
