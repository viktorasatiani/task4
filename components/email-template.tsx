import {
  Html,
  Head,
  Body,
  Container,
  Link,
  Text,
} from "@react-email/components";

interface EmailTemplateProps {
  email: string;
  linkUrl: string;
}

export function EmailTemplate({ email, linkUrl }: EmailTemplateProps) {
  return (
    <div>
      <h1>Welcome, {email}!</h1>
      <Link
        href={linkUrl}
        className="underline"
      >
        Please Verify your email
      </Link>
    </div>
  );
}
