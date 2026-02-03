import SignUpForm from "./forms/SignUpForm";

const Signup = () => {
  return (
    <section className={"h-screen bg-muted"}>
      <div className="flex h-full items-center justify-center">
        <div className="flex flex-col items-center gap-6 lg:justify-start">
          <SignUpForm />
          <div className="flex justify-center gap-1 text-sm text-muted-foreground">
            <p>Already a user?</p>
            <a
              href={"/login"}
              className="font-medium text-primary hover:underline"
            >
              Login
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Signup };
