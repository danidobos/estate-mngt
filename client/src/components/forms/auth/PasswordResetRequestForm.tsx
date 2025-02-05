"use client";

import { useResetPasswordRequestMutation } from "@/lib/redux/features/auth/authApiSlice";
import {
	passwordResetRequestSchema,
	TPasswordResetRequestSchema,
} from "@/lib/validationSchemas";
import { extractErrorMessage } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";
import { FormFieldComponent } from "@/components/forms/FormFieldComponent";
import { MailIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/shared/Spinner";

const PasswordResetRequestForm = () => {
	const [resetPasswordRequest, { isLoading }] =
		useResetPasswordRequestMutation();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<TPasswordResetRequestSchema>({
		resolver: zodResolver(passwordResetRequestSchema),
		mode: "all",
		defaultValues: {
			email: "",
		},
	});

	const onSubmit = async (
		values: z.infer<typeof passwordResetRequestSchema>,
	) => {
		try {
			await resetPasswordRequest(values).unwrap();
			toast.success("Request sent, check your email for the reset link.");
			reset();
		} catch (error) {
			const errorMessage = extractErrorMessage(error);
			toast.error(errorMessage || "An error occurred");
		}
	};

	return (
		<main>
			<form
				noValidate
				onSubmit={handleSubmit(onSubmit)}
				className="flex w-full max-w-md flex-col gap-4"
			>
				<FormFieldComponent
					label="Email Address"
					name="email"
					register={register}
					errors={errors}
					placeholder="Email Address"
					startIcon={<MailIcon />}
					className="dark:text-babyPowder"
				/>

				<Button
					type="submit"
					className="h4-semibold bg-eerieBlack dark:bg-pumpkin w-full text-white"
				>
					{isLoading ? <Spinner /> : `Request Password Reset`}
				</Button>
			</form>
		</main>
	);
};

export default PasswordResetRequestForm;
