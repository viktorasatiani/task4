// lib/auth-api.ts

export const checkUserExistsApi = async (email: string) => {
  const response = await fetch("api/userExists", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
  return response.json();
};

export const signUpApi = async (userData: { email: string; password: string; fullName: string }) => {
  const response = await fetch("api/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  return response; // Return the full response to check `response.ok`
};

export const sendVerificationEmailApi = async (email: string) => {
  const response = await fetch(
    "https://api.emailjs.com/api/v1.0/email/send",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        service_id: process.env.NEXT_PUBLIC_SERVICE_ID,
        template_id: process.env.NEXT_PUBLIC_TEMPLATE_ID,
        user_id: process.env.NEXT_PUBLIC_USER_ID,
        template_params: {
          from_email: "viktorasatiani77@gmail.com",
          company: "ACME",
          email: email,
        },
      }),
    },
  );
  return response; // Return the full response to check `response.ok`
};
