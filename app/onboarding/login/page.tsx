import GoogleSignInButton from './_components/GoogleLoginBtn';

export default function LoginPage() {
  return (
    <div className="flex flex-col justify-between items-center">
      <div className="flex flex-col items-center gap-2 mt-32 mb-10">
        <h1 className="text-h1-bold text-black">안녕하세요, 반가워요!</h1>
        <p className="text-trans-cp1-regular text-gray-500">
          Hello, nice to meet you!
        </p>
      </div>

      <GoogleSignInButton />
    </div>
  );
}
