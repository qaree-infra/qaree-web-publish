import { cn } from "@/lib/utils";
import { FormElement, type SharedProps } from "./SmartForm";
import type { ControllerRenderProps, FieldValues, Path } from "react-hook-form";
import { type ComponentProps, useId } from "react";
import { ImageIcon } from "lucide-react";
import EbupIcon from "./EbupIcon";

interface FormImageProps<T extends FieldValues>
	extends SharedProps<T>,
		Omit<
			ComponentProps<"input">,
			"form" | "name" | "id" | keyof ControllerRenderProps<T, Path<T>>
		> {
	label: string;
}

export function FormFile<T extends FieldValues>({
	form,
	name,
	label,
}: FormImageProps<T>) {
	const id = useId();

	return (
		<FormElement
			form={form}
			name={name}
			render={({ value, onChange, ref, ...field }) => (
				<div>
					<label htmlFor={id} className="space-y-2">
						<div
							ref={ref}
							className={cn(
								"flex-center cursor-pointer rounded-sm  bg-muted text-muted-foreground  ",
								!value && "p-14",
								value && "relative h-40",
							)}
						>
							{!value ? <EbupIcon /> : <div>I am book placeholder icon</div>}
						</div>
						<p>{label}</p>
					</label>
					<input
						id={id}
						type="file"
						accept="application/epub+zip"
						{...field}
						onChange={(ev) => {
							onChange(ev.target.files?.[0]);
							field.onBlur();
						}}
						onBlur={undefined}
						className="sr-only appearance-none"
					/>
				</div>
			)}
		/>
	);
}