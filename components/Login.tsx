import LogInForm from "./forms/LogInForm";

export function Login() {
  return (
    <section className="h-screen bg-background">
      <div className="flex h-full items-center justify-center">
        <div className="flex flex-col items-center gap-6 lg:justify-start">
          <LogInForm />
          <div className="flex justify-center gap-1 text-sm text-muted-foreground">
            <p>Need an account?</p>
            <a
              href={"/signup"}
              className="font-medium text-primary hover:underline"
            >
              Sign up
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
