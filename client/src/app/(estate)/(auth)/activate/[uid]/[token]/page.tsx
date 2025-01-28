"use client";

import { useActivateUserMutation } from "@/lib/redux/features/auth/authApiSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

interface ActivationProps {
	params: {
		uid: string;
		token: string;
	};
}

export default function ActivationPage({ params }: ActivationProps) {
	const router = useRouter();
	const [activateUser, { isLoading, isSuccess, isError, error }] =
		useActivateUserMutation();

	useEffect(() => {
		const { uid, token } = params;
		activateUser({ uid, token });
	}, [activateUser, params]);

	useEffect(() => {
		if (isSuccess) {
			toast.success("Account activated successfully.");
			router.push("/login");
		} else if (isError && error) {
			toast.error("Failed to activate your account.");
		}
	}, [error, isError, isSuccess, router]);

	return (
		<div className="flex min-h-screen items-center justify-center">
			<div className="text-center">
				<h3 className="dark:text-platinum font-robotoSlab text-2xl font-bold text-gray-800 sm:text-4xl md:text-5xl">
					{isLoading ? (
						<div className="flex-center">
							<span>Activating your account...</span>
						</div>
					) : isSuccess ? (
						<div className="flex-center">
							<span>Account activated successfully.</span>
						</div>
					) : (
						isError && (
							<div>
								<span className="mr-2">🛑</span>
								<span>Your account has already been activated...</span>
							</div>
						)
					)}
				</h3>
			</div>
		</div>
	);
}
