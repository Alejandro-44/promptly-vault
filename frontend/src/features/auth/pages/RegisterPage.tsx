import RegisterForm from "../components/RegisterForm";

export function RegisterPage() {
  return (
      <div className="flex align-middle justify-center">
        <div className="w-full max-w-md shadow-lg rounded-2xl border border-gray-200 p-6 m-auto">
          <h1 className="text-xl mb-4 font-semibold text-center">Register</h1>
          <RegisterForm />
        </div>
      </div>
  );
}
