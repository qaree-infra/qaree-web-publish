"use client";

import { useFormContext } from "react-hook-form";
import type { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, Plus } from "lucide-react";

import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from "@/components/ui/command";

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

import { Separator } from "@/components/ui/separator";
import type { SelectItems } from "@/lib/graphql/types";
import { Suspense, useEffect, useState } from "react";
import { Spinner } from "./Spinner";

interface SharedProps<T extends FieldValues> {
	form?: UseFormReturn<T>;
	name: FieldPath<T>;
}

type AsyncItemsFunction = () => Promise<SelectItems>;

interface FormElementProps<T extends FieldValues, Name extends FieldPath<T>>
	extends SharedProps<T> {
	label?: string;
	placeholder?: string;
	items: SelectItems | AsyncItemsFunction;
}

export function FormMultiSelect<
	T extends FieldValues,
	Name extends FieldPath<T>,
>({ form: _, name, items, label, placeholder }: FormElementProps<T, Name>) {
	const form = useFormContext<T>();
	const [loading, setLoading] = useState(false);
	const [items2, setItems2] = useState<SelectItems>([]);

	useEffect(() => {
		setLoading(true);
		const foo = async () => {
			if (typeof items === "function") {
				setItems2(await items());
			} else {
				setItems2(items);
			}
			setLoading(false);
		};
		foo();
	}, [items]);

	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field: { name, ref, onBlur, onChange, ...field } }) => {
				const selectedValues = new Set<string>(field.value);

				return (
					<FormItem>
						<FormControl>
							<div className="flex flex-col gap-2">
								<FormLabel>{label}</FormLabel>
								<Popover>
									<PopoverTrigger asChild className="justify-start">
										<Button
											variant="outline"
											className="bg-transparent text-sm w-full"
											ref={ref}
											onBlur={onBlur}
										>
											<Plus className="mr-2 h-4 w-4" />
											{placeholder}
											{selectedValues?.size > 0 && (
												<>
													<Separator
														orientation="vertical"
														className="mx-2 h-4"
													/>
													<Badge
														variant="secondary"
														className="rounded-sm px-1 font-normal lg:hidden"
													>
														{selectedValues.size}
													</Badge>
													<div className="hidden space-x-1 lg:flex">
														{selectedValues.size > 3 ? (
															<Badge
																variant="secondary"
																className="rounded-sm px-1 font-normal"
															>
																{selectedValues.size} selected
															</Badge>
														) : (
															items2
																.filter((el) => selectedValues.has(el.value))
																.map((el) => (
																	<Badge
																		variant="secondary"
																		key={el.value}
																		className="rounded-sm px-1 font-normal"
																	>
																		{el.label}
																	</Badge>
																))
														)}
													</div>
												</>
											)}
										</Button>
									</PopoverTrigger>
									<PopoverContent className="w-fit p-0" align="start">
										<Command>
											<CommandInput placeholder={placeholder} />
											<CommandList>
												<CommandEmpty>
													{loading ? (
														<Spinner className=" mx-auto border-t-foreground" />
													) : (
														"No results found! Upload a file"
													)}
												</CommandEmpty>
												<CommandGroup>
													{items2.map((el) => {
														const isSelected = selectedValues.has(el.value);

														return (
															<CommandItem
																key={el.label}
																onSelect={() => {
																	if (isSelected) {
																		selectedValues.delete(el.value);
																	} else {
																		selectedValues.add(el.value);
																	}
																	form.setValue(
																		name,
																		// @ts-expect-error
																		Array.from(selectedValues),
																	);
																}}
															>
																<div
																	className={cn(
																		"mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
																		isSelected
																			? "bg-primary text-primary-foreground"
																			: "opacity-50 [&_svg]:invisible",
																	)}
																>
																	<Check className={cn("h-4 w-4")} />
																</div>
																<span>{el.label}</span>
															</CommandItem>
														);
													})}
												</CommandGroup>

												{selectedValues.size > 0 && (
													<>
														<CommandSeparator />
														<CommandGroup>
															<CommandItem
																onSelect={() => {
																	form.resetField(name);
																}}
																className="justify-center text-center"
															>
																Clear
															</CommandItem>
														</CommandGroup>
													</>
												)}
											</CommandList>
										</Command>
									</PopoverContent>
								</Popover>
							</div>
						</FormControl>
						<FormMessage />
					</FormItem>
				);
			}}
		/>
	);
}