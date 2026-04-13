import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

// Schema for validating the request body
const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
});

export async function POST(req: Request) {
  try {
    // 1. Parse and Validate Request Body
    const body = await req.json();
    const validationResult = contactFormSchema.safeParse(body);

    if (!validationResult.success) {
      const errors = validationResult.error.errors;
      // Format the errors for a cleaner response.
      const formattedErrors = Object.fromEntries(
        errors.map((error) => [error.path.join("."), error.message])
      );

      console.warn("Validation Error:", formattedErrors); // Log validation issues.
      return NextResponse.json(
        { error: "Invalid input", details: formattedErrors },
        { status: 400 }
      );
    }

    const { name, email, message } = validationResult.data;

    // 2. Configure Nodemailer Transport
    const transporter = nodemailer.createTransport({
      service: "gmail", // Use Gmail as a transport service.
      auth: {
        user: process.env.EMAIL_USER, // Ensure these are set in your environment!
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // 3. Construct Email Message
    const mailOptions = {
      from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`, // Sender's email address
      to: process.env.EMAIL_RECEIVER, // Receiver's email address
      subject: `New Message from ${name}`,
      html: `
        <div style="background-color: #f9f9f9; padding: 20px; font-family: Arial, sans-serif; color: #333;">
          <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
            <h2 style="text-align: center; color: #0070f3;">New Contact Form Submission</h2>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
            <p><strong style="color: #555;">Name:</strong> ${name}</p>
            <p><strong style="color: #555;">Email:</strong> ${email}</p>
            <p><strong style="color: #555;">Message:</strong></p>
            <p style="background: #f5f5f5; padding: 10px; border-radius: 5px;">${message}</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
            <p style="text-align: center; font-size: 12px; color: #999;">This message was sent from your portfolio contact form.</p>
          </div>
        </div>
      `,
    };

    // 4. Send Email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info); // Log the email info for debugging.

    // 5. Respond to Client
    return NextResponse.json(
      { message: "Email sent successfully!" },
      { status: 200 }
    ); // Explicit 200 OK
  } catch (error: unknown) {
    // 6. Handle Errors Robustly
    console.error("Error sending email:", error); // Log the full error.

    let errorMessage = "Failed to send email. Please try again later.";
    let statusCode = 500;

    // Specifically handle Zod errors
    if (error instanceof z.ZodError) {
      errorMessage = "Invalid data provided.";
      statusCode = 400;
    }

    // Generic error handling for other types of errors
    if (error instanceof Error) {
      console.error("Error Message:", error.message);
    }

    return NextResponse.json(
      { error: errorMessage, details: error },
      { status: statusCode }
    );
  }
}
