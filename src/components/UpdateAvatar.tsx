"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { z } from "zod";

import { uploadUserAvatar } from "@/app/actions";
import { SubmitButton } from "@/components/SmartForm";
import { Form } from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { FormAvatar } from "./FormAvatar";

const updateAvatarSchema = z.object({
	avatar: z.instanceof(File, {
		message: "Upload avatar image",
	}),
});

type UpdateAvatarSchema = z.infer<typeof updateAvatarSchema>;

export function UpdateAvatar({
	avatar,
}: {
	avatar: {
		name: string;
		path: string;
	};
}) {
	const form = useForm<UpdateAvatarSchema>({
		mode: "onSubmit",
		resolver: zodResolver(updateAvatarSchema),
		defaultValues: {
			avatar: undefined,
		},
	});

	const onSubmit = async (values: UpdateAvatarSchema) => {
		const avatar = values.avatar;
		const formData = new FormData();
		formData.append("avatar", avatar);

		const { success, message } = await uploadUserAvatar(formData);
		if (!success) {
			return toast.error(message);
		}
		toast.success(message);
	};

	return (
		<Card>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
					<CardHeader>
						<CardTitle>Update Avatar</CardTitle>
						<CardDescription>
							Add or change your avatar by uploading an image (ideally 320x320
							pixels)
						</CardDescription>
					</CardHeader>

					<CardContent className="space-y-5">
						<FormAvatar form={form} name="avatar" avatar={avatar} />
					</CardContent>
					<CardFooter>
						<SubmitButton />
					</CardFooter>
				</form>
			</Form>
		</Card>
	);
}
